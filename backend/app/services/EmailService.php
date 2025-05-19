<?php

namespace App\Services;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class EmailService {
    private $mailer;
    
    public function __construct() {
        $this->mailer = new PHPMailer(true);
        
        // Server settings
        $this->mailer->isSMTP();
        $this->mailer->Host = $_ENV['MAIL_HOST'];
        $this->mailer->SMTPAuth = true;
        $this->mailer->Username = $_ENV['MAIL_USERNAME'];
        $this->mailer->Password = $_ENV['MAIL_PASSWORD'];
        $this->mailer->SMTPSecure = $_ENV['MAIL_ENCRYPTION'];
        $this->mailer->Port = $_ENV['MAIL_PORT'];
        
        // Default sender
        $this->mailer->setFrom(
            $_ENV['MAIL_FROM_ADDRESS'],
            $_ENV['MAIL_FROM_NAME']
        );
    }
    
    public function sendConsultNotification($request) {
        try {
            $this->mailer->addAddress($_ENV['ADMIN_EMAIL']);
            $this->mailer->Subject = 'New Consultation Request';
            
            $body = "New consultation request received:\n\n";
            $body .= "Name: {$request['firstname']} {$request['lastname']}\n";
            $body .= "Email: {$request['email']}\n";
            $body .= "Phone: {$request['phone']}\n";
            $body .= "Subject: {$request['subject']}\n";
            $body .= "Message: {$request['message']}\n";
            
            $this->mailer->Body = $body;
            
            return $this->mailer->send();
        } catch (Exception $e) {
            error_log("Email Error: " . $e->getMessage());
            return false;
        }
    }
    
    public function sendWelcomeEmail($user) {
        try {
            $this->mailer->addAddress($user['email']);
            $this->mailer->Subject = 'Welcome to Star Classes';
            
            $this->mailer->isHTML(true);
            $this->mailer->Body = $this->getWelcomeTemplate($user);
            
            return $this->mailer->send();
        } catch (Exception $e) {
            error_log("Email Error: " . $e->getMessage());
            return false;
        }
    }
    
    private function getWelcomeTemplate($user) {
        return <<<HTML
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Welcome to Star Classes!</h2>
            <p>Dear {$user['username']},</p>
            <p>Thank you for joining Star Classes. We're excited to have you on board.</p>
            <p>You can now access your dashboard and explore our courses.</p>
            <p>Best regards,<br>The Star Classes Team</p>
        </div>
        HTML;
    }
}
