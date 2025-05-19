-- 📌 Tạo database nếu chưa có
CREATE DATABASE IF NOT EXISTS star_classes;
USE star_classes;

-- 🛡️ Bảng quản trị viên đăng nhập dashboard
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,             -- Mã định danh admin
  username VARCHAR(50) NOT NULL UNIQUE,          -- Tên đăng nhập duy nhất
  password_hash VARCHAR(255) NOT NULL                 -- Mật khẩu đã mã hóa
);

-- 📚 Bảng quản lý khóa học
CREATE TABLE IF NOT EXISTS courses (
  id INT PRIMARY KEY AUTO_INCREMENT,                 -- Mã khóa học
  course_name VARCHAR(200) NOT NULL,                       -- Tên khóa học
  description TEXT,                                  -- Mô tả chi tiết
  short_description VARCHAR(255),                    -- Mô tả ngắn (hiển thị trên thẻ)
  price DECIMAL(10,2) DEFAULT 0,  
  category VARCHAR(100),              -- Giá khóa học
  image VARCHAR(255),                                -- Đường dẫn ảnh đại diện
  rating FLOAT DEFAULT 0,                            -- Điểm đánh giá trung bình
  rating_count INT DEFAULT 0,                        -- Số lượng đánh giá
  is_active BOOLEAN DEFAULT TRUE,                    -- Có đang hiển thị không
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,     -- Ngày tạo
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP 
              ON UPDATE CURRENT_TIMESTAMP            -- Ngày cập nhật
);

-- 👩‍🏫 Bảng quản lý giáo viên
CREATE TABLE IF NOT EXISTS teachers (
  id INT PRIMARY KEY AUTO_INCREMENT,                 -- Mã giáo viên
  teacher_name VARCHAR(100) NOT NULL,                        -- Họ tên
  specialization VARCHAR(100),                       -- Dạy môn gì / chuyên môn
  experience TEXT,                                   -- Kinh nghiệm làm việc
  education TEXT,                                    -- Trình độ học vấn
  image VARCHAR(255),                                -- Ảnh đại diện
  is_active BOOLEAN DEFAULT TRUE,                    -- Có đang hiển thị không
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,     -- Ngày tạo
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP 
              ON UPDATE CURRENT_TIMESTAMP            -- Ngày cập nhật
);

-- 📬 Bảng quản lý form liên hệ & tư vấn (đã gộp chung)
CREATE TABLE IF NOT EXISTS enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,                 -- Mã yêu cầu
  firstname VARCHAR(100),                            -- Họ
  lastname VARCHAR(100),                             -- Tên
  email VARCHAR(100),                                -- Email người gửi
  phone VARCHAR(20),                                 -- Số điện thoại
  subject VARCHAR(100),                              -- Chủ đề yêu cầu
  message TEXT,                                      -- Nội dung yêu cầu
  type ENUM('contact', 'consult') NOT NULL,          -- Loại: liên hệ hay tư vấn
  status ENUM('new', 'processing', 'completed') DEFAULT 'new',                              -- Trạng thái xử lý
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP     -- Ngày gửi yêu cầu
);

CREATE TABLE IF NOT EXISTS course_teacher (
  course_id INT NOT NULL,
  teacher_id INT NOT NULL,
  PRIMARY KEY (course_id, teacher_id),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
);
