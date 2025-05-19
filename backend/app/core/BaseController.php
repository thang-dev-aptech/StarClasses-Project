<?php

namespace App\Core;

class BaseController {
    protected $logger;

    public function __construct() {
        $this->logger = Logger::getInstance();
    }

    protected function json($data, $statusCode = 200) {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }

    protected function error($message = 'Error', $code = 400) {
        http_response_code($code);
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'error',
            'message' => $message
        ]);
        exit();
    }

    protected function success($data = null, $message = 'Success') {
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ]);
        exit();
    }

    protected function validateRequest($rules) {
        $errors = [];
        foreach ($rules as $field => $rule) {
            $ruleArray = explode('|', $rule);
            foreach ($ruleArray as $singleRule) {
                if ($singleRule === 'required' && (!isset($_POST[$field]) || empty($_POST[$field]))) {
                    $errors[$field][] = ucfirst($field) . ' is required';
                }
                if (strpos($singleRule, 'min:') === 0) {
                    $min = substr($singleRule, 4);
                    if (isset($_POST[$field]) && strlen($_POST[$field]) < $min) {
                        $errors[$field][] = ucfirst($field) . ' must be at least ' . $min . ' characters';
                    }
                }
            }
        }
        return $errors;
    }

    private function validateField($value, $rule) {
        $rules = explode('|', $rule);
        foreach ($rules as $r) {
            if ($r === 'required' && empty($value)) return false;
            if ($r === 'email' && !filter_var($value, FILTER_VALIDATE_EMAIL)) return false;
            if (strpos($r, 'min:') === 0) {
                $min = substr($r, 4);
                if (strlen($value) < $min) return false;
            }
        }
        return true;
    }
}
