<?php

namespace App\Controllers;

use App\Core\Database;
use App\Models\Admin;

class AdminController {
    public function login() {
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';

        if (!$username || !$password) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Vui lòng nhập đầy đủ thông tin']);
            return;
        }
        $adminModel = new \App\Models\Admin();
        $admin = $adminModel->getByUsername($username);
        if ($admin && password_verify($password, $admin['password_hash'])) {
            echo json_encode(['success' => true, 'admin' => $admin]);
        } else {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Sai tài khoản hoặc mật khẩu']);
        }
    }

    public function getInfo() {
        header('Content-Type: application/json');
        $username = $_GET['username'] ?? null;
        $id = $_GET['id'] ?? null;
        $adminModel = new \App\Models\Admin();
        $admin = null;
        if ($username) {
            $admin = $adminModel->getByUsername($username);
        } elseif ($id) {
            $admin = $adminModel->getById($id);
        } else {
            // Nếu không có tham số, lấy admin đầu tiên
            $admin = $adminModel->getFirst();
        }
        // Debug log
        error_log('DEBUG getInfo: username=' . $username . ', id=' . $id);
        error_log('DEBUG getInfo: admin=' . print_r($admin, true));
        if ($admin && isset($admin['id'])) {
            unset($admin['password_hash']);
            echo json_encode(['success' => true, 'admin' => $admin]);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Admin not found']);
        }
    }

    
}
