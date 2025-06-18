// Service cho chức năng đăng nhập admin
const API_URL = 'http://localhost:8000/api/admin/login';

export async function adminLogin(username, password) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
} 