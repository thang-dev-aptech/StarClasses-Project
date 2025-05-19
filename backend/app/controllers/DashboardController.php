<?php

namespace App\Controllers;

use App\Core\BaseController;

class DashboardController extends BaseController {
    
    public function index() {
        // Hardcoded statistics
        $stats = [
            'totalCourses' => 5,
            'totalTeachers' => 8,
            'totalConsults' => 12
        ];

        // Hardcoded popular courses
        $popularCourses = [
            [
                'courses_name' => 'Advanced Mathematics',
                'teacher_count' => 3
            ],
            [
                'courses_name' => 'Web Development',
                'teacher_count' => 2
            ],
            [
                'courses_name' => 'English Speaking',
                'teacher_count' => 2
            ],
            [
                'courses_name' => 'Physics Fundamentals',
                'teacher_count' => 1
            ],
            [
                'courses_name' => 'Data Science',
                'teacher_count' => 2
            ]
        ];

        // Hardcoded recent consult requests
        $recentConsults = [
            [
                'firstname' => 'Alice',
                'lastname' => 'Cooper',
                'subject' => 'Mathematics',
                'status' => 'pending'
            ],
            [
                'firstname' => 'Bob',
                'lastname' => 'Wilson',
                'subject' => 'Programming',
                'status' => 'completed'
            ],
            [
                'firstname' => 'Carol',
                'lastname' => 'Brown',
                'subject' => 'Physics',
                'status' => 'pending'
            ],
            [
                'firstname' => 'David',
                'lastname' => 'Miller',
                'subject' => 'English',
                'status' => 'completed'
            ],
            [
                'firstname' => 'Eve',
                'lastname' => 'Taylor',
                'subject' => 'Data Science',
                'status' => 'pending'
            ]
        ];

        return [
            'stats' => $stats,
            'popularCourses' => $popularCourses,
            'recentConsults' => $recentConsults
        ];
    }
    
    public function getChartData() {
        try {
            // TODO: Implement chart data logic 
            return $this->success([
                'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                'data' => [12, 19, 3, 5, 2]
            ]);
        } catch (\Exception $e) {
            $this->logger->error('Chart Data Error: ' . $e->getMessage());
            return $this->error('Failed to load chart data');
        }
    }
}
