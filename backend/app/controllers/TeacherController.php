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
        try {
            $teacher = $this->teacherModel->getById($id);
            if (!$teacher) {
                return $this->error('Teacher not found', 404);
            }
            return $this->success($teacher);
        } catch (\Exception $e) {
            return $this->error('Failed to fetch teacher');
        }
    }

    public function store() {
        $errors = $this->validateRequest([
            'name' => 'required|min:3',
            'email' => 'required|email',
            'specialization' => 'required'
        ]);

        if (!empty($errors)) {
            return $this->error($errors, 422);
        }

        try {
            // Handle avatar upload if provided
            $avatarPath = null;
            if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] === UPLOAD_ERR_OK) {
                $avatarPath = $this->handleAvatarUpload($_FILES['avatar']);
            }

            $teacherData = [
                'name' => $_POST['name'],
                'email' => $_POST['email'],
                'phone' => $_POST['phone'] ?? null,
                'bio' => $_POST['bio'] ?? null,
                'specialization' => $_POST['specialization'],
                'experience_years' => $_POST['experience_years'] ?? 0,
                'education' => $_POST['education'] ?? null,
                'is_active' => isset($_POST['is_active']) ? 1 : 0,
                'avatar' => $avatarPath
            ];

            $teacher = $this->teacherModel->create($teacherData);
            return $this->success($teacher, 'Teacher created successfully');
        } catch (\Exception $e) {
            return $this->error('Failed to create teacher');
        }
    }

    public function update($id) {
        $errors = $this->validateRequest([
            'name' => 'required|min:3',
            'email' => 'required|email',
            'specialization' => 'required'
        ]);

        if (!empty($errors)) {
            return $this->error($errors, 422);
        }

        try {
            $teacherData = [
                'name' => $_POST['name'],
                'email' => $_POST['email'],
                'phone' => $_POST['phone'] ?? null,
                'bio' => $_POST['bio'] ?? null,
                'specialization' => $_POST['specialization'],
                'experience_years' => $_POST['experience_years'] ?? 0,
                'education' => $_POST['education'] ?? null,
                'is_active' => isset($_POST['is_active']) ? 1 : 0,
                'avatar' => null
            ];

            // Handle avatar upload if provided
            if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] === UPLOAD_ERR_OK) {
                $teacherData['avatar'] = $this->handleAvatarUpload($_FILES['avatar']);
            }

            $this->teacherModel->update($id, $teacherData);
            return $this->success(null, 'Teacher updated successfully');
        } catch (\Exception $e) {
            return $this->error('Failed to update teacher');
        }
    }

    public function delete($id) {
        try {
            $this->teacherModel->delete($id);
            return $this->success(null, 'Teacher deleted successfully');
        } catch (\Exception $e) {
            return $this->error('Failed to delete teacher');
        }
    }

    private function handleAvatarUpload($file) {
        $uploadDir = __DIR__ . '/../../storage/uploads/teachers/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        // Validate file type
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!in_array($file['type'], $allowedTypes)) {
            throw new \Exception('Invalid file type. Only JPG, PNG and GIF are allowed.');
        }

        // Validate file size (max 2MB)
        if ($file['size'] > 2 * 1024 * 1024) {
            throw new \Exception('File too large. Maximum size is 2MB.');
        }

        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = uniqid() . '.' . $extension;
        $filepath = $uploadDir . $filename;

        if (!move_uploaded_file($file['tmp_name'], $filepath)) {
            throw new \Exception('Failed to upload file');
        }

        return 'uploads/teachers/' . $filename;
    }
}
