import React from 'react';
import { Link } from 'react-router-dom';

const LatestTeacherItem = ({ teacher }) => {
  const { id, teacher_name, subject, image, is_active } = teacher;
  const isImage = image && /\.(jpg|jpeg|png|gif)$/i.test(image);

  return (
    <Link to={`/admin/teachers?edit_id=${id}`} className="list-group-item list-group-item-action d-flex align-items-center gap-3">
      <div className="avatar-circle bg-success bg-opacity-10">
        {isImage ? (
          <img 
            src={`/storage/${image}`} 
            alt={teacher_name} 
            style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '50%' }}
          />
        ) : (
          <i className="bi bi-person-video3 text-success"></i>
        )}
      </div>
      <div className="flex-grow-1">
        <div className="fw-bold">{teacher_name}</div>
        <div className="small text-muted">Môn: {subject}</div>
      </div>
      <span className={`badge bg-${is_active ? 'success' : 'secondary'} ms-auto`}>
        {is_active ? 'Active' : 'Inactive'}
      </span>
    </Link>
  );
};

export default LatestTeacherItem; 