<?php

namespace App\Models;

use App\Core\BaseModel;

class Course extends BaseModel {
    protected $table = 'courses';
    
    public function findWithTeachers($id) {
        $sql = "
            SELECT c.*, GROUP_CONCAT(t.id) as teacher_ids, 
                   GROUP_CONCAT(t.fullname) as teacher_names
            FROM {$this->table} c
            LEFT JOIN course_teacher ct ON c.id = ct.course_id
            LEFT JOIN teachers t ON ct.teacher_id = t.id
            WHERE c.id = :id
            GROUP BY c.id
        ";
        
        $stmt = $this->db->query($sql, ['id' => $id]);
        return $stmt->fetch();
    }
    
    public function getAllWithTeachers() {
        $sql = "
            SELECT c.*, GROUP_CONCAT(t.id) as teacher_ids, 
                   GROUP_CONCAT(t.fullname) as teacher_names
            FROM {$this->table} c
            LEFT JOIN course_teacher ct ON c.id = ct.course_id
            LEFT JOIN teachers t ON ct.teacher_id = t.id
            GROUP BY c.id
        ";
        
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll();
    }
    
    public function assignTeacher($courseId, $teacherId) {
        $sql = "INSERT INTO course_teacher (course_id, teacher_id) VALUES (:course_id, :teacher_id)";
        return $this->db->query($sql, [
            'course_id' => $courseId,
            'teacher_id' => $teacherId
        ]);
    }

    // Lấy tất cả khóa học
    public function getAll($search = '') {
        $sql = "SELECT * FROM {$this->table}";
        $params = [];
        if (!empty($search)) {
            $sql .= " WHERE course_name LIKE :search";
            $params['search'] = "%$search%";
        }
        $sql .= " ORDER BY created_at DESC";
        $stmt = $this->db->query($sql, $params);
        return $stmt->fetchAll();
    }

    // Lấy chi tiết một khóa học
    public function getById($id) {
        try {
            $sql = "SELECT * FROM {$this->table} WHERE id = :id";
            $stmt = $this->db->query($sql, ['id' => $id]);
            return $stmt->fetch();
        } catch (\PDOException $e) {
            error_log("Get Course Error: " . $e->getMessage());
            throw new \Exception('Failed to get course');
        }
    }

    // Thêm mới khóa học
    public function create($data) {
        try {
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
        $sql = "DELETE FROM {$this->table} WHERE id = :id";
        $this->db->query($sql, ['id' => $id]);
        return true;
    }

    // Tìm kiếm một khóa học theo tên
    public function getByName($name) {
        $sql = "SELECT * FROM {$this->table} WHERE course_name = :name LIMIT 1";
        $stmt = $this->db->query($sql, ['name' => $name]);
        return $stmt->fetch();
    }

    // Get recent courses
    public function getRecent($limit = 5) {
        $limit = (int)$limit;
        $sql = "SELECT * FROM {$this->table} ORDER BY created_at DESC LIMIT $limit";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll();
    }
}
