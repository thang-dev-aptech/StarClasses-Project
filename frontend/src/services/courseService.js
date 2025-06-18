const API_URL = 'http://localhost:8000/api';

export const getCourses = async () => {
    const response = await fetch(`${API_URL}/courses`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('API raw data:', data);
    // Luôn trả về mảng, nếu không có thì trả về []
    return Array.isArray(data.data) ? data.data : [];
}

export const getCourseDetail = async (id) => {
    const response = await fetch(`${API_URL}/courses/${id}`);
    return response.json();
}