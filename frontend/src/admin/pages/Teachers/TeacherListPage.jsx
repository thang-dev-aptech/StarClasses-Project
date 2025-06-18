import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import TeachersModal from './TeachersModal';
import { teacherService } from '@/admin/services/teacherService';
import { courseService } from '@/admin/services/courseService';
import { useOutletContext } from 'react-router-dom';

// Hàm chuẩn hoá: bỏ dấu tiếng Việt, lowercase, trim
const normalizeVi = (str) => {
  if (!str) return '';
  return str
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
};

export default function TeachersListPage() {
  const { setHeaderContent } = useOutletContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pendingSearchText, setPendingSearchText] = useState('');
  const [pendingSearchCategory, setPendingSearchCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');

  useEffect(() => {
    setHeaderContent({
      title: 'Teacher Management',
      desc: 'List of all teachers at Star Classes'
    });
    document.title = 'Teacher Management | Star Classes Admin';
  }, [setHeaderContent]);

  // Fetch teachers data
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await teacherService.getTeachers();
      setTeachers(response);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses data
  const fetchCourses = async () => {
    try {
      const response = await courseService.getCourses();
      setCourses(Array.isArray(response) ? response : []);
    } catch {
      setCourses([]);
    }
  };

  // Fetch teachers & courses when component mounts
  useEffect(() => {
    fetchTeachers();
    fetchCourses();
  }, []);

  

  // Xử lý khi mở modal thêm mới
  const handleAddNew = () => {
    setSelectedTeacher(null);
    setShowModal(true);
  };

  // Xử lý khi mở modal chỉnh sửa
  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setShowModal(true);
  };

  // Xử lý khi đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTeacher(null);
  };

  // Xử lý khi lưu thành công
  const handleSuccess = (updatedTeacher) => {
    setTeachers(prevTeachers => {
      if (updatedTeacher && updatedTeacher.id) {
        const exists = prevTeachers.some(t => t.id === updatedTeacher.id);
        if (exists) {
          return prevTeachers.map(t => t.id === updatedTeacher.id ? updatedTeacher : t);
        } else {
          return [updatedTeacher, ...prevTeachers];
        }
      }
      return prevTeachers;
    });
    handleCloseModal();
  };

  // delete teacher
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this teacher?')) return;
    try {
      await teacherService.deleteTeacher(id);
      setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher.id !== id));
    } catch (error) {
      alert('Failed to delete teacher!');
      console.error('Delete error:', error);
    }
  };

  // Lọc dữ liệu trước khi render
  const filteredTeachers = teachers.filter(teacher => {
    const matchName = teacher.full_name.toLowerCase().includes(searchText.toLowerCase());
    const matchSubject = teacher.subject.toLowerCase().includes(searchText.toLowerCase());
    let matchCategory = true;
    if (searchCategory !== 'all') {
      const teacherCourses = courses.filter(c => String(c.teacher_id) === String(teacher.id));
      // Kiểm tra xem có course nào thuộc category đang chọn không (so sánh đã normalize)
      matchCategory = teacherCourses.some(c => normalizeVi(c.category) === normalizeVi(searchCategory));
    }
    return (matchName || matchSubject) && matchCategory;
  });

  return (
    <section className='p-4 main-content'>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-2">
          <button 
            className="btn btn-primary"
            onClick={handleAddNew}
          >
            <i className="bi bi-plus-lg me-2"></i>Add New Teacher
          </button>
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
              placeholder="Search teachers..."
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
              <option value="all">All</option>
              <option value="Science">Science</option>
              <option value="Social">Social</option>
              <option value="Languages">Languages</option>
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
                  <th style={{ width: '20%' }}>Full Name</th>
                  <th style={{ width: '12%' }}>Subject</th>
                  <th style={{ width: '12%' }}>Experience</th>
                  <th style={{ width: '18%' }}>Education</th>
                  <th style={{ width: '13%' }}>Achievements</th>
                  <th style={{ width: '10%' }}>Status</th>
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
                ) : filteredTeachers.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-4">
                      No teachers found
                    </td>
                  </tr>
                ) : (
                  filteredTeachers.map(teacher => (
                    <tr key={teacher.id}>
                      <td>
                        <img 
                          src={`http://localhost:8000/${teacher.avatar_url}`}
                          alt={teacher.full_name}
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                          className="rounded"
                        />
                      </td>
                      <td className="text-truncate" style={{ maxWidth: '160px' }} title={teacher.full_name}>
                        {teacher.full_name}
                      </td>
                      <td>{teacher.subject}</td>
                      <td>{teacher.experience_years} years</td>
                      <td className="text-truncate" style={{ maxWidth: '160px' }} title={teacher.education}>{teacher.education}</td>
                      <td className="text-truncate" style={{ maxWidth: '180px' }} title={Array.isArray(teacher.achievements) ? teacher.achievements.join('\n') : teacher.achievements}>
                        {Array.isArray(teacher.achievements)
                          ? teacher.achievements.map((item, idx) => <div key={idx}>{item}</div>)
                          : teacher.achievements}
                      </td>
                      <td>
                        <span className={`badge rounded-pill ${teacher.is_active ? 'bg-success' : 'bg-danger'}`}>{teacher.is_active ? 'Active' : 'Inactive'}</span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEdit(teacher)}
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(teacher.id)}
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
      <TeachersModal
        show={showModal}
        onHide={handleCloseModal}
        teacher={selectedTeacher}
        onSuccess={handleSuccess}
      />
    </section>
  );
}