# Frontend – Files chứa logic lấy & xử lý dữ liệu

(Chia theo từng tầng, thứ tự ưu tiên đọc. Bạn chỉ cần mở file theo đường dẫn bên dưới.)

---
## A. Services – Gọi HTTP request

Public site:
- `src/services/courseService.js`
- `src/services/teacherService.js`

Admin site:
- `src/admin/services/adminService.js`
- `src/admin/services/contactService.js`
- `src/admin/services/courseService.js`
- `src/admin/services/teacherService.js`
- `src/admin/services/dashboardService.js`

---
## B. Pages & Components giữ State, gọi Service

Public:
- `src/components/Course.jsx`
- `src/components/Teacher.jsx`
- `src/components/CoursePopup.jsx`
- `src/components/Contact.jsx`
- `src/components/Achievements.jsx`

Admin:
- `src/admin/pages/Courses/CoursesListPage.jsx`
- `src/admin/pages/Teachers/TeacherListPage.jsx`
- `src/admin/pages/ContactListPage.jsx`
- `src/admin/pages/DashboardPage.jsx`
- `src/admin/pages/AdminLoginPage.jsx`

Modals (CRUD Forms):
- `src/admin/pages/Courses/CoursesModal.jsx`
- `src/admin/pages/Teachers/TeachersModal.jsx`

Auth / Layout helpers:
- `src/admin/components/auth/ProtectedRoute.jsx`
- `src/admin/components/layouts/Header.jsx`

---
## C. Context & Dữ liệu tĩnh

- `src/admin/contexts/HeaderContext.js` (state UI sidebar)
- `src/assets/json/` *(categories.json, …)* – dữ liệu tĩnh được import trong component

---
### Cách sử dụng file này
1. Đọc các **Service** trước để biết endpoint & payload.
2. Mở **Page/Modal** tương ứng để xem state + gọi Service.
3. Theo dõi các Component con nếu cần hiểu render chi tiết.

Chúc bạn đọc code hiệu quả! 