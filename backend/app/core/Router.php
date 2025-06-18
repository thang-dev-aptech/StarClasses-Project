<?php

// đường dẫn 
namespace App\Core;

// class Router
class Router {
    // mảng chứ method, path, handler
    private $routes = [];
    private static $instance;

    // hàm khởi tạo 
    private function __construct() {}
    // hàm lấy Instance
    public static function getInstance() {
        if(self::$instance == null){
            self::$instance = new self();
        }
        return self::$instance;
    }

    // thêm route
    public function addRoute($method, $path, $handler){
        $this->routes[] = [
            'method' => $method,
            'path' => $path,
            'handler' => $handler
        ];
    }

    // tạo các method
    public function get($path, $handler){
        $this->addRoute('GET', $path, $handler);
    }

    public function post($path, $handler){
        $this->addRoute('POST', $path, $handler);
    }
    public function delete($path, $handler){
        $this->addRoute('DELETE', $path, $handler);
    }

    // lấy path cần xử lí 
    public function parseUrl(){
        // lấy url cần xử lí 
        $path = $_SERVER['REQUEST_URI'];
        // kiểm tra có dấu ? ko thì xoá bỏ 
        if(strpos($path, '?') !== false){
            $path = substr($path, 0, strpos($path, '?'));
        }
       return rtrim($path, '/');
    }


    // hàm xử lí 
    public function handle(){
        // lấy path và method
        $path = $this->parseUrl();
        $method = $_SERVER['REQUEST_METHOD'];

        // kiểu tra môi trường và báo lỗi 
        if($_ENV['APP_ENV'] === 'development'){
            error_log("Path: $path, Method: $method");
            error_log("Available routes: " . json_encode($this->routes, JSON_PRETTY_PRINT));
        }

        // kiểm tra routes có khớp ko 
        foreach($this->routes as $route){
            // regax đường dẫn 
            $pattern = preg_replace('/\{([a-zA-Z]+)\}/', '([^/]+)', $route['path']);
            // regax hoàn chỉnh cho path 
            $pattern = '@^' . $pattern . '$@D';

            // debug pattern
            if($_ENV['APP_ENV'] === 'development'){
                error_log("Checking route: {$route['method']} {$route['path']}");  
                error_log("Pattern: $pattern");
                error_log("Matches: " . (preg_match($pattern, $path) ? 'Yes' : 'No')); // kiểm tra path có khớp ko 
            }
            // kiểm tra route và path có khớp ko 
            if($route['method'] === $method && preg_match($pattern, $path, $matches)){
                array_shift($matches);
                // phân tích handler
                if(is_string($route['handler'])){
                    // lấy ra controller và method 
                    list($controller, $method) = explode('@', $route['handler']);// $controller sẽ là trước @ và $method sẽ là sau @ 
                    // tạo controller 
                    $controller = "App\\Controllers\\" . $controller;

                    // debug controller
                    if($_ENV['APP_ENV'] === 'development'){
                        error_log("Controller: $controller, Method: $method");
                    }
                    // tạo instance controller 
                    $controller = new $controller();
                   
                    // call function 
                    return call_user_func_array([$controller, $method], $matches);
                }
                // nếu ko phải là string thì gọi handler trực tiếp 
                else{
                    return call_user_func_array($route['handler'], $matches);
                }
            }
        }

        // nếu ko khớp thì trả về 404 
        http_response_code(404);
        echo json_encode([
            'error' => 'Not Found',
            'message' => 'The requested resource was not found.',
            'path' => $path,
            'method' => $method,
        ]);
        
    }
}