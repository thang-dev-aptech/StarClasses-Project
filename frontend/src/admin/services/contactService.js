const API_URL = 'http://localhost:8000/api';

export const contactService = {
  // Lấy danh sách contact với tùy chọn lọc theo status
  getContacts: async (status = '') => {
    const url = status && status !== 'all' 
      ? `${API_URL}/contact?status=${status}`
      : `${API_URL}/contact`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data || [];
  },

  // Cập nhật trạng thái của contact
  updateStatus: async (id, status) => {
    const res = await fetch(`${API_URL}/contact/${id}/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status })
    });
    return res.json();
  }
}; 