<?php include __DIR__ . '/partials/header.php'; ?>
<?php include __DIR__ . '/partials/sidebar.php'; ?>

<main class="main-content bg-light">
    <!-- header -->
    <header class="d-flex justify-content-between align-items-center px-4 py-3 bg-white border-bottom shadow-sm">
        <div>
            <h1 class="h4 mb-0">Consultations</h1>
            <p class="text-muted small mb-0">Manage consultation requests</p>
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
        <!-- action buttons -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="d-flex gap-2">
                <div class="btn-group">
                    <button class="btn btn-outline-primary active">All</button>
                    <button class="btn btn-outline-primary">New</button>
                    <button class="btn btn-outline-primary">Processing</button>
                    <button class="btn btn-outline-primary">Completed</button>
                </div>
            </div>
            <div class="d-flex gap-2">
                <div class="input-group" style="width: 300px;">
                    <span class="input-group-text bg-white border-end-0">
                        <i class="bi bi-search"></i>
                    </span>
                    <input type="text" class="form-control border-start-0" placeholder="Search consultations...">
                </div>
            </div>
        </div>

        <!-- consult table -->
        <div class="card border-0 shadow-sm">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="bg-light">
                            <tr>
                                <th class="border-0" style="width: 60px;">#</th>
                                <th class="border-0">Họ tên</th>
                                <th class="border-0">Số điện thoại</th>
                                <th class="border-0">Email</th>
                                <th class="border-0" style="width: 120px;">Loại yêu cầu</th>
                                <th class="border-0" style="width: 120px;">Trạng thái</th>
                                <th class="border-0" style="width: 150px;">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Example row -->
                            <tr>
                                <td>1</td>
                                <td>Nguyễn Văn An</td>
                                <td>0988888888</td>
                                <td>an@gmail.com</td>
                                <td>
                                    <span class="badge bg-success-subtle text-success">
                                        <i class="bi bi-chat-square-text me-1"></i>Consult
                                    </span>
                                </td>
                                <td>
                                    <span class="badge bg-warning-subtle text-warning">
                                        <i class="bi bi-clock me-1"></i>New
                                    </span>
                                </td>
                                <td>
                                    <div class="btn-group btn-group-sm">
                                        <button type="button" class="btn btn-light" title="Xem">
                                            <i class="bi bi-eye"></i>
                                        </button>
                                        <button type="button" class="btn btn-light text-success" title="Xử lý">
                                            <i class="bi bi-check-lg"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <!-- Pagination -->
                <div class="d-flex justify-content-between align-items-center p-3 border-top">
                    <div class="text-muted small">
                        Showing 1 to 5 of 10 entries
                    </div>
                    <nav aria-label="Page navigation">
                        <ul class="pagination pagination-sm mb-0">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" tabindex="-1">Previous</a>
                            </li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </section>
</main>

<!-- View Consultation Modal -->
<div class="modal fade" id="viewConsultModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Consultation Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label text-muted">Name</label>
                            <p class="mb-0" id="consultName"></p>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted">Email</label>
                            <p class="mb-0" id="consultEmail"></p>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted">Phone</label>
                            <p class="mb-0" id="consultPhone"></p>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted">Age</label>
                            <p class="mb-0" id="consultAge"></p>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted">Education Level</label>
                            <p class="mb-0" id="consultEducation"></p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label text-muted">Course</label>
                            <p class="mb-0" id="consultCourse"></p>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted">Preferred Schedule</label>
                            <p class="mb-0" id="consultSchedule"></p>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted">Duration</label>
                            <p class="mb-0" id="consultDuration"></p>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted">Learning Goals</label>
                            <p class="mb-0" id="consultGoals"></p>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted">Additional Notes</label>
                            <p class="mb-0" id="consultNotes"></p>
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Status</label>
                    <select class="form-select" id="consultStatus">
                        <option value="new">New</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Admin Notes</label>
                    <textarea class="form-control" id="adminNotes" rows="3" placeholder="Add internal notes about this consultation..."></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="updateStatus">Update Status</button>
            </div>
        </div>
    </div>
</div>

<?php include __DIR__ . '/partials/footer.php'; ?>