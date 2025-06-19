/* =============================================
   Star Classes – English seed data only
   ============================================= */

-- TEACHERS
INSERT INTO teachers (full_name, avatar_url, subject, experience_years, education, achievements, bio) VALUES
('Mr. Minh Nguyen','uploads/teachers/684f817d9774b.png','Mathematics',12,'Hanoi National University of Education','First Prize City Excellent Teacher Math','Expert in university entrance exam preparation for Math.'),
('Ms. Hoa Tran','uploads/teachers/684f8187d0dc7.png','Literature',10,'Hanoi National University of Education','Author of Literature exam prep book','Passionate teacher inspiring students to love literature.'),
('Mr. Dung Le','uploads/teachers/684f81ba6ceaf.jpg','Physics',9,'University of Science, VNU','Provincial excellent teacher','Focuses on practical approaches to Physics.'),
('Ms. Hang Mai','uploads/teachers/684f81c5a3edc.jpg','Chemistry',8,'Ho Chi Minh City University of Education','Promising young teacher','Makes Chemistry easy with helpful tips.'),
('Mr. Hung Pham','uploads/teachers/684f81cd68cf9.jpg','Biology',11,'Hanoi National University of Education','Excellent Biology teacher','Expert in Biology exam preparation with many awarded students.'),
('Ms. Lan Nguyen','uploads/teachers/684f81d615f49.jpg','History',13,'Hanoi National University of Education','Author of History exam prep book','Brings History to life with logical memory methods.'),
('Mr. Nam Do','uploads/teachers/684f81dd6d263.jpg','Geography',10,'Ho Chi Minh City University of Education','Outstanding Geography teacher','Makes Geography practical and engaging.'),
('Mr. James Wilson','uploads/teachers/684f81e4b75b9.jpg','English',7,'University of Cambridge','TESOL certified','Native teacher specializing in national English exam prep.');

-- COURSES
INSERT INTO courses (course_name,category,price,description,overview,schedule,image_url,learning_outcomes,teacher_id) VALUES
('National Exam Math Prep','Science',1800000,'Comprehensive Math revision with exam-style practice.','Algebra, Geometry, Calculus, intensive practice for 9-10 scores.','["Mon, Wed, Fri: 17:00-19:00","Sun: 14:00-17:00"]','uploads/courses/684f8fb217451.jpg','["Master key concepts","Advanced problem-solving","Achieve high scores"]',1),
('National Exam Physics Prep','Science',1700000,'Focused Physics revision with realistic practice tests.','Mechanics, Electricity, Optics, advanced exercises.','["Tue, Thu: 18:00-20:00","Sun: 8:00-10:00"]','uploads/courses/684f8fb9e7191.jpg','["Solidify theory","Solve complex exercises"]',3),
('National Exam Chemistry Prep','Science',1700000,'Extensive Chemistry review and specialized practice.','Inorganic, Organic Chemistry, integrated exercises.','["Mon, Thu: 19:00-21:00","Sat: 15:00-17:00"]','uploads/courses/684f8fc20af09.jpg','["Firm knowledge","Exam techniques"]',4),
('National Exam Biology Prep','Science',1600000,'Complete Biology revision with exam-oriented practice.','Genetics, Evolution, Ecology, practice tests.','["Wed, Fri: 17:30-19:30","Sun: 10:00-12:00"]','uploads/courses/684f8fcd1541a.jpg','["Grasp core concepts","Multiple-choice strategies"]',5),
('National Exam Literature Prep','Social',1800000,'Deep understanding of literature works, exam skills for 8+ scores.','Vietnamese literature, social essays, practice tests.','["Tue, Thu: 17:00-19:00","Sat: 14:00-16:00"]','uploads/courses/684f8fda97d97.jpg','["Analyze literary works","Essay writing skills"]',2),
('National Exam History Prep','Social',1500000,'History knowledge consolidation with realistic tests.','Vietnamese & World History, multiple-choice practice.','["Mon, Wed: 19:00-21:00","Sun: 8:00-10:00"]','uploads/courses/684f8fed611f3.jpg','["Understand historical flow","Exam answer techniques"]',6),
('National Exam Geography Prep','Social',1500000,'Geography knowledge review with practical exercises.','Physical, economic & social geography, practice tests.','["Fri: 18:00-20:00","Sun: 16:00-18:00"]','uploads/courses/684f9010adde9.jpg','["Solid foundation","Chart drawing skills","Analysis"]',7),
('National Exam English Prep','Languages',1900000,'Strategies for high English scores with skill practice.','Grammar, vocabulary, reading comprehension, practice tests.','["Sat: 9:00-11:00","Sun: 13:00-15:00"]','uploads/courses/684f90f2962fc.jpg','["Grammar mastery","Exam techniques"]',8);


-- INTRODUCTION
INSERT INTO introduction (badge_text,title,highlight,description,image_url) VALUES
('HOT Course','Conquer the<br/>National Exam','HOT','Comprehensive knowledge and exam skills to boost your scores.','uploads/introduction/main.jpg'); 


