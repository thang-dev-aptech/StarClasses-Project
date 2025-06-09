const API_URL = 'http://localhost:8000/api';

// Helper function to handle fetch response
const handleResponse = async (response) => {
    // Check if the response has content
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format. Expected JSON');
    }

    try {
        const data = await response.json();
        
        if (!response.ok) {
            const error = {
                status: response.status,
                data: data,
                message: data.message || 'An error occurred'
            };
            throw error;
        }
        
        return data;
    } catch (error) {
        if (error instanceof SyntaxError) {
            // JSON parse error
            throw new Error('Invalid response format from server');
        }
        throw error;
    }
};

// Default headers for all requests
const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const courseService = {
    // Lấy danh sách khóa học với phân trang và tìm kiếm
    async getCourses(page = 1, limit = 10, search = '', category = '') {
        try {
            // Ensure page and limit are numbers
            const params = new URLSearchParams({
                page: parseInt(page, 10),
                limit: parseInt(limit, 10),
                search: search || '',
                category: category || ''
            }).toString();

            const response = await fetch(`${API_URL}/courses?${params}`, {
                headers: defaultHeaders
            });
            return handleResponse(response);
        } catch (error) {
            throw this.handleError(error);
        }
    },

    // Lấy chi tiết một khóa học
    async getCourseById(id) {
        try {
            const response = await fetch(`${API_URL}/courses/${id}`, {
                headers: defaultHeaders
            });
            return handleResponse(response);
        } catch (error) {
            throw this.handleError(error);
        }
    },

    // Tạo khóa học mới
    async createCourse(courseData) {
        try {
            const formData = this.prepareFormData(courseData);
            const response = await fetch(`${API_URL}/courses`, {
        method: 'POST',
                body: formData
                // Don't set Content-Type header for FormData, browser will set it automatically with boundary
            });
            return handleResponse(response);
        } catch (error) {
            throw this.handleError(error);
        }
    },

    // Cập nhật khóa học
    async updateCourse(id, courseData) {
        try {
            const formData = this.prepareFormData(courseData);
            const response = await fetch(`${API_URL}/courses/${id}`, {
        method: 'PUT',
                body: formData
                // Don't set Content-Type header for FormData, browser will set it automatically with boundary
            });
            return handleResponse(response);
        } catch (error) {
            throw this.handleError(error);
        }
    },

    // Xóa khóa học
    async deleteCourse(id) {
        try {
            const response = await fetch(`${API_URL}/courses/${id}`, {
        method: 'DELETE',
                headers: defaultHeaders
            });
            return handleResponse(response);
        } catch (error) {
            throw this.handleError(error);
        }
    },

    // Lấy danh sách categories
    async getCategories() {
        try {
            const response = await fetch(`${API_URL}/courses/categories`);
            return handleResponse(response);
        } catch (error) {
            throw this.handleError(error);
        }
    },

    // Bulk operations
    async bulkDeleteCourses(courseIds) {
        try {
            const response = await fetch(`${API_URL}/courses/bulk-delete`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify({ courseIds })
            });
            return handleResponse(response);
        } catch (error) {
            throw this.handleError(error);
        }
    },

    async bulkUpdateStatus(courseIds, status) {
        try {
            const response = await fetch(`${API_URL}/courses/bulk-status`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify({ courseIds, status })
            });
            return handleResponse(response);
        } catch (error) {
            throw this.handleError(error);
        }
    },

    // Analytics and Statistics
    async getCourseStats() {
        try {
            const response = await fetch(`${API_URL}/courses/stats`, {
                headers: defaultHeaders
            });
            return handleResponse(response);
        } catch (error) {
            throw this.handleError(error);
        }
    },

    async getEnrollmentStats(courseId) {
        try {
            const response = await fetch(`${API_URL}/courses/${courseId}/enrollment-stats`, {
                headers: defaultHeaders
            });
            return handleResponse(response);
        } catch (error) {
            throw this.handleError(error);
        }
    },

    // Advanced search and filters
    async searchCourses(params) {
        try {
            // Ensure pagination params are numbers
            const searchParams = {
                ...params,
                page: parseInt(params.page || 1, 10),
                limit: parseInt(params.limit || 10, 10)
            };
            
            const queryParams = new URLSearchParams(searchParams);
            const response = await fetch(`${API_URL}/courses/search?${queryParams}`, {
                headers: defaultHeaders
            });
            return handleResponse(response);
        } catch (error) {
            throw this.handleError(error);
        }
    },

    // Course materials management
    async uploadCourseMaterial(courseId, material) {
        try {
            const formData = new FormData();
            formData.append('file', material.file);
            formData.append('type', material.type);
            formData.append('description', material.description);

            const response = await fetch(`${API_URL}/courses/${courseId}/materials`, {
                method: 'POST',
                body: formData
                // Don't set Content-Type header for FormData, browser will set it automatically with boundary
            });
            return handleResponse(response);
        } catch (error) {
            throw this.handleError(error);
        }
    },

    async getCourseMaterials(courseId) {
        try {
            const response = await fetch(`${API_URL}/courses/${courseId}/materials`, {
                headers: defaultHeaders
            });
            return handleResponse(response);
        } catch (error) {
            throw this.handleError(error);
        }
    },

    // Helper function để chuẩn bị FormData
    prepareFormData(courseData) {
        const formData = new FormData();
        
        // Xử lý file ảnh
        if (courseData.image instanceof File) {
            formData.append('image', courseData.image);
        }

        // Xử lý các trường dữ liệu khác
        const fields = [
            'course_name', 'description', 'price', 'category',
            'teacher_id', 'overview', 'is_active'
        ];

        fields.forEach(field => {
            if (courseData[field] !== undefined) {
                formData.append(field, courseData[field]);
            }
        });

        // Xử lý arrays
        if (Array.isArray(courseData.schedule)) {
            formData.append('schedule', courseData.schedule.join('\n'));
        }
        if (Array.isArray(courseData.learning_outcomes)) {
            formData.append('learning_outcomes', courseData.learning_outcomes.join('\n'));
        }

        return formData;
    },

    // Enhanced error handling
    handleError(error) {
        // Network or parsing error
        if (error.message === 'Invalid response format. Expected JSON' || 
            error.message === 'Invalid response format from server') {
            return new Error('Server returned an invalid response. Please try again later.');
        }

        if (!error.status) {
            return new Error('Network error. Please check your connection');
        }

        let validationErrors;

        // Handle specific HTTP status codes
        switch (error.status) {
            case 400:
                return new Error(error.data?.message || 'Invalid request data');
            case 401:
                // Handle unauthorized access
                window.location.href = '/login';
                return new Error('Unauthorized access');
            case 403:
                return new Error('Permission denied');
            case 404:
                return new Error('Resource not found');
            case 422:
                // Validation errors
                validationErrors = Object.values(error.data?.errors || {}).flat();
                return new Error(validationErrors.join(', '));
            case 429:
                return new Error('Too many requests. Please try again later');
            case 500:
                return new Error('Internal server error. Please try again later');
            default:
                return new Error(error.message || 'An unexpected error occurred');
        }
    }
}; 