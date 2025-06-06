<?php

// Load environment variables
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            $_ENV[$key] = $value;
            putenv("$key=$value");
        }
    }
}

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Autoload classes
spl_autoload_register(function ($class) {
    $prefix = 'App\\';
    $base_dir = __DIR__ . '/app/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    if (file_exists($file)) {
        require $file;
    }
});

use App\Core\{Database, Logger, ErrorHandler};

// Debug current directory
error_log("Current directory: " . __DIR__);
error_log("Looking for .env in: " . __DIR__ . '/.env');




// Initialize error handler
$errorHandler = new ErrorHandler();

// Initialize logger
$logger = Logger::getInstance();

// Initialize database connection
try {
    $db = Database::getInstance();
} catch (\Exception $e) {
    error_log("Database initialization error: " . $e->getMessage());
    die('Database initialization failed: ' . $e->getMessage());
}
?>