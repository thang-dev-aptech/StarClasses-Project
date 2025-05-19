<?php
// Enable error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/../bootstrap.php';
use App\Core\Database;

// Start session
session_start();

// Check if this is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $_SESSION['error'] = "Phương thức không hợp lệ!";
    header('Location: /admin/login');
    exit();
}

// Database connection
try {
    $db = Database::getInstance();
    
} catch (Exception $e) {
    error_log("Database connection failed: " . $e->getMessage());
    $_SESSION['error'] = "Lỗi kết nối database!";
    header('Location: /admin/login');
    exit();
}

// Get POST data
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Debug log
error_log("Login attempt - Username: " . $username);

// Validate input
if (empty($username) || empty($password)) {
    $_SESSION['error'] = "Vui lòng nhập đầy đủ thông tin!";
    header('Location: /admin/login');
    exit();
}

try {
    // Get admin from database
    $stmt = $db->getConnection()->prepare("SELECT * FROM admins WHERE username = ?");
    $stmt->execute([$username]);
    $admin = $stmt->fetch();

    if ($admin && password_verify($password, $admin['password_hash'])) {
        // Login successful
        $_SESSION['admin_id'] = $admin['id'];
        $_SESSION['admin_username'] = $admin['username'];
        
        // Debug log
        error_log("Login successful for user: " . $username);
        
        header('Location: /admin/dashboard');
        exit();
    } else {
        // Login failed
        error_log("Login failed for user: " . $username);
        $_SESSION['error'] = "Tên đăng nhập hoặc mật khẩu không đúng!";
        header('Location: /admin/login');
        exit();
    }
} catch (PDOException $e) {
    error_log("Database error during login: " . $e->getMessage());
    $_SESSION['error'] = "Lỗi hệ thống, vui lòng thử lại sau!";
    header('Location: /admin/login');
    exit();
}
