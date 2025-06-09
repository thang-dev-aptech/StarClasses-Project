<?php

namespace App\Controllers;

use App\Core\BaseController;
use App\Models\Course;

class CourseController extends BaseController {
    private $courseModel;
    private const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif'];
    private const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

    public function __construct() {
        parent::__construct();
        $this->courseModel = new Course();
    }

    public function index() {
        try {
            $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
            $limit = isset($_GET['limit']) ? max(1, intval($_GET['limit'])) : 10;
            $search = $_GET['search'] ?? '';
            $category = $_GET['category'] ?? '';
            
            $result = $this->courseModel->getAll($search, $category, $page, $limit);
            
            // Process JSON fields
            foreach ($result['data'] as &$course) {
                $course['schedule'] = json_decode($course['schedule'] ?? '[]');
                $course['learning_outcomes'] = json_decode($course['learning_outcomes'] ?? '[]');
            }
            
            return $this->success($result);
        } catch (\Exception $e) {
            $this->logger->error('Failed to fetch courses: ' . $e->getMessage());
            return $this->error('Failed to fetch courses');
        }
    }

    public function show($id) {
        try {
            $course = $this->courseModel->getById($id);
            if (!$course) {
                return $this->error('Course not found', 404);
            }
            return $this->success($course);
        } catch (\Exception $e) {
            $this->logger->error('Failed to fetch course: ' . $e->getMessage());
            return $this->error('Failed to fetch course');
        }
    }

    public function store() {
        $errors = $this->validateRequest([
            'course_name' => 'required|min:3|max:255',
            'description' => 'required|min:10',
            'category' => 'required',
            'price' => 'required|numeric|positive',
            'teacher_id' => 'required|numeric|positive',
            'overview' => 'min:10',
            'schedule' => 'array',
            'learning_outcomes' => 'array'
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

            // Process arrays
            $schedule = $this->processArrayField($_POST['schedule'] ?? '');
            $learning_outcomes = $this->processArrayField($_POST['learning_outcomes'] ?? '');

            $courseData = [
                'course_name' => $_POST['course_name'],
                'description' => $_POST['description'],
                'price' => floatval($_POST['price']),
                'category' => $_POST['category'],
                'teacher_id' => intval($_POST['teacher_id']),
                'overview' => $_POST['overview'] ?? '',
                'schedule' => json_encode($schedule),
                'learning_outcomes' => json_encode($learning_outcomes),
                'image_url' => $imagePath,
                'is_active' => isset($_POST['is_active']) ? 1 : 0
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
            // Check if course exists
            $existingCourse = $this->courseModel->getById($id);
            if (!$existingCourse) {
                return $this->error('Course not found', 404);
            }

        $errors = $this->validateRequest([
                'course_name' => 'required|min:3|max:255',
                'description' => 'required|min:10',
            'category' => 'required',
                'price' => 'required|numeric|positive',
                'teacher_id' => 'required|numeric|positive',
                'overview' => 'min:10',
                'schedule' => 'array',
                'learning_outcomes' => 'array'
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

            // Process arrays
            $schedule = $this->processArrayField($_POST['schedule'] ?? '');
            $learning_outcomes = $this->processArrayField($_POST['learning_outcomes'] ?? '');

            $courseData = [
                'course_name' => $_POST['course_name'],
                'description' => $_POST['description'],
                'price' => floatval($_POST['price']),
                'category' => $_POST['category'],
                'teacher_id' => intval($_POST['teacher_id']),
                'overview' => $_POST['overview'] ?? '',
                'schedule' => json_encode($schedule),
                'learning_outcomes' => json_encode($learning_outcomes),
                'image_url' => $imagePath,
                'is_active' => isset($_POST['is_active']) ? 1 : 0
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

    public function getCategories() {
        try {
            $categories = $this->courseModel->getCategories();
            return $this->success($categories);
        } catch (\Exception $e) {
            $this->logger->error('Failed to fetch categories: ' . $e->getMessage());
            return $this->error('Failed to fetch categories');
        }
    }

    private function validateImage($file) {
        if ($file['error'] !== UPLOAD_ERR_OK) {
            return 'File upload failed';
        }

        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($extension, self::ALLOWED_EXTENSIONS)) {
            return 'Invalid file type. Allowed types: ' . implode(', ', self::ALLOWED_EXTENSIONS);
        }

        if ($file['size'] > self::MAX_FILE_SIZE) {
            return 'File size exceeds 2MB limit';
        }

        return false;
    }

    private function handleImageUpload($file) {
        $uploadDir = __DIR__ . '/../../public/uploads/courses/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $filename = uniqid() . '.' . $extension;
        $filepath = $uploadDir . $filename;

        if (!move_uploaded_file($file['tmp_name'], $filepath)) {
            throw new \Exception('Failed to upload file');
        }

        return 'uploads/courses/' . $filename;
    }

    private function processArrayField($data) {
        if (empty($data)) {
            return [];
        }

        if (is_string($data)) {
            $array = explode("\n", $data);
        } else if (is_array($data)) {
            $array = $data;
        } else {
            return [];
        }

        return array_values(array_filter(array_map('trim', $array)));
    }
}
