<?php
// kiểm tra kiểu chặt chẽ khi gọi hàm tránh lỗi ví dụ "5" + 3
declare(strict_types=1);

// đọc file env 
$ENV = [];
$envPath = __DIR__ . '/.env';
// kiểm tra file .env có tồn tại hay ko 
if(is_Readable($envPath)){
    // đọc file env 
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach($lines as $line){
        $line = trim($line);
        // kiểm tra xem $line có rỗng hoặc bắt đầu bằng # thì mình sẽ bỏ qua 
        if($line === '' || str_starts_with($line, '#')){
            continue;
        }
        // tách key và value 
        [$key, $value] = Array_map('trim', explode('=', $line, 2) + [1 => NULL]);
        // gán key vào mảng 
        $ENV[$key] = $value;
        // gán key vào biến môi trường 
        putenv("$key=$value");
        // gán key vào $_ENV
        $_ENV[$key] = $value;
    }
}

// chế độ hiển thị lỗi khi ở development
// error_reporting cho phép báo những lỗi gì 
// display_errors bật tắt hiển thị báo lỗi 
error_reporting(E_ALL);
ini_set('display_errors', '1');

// autoloader 
require_once __DIR__ . '/vendor/autoload.php';

// CORS header 
header('Access-Control-Allow-Origin: ' . ($ENV['CORS_ALLOW_ORIGIN'] ?? '*'));
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// security header
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

use App\Core\{Database, Logger, ErrorHandler};

// khỏi tạo error handler
$errorHandler = new ErrorHandler();

// khởi tạo logger
$logger = Logger::getInstance();

// khởi  database connection
try {
    $db = Database::getInstance();
} catch (\Exception $e) {
    error_log("Database initialization error: " . $e->getMessage());
    die('Database initialization failed: ' . $e->getMessage());
}
?>