<?php

namespace App\Models;

use App\Core\BaseModel;

class Admin extends BaseModel {
    protected $table = 'admins';

    public function getByUsername($username) {
        $sql = "SELECT * FROM {$this->table} WHERE username = :username LIMIT 1";
        $stmt = $this->db->query($sql, ['username' => $username]);
        return $stmt->fetch();
    }

    public function getById($id) {
        $sql = "SELECT * FROM {$this->table} WHERE id = :id LIMIT 1";
        $stmt = $this->db->query($sql, ['id' => $id]);
        return $stmt->fetch();
    }

    public function getFirst() {
        $sql = "SELECT * FROM {$this->table} ORDER BY id ASC LIMIT 1";
        $stmt = $this->db->query($sql);
        return $stmt->fetch();
    }
}
