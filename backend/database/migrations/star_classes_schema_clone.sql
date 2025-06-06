-- 📌 Tạo database nếu chưa có
CREATE DATABASE IF NOT EXISTS star_classes;
USE star_classes;
-- ==========================
-- 1. Bảng quản trị viên
-- ==========================
CREATE TABLE admins (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- 2. Bảng giáo viên
-- ==========================
CREATE TABLE teachers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(100) NOT NULL,
  avatar_url VARCHAR(255),
  subject VARCHAR(100),
  experience_years INT,
  education TEXT,
  achievements JSON,
  bio TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- 3. Bảng khóa học
-- ==========================
CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_name VARCHAR(255) NOT NULL,
  category VARCHAR(50),
  price DECIMAL(10, 2),
  description TEXT,
  overview TEXT,
  schedule JSON,
  image_url VARCHAR(255),
  learning_outcomes JSON,
  teacher_id INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

-- ==========================
-- 4. Bảng tài liệu khóa học
-- ==========================
CREATE TABLE course_materials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_id INT,
  title VARCHAR(255),
  file_url VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- ==========================
-- 5. Bảng liên hệ / tư vấn
-- ==========================
CREATE TABLE contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  interested_course VARCHAR(255),
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);