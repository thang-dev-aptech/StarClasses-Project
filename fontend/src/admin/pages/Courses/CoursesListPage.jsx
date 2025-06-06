import React, {useEffect, useState } from 'react';
import {useOutletContext } from 'react-router-dom'; 
import '@/admin/styles/admin-global.css';
import CoursesModal from './CoursesModal';
import { getCourse, addCourse, updateCourse, deleteCourse } from '@/admin/services/courseService';

function CoursesListPage() {
    const { setHeaderContent } = useOutletContext();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // const [search, setSearch] = useState('');
    // const [category, setCategory] = useState('all');
    // const [searchLoading, setSearchLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editCourseData, setEditCourseData] = useState(null);

    useEffect(() => {
        setHeaderContent({
            title: 'Courses',
            desc: 'Manage your tutoring courses'
        });
    }, [setHeaderContent]);

    // lấy danh sách khoá học
    const fetchCourses = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getCourse();
            setCourses(data.data || []);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Thêm khoá học
    const handleAddCourse = async (course) => {
        try {
            await addCourse(course);
            setShowAddModal(false);
            fetchCourses();
        } catch (err) {
            alert('Thêm khoá học thất bại!', err);
        }
    };

    // Sửa khoá học
    const handleEditCourse = (course) => {
        setEditCourseData(course);
        setShowEditModal(true);
    };

    const handleUpdateCourse = async (course) => {
        try {
            await updateCourse(course.id, course);
            setShowEditModal(false);
            setEditCourseData(null);
            fetchCourses();
        } catch (error) {
            console.log(error);
            alert('Cập nhật khoá học thất bại!');
        }
    };

    // Xoá khoá học
    const handleDeleteCourse = async (id) => {
        if (!window.confirm('Bạn có chắc muốn xoá khoá học này?')) return;
        try {
            await deleteCourse(id);
            fetchCourses();
        } catch (error) {
            console.log(error);
            alert('Xoá khoá học thất bại!');
        }
    };

    if(loading){
        return <div>Loading...</div>;
    }
    if(error){
        return <div>Error: {error.message}</div>;
    }


    // hiển thị popup thêm khoá học
    const handleShowAddModal = () => {
        setShowAddModal(true);
    }
    return (
        <section className='p-4 main-content'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex gap-2">
                    <button onClick={handleShowAddModal} className="btn btn-primary">
                        <i className="bi bi-plus-lg me-2"></i>Add New Course
                    </button>
                </div>
                <div className="d-flex gap-2">
                    <form className="d-flex gap-2" style={{maxWidth: '600px'}}>
                        <input
                            type="text"
                            name="search"
                            className="form-control w-auto"
                            placeholder="Search courses..."
                            // value={search}
                            // onChange={(e) => setSearch(e.target.value)}
                        />
                        <select
                            name="category"
                            className="form-select"
                            style={{width: '180px'}}
                                // value={category}
                                // onChange={(e) => setCategory(e.target.value)}   
                    
                        >
                            <option value="all">Tất cả</option>
                            <option value="Tự Nhiên">Tự Nhiên</option>
                            <option value="Xã Hội">Xã Hội</option>
                        </select>
                        {/* <button disabled={searchLoading} className="btn btn-outline-primary" type="submit">
                            {searchLoading ? <span className="spinner-border spinner-border-sm me-1" /> : <i className="bi bi-search me-1"></i>}
                            Search
                        </button> */}
                    </form>
                </div>
            </div>
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 text-center">Ảnh</th>
                                    <th className="border-0">Tên khóa học</th>
                                    <th className="border-0">Danh mục</th>
                                    <th className="border-0">Giá</th>
                                    <th className="border-0">Giáo viên</th>
                                    <th className="border-0">Trạng thái</th>
                                    <th className="border-0 text-center">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.length === 0 ? (
                                    <tr>
                                        <td colSpan={11} className="text-center">Không tìm thấy khóa học nào</td>
                                    </tr>
                                ) : (
                                    courses.map(course => (
                                        <tr key={course.id}>
                                            <td className="text-center">
                                                {course.image_url ? (
                                                    <img
                                                        src={course.image_url}
                                                        alt={course.course_name}
                                                        style={{width: '40px', height: '40px', objectFit: 'cover'}}
                                                        onError={(e) => {
                                                            e.target.src = '/assets/no-image.png';
                                                        }}
                                                    />
                                                ) : (
                                                    <img
                                                        src="/assets/no-image.png"
                                                        alt="No image"
                                                        style={{width: '40px', height: '40px', objectFit: 'cover'}}
                                                    />
                                                )}
                                            </td>
                                            <td>{course.course_name}</td>
                                            <td>{course.category}</td>
                                            <td>{course.price?.toLocaleString()} VNĐ</td>
                                            <td>{course.teacher_id}</td>
                                            <td>
                                                {course.is_active ? (
                                                    <span className="badge bg-success-subtle text-success">
                                                        <i className="bi bi-check-circle-fill me-1"></i>Hiển thị
                                                    </span>
                                                ) : (
                                                    <span className="badge bg-secondary">
                                                        <i className="bi bi-eye-slash me-1"></i>Ẩn
                                                    </span>
                                                )}
                                            </td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-sm btn-light"
                                                    onClick={() => handleEditCourse(course)}
                                                >
                                                    <i className="bi bi-pencil me-1"></i>
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-light text-danger"
                                                    onClick={() => handleDeleteCourse(course.id)}
                                                >
                                                    <i className="bi bi-trash me-1"></i>
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
            <CoursesModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                onSubmit={handleAddCourse}
                mode="add"
            />
            <CoursesModal
                show={showEditModal}
                onHide={() => {
                    setShowEditModal(false);
                    setEditCourseData(null);
                }}
                onSubmit={handleUpdateCourse}
                mode="edit"
                course={editCourseData}
            />
        </section>
    );
}

export default CoursesListPage;