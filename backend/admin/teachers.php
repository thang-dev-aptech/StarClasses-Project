<!-- admin/teachers.php -->
<?php include __DIR__ . '/partials/header.php'; ?>
<?php include __DIR__ . '/partials/sidebar.php'; ?>
<?php
require_once __DIR__ . '/../app/models/Teacher.php';
use App\Models\Teacher;
$teacherModel = new Teacher();

// Xử lý xóa giáo viên
if (isset($_GET['delete_id'])) {
    $deleteId = (int)$_GET['delete_id'];
    $teacherModel->delete($deleteId);
    header('Location: /admin/teachers.php');
    exit();
}

// Lấy dữ liệu giáo viên để sửa nếu có edit_id
$editTeacher = null;
if (isset($_GET['edit_id'])) {
    $editId = (int)$_GET['edit_id'];
    $editTeacher = $teacherModel->getById($editId);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = [
        'name' => $_POST['name'],
        'email' => $_POST['email'],
        'phone' => $_POST['phone'],
        'bio' => $_POST['bio'],
        'specialization' => $_POST['specialization'],
        'experience_years' => $_POST['experience_years'],
        'education' => $_POST['education'],
        'is_active' => isset($_POST['is_active']) ? 1 : 0,
        'avatar' => null
    ];
    // Xử lý upload ảnh nếu có
    if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . '/../storage/uploads/teachers/';
        if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
        $ext = pathinfo($_FILES['avatar']['name'], PATHINFO_EXTENSION);
        $filename = uniqid() . '.' . $ext;
        $filepath = $uploadDir . $filename;
        if (move_uploaded_file($_FILES['avatar']['tmp_name'], $filepath)) {
            $data['avatar'] = 'uploads/teachers/' . $filename;
        }
    }
    if (isset($_POST['edit_id']) && $_POST['edit_id']) {
        // Sửa giáo viên
        $teacherModel->update((int)$_POST['edit_id'], $data);
    } else {
        // Thêm mới
        $teacherModel->create($data);
    }
    header('Location: /admin/teachers.php');
    exit();
}

// Xử lý tìm kiếm và lọc
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$filterSpecialization = isset($_GET['specialization']) ? trim($_GET['specialization']) : '';

// Lấy danh sách giáo viên và lọc
$teachers = $teacherModel->getAll();
if ($search !== '') {
    $teachers = array_filter($teachers, function($t) use ($search) {
        return stripos($t['name'], $search) !== false || 
               stripos($t['email'], $search) !== false;
    });
}
if ($filterSpecialization !== '' && $filterSpecialization !== 'all') {
    $teachers = array_filter($teachers, function($t) use ($filterSpecialization) {
        return strtolower($t['specialization']) === strtolower($filterSpecialization);
    });
}
?>
<main class="main-content bg-light">
    <!-- header -->
    <header class="d-flex justify-content-between align-items-center px-4 py-3 bg-white border-bottom shadow-sm">
        <div>
            <h1 class="h4 mb-0">Giáo viên</h1>
            <p class="text-muted small mb-0">Quản lý giáo viên giảng dạy</p>
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
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTeacherModal">
                    <i class="bi bi-plus-lg me-2"></i>Thêm giáo viên mới
                </button>
            </div>
            <div class="d-flex gap-2">
                <form method="get" class="d-flex gap-2 mb-4" style="max-width: 600px;">
                    <input type="text" name="search" class="form-control" placeholder="Tìm kiếm giáo viên..." value="<?= htmlspecialchars($search) ?>">
                    <select name="specialization" class="form-select" style="width: 180px;">
                        <option value="all">Tất cả chuyên môn</option>
                        <option value="programming" <?= $filterSpecialization==='programming'?'selected':'' ?>>Lập trình</option>
                        <option value="design" <?= $filterSpecialization==='design'?'selected':'' ?>>Thiết kế</option>
                        <option value="business" <?= $filterSpecialization==='business'?'selected':'' ?>>Kinh doanh</option>
                    </select>
                    <button class="btn btn-outline-primary" type="submit">Lọc</button>
                </form>
            </div>
        </div>

        <!-- teachers table -->
        <div class="card border-0 shadow-sm">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="bg-light">
                            <tr>
                                <th class="border-0" style="width: 60px;">ID</th>
                                <th class="border-0">Tên giáo viên</th>
                                <th class="border-0">Email</th>
                                <th class="border-0">Số điện thoại</th>
                                <th class="border-0">Chuyên môn</th>
                                <th class="border-0">Kinh nghiệm</th>
                                <th class="border-0">Trạng thái</th>
                                <th class="border-0">Ảnh đại diện</th>
                                <th class="border-0" style="width: 150px;">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                        <?php if (empty($teachers)): ?>
                            <tr><td colspan="9" class="text-center">Chưa có giáo viên nào</td></tr>
                        <?php else: ?>
                            <?php foreach ($teachers as $teacher): ?>
                            <tr>
                                <td><?= htmlspecialchars($teacher['id']) ?></td>
                                <td><?= htmlspecialchars($teacher['name']) ?></td>
                                <td><?= htmlspecialchars($teacher['email']) ?></td>
                                <td><?= htmlspecialchars($teacher['phone']) ?></td>
                                <td><?= htmlspecialchars($teacher['specialization']) ?></td>
                                <td><?= htmlspecialchars($teacher['experience_years']) ?> năm</td>
                                <td>
                                    <?php if ($teacher['is_active']): ?>
                                        <span class="badge bg-success-subtle text-success">
                                            <i class="bi bi-check-circle-fill me-1"></i>Đang hoạt động
                                        </span>
                                    <?php else: ?>
                                        <span class="badge bg-secondary">Không hoạt động</span>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <?php if (!empty($teacher['avatar'])): ?>
                                        <img src="<?= htmlspecialchars($teacher['avatar']) ?>" alt="<?= htmlspecialchars($teacher['name']) ?>" style="width:40px;height:40px;object-fit:cover;">
                                    <?php else: ?>
                                        Không có ảnh
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <div class="btn-group btn-group-sm">
                                        <button type="button" class="btn btn-light" title="Sửa"
                                            data-id="<?= $teacher['id'] ?>"
                                            data-name="<?= htmlspecialchars($teacher['name']) ?>"
                                            data-email="<?= htmlspecialchars($teacher['email']) ?>"
                                            data-phone="<?= htmlspecialchars($teacher['phone']) ?>"
                                            data-bio="<?= htmlspecialchars($teacher['bio']) ?>"
                                            data-specialization="<?= htmlspecialchars($teacher['specialization']) ?>"
                                            data-experience="<?= htmlspecialchars($teacher['experience_years']) ?>"
                                            data-education="<?= htmlspecialchars($teacher['education']) ?>"
                                            data-is_active="<?= $teacher['is_active'] ?>"
                                            onclick="openEditTeacher(this)">
                                            <i class="bi bi-pencil"></i>
                                        </button>
                                        <button type="button" class="btn btn-light text-danger" title="Xóa" onclick="if(confirm('Bạn có chắc chắn muốn xóa giáo viên này?')) location.href='?delete_id=<?= $teacher['id'] ?>';">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</main>

