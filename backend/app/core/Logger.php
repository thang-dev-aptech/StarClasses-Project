<?php

namespace App\Core;

class Logger {
    private static $instance = null;
    private $logPath;
    
    private function __construct() {
        $this->logPath = __DIR__ . '/../../logs/';
        if (!is_dir($this->logPath)) {
            mkdir($this->logPath, 0755, true);
        }
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function error($message, $context = []) {
        $this->log('ERROR', $message, $context);
    }
    
    public function info($message, $context = []) {
        $this->log('INFO', $message, $context);
    }
    
    public function debug($message, $context = []) {
        if ($_ENV['APP_DEBUG'] === 'true') {
            $this->log('DEBUG', $message, $context);
        }
    }
    
    private function log($level, $message, $context = []) {
        $date = date('Y-m-d H:i:s');
        $logFile = $this->logPath . date('Y-m-d') . '.log';
        
        $contextStr = empty($context) ? '' : json_encode($context);
        $logMessage = "[$date] $level: $message $contextStr" . PHP_EOL;
        
        file_put_contents($logFile, $logMessage, FILE_APPEND);
    }
    
    public function getRecentLogs($lines = 100) {
        $logFile = $this->logPath . date('Y-m-d') . '.log';
        if (!file_exists($logFile)) {
            return [];
        }
        
        $logs = [];
        $file = new \SplFileObject($logFile, 'r');
        $file->seek(PHP_INT_MAX);
        $totalLines = $file->key();
        
        $startLine = max(0, $totalLines - $lines);
        $file->seek($startLine);
        
        while (!$file->eof()) {
            $logs[] = $file->fgets();
        }
        
        return $logs;
    }
}
