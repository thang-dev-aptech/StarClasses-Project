<?php

namespace App\Models;

use App\Core\BaseModel;

class Course extends BaseModel {
    protected $table = 'courses';

    // Lấy tất cả khóa học
    public function getAll($search = '', $category = '', $page = 1, $limit = 10) {
        try {
            // Ensure parameters are integers
            $page = (int)$page;
            $limit = (int)$limit;
            $offset = ($page - 1) * $limit;

            $sql = "SELECT c.*, 
                    t.name as teacher_name,
                    COUNT(e.id) as enrollment_count
                    FROM {$this->table} c
                    LEFT JOIN teachers t ON c.teacher_id = t.id
                    LEFT JOIN enrollments e ON c.id = e.course_id
                    WHERE 1";
        $params = [];
            
        if (!empty($search)) {
                $sql .= " AND (c.course_name LIKE :search OR c.description LIKE :search)";
            $params['search'] = "%$search%";
        }
        if (!empty($category) && $category !== 'all') {
                $sql .= " AND c.category = :category";
            $params['category'] = $category;
        }
            
            $sql .= " GROUP BY c.id, t.name ORDER BY c.created_at DESC";
            
            // Add pagination using integer binding
            $sql .= " LIMIT ? OFFSET ?";
            
            // Prepare and execute with integer parameters
            $stmt = $this->db->prepare($sql);
            
            // Bind all parameters
            foreach ($params as $key => $value) {
                $stmt->bindValue(":$key", $value);
            }
            
            // Bind limit and offset as integers
            $paramIndex = count($params) + 1;
            $stmt->bindValue($paramIndex, $limit, \PDO::PARAM_INT);
            $stmt->bindValue($paramIndex + 1, $offset, \PDO::PARAM_INT);
            
            $stmt->execute();
            $courses = $stmt->fetchAll();

            // Get total count
            $countSql = "SELECT COUNT(DISTINCT c.id) as total 
                        FROM {$this->table} c 
                        WHERE 1";
            if (!empty($search)) {
                $countSql .= " AND (c.course_name LIKE :search OR c.description LIKE :search)";
            }
            if (!empty($category) && $category !== 'all') {
                $countSql .= " AND c.category = :category";
            }
            
            $totalCount = $this->db->query($countSql, $params)->fetch()['total'];

            return [
                'data' => $courses,
                'pagination' => [
                    'total' => (int)$totalCount,
                    'per_page' => $limit,
                    'current_page' => $page,
                    'last_page' => ceil($totalCount / $limit)
                ]
            ];
        } catch (\PDOException $e) {
            error_log("Get All Courses Error: " . $e->getMessage());
            throw new \Exception('Failed to get courses');
        }
    }

    // Lấy chi tiết một khóa học
    public function getById($id) {
        try {
            $sql = "SELECT c.*, 
                    t.name as teacher_name,
                    t.bio as teacher_bio,
                    COUNT(DISTINCT e.id) as enrollment_count,
                    COUNT(DISTINCT r.id) as review_count,
                    COALESCE(AVG(r.rating), 0) as average_rating
                    FROM {$this->table} c
                    LEFT JOIN teachers t ON c.teacher_id = t.id
                    LEFT JOIN enrollments e ON c.id = e.course_id
                    LEFT JOIN reviews r ON c.id = r.course_id
                    WHERE c.id = :id
                    GROUP BY c.id, t.name, t.bio";
            
            $course = $this->db->query($sql, ['id' => $id])->fetch();
            
            if ($course) {
                // Get recent reviews
                $reviewsSql = "SELECT r.*, u.name as user_name 
                              FROM reviews r
                              JOIN users u ON r.user_id = u.id
                              WHERE r.course_id = :course_id
                              ORDER BY r.created_at DESC LIMIT 5";
                $course['recent_reviews'] = $this->db->query($reviewsSql, ['course_id' => $id])->fetchAll();
                
                // Decode JSON fields
                $course['schedule'] = json_decode($course['schedule'] ?? '[]');
                $course['learning_outcomes'] = json_decode($course['learning_outcomes'] ?? '[]');
            }
            
            return $course;
        } catch (\PDOException $e) {
            error_log("Get Course Error: " . $e->getMessage());
            throw new \Exception('Failed to get course');
        }
    }

    // Thêm mới khóa học
    public function create($data) {
        try {
            // Add timestamps
            $data['created_at'] = date('Y-m-d H:i:s');
            $data['updated_at'] = date('Y-m-d H:i:s');
            
            $columns = implode(', ', array_keys($data));
            $values = ':' . implode(', :', array_keys($data));
            
            $sql = "INSERT INTO {$this->table} ($columns) VALUES ($values)";
            $this->db->query($sql, $data);
            
            return $this->db->getConnection()->lastInsertId();
        } catch (\PDOException $e) {
            error_log("Create Course Error: " . $e->getMessage());
            throw new \Exception('Failed to create course');
        }
    }

    // Cập nhật khóa học
    public function update($id, $data) {
        try {
            // Add updated timestamp
            $data['updated_at'] = date('Y-m-d H:i:s');
            
            $setClause = implode(', ', array_map(function($key) {
                return "$key = :$key";
            }, array_keys($data)));
            
            $data['id'] = $id;
            $sql = "UPDATE {$this->table} SET $setClause WHERE id = :id";
            
            return $this->db->query($sql, $data);
        } catch (\PDOException $e) {
            error_log("Update Course Error: " . $e->getMessage());
            throw new \Exception('Failed to update course');
        }
    }

    // Xóa khóa học
    public function delete($id) {
        try {
            // Check for existing enrollments
            $enrollmentCount = $this->db->query(
                "SELECT COUNT(*) as count FROM enrollments WHERE course_id = :id",
                ['id' => $id]
            )->fetch()['count'];

            if ($enrollmentCount > 0) {
                throw new \Exception('Cannot delete course with existing enrollments');
            }

            return $this->db->query("DELETE FROM {$this->table} WHERE id = :id", ['id' => $id]);
        } catch (\Exception $e) {
            error_log("Delete Course Error: " . $e->getMessage());
            throw new \Exception($e->getMessage());
        }
    }

    // Tìm kiếm một khóa học theo tên
    public function getByName($name) {
        try {
            $sql = "SELECT * FROM {$this->table} WHERE course_name = :name LIMIT 1";
            $stmt = $this->db->query($sql, ['name' => $name]);
            return $stmt->fetch();
        } catch (\PDOException $e) {
            error_log("Get Course by Name Error: " . $e->getMessage());
            throw new \Exception('Failed to get course by name');
        }
    }

    public function getCategories() {
        try {
            $sql = "SELECT category, COUNT(*) as course_count 
                    FROM {$this->table} 
                    GROUP BY category 
                    ORDER BY course_count DESC";
            return $this->db->query($sql)->fetchAll();
        } catch (\PDOException $e) {
            error_log("Get Categories Error: " . $e->getMessage());
            throw new \Exception('Failed to get categories');
        }
    }

}
