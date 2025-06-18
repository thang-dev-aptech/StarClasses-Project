import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminRoutes from './admin/AdminRoutes';
import ProtectedRoute from './admin/components/auth/ProtectedRoute';
import AdminLoginPage from './admin/pages/AdminLoginPage';
import Layouts from './pages/Layout';
// Placeholder components for Dashboard and Login
const DashboardPage = () => <div>Dashboard</div>;
const LoginPage = () => <div>Login</div>;

function App() {
  return (
    <Routes>
      <Route path="/layout" element={<Layouts />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/" element={<Navigate to="/layout" replace />} />
      <Route path="*" element={<Navigate to="/layout" replace />} />
    </Routes>
  );
}

export default App;
