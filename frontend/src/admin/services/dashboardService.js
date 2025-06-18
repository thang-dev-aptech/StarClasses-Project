const API_URL = 'http://localhost:8000/api/admin/dashboard/overview';

export async function getDashboardOverview() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    return data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch dashboard overview');
  }
}