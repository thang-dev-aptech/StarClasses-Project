<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/bootstrap.php';
use App\Core\Database;

// Thông tin tài khoản mới
$username = 'admin';
$password = 'adminstar'; // Mật khẩu gốc bạn muốn

// Hash mật khẩu
$password_hash = password_hash($password, PASSWORD_BCRYPT);

try {
    // Kết nối database
    $db = Database::getInstance();
    $conn = $db->getConnection();
    
    // Kiểm tra username đã tồn tại chưa
    $stmt = $conn->prepare("SELECT COUNT(*) FROM admins WHERE username = ?");
    $stmt->execute([$username]);
    $count = $stmt->fetchColumn();
    
    if ($count > 0) {
        echo "Tài khoản admin đã tồn tại!\n";
        exit();
    }
    
    // Thêm tài khoản mới
    $stmt = $conn->prepare("INSERT INTO admins (username, password_hash) VALUES (?, ?)");
    $stmt->execute([$username, $password_hash]);
    echo "Tạo tài khoản admin thành công!\n";
    
} catch (PDOException $e) {
    echo "Database Error: " . $e->getMessage() . "\n";
    echo "Error Code: " . $e->getCode() . "\n";
} catch (Exception $e) {
    echo "General Error: " . $e->getMessage() . "\n";
    echo "Error Code: " . $e->getCode() . "\n";
    echo "Stack Trace: " . $e->getTraceAsString() . "\n";
} 