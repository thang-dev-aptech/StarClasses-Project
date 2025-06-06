<?php 
// đường dẫn 
namespace App\Core;
// tạo class logger
class logger{
    // dùng singleton pattern 
    private static $instance = null;
    private $logPath;

    // hàm khởi tạo lấy đường dẫn log 
    private function __construct(){
        $this->logPath = __DIR__ . '/../../logs';
        if(!is_dir($this->logPath)){
            mkdir($this->logPath, 0755, true);
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
        // tạo file log 
        $date = date('Y-m-d');
        $logFile = date('Y-m-d') . '.log';

        // nội dung trong log 
        // kiểm tra có context ko có thì chuyển sang json 
        $contextStr = empty($context) ? '' : ' - Context: ' . json_encode($context);
        // tạo nội dung log 
        $logContent = date('Y-m-d H:i:s') . " [{$level}] {$message} {$contextStr}\n" . PHP_EOL;

        // ghi vào file log 
        file_put_contents($logFile, $logContent, FILE_APPEND);

    }
    // tạo các log theo mức độ 
    public function error($mesage, $context = []){
        $this->log('ERROR', $mesage, $context);
    }

    public function debug($mesage, $context = []){
        $this->log('DEBUG', $mesage, $context);
    }

    public function info($mesage, $context = []){
        $this->log('INFO', $mesage, $context);
    }

    
}