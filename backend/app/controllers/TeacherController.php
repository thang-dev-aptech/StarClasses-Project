<?php

namespace App\Controllers;

use App\Core\BaseController;
use App\Models\Teacher;

class TeacherController extends BaseController {
    private $teacherModel;

    public function __construct() {
        parent::__construct();
        $this->teacherModel = new Teacher();
    }

    public function index() {
        try {
            $teachers = $this->teacherModel->getAll();
            return $this->success($teachers);
        } catch (\Exception $e) {
            return $this->error('Failed to fetch teachers');
        }
    }

    public function show($id) {
        $teacher = $this->teacherModel->getById($id);
        return $this->success($teacher);
    }

    public function store() {
        $errors = $this->validateRequest([
            'full_name' => 'required|min:3|max:255',
            'subject' => 'required',
            'experience_years' => 'required|numeric|min:0',
            'education' => 'required',
            'bio' => 'required',
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

            $teacherData = [
                'full_name' => $_POST['full_name'],
                'subject' => $_POST['subject'],
                'experience_years' => intval($_POST['experience_years']),
                'education' => $_POST['education'],
                'achievements' => isset($_POST['achievements']) ? json_encode(explode("\n", $_POST['achievements'])) : '[]',
                'bio' => $_POST['bio'] ?? null,
                'avatar_url' => $imagePath,
                'is_active' => (isset($_POST['is_active']) && $_POST['is_active'] == 1) ? 1 : 0
            ];

            $teacherID = $this->teacherModel->create($teacherData);
            $teacher = $this->teacherModel->getById($teacherID);
            return $this->success($teacher, 'Teacher created successfully');
        } catch (\Exception $e) {
            return $this->error('Failed to create teacher');
        }
    }

    public function update($id) {
        try {
            $existingTeacher = $this->teacherModel->getById($id);
            if (!$existingTeacher) {
                return $this->error('Teacher not found', 404);
            }

            $errors = $this->validateRequest([
                'full_name' => 'required|min:3|max:100',
                'subject' => 'required|max:100',
                'experience_years' => 'required|numeric|min:0',
                'education' => 'required',
                'bio' => 'required',
            ]);

            if (!empty($errors)) {
                return $this->error($errors, 422);
            }

            // Handle image upload
            $imagePath = $existingTeacher['avatar_url'];
            if (isset($_FILES['image'])) {
                $imageError = $this->validateImage($_FILES['image']);
                if ($imageError) {
                    return $this->error(['image' => $imageError], 422);
                }
                $imagePath = $this->handleImageUpload($_FILES['image']);
                
                // Delete old image if exists
                if ($existingTeacher['avatar_url']) {
                    $oldImagePath = __DIR__ . '/../../public/' . $existingTeacher['avatar_url'];
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }
            }

            $teacherData = [
                'full_name' => $_POST['full_name'],
                'subject' => $_POST['subject'],
                'experience_years' => intval($_POST['experience_years']),
                'education' => $_POST['education'],
                'bio' => $_POST['bio'] ?? null,
                'achievements' => isset($_POST['achievements']) ? json_encode(explode("\n", $_POST['achievements'])) : '[]',
                'avatar_url' => $imagePath,
                'is_active' => (isset($_POST['is_active']) && $_POST['is_active'] == 1) ? 1 : 0
            ];

            $this->teacherModel->update($id, $teacherData);
            $updatedTeacher = $this->teacherModel->getById($id);
            return $this->success($updatedTeacher, 'Teacher updated successfully');
        } catch (\Exception $e) {
            $this->logger->error('Failed to update teacher: ' . $e->getMessage());
            return $this->error('Failed to update teacher');
        }
    }

    public function delete($id) {
        try {
            $teacher = $this->teacherModel->getById($id);
            if (!$teacher) {
                return $this->error('Course not found', 404);
            }

            // Delete course image if exists
            if ($teacher['avatar_url']) {
                $imagePath = __DIR__ . '/../../public/' . $teacher['avatar_url'];
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }

            $this->teacherModel->delete($id);
            return $this->success(null, 'Course deleted successfully');
        } catch (\Exception $e) {
            $this->logger->error('Failed to delete teacher: ' . $e->getMessage());
            if (strpos($e->getMessage(), 'existing enrollments') !== false) {
                return $this->error('Cannot delete course with existing enrollments', 409);
            }
            return $this->error('Failed to delete course');
        }
    }

    private function handleImageUpload($file) {
        $uploadDir = __DIR__ . '/../../public/uploads/teachers/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = uniqid() . '.' . $extension;
        $filepath = $uploadDir . $filename;

        if (!move_uploaded_file($file['tmp_name'], $filepath)) {
            throw new \Exception('Failed to upload file');
        }

        return 'uploads/teachers/' . $filename;
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
}
