import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import CoursePopup from './CoursePopup';
import { Search } from 'lucide-react';
import "../App.css";
import { getCourses } from '../services/courseService';
import { getTeachers } from '../services/teacherService';
const categories = ["Tất cả", "Tự nhiên", "Xã hội", "Ngoại ngữ"];

export default function Course() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([getCourses(), getTeachers()])
      .then(([coursesData, teachersData]) => {
        console.log('Courses data:', coursesData);
        console.log('Teachers data:', teachersData);
        // Map teacher vào từng course
        const mapped = (coursesData || [])
          .filter(c => c.is_active === 1) // Filter active courses
          .map(c => {
          const teacher = (teachersData || []).find(t => t.id === c.teacher_id) || {};
          return {
            id: c.id,
            name: c.course_name,
            description: c.description,
            image: c.image_url,
            category: c.category,
            price: c.price,
            teacher: {
              name: teacher.full_name,
              avatar: teacher.avatar_url,
              experience: teacher.experience_years
            },
            aim: Array.isArray(c.learning_outcomes)
              ? c.learning_outcomes
              : (c.learning_outcomes && Array.isArray(c.learning_outcomes.outcomes)
                  ? c.learning_outcomes.outcomes
                  : (typeof c.learning_outcomes === 'string' && c.learning_outcomes
                      ? c.learning_outcomes.split(';')
                      : [])),
            schedule: (() => {
              // Trường schedule có thể là array, object hoặc chuỗi
              if (Array.isArray(c.schedule)) return c.schedule;
              if (c.schedule && typeof c.schedule === 'object' && c.schedule.schedule) {
                const s = c.schedule.schedule;
                // Gộp "day" và "time" thành 1 dòng hiển thị đẹp
                const day = s.day || '';
                const time = s.time || '';
                return [`${day}${day && time ? ' | ' : ''}${time}`.trim()];
              }
              if (typeof c.schedule === 'string' && c.schedule) {
                return c.schedule.split(';');
              }
              return [];
            })(),
            // Thêm dữ liệu tài liệu mẫu cho popup
            documents: [
              { title: 'Tổng hợp đề thi', description: 'Đề thi thử các năm', icon: 'file-earmark-text', bg: 'primary' },
              { title: 'Sơ đồ tư duy', description: 'Mindmap kiến thức', icon: 'diagram-3', bg: 'success' }
            ],
            imageTeacher: teacher.avatar_url,
            nameTeacher: teacher.full_name,
            experience: teacher.experience_years + ' năm kinh nghiệm',
          };
        });
        setCourses(mapped);
        setLoading(false);
      })
      .catch((err) => {
        setError('Lỗi tải dữ liệu: ' + err.message);
        setLoading(false);
      });
  }, []);
  console.log(courses);
  const filteredCourses = courses
    // Lọc theo category – so sánh không phân biệt hoa thường / khoảng trắng
    .filter(course => {
      if (selectedCategory === 0) return true; // "Tất cả"
      const normalize = str => (str || '').toString().toLowerCase().trim();
      return normalize(course.category) === normalize(categories[selectedCategory]);
    })
    // Lọc theo tên khoá học
    .filter(course => course.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <section className="bg-white py-10" id='course'>
      <div className="container mx-auto max-w-6xl px-4">
        {/* Title & Description */}
        <div className="mb-5">
          <h2
            className="fw-bold text-center mb-2"
            style={{
              fontSize: '2.8rem',
              color: '#111827',
              letterSpacing: '-1px',
              lineHeight: 1.15,
            }}
          >
            Khóa học luyện thi THPT Quốc gia
          </h2>
          <p
            className="text-center mx-auto"
            style={{
              maxWidth: 700,
              color: '#6b7280',
              fontSize: '1.25rem',
              fontWeight: 500,
            }}
          >
            Chọn khóa học phù hợp với mục tiêu của bạn. Tất cả khóa học đều có cam kết chất lượng và tỷ lệ đỗ cao.
          </p>
        </div>
        
        {/* Tabs + Search (compact style) */}
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4 gap-3">
          {/* Tabs bên trái */}
          <div
            className="d-inline-flex gap-2 px-1 py-1 rounded-3"
            style={{
              background: "#f6f8fb",
              borderRadius: 14,
              padding: "8px 12px",
              minWidth: 380,
              flexShrink: 0
            }}
          >
            {categories.map((cat, idx) => (
              <button
                key={cat}
                className="fw-semibold"
                style={{
                  padding: "7px 22px",
                  borderRadius: 8,
                  border: selectedCategory === idx ? "2px solid #d1d5db" : "2px solid transparent",
                  color: selectedCategory === idx ? "#111827" : "#6b7280",
                  fontWeight: selectedCategory === idx ? 700 : 600,
                  background: selectedCategory === idx ? "#fff" : "transparent",
                  fontSize: 17,
                  minWidth: 110,
                  lineHeight: 1.2,
                  outline: "none",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  boxShadow: "none",
                  margin: 0
                }}
                onClick={() => setSelectedCategory(idx)}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Search bên phải */}
          <div className="position-relative" style={{ minWidth: 200, maxWidth: 260, width: '100%' }}>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên môn học..."
              className="form-control ps-5 py-1"
              style={{
                borderRadius: 10,
                border: '1.5px solid #d1d5db',
                fontSize: 15,
                background: '#fff',
                color: '#6b7280',
                boxShadow: 'none',
                height: 38,
              }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-secondary" style={{ pointerEvents: 'none' }}>
              <Search size={18} />
            </span>
          </div>
        </div>

        {/* Grid các khóa học */}
        <div className="row g-4">
          {loading ? (
            <div className="col-12 text-center py-10">Đang tải dữ liệu...</div>
          ) : error ? (
            <div className="col-12 text-center text-danger py-10">{error}</div>
          ) : filteredCourses.length === 0 ? (
            <div className="col-12 text-center text-gray-400 py-10">Không tìm thấy khóa học phù hợp</div>
          ) : (
            filteredCourses.map(course => (
              <div className="col-12 col-md-6 col-lg-4" key={course.id}>
                <CourseCard course={course} onChangModal={() => setSelectedCourse(course)} />
              </div>
            ))
          )}
        </div>
        {/* Popup chi tiết khóa học */}
        <CoursePopup
          show={!!selectedCourse}
          onHide={() => setSelectedCourse(null)}
          course={selectedCourse}
        />
      </div>
    </section>
  );
}
