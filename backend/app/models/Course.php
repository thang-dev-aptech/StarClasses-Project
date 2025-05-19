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
        $sql = "INSERT INTO {$this->table} (course_name, description, short_description, price, category, image, is_active, rating, rating_count) VALUES (:course_name, :description, :short_description, :price, :category, :image, :is_active, :rating, :rating_count)";
        $this->db->query($sql, [
            'course_name' => $data['course_name'],
            'description' => $data['description'],
            'short_description' => $data['short_description'],
            'price' => $data['price'],
            'category' => $data['category'],
            'image' => $data['image'],
            'is_active' => $data['is_active'] ?? 1,
            'rating' => $data['rating'] ?? 0,
            'rating_count' => $data['rating_count'] ?? 0
        ]);
        return $this->db->getConnection()->lastInsertId();
    }

    // Cập nhật khóa học
    public function update($id, $data) {
        $sql = "UPDATE {$this->table} SET course_name = :course_name, description = :description, short_description = :short_description, price = :price, category = :category, image = :image, is_active = :is_active, rating = :rating, rating_count = :rating_count WHERE id = :id";
        $data['id'] = $id;
        $this->db->query($sql, $data);
        return true;
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
}
