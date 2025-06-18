<?php

namespace App\Models;

use App\Core\BaseModel;

class Teacher extends BaseModel {
    protected $table = 'teachers';

    // Lấy tất cả giáo viên
    public function getAll() {
        try {
            $sql = "SELECT * FROM {$this->table} ORDER BY created_at DESC";
            $teachers = $this->db->query($sql)->fetchAll();
            foreach ($teachers as &$teacher) {
                $teacher['achievements'] = json_decode($teacher['achievements'] ?? '[]', true);
            }
            return $teachers;
        } catch (\PDOException $e) {
            error_log("Get All Teachers Error: " . $e->getMessage());
            throw new \Exception('Failed to get teachers');
        }
    }

    
    public function getById($id) {
        try {
            $sql = "SELECT * FROM {$this->table} WHERE id = :id";
            $teacher = $this->db->query($sql, ['id' => $id])->fetch();
            if ($teacher) {
                $teacher['achievements'] = json_decode($teacher['achievements'] ?? '[]', true);
            }
            return $teacher;
        } catch (\PDOException $e) {
            error_log("Get Teacher Error: " . $e->getMessage());
            throw new \Exception('Failed to get teacher');
        }
    }

    // Thêm mới giáo viên
    public function create($data) {
        try {
            
            $data['created_at'] = date('Y-m-d H:i:s');
            $columns = implode(', ', array_keys($data));
            $values = ':' . implode(', :', array_keys($data));
            
            $sql = "INSERT INTO {$this->table} ($columns) VALUES ($values)";
            $this->db->query($sql, $data);
            
            return $this->db->getConnection()->lastInsertId();
        } catch (\PDOException $e) {
            error_log("Create Teacher Error: " . $e->getMessage());
            throw new \Exception('Failed to create teacher');
        }
    }

    // Cập nhật giáo viên
    public function update($id, $data) {
        try {
            
            $setClause = implode(', ', array_map(function($key) {
                return "$key = :$key";
            }, array_keys($data)));
            
            $data['id'] = $id;
            $sql = "UPDATE {$this->table} SET $setClause WHERE id = :id";
            
            return $this->db->query($sql, $data);
        } catch (\PDOException $e) {
            error_log("Update Teacher Error: " . $e->getMessage());
            throw new \Exception('Failed to update teacher');
        }
    }

    // Xóa giáo viên
    public function delete($id) {
        try {
            return $this->db->query("DELETE FROM {$this->table} WHERE id = :id", ['id' => $id]);
        } catch (\PDOException $e) {
            error_log("Delete Course Error: " . $e->getMessage());
            throw new \Exception('Failed to delete course');
        }
    }

    
}
