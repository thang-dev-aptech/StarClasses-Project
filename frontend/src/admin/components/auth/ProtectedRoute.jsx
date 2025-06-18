// src/admin/components/auth/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Kiểm tra token trong localStorage
    const isAdmin = localStorage.getItem('admin') === 'true';
    
    // Nếu không có token, chuyển hướng về trang login
    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;