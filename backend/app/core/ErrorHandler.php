<?php

namespace App\Core;

class ErrorHandler {
    private $logger;
    
    public function __construct() {
        $this->logger = Logger::getInstance();
        
        // Set error handlers
        set_error_handler([$this, 'handleError']);
        set_exception_handler([$this, 'handleException']);
        register_shutdown_function([$this, 'handleShutdown']);
    }
    
    public function handleError($errno, $errstr, $errfile, $errline) {
        if (!(error_reporting() & $errno)) {
            return false;
        }
        
        $this->logger->error("PHP Error [$errno]: $errstr", [
            'file' => $errfile,
            'line' => $errline,
            'trace' => debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS)
        ]);
        
        return true;
    }
    
    public function handleException($exception) {
        $this->logger->error("Uncaught Exception: " . $exception->getMessage(), [
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
            'trace' => $exception->getTraceAsString()
        ]);
        
        $response = [
            'error' => true,
            'message' => $_ENV['APP_ENV'] === 'development' 
                ? 'Internal Server Error' 
                : $exception->getMessage()
        ];
        
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    
    public function handleShutdown() {
        $error = error_get_last();
        if ($error !== null && in_array($error['type'], [E_ERROR, E_CORE_ERROR, E_COMPILE_ERROR, E_PARSE])) {
            $this->logger->error("Fatal Error: " . $error['message'], [
                'file' => $error['file'],
                'line' => $error['line']
            ]);
        }
    }
}