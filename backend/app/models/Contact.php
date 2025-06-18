<?php

namespace App\Models;

use App\Core\BaseModel;

class Contact extends BaseModel
{
    protected $table = 'contacts';

    // Lấy tất cả liên hệ, có thể tìm kiếm theo từ khóa, lọc theo khoảng ngày và trạng thái
    public function getAll()
    {
        try {
            $sql = "SELECT * FROM {$this->table} WHERE 1";
            $sql .= " ORDER BY created_at DESC";

            $stmt = $this->db->query($sql);
            return $stmt->fetchAll();
        } catch (\PDOException $e) {
            error_log("GetAll Contacts Error: " . $e->getMessage());
            throw new \Exception('Failed to get contacts');
        }
    }

    // Lấy chi tiết một liên hệ theo ID
    public function getById($id)
    {
        try {
            $sql = "SELECT * FROM {$this->table} WHERE id = :id";
            $stmt = $this->db->query($sql, ['id' => $id]);
            return $stmt->fetch();
        } catch (\PDOException $e) {
            error_log("Get Contact Error: " . $e->getMessage());
            throw new \Exception('Failed to get contact');
        }
    }

    // Tạo mới liên hệ
    public function create($data)
    {
        try {
            $columns = implode(', ', array_keys($data));
            $placeholders = ':' . implode(', :', array_keys($data));

            $sql = "INSERT INTO {$this->table} ($columns) VALUES ($placeholders)";
            $this->db->query($sql, $data);

            return $this->db->getConnection()->lastInsertId();
        } catch (\PDOException $e) {
            error_log("Create Contact Error: " . $e->getMessage());
            throw new \Exception('Failed to create contact');
        }
    }

    // Cập nhật trạng thái liên hệ
    public function updateStatus($id, $status)
    {
        try {
            $sql = "UPDATE {$this->table} SET status = :status WHERE id = :id";
            $this->db->query($sql, [
                'id' => $id,
                'status' => $status
            ]);
            return $this->getById($id);
        } catch (\PDOException $e) {
            error_log("Update Contact Status Error: " . $e->getMessage());
            throw new \Exception('Failed to update contact status');
        }
    }
}