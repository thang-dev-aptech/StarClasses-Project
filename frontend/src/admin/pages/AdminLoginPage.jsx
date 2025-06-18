import styles from './AdminLoginPage.module.css';
import logo from '../assets/images/logo-Photoroom.png';
import { useEffect, useState } from 'react';
import { adminLogin } from '../services/adminService';
import { useNavigate } from 'react-router-dom';

function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Admin Login';
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setError('');
        setLoading(true);
        try {
            const res = await adminLogin(username, password);
            console.log('API response:', res);
            if (res && res.admin) {
                localStorage.setItem('admin', 'true');
                localStorage.setItem('adminInfo', JSON.stringify(res.admin));
                navigate('/admin/dashboard');
            } else {
                setError(res.message || 'Login failed (no admin data)');
                console.log('No admin data in response:', res);
            }
        } catch (err) {
            setError(err.message || 'Login failed');
            console.log('Error in login:', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <img src={logo} alt="Star Classes Logo" className={styles.logo} />
                <h4 className={styles.panelTitle}>ADMIN PANEL</h4>
            </div>
            <div className={styles.loginCard}>
                <h3 className={styles.cardTitle}>Admin Login</h3>
                <form onSubmit={handleSubmit} className={styles.loginForm} autoComplete="off">
                    <div className={styles.formGroup}>
                        <label htmlFor="username" className={styles.label}>Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className={styles.input}
                            placeholder="admin"
                            autoComplete="username"
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className={styles.input}
                            placeholder="password"
                            autoComplete="current-password"
                            disabled={loading}
                        />
                    </div>
                    {error && <div className={styles.error}>{error}</div>}
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
            <footer className={styles.footer}>
                © 2025 Star Classes
            </footer>
        </div>
    );
}

export default AdminLoginPage;