<?php

namespace App\Core;

abstract class BaseModel {
    protected $db;
    protected $table;
    protected $primaryKey = 'id';

    public function __construct() {
        $this->db = Database::getInstance();
    }

    public function find($id) {
        $sql = "SELECT * FROM {$this->table} WHERE {$this->primaryKey} = :id LIMIT 1";
        $stmt = $this->db->query($sql, ['id' => $id]);
        return $stmt->fetch();
    }

    public function all() {
        $sql = "SELECT * FROM {$this->table}";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll();
    }

    public function create(array $data) {
        $columns = implode(', ', array_keys($data));
        $values = ':' . implode(', :', array_keys($data));
        
        $sql = "INSERT INTO {$this->table} ($columns) VALUES ($values)";
        $this->db->query($sql, $data);
        
        return $this->find($this->db->getConnection()->lastInsertId());
    }

    public function update($id, array $data) {
        $setClause = implode(', ', array_map(function($key) {
            return "$key = :$key";
        }, array_keys($data)));
        
        $data['id'] = $id;
        $sql = "UPDATE {$this->table} SET $setClause WHERE {$this->primaryKey} = :id";
        
        return $this->db->query($sql, $data);
    }

    public function delete($id) {
        $sql = "DELETE FROM {$this->table} WHERE {$this->primaryKey} = :id";
        return $this->db->query($sql, ['id' => $id]);
    }
}
