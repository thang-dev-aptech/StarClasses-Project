import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import '@/admin/styles/admin-global.css';
import { courseService } from '@/admin/services/courseService';
import CoursesModal from './CoursesModal';

function CoursesListPage() {
    const { setHeaderContent } = useOutletContext();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit] = useState(10);
    const [error, setError] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    // Sử dụng useRef để theo dõi mounting state
    const isMounted = useRef(false);
    const loadingRef = useRef(loading);
    loadingRef.current = loading;

    // Effect cho việc set header content - chỉ chạy 1 lần khi mount
    useEffect(() => {
        setHeaderContent({
            title: 'Courses',
            desc: 'Manage your tutoring courses'
        });
    }, []);

    const fetchCourses = useCallback(async () => {
        if (loadingRef.current) return;
        
        try {
            setLoading(true);
            setError(null);
            const response = await courseService.getCourses(page, limit);
            if (isMounted.current) {
                setCourses(response.courses || []);
                setTotalPages(response.totalPages || 1);
                setTotalItems(response.totalItems || 0);
            }
        } catch (error) {
            if (isMounted.current) {
                console.error('Error fetching courses:', error);
                setError('Không thể tải danh sách khóa học. Vui lòng thử lại sau.');
                setCourses([]);
                setTotalPages(1);
                setTotalItems(0);
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    }, [page, limit]);

    // Effect để đánh dấu component đã mount
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    // Effect cho việc fetch courses
    useEffect(() => {
        if (!isSearching) {
            fetchCourses();
        }
    }, [fetchCourses, isSearching]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (loadingRef.current) return;

        try {
            setLoading(true);
            setError(null);
            setIsSearching(true);
            const response = await courseService.searchCourses({ 
                search: searchQuery, 
                category, 
                page: 1, 
                limit 
            });
            if (isMounted.current) {
                setPage(1);
                setCourses(response.courses || []);
                setTotalPages(response.totalPages || 1);
                setTotalItems(response.totalItems || 0);
            }
        } catch (error) {
            if (isMounted.current) {
                console.error('Error searching courses:', error);
                setError('Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại.');
                setCourses([]);
                setTotalPages(1);
                setTotalItems(0);
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    };

    const handleResetSearch = useCallback(() => {
        setSearchQuery('');
        setCategory('all');
        setIsSearching(false);
        setPage(1);
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa khóa học này?')) return;
        if (loadingRef.current) return;

        try {
            setLoading(true);
            setError(null);
            await courseService.deleteCourse(id);
            if (isMounted.current) {
                fetchCourses();
            }
        } catch (error) {
            if (isMounted.current) {
                console.error('Error deleting course:', error);
                setError('Không thể xóa khóa học. Vui lòng thử lại sau.');
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    };

    const handlePageChange = useCallback((newPage) => {
        setPage(newPage);
        window.scrollTo(0, 0);
    }, []);

    // Format helper functions
    const getTeacherName = useCallback((course) => {
        if (!course.teacher) return 'Chưa có giáo viên';
        return course.teacher.name || `Giáo viên ID: ${course.teacher_id}`;
    }, []);

    const formatPrice = useCallback((price) => {
        if (!price && price !== 0) return 'Chưa có giá';
        return new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
        }).format(price);
    }, []);
    
    return (
        <section className='p-4 main-content'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex gap-2">
                    <button 
                        className="btn btn-primary"
                        onClick={() => {
                            setSelectedCourse(null);
                            setShowModal(true);
                        }}
                    >
                        <i className="bi bi-plus-lg me-2"></i>Add New Course
                    </button>
                    {isSearching && (
                        <button 
                            className="btn btn-outline-secondary"
                            onClick={handleResetSearch}
                        >
                            <i className="bi bi-x-circle me-2"></i>Xóa tìm kiếm
                        </button>
                    )}
                </div>
                <div className="d-flex gap-2">
                    <form className="d-flex gap-2" style={{maxWidth: '600px'}} onSubmit={handleSearch}>
                        <input
                            type="text"
                            name="search"
                            className="form-control w-auto"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <select
                            name="category"
                            className="form-select"
                            style={{width: '180px'}}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="all">Tất cả</option>
                            <option value="Tự Nhiên">Tự Nhiên</option>
                            <option value="Xã Hội">Xã Hội</option>
                        </select>
                        <button 
                            disabled={loading} 
                            className="btn btn-outline-primary" 
                            type="submit"
                        >
                            {loading ? <span className="spinner-border spinner-border-sm me-1" /> : <i className="bi bi-search me-1"></i>}
                            Search
                        </button>
                    </form>
                </div>
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                    <button 
                        type="button" 
                        className="btn-close float-end" 
                        onClick={() => setError(null)}
                    ></button>
                </div>
            )}

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 text-center" style={{width: '80px'}}>Ảnh</th>
                                    <th className="border-0">Tên khóa học</th>
                                    <th className="border-0">Danh mục</th>
                                    <th className="border-0">Giá</th>
                                    <th className="border-0">Giáo viên</th>
                                    <th className="border-0">Trạng thái</th>
                                    <th className="border-0 text-center" style={{width: '120px'}}>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : !courses || courses.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4">
                                            Không có khóa học nào
                                        </td>
                                    </tr>
                                ) : (
                                    courses.map((course) => (
                                        <tr key={course.id}>
                                            <td className="text-center">
                                                <img 
                                                    src={course.image_url || '/placeholder.png'} 
                                                    alt={course.course_name}
                                                    style={{
                                                        width: '50px', 
                                                        height: '50px', 
                                                        objectFit: 'cover',
                                                        borderRadius: '8px'
                                                    }}
                                                    onError={(e) => {
                                                        e.target.src = '/placeholder.png';
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <div className="fw-medium">{course.course_name}</div>
                                                {course.description && (
                                                    <small className="text-muted d-block">
                                                        {course.description.length > 50 
                                                            ? `${course.description.substring(0, 50)}...` 
                                                            : course.description}
                                                    </small>
                                                )}
                                            </td>
                                            <td>{course.category || 'Chưa phân loại'}</td>
                                            <td>{formatPrice(course.price)}</td>
                                            <td>{getTeacherName(course)}</td>
                                            <td>
                                                <span className={`badge ${course.is_active ? 'bg-success' : 'bg-danger'}`}>
                                                    {course.is_active ? 'Hoạt động' : 'Không hoạt động'}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <button 
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                    onClick={() => {
                                                        setSelectedCourse(course);
                                                        setShowModal(true);
                                                    }}
                                                    title="Chỉnh sửa"
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(course.id)}
                                                    title="Xóa"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            {!loading && courses && courses.length > 0 && (
                <div className="d-flex justify-content-between align-items-center mt-4">
                    <div className="text-muted">
                        Hiển thị {(page - 1) * limit + 1} - {Math.min(page * limit, totalItems)} trên tổng số {totalItems} khóa học
                    </div>
                    <nav aria-label="Page navigation">
                        <ul className="pagination mb-0">
                            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                <button 
                                    className="page-link" 
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 1}
                                >
                                    <i className="bi bi-chevron-left"></i>
                                </button>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index + 1} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
                                    <button 
                                        className="page-link"
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                                <button 
                                    className="page-link" 
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page === totalPages}
                                >
                                    <i className="bi bi-chevron-right"></i>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}

            {showModal && (
                <CoursesModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    course={selectedCourse}
                    onSuccess={fetchCourses}
                />
            )}
        </section>
    );
}

export default React.memo(CoursesListPage);