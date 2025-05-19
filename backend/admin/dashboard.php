<?php
session_start();
require_once __DIR__ . '/../bootstrap.php';

// Kiểm tra đăng nhập
if (!isset($_SESSION['admin_id'])) {
    header('Location: /admin/login');
    exit();
}
?>
<!-- admin/dashboard.php -->
<?php include __DIR__ . '/partials/header.php'; ?>
<?php include __DIR__ . '/partials/sidebar.php'; ?>

<main class="main-content bg-light">
    <!-- header -->
    <header class="d-flex justify-content-between align-items-center px-4 py-3 bg-white border-bottom shadow-sm">
        <div>
            <h1 class="h4 mb-0">Dashboard</h1>
            <p class="text-muted small mb-0">Welcome to Star Classes admin panel</p>
        </div>
        <div class="d-flex align-items-center gap-3">
            <button id="toggle-theme" class="btn btn-light rounded-circle" title="Toggle Theme">
                <i class="bi bi-moon"></i>
            </button>
            <div class="dropdown">
                <a href="#" class="d-flex align-items-center text-decoration-none text-dark dropdown-toggle" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="./assets/images/image.png" alt="Avatar" width="32" height="32" class="rounded-circle me-2">
                    <span>Admin</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li><a class="dropdown-item" href="/admin/logout">Logout</a></li>
                </ul>
            </div>
        </div>
    </header>

    <!-- main content -->
    <section class="p-4">
        <!-- Stats Cards -->
        <div class="row g-4 mb-4">
            <!-- Total Courses -->
            <div class="col-md-3">
                <div class="card border-0 shadow-sm h-100">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="flex-shrink-0">
                                <div class="stats-icon bg-primary bg-opacity-10 rounded">
                                    <i class="bi bi-book text-primary"></i>
                                </div>
                            </div>
                            <div class="flex-grow-1 ms-3">
                                <h6 class="text-muted mb-1">Total Courses</h6>
                                <h3 class="mb-0">5</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Total Teachers -->
            <div class="col-md-3">
                <div class="card border-0 shadow-sm h-100">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="flex-shrink-0">
                                <div class="stats-icon bg-success bg-opacity-10 rounded">
                                    <i class="bi bi-person-video3 text-success"></i>
                                </div>
                            </div>
                            <div class="flex-grow-1 ms-3">
                                <h6 class="text-muted mb-1">Total Teachers</h6>
                                <h3 class="mb-0">12</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- New Consultations -->
            <div class="col-md-3">
                <div class="card border-0 shadow-sm h-100">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="flex-shrink-0">
                                <div class="stats-icon bg-warning bg-opacity-10 rounded">
                                    <i class="bi bi-chat-square-text text-warning"></i>
                                </div>
                            </div>
                            <div class="flex-grow-1 ms-3">
                                <h6 class="text-muted mb-1">New Consultations</h6>
                                <h3 class="mb-0">8</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Active Students -->
            <div class="col-md-3">
                <div class="card border-0 shadow-sm h-100">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="flex-shrink-0">
                                <div class="stats-icon bg-info bg-opacity-10 rounded">
                                    <i class="bi bi-people text-info"></i>
                                </div>
                            </div>
                            <div class="flex-grow-1 ms-3">
                                <h6 class="text-muted mb-1">Active Students</h6>
                                <h3 class="mb-0">0</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="row g-4">
            <!-- Popular Courses -->
            <div class="col-md-6">
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-white py-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title mb-0">Popular Courses</h5>
                            <a href="/admin/courses" class="btn btn-sm btn-primary">View All</a>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <div class="list-group list-group-flush">
                        
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Consultations -->
            <div class="col-md-6">
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-white py-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title mb-0">Recent Consultations</h5>
                            <a href="/admin/consult" class="btn btn-sm btn-primary">View All</a>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <div class="list-group list-group-flush">
                            123
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<style>
.stats-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.stats-icon i {
    font-size: 1.5rem;
}

.avatar-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar-circle i {
    font-size: 1.25rem;
}
</style>

<?php include __DIR__ . '/partials/footer.php'; ?>
<script src="/admin/assets/js/dashboard.js"></script>
