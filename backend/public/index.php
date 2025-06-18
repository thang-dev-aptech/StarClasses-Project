<?php
require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/../vendor/autoload.php';


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
exit();
