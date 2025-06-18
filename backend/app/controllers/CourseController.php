<?php

namespace App\Controllers;

use App\Core\BaseController;
use App\Models\Course;

class CourseController extends BaseController {
    private $courseModel;

    public function __construct() {
        parent::__construct();
        $this->courseModel = new Course();
    }

    public function index() {
        try {
            $courses = $this->courseModel->getAll();
            return $this->success($courses);
        } catch (\Exception $e) {
            $this->logger->error('Failed to fetch courses: ' . $e->getMessage());
            return $this->error('Failed to fetch courses');
        }
    }

    public function show($id) {
        $course = $this->courseModel->getById($id);
        return $this->success($course);
    }

    public function store() {
        $errors = $this->validateRequest([
            'course_name' => 'required|min:3|max:255',
            'category' => 'required',
            'price' => 'required|numeric|min:0',
            'description' => 'required',
            'teacher_id' => 'required|numeric'
        ]);

        if (!empty($errors)) {
            return $this->error($errors, 422);
        }

        try {
            // Handle image upload
            $imagePath = null;
            if (isset($_FILES['image'])) {
                $imageError = $this->validateImage($_FILES['image']);
                if ($imageError) {
                    return $this->error(['image' => $imageError], 422);
                }
                $imagePath = $this->handleImageUpload($_FILES['image']);
            }

            $courseData = [
                'course_name' => $_POST['course_name'],
                'category' => $_POST['category'],
                'price' => floatval($_POST['price']),
                'description' => $_POST['description'],
                'overview' => $_POST['overview'] ?? '',
                'schedule' => isset($_POST['schedule']) && is_string($_POST['schedule'])
                    ? $_POST['schedule']
                    : json_encode($_POST['schedule'] ?? []),
                'learning_outcomes' => isset($_POST['learning_outcomes']) && is_string($_POST['learning_outcomes'])
                    ? $_POST['learning_outcomes']
                    : json_encode($_POST['learning_outcomes'] ?? []),
                'image_url' => $imagePath,
                'teacher_id' => intval($_POST['teacher_id']),
                'is_active' => (isset($_POST['is_active']) && $_POST['is_active'] == 1) ? 1 : 0
            ];

            $courseId = $this->courseModel->create($courseData);
            $course = $this->courseModel->getById($courseId);
            return $this->success($course, 'Course created successfully');
        } catch (\Exception $e) {
            $this->logger->error('Failed to create course: ' . $e->getMessage());
            return $this->error('Failed to create course');
        }
    }

    public function update($id) {

        try {
            $existingCourse = $this->courseModel->getById($id);
            if (!$existingCourse) {
                return $this->error('Course not found', 404);
            }

            $errors = $this->validateRequest([
                'course_name' => 'required|min:3|max:255',
                'category' => 'required',
                'price' => 'required|numeric|min:0',
                'description' => 'required',
                'teacher_id' => 'required|numeric'
            ]);

            if (!empty($errors)) {
                return $this->error($errors, 422);
            }

            // Handle image upload
            $imagePath = $existingCourse['image_url'];
            if (isset($_FILES['image'])) {
                $imageError = $this->validateImage($_FILES['image']);
                if ($imageError) {
                    return $this->error(['image' => $imageError], 422);
                }
                $imagePath = $this->handleImageUpload($_FILES['image']);
                
                // Delete old image if exists
                if ($existingCourse['image_url']) {
                    $oldImagePath = __DIR__ . '/../../public/' . $existingCourse['image_url'];
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }
            }

            $courseData = [
                'course_name' => $_POST['course_name'],
                'category' => $_POST['category'],
                'price' => floatval($_POST['price']),
                'description' => $_POST['description'],
                'overview' => $_POST['overview'] ?? '',
                'schedule' => isset($_POST['schedule']) && is_string($_POST['schedule'])
                    ? $_POST['schedule']
                    : json_encode($_POST['schedule'] ?? []),
                'learning_outcomes' => isset($_POST['learning_outcomes']) && is_string($_POST['learning_outcomes'])
                    ? $_POST['learning_outcomes']
                    : json_encode($_POST['learning_outcomes'] ?? []),
                'image_url' => $imagePath,
                'teacher_id' => intval($_POST['teacher_id']),
                'is_active' => (isset($_POST['is_active']) && $_POST['is_active'] == 1) ? 1 : 0
            ];

            $this->courseModel->update($id, $courseData);
            $updatedCourse = $this->courseModel->getById($id);
            return $this->success($updatedCourse, 'Course updated successfully');
        } catch (\Exception $e) {
            $this->logger->error('Failed to update course: ' . $e->getMessage());
            return $this->error('Failed to update course');
        }
    }

    public function delete($id) {
        try {
            $course = $this->courseModel->getById($id);
            if (!$course) {
                return $this->error('Course not found', 404);
            }

            // Delete course image if exists
            if ($course['image_url']) {
                $imagePath = __DIR__ . '/../../public/' . $course['image_url'];
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }

            $this->courseModel->delete($id);
            return $this->success(null, 'Course deleted successfully');
        } catch (\Exception $e) {
            $this->logger->error('Failed to delete course: ' . $e->getMessage());
            if (strpos($e->getMessage(), 'existing enrollments') !== false) {
                return $this->error('Cannot delete course with existing enrollments', 409);
            }
            return $this->error('Failed to delete course');
        }
    }

    private function validateImage($file) {
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        $maxSize = 5 * 1024 * 1024; // 5MB

        if ($file['error'] !== UPLOAD_ERR_OK) {
            return 'File upload failed';
        }

        if (!in_array($file['type'], $allowedTypes)) {
            return 'Invalid file type. Only JPG, PNG and GIF are allowed';
        }

        if ($file['size'] > $maxSize) {
            return 'File size exceeds 5MB limit';
        }

        return null;
    }

    private function handleImageUpload($file) {
        $uploadDir = __DIR__ . '/../../public/uploads/courses/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = uniqid() . '.' . $extension;
        $filepath = $uploadDir . $filename;

        if (!move_uploaded_file($file['tmp_name'], $filepath)) {
            throw new \Exception('Failed to upload file');
        }

        return 'uploads/courses/' . $filename;
    }
}
