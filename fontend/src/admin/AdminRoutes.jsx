// src/admin/routes.jsx

import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminLayout from './components/layouts/AdminLayout';
import AdminLoginPage from './pages/AdminLoginPage';
import DashboardPage from './pages/DashboardPage';
import CoursesAddPage from './pages/Courses/CoursesAddModal';
import CoursesListPage from './pages/Courses/CoursesListPage';
import TeachersListPage from './pages/TeachersListPage';

const AdminRoutes = () => (
    <Routes>
        <Route path="login" element={<AdminLoginPage />} />

        <Route path="/" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="courses" element={<CoursesListPage />} />
            <Route path="teachers" element={<TeachersListPage />} />
            
        </Route>
    </Routes>
);

export default AdminRoutes;