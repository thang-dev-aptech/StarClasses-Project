<?php

namespace App\Middleware;

class AuthMiddleware {
    public function handle() {
        session_start();
        
        // Check if user is logged in
        if (!isset($_SESSION['user_id'])) {
            http_response_code(401);
            echo json_encode([
                'error' => true,
                'message' => 'Unauthorized'
            ]);
            exit;
        }

        // Add CSRF protection
        if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
            $headers = getallheaders();
            $csrfToken = $headers['X-CSRF-TOKEN'] ?? null;
            
            if (!$csrfToken || $csrfToken !== $_SESSION['csrf_token']) {
                http_response_code(403);
                echo json_encode([
                    'error' => true,
                    'message' => 'Invalid CSRF token'
                ]);
                exit;
            }
        }

        // Generate new CSRF token if not exists
        if (!isset($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }

        // Set security headers
        header('X-Frame-Options: DENY');
        header('X-XSS-Protection: 1; mode=block');
        header('X-Content-Type-Options: nosniff');
        header('Content-Security-Policy: default-src \'self\'');
    }
}
