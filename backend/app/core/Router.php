<?php

namespace App\Core;

class Router {
    private $routes = [];
    private static $instance = null;

    private function __construct() {}

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function addRoute($method, $path, $handler) {
        $this->routes[] = [
            'method' => $method,
            'path' => $path,
            'handler' => $handler
        ];
    }

    public function get($path, $handler) {
        $this->addRoute('GET', $path, $handler);
    }

    public function post($path, $handler) {
        $this->addRoute('POST', $path, $handler);
    }

    public function put($path, $handler) {
        $this->addRoute('PUT', $path, $handler);
    }

    public function delete($path, $handler) {
        $this->addRoute('DELETE', $path, $handler);
    }

    private function parseUrl() {
        $path = $_SERVER['REQUEST_URI'];
        if (strpos($path, '?') !== false) {
            $path = substr($path, 0, strpos($path, '?'));
        }
        return rtrim($path, '/');
    }

    public function handle() {
        $path = $this->parseUrl();
        $method = $_SERVER['REQUEST_METHOD'];

        // Debug information
        if ($_ENV['APP_ENV'] === 'development') {
            error_log("Request: $method $path");
            error_log("Available routes: " . json_encode($this->routes, JSON_PRETTY_PRINT));
        }

        foreach ($this->routes as $route) {
            $pattern = preg_replace('/\{([a-zA-Z]+)\}/', '([^/]+)', $route['path']);
            $pattern = "@^" . $pattern . "$@D";

            // Debug pattern matching
            if ($_ENV['APP_ENV'] === 'development') {
                error_log("Checking route: {$route['method']} {$route['path']}");
                error_log("Pattern: $pattern");
                error_log("Matches: " . (preg_match($pattern, $path) ? 'Yes' : 'No'));
            }

            if ($route['method'] === $method && preg_match($pattern, $path, $matches)) {
                array_shift($matches); // Remove the full match
                
                // Parse handler
                if (is_string($route['handler'])) {
                    list($controller, $method) = explode('@', $route['handler']);
                    $controller = "App\\Controllers\\" . $controller;
                    
                    // Debug controller loading
                    if ($_ENV['APP_ENV'] === 'development') {
                        error_log("Loading controller: $controller");
                        if (!class_exists($controller)) {
                            error_log("Controller class not found: $controller");
                            throw new \Exception("Controller not found: $controller");
                        }
                    }
                    
                    $controller = new $controller();
                    return call_user_func_array([$controller, $method], $matches);
                } else {
                    return call_user_func_array($route['handler'], $matches);
                }
            }
        }

        // No route found
        if ($_ENV['APP_ENV'] === 'development') {
            error_log("No matching route found for: $method $path");
        }
        
        http_response_code(404);
        echo json_encode([
            'error' => 'Not Found',
            'message' => 'The requested URL was not found on this server.',
            'path' => $path,
            'method' => $method
        ]);
    }
}