<!-- Add Teacher Modal -->
<div class="modal fade" id="addTeacherModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Thêm giáo viên mới</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form action="/admin/teachers" id="addTeacherForm" method="POST" enctype="multipart/form-data">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="mb-3">
                                <label class="form-label">Họ tên <span class="text-danger">*</span></label>
                                <input type="text" name="name" class="form-control" required value="<?= $editTeacher ? htmlspecialchars($editTeacher['name']) : '' ?>">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email <span class="text-danger">*</span></label>
                                <input type="email" name="email" class="form-control" required value="<?= $editTeacher ? htmlspecialchars($editTeacher['email']) : '' ?>">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Số điện thoại</label>
                                <input type="tel" name="phone" class="form-control" value="<?= $editTeacher ? htmlspecialchars($editTeacher['phone']) : '' ?>">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Tiểu sử</label>
                                <textarea name="bio" class="form-control" rows="4"><?= $editTeacher ? htmlspecialchars($editTeacher['bio']) : '' ?></textarea>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="mb-3">
                                <label class="form-label">Chuyên môn <span class="text-danger">*</span></label>
                                <input type="text" name="specialization" class="form-control" required value="<?= $editTeacher ? htmlspecialchars($editTeacher['specialization']) : '' ?>">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Số năm kinh nghiệm</label>
                                <input type="number" name="experience_years" class="form-control" min="0" value="<?= $editTeacher ? htmlspecialchars($editTeacher['experience_years']) : '0' ?>">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Học vấn</label>
                                <input type="text" name="education" class="form-control" value="<?= $editTeacher ? htmlspecialchars($editTeacher['education']) : '' ?>">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Ảnh đại diện</label>
                                <input type="file" name="avatar" class="form-control" accept="image/*">
                                <div class="form-text">Định dạng: JPG, PNG, GIF. Tối đa 2MB</div>
                            </div>
                            <div class="mb-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" name="is_active" id="teacherActive" checked value="<?= $editTeacher ? ($editTeacher['is_active'] ? 'checked' : '') : 'checked' ?>">
                                    <label class="form-check-label" for="teacherActive">Đang hoạt động</label>
                                </div>
                            </div>
                            <?php if ($editTeacher): ?>
                                <input type="hidden" name="edit_id" value="<?= $editTeacher['id'] ?>">
                            <?php endif; ?>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Hủy</button>
                <button type="submit" form="addTeacherForm" class="btn btn-primary">Lưu giáo viên</button>
            </div>
        </div>
    </div>
</div>

<script>
function openEditTeacher(btn) {
    document.querySelector('[name=name]').value = btn.dataset.name;
    document.querySelector('[name=email]').value = btn.dataset.email;
    document.querySelector('[name=phone]').value = btn.dataset.phone;
    document.querySelector('[name=bio]').value = btn.dataset.bio;
    document.querySelector('[name=specialization]').value = btn.dataset.specialization;
    document.querySelector('[name=experience_years]').value = btn.dataset.experience;
    document.querySelector('[name=education]').value = btn.dataset.education;
    document.querySelector('[name=is_active]').checked = btn.dataset.is_active == '1';
    // Add edit_id to hidden input
    let editIdInput = document.querySelector('[name=edit_id]');
    if (!editIdInput) {
        editIdInput = document.createElement('input');
        editIdInput.type = 'hidden';
        editIdInput.name = 'edit_id';
        document.getElementById('addTeacherForm').appendChild(editIdInput);
    }
    editIdInput.value = btn.dataset.id;
    // Open modal
    var modal = new bootstrap.Modal(document.getElementById('addTeacherModal'));
    modal.show();
}
</script>

<?php include __DIR__ . '/partials/footer.php'; ?>
