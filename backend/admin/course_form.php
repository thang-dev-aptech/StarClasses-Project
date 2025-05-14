<?php include __DIR__ . '/partials/header.php'; ?>
<?php include __DIR__ . '/partials/sidebar.php'; ?>

<main class="main-content bg-light">
    <!-- header -->
    <header class="d-flex justify-content-between align-items-center px-5 py-3 bg-white border-bottom shadow-sm">
        <div class="d-flex align-items-center gap-3">
            <a href="courses.php" class="btn btn-light">
                <i class="bi bi-arrow-left"></i>
            </a>
            <h4 class="mb-0">Edit Course</h4>
        </div>
        <div class="d-flex align-items-center gap-3">
            <button id="toggle-theme" class="btn btn-light rounded-circle" title="Toggle Theme">
                <i class="bi bi-moon"></i>
            </button>
            <div class="dropdown">
                <a href="#" class="d-flex align-items-center text-decoration-none text-dark dropdown-toggle" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="./assets/images/image.png" alt="Avatar" width="32" height="32" class="rounded-circle me-3">
                    <span>Admin User</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li><a class="dropdown-item" href="#">Profile</a></li>
                    <li><a class="dropdown-item" href="#">Settings</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="#">Logout</a></li>
                </ul>
            </div>
        </div>
    </header>

    <!-- main content -->
    <div class="container-fluid p-4">
        <div class="row">
            <!-- main form -->
            <div class="col-lg-8">
                <div class="card">
                    <div class="card-body">
                        <form>
                            <div class="mb-4">
                                <label class="form-label">Course Name</label>
                                <input type="text" class="form-control" value="Web Development Bootcamp" required>
                            </div>

                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <label class="form-label">Category</label>
                                    <select class="form-select" required>
                                        <option value="programming" selected>Programming</option>
                                        <option value="design">Design</option>
                                        <option value="business">Business</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Price</label>
                                    <div class="input-group">
                                        <span class="input-group-text">$</span>
                                        <input type="number" class="form-control" value="99.99" required>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-4">
                                <label class="form-label">Description</label>
                                <textarea class="form-control" rows="4" required>Learn web development from scratch with this comprehensive bootcamp. Master HTML, CSS, JavaScript, and modern frameworks.</textarea>
                            </div>

                            <div class="mb-4">
                                <label class="form-label">Course Image</label>
                                <div class="d-flex gap-3 align-items-center">
                                    <img src="https://via.placeholder.com/150" class="rounded" alt="Course thumbnail">
                                    <div>
                                        <input type="file" class="form-control" accept="image/*">
                                        <small class="text-muted">Recommended size: 800x450px</small>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-4">
                                <label class="form-label">Course Content</label>
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                            <h6 class="mb-0">Module 1: Introduction to Web Development</h6>
                                            <div class="btn-group">
                                                <button class="btn btn-sm btn-light" title="Edit">
                                                    <i class="bi bi-pencil"></i>
                                                </button>
                                                <button class="btn btn-sm btn-light text-danger" title="Delete">
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                <span>1.1 What is Web Development?</span>
                                                <span class="badge bg-primary rounded-pill">15 min</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                <span>1.2 Setting up your development environment</span>
                                                <span class="badge bg-primary rounded-pill">30 min</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <button class="btn btn-outline-primary mt-3">
                                    <i class="bi bi-plus-lg me-2"></i>Add Module
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- sidebar -->
            <div class="col-lg-4">
                <div class="card mb-4">
                    <div class="card-body">
                        <h6 class="card-title">Course Settings</h6>
                        <div class="mb-3">
                            <label class="form-label">Status</label>
                            <select class="form-select">
                                <option value="draft">Draft</option>
                                <option value="published" selected>Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Instructor</label>
                            <select class="form-select">
                                <option value="1" selected>John Doe</option>
                                <option value="2">Jane Smith</option>
                                <option value="3">Mike Johnson</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Difficulty Level</label>
                            <select class="form-select">
                                <option value="beginner" selected>Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Duration (hours)</label>
                            <input type="number" class="form-control" value="40">
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">Course Statistics</h6>
                        <div class="d-flex justify-content-between mb-3">
                            <span>Total Students</span>
                            <span class="text-primary fw-bold">1,234</span>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                            <span>Average Rating</span>
                            <span class="text-primary fw-bold">4.8/5.0</span>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                            <span>Completion Rate</span>
                            <span class="text-primary fw-bold">85%</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Total Revenue</span>
                            <span class="text-primary fw-bold">$123,456</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- action buttons -->
        <div class="d-flex justify-content-end gap-2 mt-4">
            <button class="btn btn-light">Cancel</button>
            <button class="btn btn-primary">Save Changes</button>
        </div>
    </div>
</main>

<?php include __DIR__ . '/partials/footer.php'; ?>

