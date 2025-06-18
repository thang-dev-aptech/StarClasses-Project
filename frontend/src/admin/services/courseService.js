const API_URL = 'http://localhost:8000/api/courses';

export const courseService = {
    // Lấy danh sách khóa học
    getCourses: async () => {
        try {
            const response = await fetch(`${API_URL}`);
            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching courses:', error);
            throw error;
        }
    },

    // Tạo khóa học mới
    createCourse: async (courseData) => {
        try {
            const formData = new FormData();
            formData.append('course_name', courseData.course_name);
            formData.append('category', courseData.category);
            formData.append('price', courseData.price);
            formData.append('description', courseData.description);
            formData.append('overview', courseData.overview || '');
            formData.append('schedule', JSON.stringify({
                schedule: {
                    day: courseData.schedule_day,
                    time: courseData.schedule_time
                }
            }));
            let outcomesArr = [];
            if (typeof courseData.learning_outcomes === 'string') {
                outcomesArr = courseData.learning_outcomes.split('\n').map(s => s.trim()).filter(Boolean);
            } else if (Array.isArray(courseData.learning_outcomes)) {
                outcomesArr = courseData.learning_outcomes;
            } else if (courseData.learning_outcomes && Array.isArray(courseData.learning_outcomes.outcomes)) {
                outcomesArr = courseData.learning_outcomes.outcomes;
            }
            formData.append('learning_outcomes', JSON.stringify({ outcomes: outcomesArr }));
            // Upload file ảnh nếu có
            if (courseData.image instanceof File) {
                formData.append('image', courseData.image);
            } else if (courseData.image_url) {
                formData.append('image_url', courseData.image_url);
            }
            formData.append('teacher_id', courseData.teacher_id);
            formData.append('is_active', courseData.is_active ? 1 : 0);

            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to create course');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating course:', error);
            throw error;
        }
    },

    // Cập nhật khóa học
    updateCourse: async (id, courseData) => {
        try {
            const formData = new FormData();
            formData.append('course_name', courseData.course_name);
            formData.append('category', courseData.category);
            formData.append('price', courseData.price);
            formData.append('description', courseData.description);
            formData.append('overview', courseData.overview || '');
            formData.append('schedule', JSON.stringify({
                schedule: {
                    day: courseData.schedule_day,
                    time: courseData.schedule_time
                }
            }));
            let outcomesArr = [];
            if (typeof courseData.learning_outcomes === 'string') {
                outcomesArr = courseData.learning_outcomes.split('\n').map(s => s.trim()).filter(Boolean);
            } else if (Array.isArray(courseData.learning_outcomes)) {
                outcomesArr = courseData.learning_outcomes;
            } else if (courseData.learning_outcomes && Array.isArray(courseData.learning_outcomes.outcomes)) {
                outcomesArr = courseData.learning_outcomes.outcomes;
            }
            formData.append('learning_outcomes', JSON.stringify({ outcomes: outcomesArr }));
            // Upload file ảnh nếu có
            if (courseData.image instanceof File) {
                formData.append('image', courseData.image);
            } else if (courseData.image_url) {
                formData.append('image_url', courseData.image_url);
            }
            formData.append('teacher_id', courseData.teacher_id);
            formData.append('is_active', courseData.is_active ? 1 : 0);

            const response = await fetch(`${API_URL}/${id}`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to update course');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating course:', error);
            throw error;
        }
    },

    // Xóa khóa học
    deleteCourse: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete course');
            }
            return await response.json();
        } catch (error) {
            console.error('Error deleting course:', error);
            throw error;
        }
    }
};


