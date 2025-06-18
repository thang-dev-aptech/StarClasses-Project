SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE admins;
TRUNCATE TABLE teachers;
TRUNCATE TABLE courses;
TRUNCATE TABLE course_materials;
TRUNCATE TABLE contacts;
TRUNCATE TABLE introduction;
ALTER TABLE admins AUTO_INCREMENT = 1;
ALTER TABLE teachers AUTO_INCREMENT = 1;
ALTER TABLE courses AUTO_INCREMENT = 1;
ALTER TABLE course_materials AUTO_INCREMENT = 1;
ALTER TABLE contacts AUTO_INCREMENT = 1;
ALTER TABLE introduction AUTO_INCREMENT = 1;
SET FOREIGN_KEY_CHECKS = 1;

-- ==========================
-- Demo data for `admins`
-- ==========================
INSERT INTO admins (username, password_hash) VALUES
('admin', '$2y$10$uIfX3W4Y5zR6T7j/dVPQeOOlQFx8ilgCiqOL5cI5k8ZhxgOH.ADZ2'); -- password: admin123

-- ==========================
-- Demo data for `teachers`
-- ==========================
INSERT INTO teachers (full_name, avatar_url, subject, experience_years, education, achievements, bio, is_active) VALUES
('Trần Văn An', 'uploads/teachers/684f817d9774b.png', 'Toán', 5, 'Cử nhân Toán học – ĐHSP Hà Nội', 'Giải nhì GV giỏi cấp thành phố', 'Giáo viên trẻ, nhiệt huyết, yêu thích chia sẻ kiến thức Toán.', 1),
('Nguyễn Thị Bình', 'uploads/teachers/684f8187d0dc7.png', 'Vật Lý', 8, 'Thạc sĩ Vật Lý – ĐHQG TP.HCM', 'GV hướng dẫn HS đạt giải quốc gia', 'Luôn khuyến khích học sinh tìm tòi, thử nghiệm.', 1),
('Lê Văn Cường', 'uploads/teachers/684f81ba6ceaf.jpg', 'Hóa Học', 10, 'Tiến sĩ Hóa Học – ĐH Bách Khoa Hà Nội', 'Tác giả nhiều bài báo quốc tế', 'Đam mê nghiên cứu và giảng dạy Hóa học ứng dụng.', 1);

-- ==========================
-- Demo data for `courses`
-- ==========================
INSERT INTO courses (course_name, category, price, description, overview, schedule, image_url, learning_outcomes, teacher_id, is_active) VALUES
('Toán 9 Luyện Thi Vào 10', 'Math', 1200000, 'Khóa học tổng ôn và luyện đề Toán 9 chuẩn bị thi vào lớp 10.', 'Khóa học gồm 24 buổi, chia thành 8 chuyên đề trọng tâm.', '["Thứ 2 18:00", "Thứ 4 18:00"]', 'uploads/courses/684f8fc20af09.jpg', '["Nắm vững toàn bộ kiến thức Toán 9", "Kỹ thuật giải nhanh các dạng bài"]', 1, 1),
('Vật Lý 10 Cơ Bản', 'Physics', 900000, 'Nền tảng Vật Lý 10 cho học sinh mới chuyển cấp.', 'Khóa học 18 buổi, thực hành thí nghiệm ảo.', '["Thứ 3 19:00", "Thứ 5 19:00"]', 'uploads/courses/684f8fb217451.jpg', '["Hiểu các khái niệm lực, chuyển động", "Vận dụng vào bài tập thực tế"]', 2, 1),
('Hóa Học 11 Nâng Cao', 'Chemistry', 1000000, 'Phân tích sâu cấu trúc, phản ứng hữu cơ.', '20 buổi học cùng thầy Cường, kèm tài liệu độc quyền.', '["Thứ 7 08:00", "Chủ nhật 08:00"]', 'uploads/courses/684f90f2962fc.jpg', '["Thông thạo phản ứng hữu cơ", "Chuẩn bị vững chắc cho lớp 12"]', 3, 1);

-- ==========================
-- Demo data for `course_materials`
-- ==========================
INSERT INTO course_materials (course_id, title, file_url, is_active) VALUES
(1, 'Đề cương ôn tập đại số', 'uploads/materials/outline_math9.pdf', 1),
(2, 'Slide chương Động Học', 'uploads/materials/physics10_dynamics.pptx', 1),
(3, 'Tài liệu phản ứng hữu cơ', 'uploads/materials/organic_reactions.pdf', 1);

-- ==========================
-- Demo data for `contacts`
-- ==========================
INSERT INTO contacts (first_name, last_name, email, subject, phone, message, status) VALUES
('Minh', 'Nguyễn', 'minh@example.com', 'Tư vấn khóa Toán 9', '0912345678', 'Mình muốn biết lịch khai giảng.', 'pending'),
('Lan', 'Trần', 'lan@example.com', 'Đăng ký học thử Vật Lý 10', '0987654321', 'Xin lịch học thử buổi đầu.', 'processing'),
('Hoàng', 'Phạm', 'hoang@example.com', 'Thông tin Hóa 11', '0933222111', 'Học phí trọn khóa là bao nhiêu?', 'completed');

-- ==========================
-- Demo data for `introduction`
-- ==========================
INSERT INTO introduction (badge_text, title, highlight, description, image_url) VALUES
('1000+ Học viên', 'Chào mừng đến với Star Classes', 'Nền tảng học trực tuyến chất lượng', 'Star Classes cung cấp khóa học Toán, Lý, Hóa với đội ngũ giáo viên uy tín, lộ trình bài bản và tài nguyên học tập phong phú.', 'uploads/introduction/main.jpg');