import React from 'react';
import { Link } from 'react-router-dom';

const LatestCourseItem = ({ course }) => {
  const { id, course_name, category, image, is_active } = course;
  const isImage = image && /\.(jpg|jpeg|png|gif)$/i.test(image);

  return (
    <Link to={`/admin/courses?edit_id=${id}`} className="list-group-item list-group-item-action d-flex align-items-center gap-3">
      <div className="avatar-circle bg-primary bg-opacity-10">
        {isImage ? (
          <img 
            src={`/storage/${image}`} 
            alt={course_name} 
            style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '50%' }}
          />
        ) : (
          <i className="bi bi-book text-primary"></i>
        )}
      </div>
      <div className="flex-grow-1">
        <div className="fw-bold">{course_name}</div>
        <div className="small text-muted">Danh mục: {category}</div>
      </div>
      <span className={`badge bg-${is_active ? 'success' : 'secondary'} ms-auto`}>
        {is_active ? 'Active' : 'Inactive'}
      </span>
    </Link>
  );
};

export default LatestCourseItem; 