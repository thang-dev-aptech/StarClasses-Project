<?php

namespace App\Models;

use App\Core\BaseModel;

class Course extends BaseModel {
    protected $table = 'courses';

    // Lấy tất cả khóa học
    public function getAll() {
        try {
            $sql = "SELECT * FROM {$this->table} ORDER BY created_at DESC";
            $courses = $this->db->query($sql)->fetchAll();
            
            // Process JSON fields
            foreach ($courses as &$course) {
                $course['schedule'] = json_decode($course['schedule'] ?? '[]');
                $course['learning_outcomes'] = json_decode($course['learning_outcomes'] ?? '[]');
            }
            
            return $courses;
        } catch (\PDOException $e) {
            error_log("Get All Courses Error: " . $e->getMessage());
            throw new \Exception('Failed to get courses');
        }
    }

    // Lấy chi tiết một khóa học
    public function getById($id) {
        try {
            $sql = "SELECT c.*, t.full_name as teacher_name
                    FROM {$this->table} c
                    LEFT JOIN teachers t ON c.teacher_id = t.id
                    WHERE c.id = :id";
            
            $course = $this->db->query($sql, ['id' => $id])->fetch();
            
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
        try {
            return $this->db->query("DELETE FROM {$this->table} WHERE id = :id", ['id' => $id]);
        } catch (\PDOException $e) {
            error_log("Delete Course Error: " . $e->getMessage());
            throw new \Exception('Failed to delete course');
        }
    }

}
