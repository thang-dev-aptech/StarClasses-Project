StarClassesSystem/
│
├── 📁 backend/                         # Hệ thống xử lý phía server (PHP)
│   ├── app/                           # Business logic
│   │   ├── Controllers/
│   │   ├── Models/
│   │   ├── Routes/
│   │   └── Helpers/
│   ├── config/                        # Cấu hình (database.php đọc từ .env)
│   ├── public/                        # Entry point chạy server
│   │   └── index.php
│   ├── admin/
│   │
│   ├── storage/                       # File tạm, log, counter
│   │   └── visitor_count.txt
│   ├── database/                      # Migration, seed dữ liệu mẫu
│   │   ├── migrations/
│   │   └── seeders/
│   ├── vendor/                        # Composer packages (auto-generated)
│   ├── .env                           # Biến môi trường (DB, APP_URL…)
│   ├── .gitignore
│   ├── composer.json
│   └── README.md
│
├── 📁 frontend/                        # Giao diện người dùng (React + Bootstrap)
│   ├── public/                        # Static file, mock data, index.html
│   │   ├── data/
│   │   │   ├── courses.json
│   │   │   └── teachers.json
│   │   └── index.html
│   ├── src/
│   │   ├── components/               # Navbar, Footer, CourseCard...
│   │   ├── pages/                    # Home, Courses, Contact...
│   │   ├── services/                 # axios / fetch call
│   │   ├── assets/                   # CSS, images, fonts
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── README.md