<?php
require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/../vendor/autoload.php';

// Enable error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
// Get the request path
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = rtrim($path, '/');
// Remove .php extension if present
$path = preg_replace('/\.php$/', '', $path);

// Handle API routes
if (strpos($path, '/api/') === 0) {
    require __DIR__ . '/../app/routes/api.php';
    $router->handle();
    exit();
}

// Debug output
error_log("Requested path: " . $path);

// Handle 404
http_response_code(404);
echo "404 Not Found - Path: " . htmlspecialchars($path);
exit();
