import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import CoursesModal from './CoursesModal';
import { courseService } from '@/admin/services/courseService';
import { teacherService } from '@/admin/services/teacherService';
import { useOutletContext } from 'react-router-dom';
function CoursesListPage() {
    const { setHeaderContent } = useOutletContext();
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pendingSearchText, setPendingSearchText] = useState('');
    const [pendingSearchCategory, setPendingSearchCategory] = useState('all');
    const [searchText, setSearchText] = useState('');
    const [searchCategory, setSearchCategory] = useState('all');
    




    useEffect(() => {
        setHeaderContent({
            // sử dụng tiếng anh 
            title: 'Course Management',
            desc: 'List of courses'
        });
        document.title = 'Course Management | Star Classes Admin';
    }, [setHeaderContent]);

    // Fetch courses data
    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await courseService.getCourses();
            console.log('API Response:', response);
            
            // Kiểm tra và xử lý dữ liệu
            let coursesData = [];
            if (response && response.data) {
                coursesData = Array.isArray(response.data) ? response.data : [response.data];
            } else if (Array.isArray(response)) {
                coursesData = response;
            }
            
            console.log('Processed courses data:', coursesData);
            setCourses(coursesData);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch teachers data
    const fetchTeachers = async () => {
        try {
            const data = await teacherService.getTeachers();
            setTeachers(data);
        } catch (error) {
            console.error('Error fetching teachers:', error);
            setTeachers([]);
        }
    };

    // Fetch courses when component mounts
    useEffect(() => {
        fetchCourses();
        fetchTeachers();
    }, []);

    // Lấy tên giáo viên từ id
    const getTeacherName = (id) => {
        const teacher = teachers.find(t => String(t.id) === String(id));
        return teacher ? teacher.full_name : id;
    };

    // Xử lý khi mở modal thêm mới
    const handleAddNew = () => {
        console.log('Opening modal for new course');
        setSelectedCourse(null);
        setShowModal(true);
    };

    // Xử lý khi mở modal chỉnh sửa
    const handleEdit = (course) => {
        console.log('Opening modal for editing course:', course);
        setSelectedCourse(course);
        setShowModal(true);
    };

    // Xử lý khi đóng modal
    const handleCloseModal = () => {
        console.log('Closing modal');
        setShowModal(false);
        setSelectedCourse(null);
    };

    // Xử lý khi lưu thành công
    const handleSuccess = (updatedCourse) => {
        setCourses(prevCourses => {
            if (updatedCourse && updatedCourse.id) {
                // Nếu là update, thay thế phần tử cũ
                const exists = prevCourses.some(c => c.id === updatedCourse.id);
                if (exists) {
                    return prevCourses.map(c => c.id === updatedCourse.id ? updatedCourse : c);
                } else {
                    // Nếu là add, thêm vào đầu danh sách
                    return [updatedCourse, ...prevCourses];
                }
            }
            return prevCourses;
        });
        handleCloseModal();
    };

    // delete course
    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xoá khoá học này?')) return;
        try {
            await courseService.deleteCourse(id);
            setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
        } catch (error) {
            alert('Xoá khoá học thất bại!');
            console.error('Delete error:', error);
        }
    };
    
    // Lọc dữ liệu trước khi render
    const filteredCourses = courses.filter(course => {
        console.log(searchText, searchCategory);
        const matchName = course.course_name.toLowerCase().includes(searchText.toLowerCase());
        const matchTeacher = getTeacherName(course.teacher_id).toLowerCase().includes(searchText.toLowerCase());        
        const matchCategory = searchCategory === 'all' || (course.category && course.category.toLowerCase().trim() === searchCategory.toLowerCase().trim());
        return (matchName || matchTeacher) && matchCategory;
    });
    
    return (
        <section className='p-4 main-content'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex gap-2">
                    <button 
                        className="btn btn-primary"
                        onClick={handleAddNew}
                    >
                        <i className="bi bi-plus-lg me-2"></i>Add New Course
                    </button>
                    {/* <button className="btn btn-outline-secondary">Xóa tìm kiếm</button> */}
                </div>
                <div className="d-flex gap-2">
                    <form className="d-flex gap-2" style={{maxWidth: '600px'}} onSubmit={e => {
                        e.preventDefault();
                        setSearchText(pendingSearchText);
                        setSearchCategory(pendingSearchCategory);
                    }}>
                        <input
                            type="text"
                            name="search"
                            className="form-control w-auto"
                            placeholder="Search courses..."
                            value={pendingSearchText}
                            onChange={e => setPendingSearchText(e.target.value)}
                        />
                        <select
                            name="category"
                            className="form-select"
                            style={{width: '180px'}}
                            value={pendingSearchCategory}
                            onChange={e => setPendingSearchCategory(e.target.value)}
                        >
                            <option value="all">Tất cả</option>
                            <option value="Tự Nhiên">Tự Nhiên</option>
                            <option value="Xã Hội">Xã Hội</option>
                            <option value="Ngoại Ngữ">Ngoại Ngữ</option>
                        </select>
                        <button className="btn btn-outline-primary" type="submit">
                            <i className="bi bi-search me-1"></i>
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive" style={{maxHeight: '80vh', overflowY: 'auto'}}>
                        <Table className="table-hover align-middle mb-0">
                            <thead>
                                <tr>
                                    <th style={{ width: '80px' }}>Image</th>
                                    <th style={{ width: '25%' }}>Course Name</th>
                                    <th style={{ width: '12%' }}>Category</th>
                                    <th style={{ width: '12%' }}>Price</th>
                                    <th style={{ width: '10%' }}>Teacher</th>
                                    <th style={{ width: '10%' }}>Status</th>
                                    <th style={{ width: '12%' }}>Created</th>
                                    <th style={{ width: '100px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredCourses.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center text-muted py-4">
                                            No courses found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCourses.map(course => (
                                        <tr key={course.id}>
                                            <td>
                                                <img 
                                                    src={`http://localhost:8000/${course.image_url}`}
                                                    alt={course.course_name}
                                                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                    className="rounded"
                                                />
                                            </td>
                                            <td className="text-truncate" style={{ maxWidth: '180px' }} title={course.course_name}>
                                                {course.course_name}
                                            </td>
                                            <td>{course.category}</td>
                                            <td className="text-nowrap">{course.price?.toLocaleString('vi-VN')} VND</td>
                                            <td className="text-truncate" style={{ maxWidth: '120px' }} title={getTeacherName(course.teacher_id)}>{getTeacherName(course.teacher_id)}</td>
                                            <td>
                                                <span className={`badge rounded-pill ${course.is_active ? 'bg-success' : 'bg-danger'}`}>{course.is_active ? 'Active' : 'Inactive'}</span>
                                            </td>
                                            <td className="text-nowrap">{course.created_at ? new Date(course.created_at).toLocaleDateString() : '-'}</td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        onClick={() => handleEdit(course)}
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </Button>
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(course.id)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>

            {/* Modal Component */}
            <CoursesModal
                show={showModal}
                onHide={handleCloseModal}
                course={selectedCourse}
                onSuccess={handleSuccess}
                teachers={teachers}
            />
        </section>
    );
}

export default CoursesListPage;