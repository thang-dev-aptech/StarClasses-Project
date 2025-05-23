import React from 'react';

const LatestConsultItem = ({ consult }) => {
  const { firstname, lastname, subject, created_at, status } = consult;
  const fullName = `${firstname} ${lastname}`;

  return (
    <div className="list-group-item d-flex align-items-center gap-3">
      <div className="avatar-circle bg-warning bg-opacity-10">
        <i className="bi bi-chat-square-text text-warning"></i>
      </div>
      <div className="flex-grow-1">
        <div className="fw-bold">{fullName}</div>
        <div className="small text-muted">{subject} - {created_at}</div>
      </div>
      <span className={`badge bg-${status === 'new' ? 'danger' : 'secondary'} ms-auto`}>
        {status === 'new' ? 'Mới' : 'Đã xử lý'}
      </span>
    </div>
  );
};

export default LatestConsultItem; 