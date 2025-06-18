<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Các phương thức bạn muốn cho phép
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With"); // Các header bạn muốn cho phép
use App\Core\Router;

$router = Router::getInstance();

// Root route
$router->get('/', function() {
    return json_encode([
        'status' => 'success',
        'message' => 'Star Classes API',
        'version' => '1.0',
        'endpoints' => [
            'courses' => '/api/courses',
            'teachers' => '/api/teachers',
            'contact' => '/api/contact',
            'dashboard' => '/api/admin/dashboard'
        ]
    ]);
});

// Course routes
$router->get('/api/courses', 'CourseController@index');
$router->get('/api/courses/{id}', 'CourseController@show');
$router->post('/api/courses', 'CourseController@store');
$router->post('/api/courses/{id}', 'CourseController@update');
$router->delete('/api/courses/{id}', 'CourseController@delete');

// Teacher routes
$router->get('/api/teachers', 'TeacherController@index');
$router->get('/api/teachers/{id}', 'TeacherController@show');
$router->post('/api/teachers', 'TeacherController@store');
$router->post('/api/teachers/{id}', 'TeacherController@update');
$router->delete('/api/teachers/{id}', 'TeacherController@delete');

// Contact routes
$router->get('/api/contact', 'ContactController@index');

$router->post('/api/contact', 'ContactController@store');
$router->post('/api/contact/{id}/status', 'ContactController@updateStatus');

// Admin login route
$router->post('/api/admin/login', 'AdminController@login');

// Admin info route
$router->get('/api/admin', 'AdminController@getInfo');

// Dashboard overview route
$router->get('/api/admin/dashboard/overview', 'DashboardController@getDashboardOverview');

// Introduction routes
$router->get('/api/introduction', 'IntroductionController@index');


return $router;
