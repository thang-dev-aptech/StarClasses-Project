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
        $rawJson = json_decode(file_get_contents('php://input'), true) ?? [];
    $input   = array_merge($_POST  ?? [], $rawJson);

    $errors  = [];
    $db      = \App\Core\Database::getInstance();   // cần cho unique/exists/active

    foreach ($rules as $field => $pipe) {
        $value = $input[$field] ?? null;
        $rulesArr = explode('|', $pipe);

        foreach ($rulesArr as $rule) {
            [$name, $param] = array_pad(explode(':', $rule, 2), 2, null);

            switch ($name) {
                /* ---  Bắt buộc  --- */
                case 'required':
                    if ($value === null || trim((string)$value) === '') {
                        $errors[$field][] = "$field is required";
                        break 2;                              // bỏ qua rule còn lại của field
                    }
                    break;

                /* ---  Độ dài ký tự  --- */
                case 'min':
                    if (mb_strlen(trim((string)$value), 'UTF-8') < (int)$param) {
                        $errors[$field][] = "$field min $param characters";
                    }
                    break;
                case 'max':
                    if (mb_strlen(trim((string)$value), 'UTF-8') > (int)$param) {
                        $errors[$field][] = "$field max $param characters";
                    }
                    break;

                /* ---  Kiểu số & giới hạn giá trị  --- */
                case 'integer':
                    if (!filter_var($value, FILTER_VALIDATE_INT)) {
                        $errors[$field][] = "$field must be integer";
                    }
                    break;
                case 'numeric':
                    if (!is_numeric($value)) {
                        $errors[$field][] = "$field must be numeric";
                    }
                    break;
                case 'min_value':
                    if ($value < $param) {
                        $errors[$field][] = "$field ≥ $param";
                    }
                    break;
                case 'max_value':
                    if ($value > $param) {
                        $errors[$field][] = "$field ≤ $param";
                    }
                    break;

                /* ---  Kiểu dữ liệu đơn giản  --- */
                case 'boolean':
                    if (!in_array($value, [0, 1, '0', '1', true, false], true)) {
                        $errors[$field][] = "$field must be boolean";
                    }
                    break;
                case 'email':
                    if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                        $errors[$field][] = "$field is not valid email";
                    }
                    break;
                case 'url':
                    if ($value && !filter_var($value, FILTER_VALIDATE_URL)) {
                        $errors[$field][] = "$field is not valid URL";
                    }
                    break;
                case 'json':
                    if ($value && json_decode($value, true) === null) {
                        $errors[$field][] = "$field must be valid JSON";
                    }
                    break;
                case 'regex':
                    if (!preg_match('#' . $param . '#u', (string)$value)) {
                        $errors[$field][] = "$field format invalid";
                    }
                    break;

                /* ---  So khớp 2 trường --- */
                case 'same':
                    if (($input[$param] ?? null) !== $value) {
                        $errors[$field][] = "$field must match $param";
                    }
                    break;

                /* ---  Ràng buộc liên quan DB --- */
                case 'unique':   // unique:table,col
                    [$tbl, $col] = explode(',', $param);
                    $cnt = $db->query("SELECT COUNT(*) AS c FROM $tbl WHERE $col = :v", ['v' => $value])
                              ->fetch()['c'] ?? 0;
                    if ($cnt) $errors[$field][] = "$field already exists";
                    break;

                case 'exists':   // exists:table,col
                    [$tbl, $col] = explode(',', $param);
                    $cnt = $db->query("SELECT COUNT(*) AS c FROM $tbl WHERE $col = :v", ['v' => $value])
                              ->fetch()['c'] ?? 0;
                    if (!$cnt) $errors[$field][] = "$field not found";
                    break;

                case 'active':   // active:table  (id phải ACTIVE=1)
                    $tbl = $param;
                    $row = $db->query("SELECT is_active FROM $tbl WHERE id = :v", ['v' => $value])
                              ->fetch();
                    if (!$row || !$row['is_active']) {
                        $errors[$field][] = "$field is inactive";
                    }
                    break;

                /* ---  Mặc định: bỏ qua rule không hỗ trợ --- */
                default:
                    // Bạn có thể throw RuntimeException để dev phát hiện rule sai
                    break;
            }
        }
    }

    return $errors;  
    }
}
