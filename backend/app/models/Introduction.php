<?php

namespace App\Models;

use App\Core\BaseModel;

class Introduction extends BaseModel
{
    protected $table = 'introduction';

    // Lấy tất cả phần giới thiệu (nếu dùng nhiều dòng)
    public function getAll($search = '')
    {
        try {
            $sql = "SELECT * FROM {$this->table} WHERE 1";
            $params = [];

            if (!empty($search)) {
                $sql .= " AND (badge_text LIKE :search OR title LIKE :search OR highlight LIKE :search OR description LIKE :search)";
                $params['search'] = "%$search%";
            }

            $sql .= " ORDER BY id DESC";

            $stmt = $this->db->query($sql, $params);
            return $stmt->fetchAll();
        } catch (\PDOException $e) {
            error_log("GetAll Introduction Error: " . $e->getMessage());
            throw new \Exception('Failed to get introduction list');
        }
    }

    // Lấy chi tiết phần giới thiệu theo ID
    public function getById($id)
    {
        try {
            $sql = "SELECT * FROM {$this->table} WHERE id = :id";
            $stmt = $this->db->query($sql, ['id' => $id]);
            return $stmt->fetch();
        } catch (\PDOException $e) {
            error_log("Get Introduction Error: " . $e->getMessage());
            throw new \Exception('Failed to get introduction');
        }
    }

    // Tạo mới phần giới thiệu
    public function create($data)
    {
        try {
            $columns = implode(', ', array_keys($data));
            $placeholders = ':' . implode(', :', array_keys($data));

            $sql = "INSERT INTO {$this->table} ($columns) VALUES ($placeholders)";
            $this->db->query($sql, $data);

            return $this->db->getConnection()->lastInsertId();
        } catch (\PDOException $e) {
            error_log("Create Introduction Error: " . $e->getMessage());
            throw new \Exception('Failed to create introduction');
        }
    }

    // Cập nhật phần giới thiệu
    public function update($id, $data)
    {
        try {
            $fields = [];
            foreach ($data as $key => $value) {
                $fields[] = "$key = :$key";
            }

            $sql = "UPDATE {$this->table} SET " . implode(', ', $fields) . " WHERE id = :id";
            $data['id'] = $id;

            return $this->db->query($sql, $data);
        } catch (\PDOException $e) {
            error_log("Update Introduction Error: " . $e->getMessage());
            throw new \Exception('Failed to update introduction');
        }
    }

    // Xoá phần giới thiệu
    public function delete($id)
    {
        try {
            $this->db->query("DELETE FROM {$this->table} WHERE id = :id", ['id' => $id]);
            return true;
        } catch (\PDOException $e) {
            error_log("Delete Introduction Error: " . $e->getMessage());
            throw new \Exception('Failed to delete introduction');
        }
    }
}
