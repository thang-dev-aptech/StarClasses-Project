/* =============================================
   Star Classes – Vietnamese seed data only
   ============================================= */

-- TEACHERS
INSERT INTO teachers (full_name, avatar_url, subject, experience_years, education, achievements, bio) VALUES
('Thầy Nguyễn Văn Minh','uploads/teachers/684f817d9774b.png','Toán',12,'ĐH Sư phạm Hà Nội','Giải Nhất GV dạy giỏi Toán TP','Chuyên luyện thi đại học môn Toán, nhiều năm kinh nghiệm.'),
('Cô Trần Thị Hoa','uploads/teachers/684f8187d0dc7.png','Ngữ văn',10,'ĐH Sư phạm Hà Nội','Tác giả sách ôn thi Văn','Nhiệt huyết, truyền cảm hứng học Văn cho học sinh.'),
('Thầy Lê Quang Dũng','uploads/teachers/684f81ba6ceaf.jpg','Vật lý',9,'ĐH Khoa học Tự nhiên','GV xuất sắc cấp tỉnh','Chuyên luyện thi Vật lý, phương pháp thực tiễn.'),
('Cô Mai Thu Hằng','uploads/teachers/684f81c5a3edc.jpg','Hóa học',8,'ĐH Sư phạm TP.HCM','GV trẻ tiêu biểu','Dạy Hóa học dễ hiểu, nhiều mẹo làm bài.'),
('Thầy Phạm Văn Hùng','uploads/teachers/684f81cd68cf9.jpg','Sinh học',11,'ĐH Sư phạm Hà Nội','GV dạy giỏi Sinh học','Chuyên luyện thi Sinh, nhiều học sinh đạt giải.'),
('Cô Nguyễn Thị Lan','uploads/teachers/684f81d615f49.jpg','Lịch sử',13,'ĐH Sư phạm Hà Nội','Tác giả sách ôn thi Sử','Truyền cảm hứng học Sử, phương pháp ghi nhớ logic.'),
('Thầy Đỗ Văn Nam','uploads/teachers/684f81dd6d263.jpg','Địa lý',10,'ĐH Sư phạm TP.HCM','GV xuất sắc Địa lý','Dạy Địa lý thực tiễn, dễ hiểu, nhiều ví dụ thực tế.'),
('Thầy James Wilson','uploads/teachers/684f81e4b75b9.jpg','Tiếng Anh',7,'ĐH Cambridge','Chứng chỉ TESOL','Giáo viên bản ngữ, luyện thi tiếng Anh THPT QG.');

-- COURSES
INSERT INTO courses (course_name,category,price,description,overview,schedule,image_url,learning_outcomes,teacher_id) VALUES
('Luyện thi Toán THPT Quốc gia','Tự nhiên',1800000,'Ôn luyện toàn diện kiến thức Toán, luyện đề sát cấu trúc thi.','Đại số, Hình học, Giải tích, luyện đề điểm 9-10.','["Thứ 2, 4, 6: 17:00-19:00","Chủ nhật: 14:00-17:00"]','uploads/courses/684f8fb217451.jpg','["Nắm vững kiến thức","Kỹ năng giải đề","Đạt điểm cao"]',1),
('Luyện thi Vật lý THPT Quốc gia','Tự nhiên',1700000,'Ôn tập trọng tâm, luyện đề Vật lý sát thực tế.','Cơ học, Điện, Quang học, luyện đề nâng cao.','["Thứ 3, 5: 18:00-20:00","Chủ nhật: 8:00-10:00"]','uploads/courses/684f8fb9e7191.jpg','["Nắm chắc lý thuyết","Thành thạo giải bài tập"]',3),
('Luyện thi Hóa học THPT Quốc gia','Tự nhiên',1700000,'Tổng ôn kiến thức, luyện đề chuyên sâu Hóa học.','Hóa vô cơ, hữu cơ, bài tập tổng hợp.','["Thứ 2, 5: 19:00-21:00","Thứ 7: 15:00-17:00"]','uploads/courses/684f8fc20af09.jpg','["Nắm vững kiến thức","Kỹ năng làm bài thi"]',4),
('Luyện thi Sinh học THPT Quốc gia','Tự nhiên',1600000,'Ôn tập toàn diện, luyện đề Sinh học sát đề thi.','Di truyền, Tiến hóa, Sinh thái, luyện đề.','["Thứ 4, 6: 17:30-19:30","Chủ nhật: 10:00-12:00"]','uploads/courses/684f8fcd1541a.jpg','["Nắm chắc kiến thức","Kỹ năng làm bài trắc nghiệm"]',5),
('Luyện thi Ngữ văn THPT Quốc gia','Xã hội',1800000,'Nắm chắc tác phẩm, kỹ năng làm bài, đạt điểm 8+','Văn học Việt Nam, nghị luận xã hội, luyện đề.','["Thứ 3, 5: 17:00-19:00","Thứ 7: 14:00-16:00"]','uploads/courses/684f8fda97d97.jpg','["Phân tích tác phẩm","Kỹ năng làm bài nghị luận"]',2),
('Luyện thi Lịch sử THPT Quốc gia','Xã hội',1500000,'Ôn tập kiến thức lịch sử, luyện đề sát thực tế.','Lịch sử Việt Nam, thế giới, luyện đề trắc nghiệm.','["Thứ 2, 4: 19:00-21:00","Chủ nhật: 8:00-10:00"]','uploads/courses/684f8fed611f3.jpg','["Nắm vững dòng chảy lịch sử","Kỹ năng làm bài"]',6),
('Luyện thi Địa lý THPT Quốc gia','Xã hội',1500000,'Ôn tập kiến thức Địa lý, luyện đề thực tiễn.','Địa lý tự nhiên, kinh tế, xã hội, luyện đề.','["Thứ 6: 18:00-20:00","Chủ nhật: 16:00-18:00"]','uploads/courses/684f9010adde9.jpg','["Nắm chắc kiến thức","Kỹ năng vẽ biểu đồ","Phân tích"]',7),
('Luyện thi Tiếng Anh THPT Quốc gia','Ngoại ngữ',1900000,'Luyện kỹ năng làm bài, mẹo đạt điểm cao môn Anh.','Ngữ pháp, từ vựng, kỹ năng đọc hiểu, luyện đề.','["Thứ 7: 9:00-11:00","Chủ nhật: 13:00-15:00"]','uploads/courses/684f90f2962fc.jpg','["Nắm vững ngữ pháp","Kỹ năng làm bài thi"]',8);

-- INTRODUCTION
INSERT INTO introduction (badge_text,title,highlight,description,image_url) VALUES
('Khóa học HOT','Chinh phục<br/>kỳ thi THPT Quốc gia','HOT','Ôn luyện tổng hợp kiến thức và kỹ năng làm bài để bứt phá điểm số.','uploads/introduction/main.jpg'); 