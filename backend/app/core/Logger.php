<?php 
// đường dẫn 
namespace App\Core;
// tạo class logger
class Logger{
    private const ERROR = 'ERROR';
    private const DEBUG = 'DEBUG';
    private const INFO = 'INFO';
    
    // dùng singleton pattern 
    private static $instance = null;
    private $logPath;

    // hàm khởi tạo lấy đường dẫn log 
    private function __construct(){
        $this->logPath = $_ENV['LOG_PATH'] ?? __DIR__ . '/../../logs';
        if(!is_dir($this->logPath)){
            if (!mkdir($this->logPath, 0755, true)) {
                throw new \Exception("Không thể tạo thư mục log: {$this->logPath}");
            }
        }
    }

    // lấy instance
    public static function getInstance(){
        if(self::$instance === null){
            self::$instance = new self();
        }
        return self::$instance;
    }
    // tạo hàm log 
    public function log($level, $message, $context = []){
        try {
            $date = date('Y-m-d');
            $logFile = $this->logPath . '/' . $date . '.log';

            // nội dung trong log 
            // kiểm tra có context ko có thì chuyển sang json 
            $contextStr = empty($context) ? '' : ' - Context: ' . json_encode($context);
            // tạo nội dung log 
            $logContent = date('Y-m-d H:i:s') . " [{$level}] {$message} {$contextStr}\n" . PHP_EOL;

            // ghi vào file log 
            if (!file_put_contents($logFile, $logContent, FILE_APPEND)) {
                error_log("Failed to write to log file: {$logFile}");
            }
        } catch (\Exception $e) {
            error_log("Logger error: " . $e->getMessage());
        }
    }
    // tạo các log theo mức độ 
    public function error($message, $context = []){
        $this->log(self::ERROR, $message, $context);
    }

    public function debug($message, $context = []){
        $this->log(self::DEBUG, $message, $context);
    }

    public function info($message, $context = []){
        $this->log(self::INFO, $message, $context);
    }

    
}