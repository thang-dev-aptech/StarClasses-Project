import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import StatCard from '../components/ui/StatCard';
import { getDashboardOverview } from '../services/dashboardService';

const DashboardPage = () => {
  const { setHeaderContent } = useOutletContext();
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalCourses: 0,
      totalTeachers: 0,
      totalContacts: 0
    },
    latestCourses: [],
    latestTeachers: [],
    latestContacts: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardOverview();
        setDashboardData({
          totalCourses: data.totalCourses,
          totalTeachers: data.totalTeachers,
          totalContacts: data.totalContacts,
          latestCourses: data.recentCourses || [],
          latestTeachers: data.recentTeachers || [],
          latestContacts: data.recentContacts || []
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    setHeaderContent({
      title: 'Dashboard',
      desc: 'Welcome to Star Classes admin panel'
    });
    document.title = 'Dashboard | Star Classes Admin';

  }, [setHeaderContent]);

  return (
    <div className="main-content container-fluid py-4">
      <div className="row g-3 mb-4 dashboard-stats-row">
        <div className="col-md-4">
          <StatCard title="Total Courses" value={dashboardData.totalCourses || 0} icon="book" color="primary" />
        </div>
        <div className="col-md-4">
          <StatCard title="Total Teachers" value={dashboardData.totalTeachers || 0} icon="person-video3" color="success" />
        </div>
        <div className="col-md-4">
          <StatCard title="New Contacts" value={dashboardData.totalContacts || 0} icon="chat-square-text" color="warning" />
        </div>
      </div>
      <div className="row g-3 dashboard-latest-row">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Latest Courses</h5>
              <a href="/admin/courses" className="btn btn-sm btn-primary">View All</a>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {dashboardData.latestCourses && dashboardData.latestCourses.length > 0 ? (
                  dashboardData.latestCourses.map((course, idx) => {
                    const isActive = course.is_active;
                    const statusLabel = isActive ? 'Đang diễn ra' : 'Đã kết thúc';
                    const badgeColor = isActive ? 'success' : 'secondary';
                    return (
                      <div className="list-group-item d-flex align-items-center justify-content-between py-3" key={course.id || idx}>
                        <div className="text-truncate" style={{maxWidth: '60%'}}>
                          <strong title={course.course_name}>{course.course_name}</strong>
                          <div className="small text-muted text-truncate" title={course.teacher_name || 'Chưa rõ'}>
                            GV: {course.teacher_name || 'Chưa rõ'}
                          </div>
                        </div>
                        <span className={`badge rounded-pill bg-${badgeColor}`}>{statusLabel}</span>
                      </div>
                    );
                  })
                ) : (
                  <div className="list-group-item text-muted text-center py-3">Chưa có khóa học nào gần đây.</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Latest Teachers</h5>
              <a href="/admin/teachers" className="btn btn-sm btn-primary">View All</a>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {dashboardData.latestTeachers && dashboardData.latestTeachers.length > 0 ? (
                  dashboardData.latestTeachers.map((teacher, idx) => {
                    const isActive = teacher.is_active;
                    const statusLabel = isActive ? 'Đang dạy' : 'Nghỉ dạy';
                    const badgeColor = isActive ? 'success' : 'secondary';
                    return (
                      <div className="list-group-item d-flex align-items-center justify-content-between py-3" key={teacher.id || idx}>
                        <div className="fw-bold text-truncate" style={{maxWidth: '60%'}} title={teacher.full_name}>{teacher.full_name}</div>
                        <div className="text-end small text-muted ms-2">
                          <span className={`badge rounded-pill bg-${badgeColor}`}>{statusLabel}</span><br/>
                          {teacher.email && <span>{teacher.email}</span>}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="list-group-item text-muted text-center py-3">Chưa có giáo viên nào gần đây.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3 mt-3 dashboard-feedback-row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Latest Contacts</h5>
              <a href="/admin/contacts" className="btn btn-sm btn-primary">View All</a>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush overflow-auto" style={{maxHeight: '300px'}}>
                {dashboardData.latestContacts && dashboardData.latestContacts.length > 0 ? (
                  dashboardData.latestContacts.map((contact, idx) => (
                    <div className="list-group-item py-3" key={contact.id || idx}>
                      <div className="fw-bold mb-1 text-truncate" style={{maxWidth: '60%'}} title={`${contact.first_name} ${contact.last_name}`}>
                        {contact.first_name} {contact.last_name}
                        <span className="small text-muted ms-2">({contact.email})</span>
                        <span className="small text-muted ms-2">{contact.phone}</span>
                      </div>
                      <div className="small text-muted mb-1">{contact.created_at ? new Date(contact.created_at).toLocaleDateString() : ''}</div>
                      <div className="mb-1 text-truncate" style={{maxWidth: '80%'}} title={contact.message}>{contact.message ? contact.message.slice(0, 80) + (contact.message.length > 80 ? '...' : '') : ''}</div>
                    </div>
                  ))
                ) : (
                  <div className="list-group-item text-muted text-center py-3">Chưa có liên hệ nào gần đây.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 