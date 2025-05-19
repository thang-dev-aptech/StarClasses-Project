<?php

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
            'consult-requests' => '/api/consult-requests',
            'auth' => [
                'login' => '/api/auth/login',
                'logout' => '/api/auth/logout'
            ]
        ]
    ]);
});

// Course routes
$router->get('/api/courses', 'CourseController@index');
$router->get('/api/courses/{id}', 'CourseController@show');
$router->post('/api/courses', 'CourseController@store');
$router->put('/api/courses/{id}', 'CourseController@update');
$router->delete('/api/courses/{id}', 'CourseController@delete');

// Teacher routes
$router->get('/api/teachers', 'TeacherController@index');
$router->get('/api/teachers/{id}', 'TeacherController@show');
$router->post('/api/teachers', 'TeacherController@store');
$router->put('/api/teachers/{id}', 'TeacherController@update');
$router->delete('/api/teachers/{id}', 'TeacherController@delete');

// Consult request routes
$router->get('/api/consult-requests', 'ConsultRequestController@index');
$router->post('/api/consult-requests', 'ConsultRequestController@store');
$router->put('/api/consult-requests/{id}', 'ConsultRequestController@update');

return $router;
