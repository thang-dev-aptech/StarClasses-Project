import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({title, desc}) => {
  const [showLogout, setShowLogout] = useState(false);

  const handleAdminClick = () => {
    setShowLogout((prev) => !prev);
  };

  return (
    <header className="px-3 py-3 bg-white border-bottom shadow-sm">
      <div className="d-flex justify-content-between align-items-center h-100 px-4">
        <div>
          <h1 className="h4 mb-0">{title}</h1>
          <p className="text-muted small mb-0">{desc}</p>
        </div>

        {/* Right side */}
        <div className="d-flex align-items-center gap-3">
          {/* User Button */}
          <div className="position-relative">
            <button
              className="btn btn-link text-dark text-decoration-none d-flex align-items-center gap-2"
              type="button"
              onClick={handleAdminClick}
            >
              <img
                src="/src/admin/assets/images/logo_star_classes-Photoroom.png"
                alt="Avatar"
                width="32"
                height="32"
                className="rounded-circle"
              />
              <span>Admin</span>
            </button>
            {showLogout && (
              <div className="position-absolute end-0 mt-2 bg-white border rounded shadow-sm" style={{zIndex: 1000}}>
                <Link className="dropdown-item text-danger px-3 py-2" to="/admin/login">
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 