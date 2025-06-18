<?php

namespace App\Controllers;

use App\Core\Database;
use App\Models\Course;
use App\Models\Teacher;
use App\Models\Contact;
use App\Models\Admin;

class DashboardController {
    public function getDashboardOverview() {
        try {
            $db = Database::getInstance()->getConnection();

            // Lấy tổng số
            $totalCourses = $db->query("SELECT COUNT(*) FROM courses")->fetchColumn();
            $totalTeachers = $db->query("SELECT COUNT(*) FROM teachers")->fetchColumn();
            $totalContacts = $db->query("SELECT COUNT(*) FROM contacts")->fetchColumn();

            // Lấy 5 khóa học gần nhất
            $stmt = $db->query("
                SELECT c.*, t.full_name as teacher_name 
                FROM courses c 
                LEFT JOIN teachers t ON c.teacher_id = t.id 
                ORDER BY c.created_at DESC 
                LIMIT 5
            ");
            $recentCourses = $stmt->fetchAll();

            // Lấy 5 giáo viên gần nhất
            $stmt = $db->query("
                SELECT * FROM teachers 
                ORDER BY created_at DESC 
                LIMIT 5
            ");
            $recentTeachers = $stmt->fetchAll();

            // Lấy 5 liên hệ gần nhất
            $stmt = $db->query("
                SELECT * FROM contacts 
                ORDER BY created_at DESC 
                LIMIT 5
            ");
            $recentContacts = $stmt->fetchAll();

            echo json_encode([
                'status' => 'success',
                'data' => [
                    'totalCourses' => $totalCourses,
                    'totalTeachers' => $totalTeachers,
                    'totalContacts' => $totalContacts,
                    'recentCourses' => $recentCourses,
                    'recentTeachers' => $recentTeachers,
                    'recentContacts' => $recentContacts
                ]
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'message' => 'Failed to get dashboard overview'
            ]);
        }
    }
}