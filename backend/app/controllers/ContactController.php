<?php

namespace App\Controllers;

use App\Core\BaseController;
use App\Models\Contact;

class ContactController extends BaseController
{
    private $contactModel;

    public function __construct()
    {
        parent::__construct();
        $this->contactModel = new Contact();
    }

    public function index()
    {
        try {
            

            $contacts = $this->contactModel->getAll();
            return $this->success($contacts);
        } catch (\Exception $e) {
            return $this->error('Failed to fetch contacts');
        }
    }
    public function store()
    {
        $errors = $this->validateRequest([
            'first_name' => 'required|min:2|max:20',
            'last_name' => 'required|min:2|max:20',
            'email' => 'required|email|max:100',
            'phone' => 'required|max:20',
            'subject' => 'required|max:255',
            'message' => 'required|min:2'
        ]);
        if (!empty($errors)) {
            return $this->error($errors, 422);
        }

        try {
            $data = [
                'first_name' => $_POST['first_name'],
                'last_name' => $_POST['last_name'],
                'email' => $_POST['email'],
                'phone' => $_POST['phone'],
                'subject' => $_POST['subject'],
                'message' => $_POST['message'],
                'status' => 'pending',
                'created_at' => date('Y-m-d H:i:s')
            ];

            // Hàm create trả về id, cần lấy lại object contact
            $id = $this->contactModel->create($data);
            $contact = $this->contactModel->getById($id);

            return $this->success($contact, 'Contact submitted successfully');
        } catch (\Exception $e) {
            error_log("Contact creation error: " . $e->getMessage());
            error_log("Stack trace: " . $e->getTraceAsString());
            return $this->error('Failed to submit contact');
        }
    }

    

    public function updateStatus($id)
    {
        try {
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($input['status'])) {
                return $this->error('Status is required', 422);
            }

            $validStatuses = ['pending', 'processing', 'completed', 'rejected'];
            if (!in_array($input['status'], $validStatuses)) {
                return $this->error('Invalid status value', 422);
            }

            $contact = $this->contactModel->updateStatus($id, $input['status']);
            return $this->success($contact, 'Contact status updated successfully');
        } catch (\Exception $e) {
            return $this->error('Failed to update contact status');
        }
    }
}