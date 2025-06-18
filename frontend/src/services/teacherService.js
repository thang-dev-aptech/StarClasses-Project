const API_URL = 'http://localhost:8000/api';

export const getTeachers = async () => {
    const response = await fetch(`${API_URL}/teachers`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Nếu backend trả về {status, data}, lấy data
    if (data && data.data) return data.data;
    return data;
}

export const getTeacherDetail = async (id) => {
    const response = await fetch(`${API_URL}/teachers/${id}`);
    return response.json();
}