const API_URL = 'http://localhost:8000/api/courses';

// lấy danh sách khoá học 
export const getCourse = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Lấy danh sách khoá học thất bại');
    return res.json();
};

export const addCourse = async (data) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Thêm khoá học thất bại');
    return res.json();
};

export const updateCourse = async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Cập nhật khoá học thất bại');
    return res.json();
};

export const deleteCourse = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Xoá khoá học thất bại');
    return res.json();
};