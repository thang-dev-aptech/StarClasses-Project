<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin Login - Star Classes</title>
  <link href="/admin/assets/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="/admin/assets/css/login.css">
</head>
<body>

  <div class="brand">
    <h1>
      <span class="star-icon">★</span>
      Star Classes
    </h1>
    <small>Admin Panel</small>
  </div>

  <div class="login-container">
    <h2 class="login-title">Admin Login</h2>
    
    <?php if (isset($_SESSION['error'])): ?>
      <div class="alert alert-danger">
        <?php 
        echo $_SESSION['error'];
        unset($_SESSION['error']);
        ?>
      </div>
    <?php endif; ?>

    <form action="/admin/process_login" method="POST">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" name="username" placeholder="admin" required>
      </div>
      
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" name="password" placeholder="Enter your password" required>
      </div>

      <button type="submit" class="btn-sign-in">Sign In</button>
    </form>
  </div>

  <div class="footer">© 2025 Star Classes</div>

  <script src="/admin/assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>
