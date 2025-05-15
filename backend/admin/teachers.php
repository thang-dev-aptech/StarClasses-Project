<!-- admin/teachers.php -->
<?php include __DIR__ . '/partials/header.php'; ?>
<?php include __DIR__ . '/partials/sidebar.php'; ?>

<main class="main-content bg-light">
  <!-- header -->
  <header class="d-flex justify-content-end px-5 py-3 bg-white border-bottom shadow-sm">
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
          <li>
            <hr class="dropdown-divider">
          </li>
          <li><a class="dropdown-item text-danger" href="#">Logout</a></li>
        </ul>
      </div>
    </div>
  </header>

  <section class="px-4 py-3">
    <div class="container-fluid">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="h3 mb-0 text-gray-800">Teachers</h1>
          <p class="text-muted">Manage your tutoring staff</p>
        </div>
        <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#addTeacherModal">
          <i class="bi bi-plus"></i> Add Teacher
        </button>
      </div>

      <!-- Teachers Table -->
      <div class="card">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Subject</th>
                                <th>Education</th>
                                <th>Experience</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
  </section>

  <!-- Add Teacher Modal -->
  <div class="modal fade" id="addTeacherModal" tabindex="-1" aria-labelledby="addTeacherModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addTeacherModalLabel">Add New Teacher</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="addTeacherForm">
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="firstName" required>
              </div>
              <div class="col-md-6">
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="lastName" required>
              </div>
            </div>
            
            <div class="mb-3">
              <label for="subject" class="form-label">Subject</label>
              <select class="form-select" id="subject" required>
                <option value="" selected disabled>Select subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="English">English</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="History">History</option>
              </select>
            </div>
            
            <div class="mb-3">
              <label for="education" class="form-label">Education</label>
              <textarea class="form-control" id="education" rows="2" required></textarea>
            </div>
            
            <div class="mb-3">
              <label for="experience" class="form-label">Experience</label>
              <textarea class="form-control" id="experience" rows="2" required></textarea>
            </div>
            
            <div class="mb-3">
              <label for="teacherImage" class="form-label">Profile Image</label>
              <input class="form-control" type="file" id="teacherImage">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" form="addTeacherForm">Add Teacher</button>
        </div>
      </div>
    </div>
  </div>
</main>



<?php include __DIR__ . '/partials/footer.php'; ?>
