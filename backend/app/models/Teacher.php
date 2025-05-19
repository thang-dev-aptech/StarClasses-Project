<?php

namespace App\Models;

use PDO;
use App\Core\Database;

class Teacher {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM teachers ORDER BY id DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->db->prepare("SELECT * FROM teachers WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $sql = "INSERT INTO teachers (name, email, phone, bio, specialization, experience_years, education, is_active, avatar) 
                VALUES (:name, :email, :phone, :bio, :specialization, :experience_years, :education, :is_active, :avatar)";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'bio' => $data['bio'],
            'specialization' => $data['specialization'],
            'experience_years' => $data['experience_years'],
            'education' => $data['education'],
            'is_active' => $data['is_active'],
            'avatar' => $data['avatar']
        ]);
    }

    public function update($id, $data) {
        $sql = "UPDATE teachers SET 
                name = :name,
                email = :email,
                phone = :phone,
                bio = :bio,
                specialization = :specialization,
                experience_years = :experience_years,
                education = :education,
                is_active = :is_active";
        
        // Only update avatar if a new one is provided
        if ($data['avatar'] !== null) {
            $sql .= ", avatar = :avatar";
        }
        
        $sql .= " WHERE id = :id";
        
        $params = [
            'id' => $id,
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'bio' => $data['bio'],
            'specialization' => $data['specialization'],
            'experience_years' => $data['experience_years'],
            'education' => $data['education'],
            'is_active' => $data['is_active']
        ];
        
        if ($data['avatar'] !== null) {
            $params['avatar'] = $data['avatar'];
        }
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute($params);
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM teachers WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
