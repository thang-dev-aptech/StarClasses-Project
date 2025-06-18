<?php

namespace App\Controllers;

use App\Core\BaseController;
use App\Models\Introduction;

class IntroductionController extends BaseController
{
    private $introductionModel;

    public function __construct()
    {
        parent::__construct();
        $this->introductionModel = new Introduction();
    }

    // GET: Lấy danh sách (nếu cần, có thể tìm kiếm)
    public function index()
    {
        try {
            $search = $_GET['search'] ?? '';
            $introductions = $this->introductionModel->getAll($search);
            return $this->success($introductions);
        } catch (\Exception $e) {
            return $this->error('Failed to fetch introduction data');
        }
    }

    // GET: Lấy theo ID
    public function show($id)
    {
        try {
            $intro = $this->introductionModel->getById($id);
            if (!$intro) {
                return $this->error('Introduction not found', 404);
            }
            return $this->success($intro);
        } catch (\Exception $e) {
            return $this->error('Failed to fetch introduction');
        }
    }

    // POST: Thêm mới
    public function store()
    {
        $input = $_POST ?: $_REQUEST;

        $errors = $this->validateRequest([
            'badge_text'  => 'required|max:255',
            'title'       => 'required|max:255',
            'highlight'   => 'required|max:255',
            'description' => 'required|min:10',
            'image_url'   => 'required|max:255'
        ]);
        if (!empty($errors)) {
            return $this->error($errors, 422);
        }

        try {
            $data = [
                'badge_text'  => $input['badge_text'],
                'title'       => $input['title'],
                'highlight'   => $input['highlight'],
                'description' => $input['description'],
                'image_url'   => $input['image_url']
            ];

            $id = $this->introductionModel->create($data);
            $intro = $this->introductionModel->getById($id);

            return $this->success($intro, 'Introduction created successfully');
        } catch (\Exception $e) {
            return $this->error('Failed to create introduction');
        }
    }

    // PUT/PATCH: Cập nhật theo ID
    public function update($id)
    {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!$input) {
            return $this->error('Invalid input data', 400);
        }

        $errors = $this->validateRequest([
            'badge_text'  => 'required|max:255',
            'title'       => 'required|max:255',
            'highlight'   => 'required|max:255',
            'description' => 'required|min:10',
            'image_url'   => 'required|max:255'
        ]);
        if (!empty($errors)) {
            return $this->error($errors, 422);
        }

        try {
            $this->introductionModel->update($id, $input);
            $intro = $this->introductionModel->getById($id);

            return $this->success($intro, 'Introduction updated successfully');
        } catch (\Exception $e) {
            return $this->error('Failed to update introduction');
        }
    }

    // DELETE: Xoá theo ID
    public function delete($id)
    {
        try {
            $this->introductionModel->delete($id);
            return $this->success(null, 'Introduction deleted successfully');
        } catch (\Exception $e) {
            return $this->error('Failed to delete introduction');
        }
    }
}
