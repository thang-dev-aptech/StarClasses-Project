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

  

  

</main>
<?php include __DIR__ . '/partials/footer.php'; ?>