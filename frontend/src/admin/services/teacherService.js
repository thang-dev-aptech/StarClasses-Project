const API_URL = 'http://localhost:8000/api/teachers';

export const teacherService = {
    // Lấy danh sách giáo viên
    getTeachers: async () => {
        try {
            const response = await fetch(`${API_URL}`);
            if (!response.ok) {
                throw new Error('Failed to fetch teachers');
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching teachers:', error);
            throw error;
        }
    },

    // Tạo giáo viên mới
    createTeacher: async (teacherData) => {
        try {
            const formData = new FormData();
            formData.append('full_name', teacherData.full_name);
            formData.append('subject', teacherData.subject);
            formData.append('experience_years', teacherData.experience_years);
            formData.append('education', teacherData.education);
            formData.append('bio', teacherData.bio);
            formData.append('is_active', teacherData.is_active ? 1 : 0);

            // Xử lý achievements
            formData.append('achievements', teacherData.achievements || '');

            // Xử lý ảnh
            if (teacherData.avatar_url instanceof File) {
                formData.append('image', teacherData.avatar_url);
            } else if (teacherData.avatar_url) {
                formData.append('avatar_url', teacherData.avatar_url);
            }

            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error('Failed to create teacher');
            return await response.json();
        } catch (error) {
            console.error('Error creating teacher:', error);
            throw error;
        }
    },

    // Cập nhật giáo viên
    updateTeacher: async (id, teacherData) => {
        try {
            const formData = new FormData();
            formData.append('full_name', teacherData.full_name);
            formData.append('subject', teacherData.subject);
            formData.append('experience_years', teacherData.experience_years);
            formData.append('education', teacherData.education);
            formData.append('bio', teacherData.bio);
            formData.append('is_active', teacherData.is_active ? 1 : 0);

            // Xử lý achievements
            formData.append('achievements', teacherData.achievements || '');

            // Xử lý ảnh
            if (teacherData.avatar_url instanceof File) {
                formData.append('image', teacherData.avatar_url);
            } else if (teacherData.avatar_url) {
                formData.append('avatar_url', teacherData.avatar_url);
            }

            const response = await fetch(`${API_URL}/${id}`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error('Failed to update teacher');
            return await response.json();
        } catch (error) {
            console.error('Error updating teacher:', error);
            throw error;
        }
    },

    // Xóa giáo viên
    deleteTeacher: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete teacher');
            }
            return await response.json();
        } catch (error) {
            console.error('Error deleting teacher:', error);
            throw error;
        }
    }
}; 