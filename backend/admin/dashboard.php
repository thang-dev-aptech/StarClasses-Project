<!-- admin/dashboard.php -->
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
    <div class="d-flex flex-column">
      <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
      <p class="text-muted">Welcome to Star Classes admin dashboard.</p>
    </div>

    <!-- Stats Cards -->
    <div class="row mt-4">
      <!-- Total Courses Card -->
      <div class="col-md-4 mb-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h6 class="card-title mb-2">Total Courses</h6>
              <h2 class="mb-1">24</h2>
            </div>
            <div class="rounded-circle p-3 bg-primary bg-opacity-10">
              <i class="bi bi-book text-primary fs-4"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Teachers Card -->
      <div class="col-md-4 mb-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h6 class="card-title mb-2">Total Teachers</h6>
              <h2 class="mb-1">12</h2>
            </div>
            <div class="rounded-circle p-3 bg-success bg-opacity-10">
              <i class="bi bi-person text-success fs-4"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- New Consult Requests Card -->
      <div class="col-md-4 mb-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h6 class="card-title mb-2">New Consult Requests</h6>
              <h2 class="mb-1">8</h2> 
            </div>
            <div class="rounded-circle p-3 bg-warning bg-opacity-10">
              <i class="bi bi-chat text-warning fs-4"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Recent Consult Requests</h5>
            <p class="text-muted">You have 8 new consultation requests today</p>
            
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>FullName</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>        
  </section>
  

  

</main>
<?php include __DIR__ . '/partials/footer.php'; ?>