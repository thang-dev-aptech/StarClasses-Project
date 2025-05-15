<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin Login - Star Classes</title>
  <link rel="stylesheet" href="/admin/assets/css/bootstrap.min.css">
  <link rel="stylesheet" href="/admin/assets/css/login.css">
</head>
<body>

  <div class="brand">
    <img src="assets/images/logo.png" alt="Star Classes Logo" class="logo" style="display: block;">
    <small>admin panel</small>
  </div>

  <div class="login-box">
    <h5 class="text-center">Admin Login</h5>
    <form action="process_login.php" method="POST">
      <div class="mb-3">
        <label for="username" class="form-label text-primary">Username</label>
        <input type="text" class="form-control" id="username" name="username" placeholder="admin" required>
      </div>
      <div class="mb-4">
        <label for="password" class="form-label text-primary">Password</label>
        <input type="password" class="form-control" id="password" name="password" placeholder="password" required>
      </div>
      <button type="submit" class="btn btn-login w-100">Sign In</button>
    </form>
  </div>

  <div class="footer">© 2025 Star Classes</div>

  <script src="/admin/assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>
