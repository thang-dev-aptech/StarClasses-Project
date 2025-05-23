import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom'; 
import '@/admin/styles/admin-global.css';
import CourseAddModal from './CoursesAddModal';

function CoursesListPage() {

    const { setHeaderContent } = useOutletContext();
    const [showAddCourseModal, setShowAddCourseModal] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setHeaderContent({
            title: 'Courses',
            desc: 'Manage your tutoring courses'
        });
        fetchCourses();
    }, [setHeaderContent]);
    const handleOpenAddModal = () => {
        setShowAddCourseModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddCourseModal(false);
    };

    const fetchCourses = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8000/api/courses'); 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); // Chuyển đổi response sang JSON
            setCourses(data); // Cập nhật state với dữ liệu nhận được
        } catch (err) {
            setError(err.message); 
            setCourses([]); 
        } finally {
            setLoading(false); 
        }
    }
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        // main content
        <section className='p-4 main-content'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className='d-flex gap-2'>
                    <button onClick={handleOpenAddModal} className="btn btn-primary">
                        <i className="bi bi-plus-lg me-2"></i>Add New Course
                    </button>
                </div>
                <div className='d-flex gap-2'>
                    <form method="get" className='d-flex gap-2 ' style={{maxWidth: '600px'}}>
                        <input type="text" name="search" className='form-control' placeholder='Search courses...'/>
                        <select name="category" className='form-select' style={{width: '180px'}}>
                            <option value="all">All Categories</option>
                            <option value="programming">Programming</option>
                            <option value="design">Design</option>
                            <option value="business">Business</option>
                        </select>
                        <button className="btn btn-outline-primary" type="submit">Search</button>
                    </form>
                </div>
            </div>

            {/* course table */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0" style={{width: '60px'}}>ID</th>
                                    <th className="border-0">Course Name</th>
                                    <th className="border-0">Price</th>
                                    <th className="border-0">Category</th>
                                    <th className="border-0">Rating</th>
                                    <th className="border-0">Rating Count</th>
                                    <th className="border-0">Status</th>
                                    <th className="border-0">Image</th>
                                    <th className="border-0" style={{width: '150px'}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="text-center">Chưa có khóa học nào</td>
                                    </tr>
                                ) : (
                                    <tr key={courses.id}>
                                        <td>{courses.id}</td>
                                        <td>{courses.name}</td>
                                        <td>{courses.price}</td>
                                        <td>{courses.category}</td>
                                        <td>{courses.rating}</td>
                                        <td>{courses.rating_count}</td>
                                        <td>{courses.status}</td>
                                        <td>{courses.image}</td>
                                        <td>
                                            <button className="btn btn-sm btn-primary">Edit</button>
                                            <button className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                )}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <CourseAddModal
                show={showAddCourseModal}
                onHide={handleCloseAddModal}
            />
        </section>
    );
}

export default CoursesListPage;