<?php

namespace App\Controllers;

use App\Core\BaseController;
use App\Models\ConsultRequest;

class ConsultRequestController extends BaseController {
    private $consultModel;

    public function __construct() {
        $this->consultModel = new ConsultRequest();
    }

    public function index() {
        try {
            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
            
            if (isset($_GET['search'])) {
                $requests = $this->consultModel->search($_GET['search']);
            } else if (isset($_GET['start_date']) && isset($_GET['end_date'])) {
                $requests = $this->consultModel->getByDateRange(
                    $_GET['start_date'], 
                    $_GET['end_date']
                );
            } else {
                $requests = $this->consultModel->all();
            }
            
            return $this->success($requests);
        } catch (\Exception $e) {
            return $this->error('Failed to fetch consult requests');
        }
    }

    public function show($id) {
        try {
            $request = $this->consultModel->find($id);
            if (!$request) {
                return $this->error('Consult request not found', 404);
            }
            return $this->success($request);
        } catch (\Exception $e) {
            return $this->error('Failed to fetch consult request');
        }
    }

    public function store() {
        $errors = $this->validateRequest([
            'firstname' => 'required|min:2',
            'lastname' => 'required|min:2',
            'email' => 'required|email',
            'phone' => 'required',
            'subject' => 'required',
            'message' => 'required|min:10'
        ]);

        if (!empty($errors)) {
            return $this->error($errors, 422);
        }

        try {
            $requestData = [
                'firstname' => $_POST['firstname'],
                'lastname' => $_POST['lastname'],
                'email' => $_POST['email'],
                'phone' => $_POST['phone'],
                'subject' => $_POST['subject'],
                'message' => $_POST['message']
            ];

            $request = $this->consultModel->create($requestData);
            
            // Send notification email to admin
            $this->sendNotificationEmail($request);
            
            return $this->success($request, 'Consultation request submitted successfully');
        } catch (\Exception $e) {
            return $this->error('Failed to submit consultation request');
        }
    }

    public function delete($id) {
        try {
            $this->consultModel->delete($id);
            return $this->success(null, 'Consultation request deleted successfully');
        } catch (\Exception $e) {
            return $this->error('Failed to delete consultation request');
        }
    }

    private function sendNotificationEmail($request) {
        // TODO: Implement email notification system
        // This would typically use a mail service or PHP's mail function
        // to notify administrators about new consultation requests
    }
}
