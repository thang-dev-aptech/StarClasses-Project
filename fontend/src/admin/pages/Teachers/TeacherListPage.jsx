import React, { useState, useEffect } from 'react';
import TeacherAddModal from './TeacherAddModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function TeachersListPage() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTeachers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/api/teachers`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setTeachers(data.data || []);
        } catch (err) {
            setError(err.message);
            setTeachers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <section className='p-4 main-content'>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex gap-2">
                        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                            <i className="bi bi-plus-lg me-2"></i>Add New Teacher
                        </button>
                    </div>
                    <div className="d-flex gap-2">
                        <form method="get" className="d-flex gap-2" style={{maxWidth: '600px'}}>
                            <input type="text" name="search" className="form-control w-auto" placeholder="Search teacher..." />
                            <select name="category" className="form-select" style={{width: '180px'}}>
                                <option value="all">All Categories</option>
                                <option value="programming">Programming</option>
                                <option value="design">Design</option>
                                <option value="business">Business</option>
                            </select>
                            <button className="btn btn-outline-primary" type="submit">
                            <i className="bi bi-search me-1"></i>Search</button>
                        </form>
                    </div>
                </div>
                <div className="card border-0 shadow-sm">
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="border-0 text-center" style={{width: '60px'}}>ID</th>
                                        <th className="border-0">Teacher Name</th>
                                        <th className="border-0 text-center">Category</th>
                                        <th className="border-0">Subject</th>
                                        <th className="border-0">Experience</th>
                                        <th className="border-0">Bio</th>
                                        <th className="border-0 text-center">Status</th>
                                        <th className="border-0 text-center">Image</th>
                                        <th className="border-0 text-center" style={{width: '150px'}}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teachers.length === 0 ? (
                                        <tr>
                                            <td colSpan={9} className="text-center">No teachers found</td>
                                        </tr>
                                    ) : (
                                        teachers.map(teacher => (
                                            <tr key={teacher.id}>
                                                <td className="text-center">{teacher.id}</td>
                                                <td>{teacher.teacher_name}</td>
                                                <td className="text-center">{teacher.category}</td>
                                                <td>{teacher.subject}</td>
                                                <td>{teacher.experience}</td>
                                                <td>{teacher.bio}</td>
                                                <td className="text-center">
                                                    {teacher.is_active ? (
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
                                                    {teacher.image ? (
                                                        <img
                                                            src={`${API_URL}/${teacher.image}`}
                                                            alt={teacher.teacher_name}
                                                            style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: 4, border: '1px solid #e3e6f0'}}
                                                            onError={(e) => {
                                                                e.target.src = '/assets/no-image.png';
                                                            }}
                                                        />
                                                    ) : (
                                                        <img
                                                            src="/assets/no-image.png"
                                                            alt="No image"
                                                            style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: 4, border: '1px solid #e3e6f0'}}
                                                        />
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    <button className="btn btn-sm btn-light">
                                                        <i className="bi bi-pencil me-1"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-light text-danger">
                                                        <i className="bi bi-eye-slash me-1"></i>
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
            </section>
            <TeacherAddModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                onSuccess={fetchTeachers}
            />
        </>
    );
}

export default TeachersListPage;