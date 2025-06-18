import React from 'react';

export default function TeacherCard({ teacher, minHeight = 420 }) {
  return (
    <div
      className="bg-white rounded-4 shadow-sm d-flex flex-column"
      style={{
        minHeight,
        border: '1.5px solid #e0e7ef',
        padding: 0,
        overflow: 'hidden',
        transition: 'box-shadow 0.2s',
        cursor: 'pointer'
      }}
    >
      {/* Ảnh hoặc placeholder fill toàn bộ phần trên */}
      <div
        style={{
          background: '#f3f4f6',
          height: 350,
          width: '100%',
          overflow: 'hidden',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {teacher.avatar_url || teacher.avatar ? (
          <img
            src={`http://localhost:8000/${teacher.avatar_url || teacher.avatar}`}
            alt={teacher.full_name || teacher.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: '#e0e7ef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#b0b3bb',
            fontSize: 48
          }}>
            <i className="bi bi-image" />
          </div>
        )}
      </div>
      {/* Nội dung */}
      <div className="px-4 py-3 flex-grow-1 d-flex flex-column text-start">
        <div className="fw-bold" style={{ fontSize: 20, lineHeight: 1.2 }}>{teacher.full_name || teacher.name}</div>
        <div className="text-secondary mb-2" style={{ fontSize: 15 }}>{teacher.subject}</div>
        <div className="mb-1" style={{ fontSize: 15 }}>
          <span className="fw-bold">Experience:</span> <span>{teacher.experience_years || teacher.experience} years</span>
        </div>
        <div className="mb-1" style={{ fontSize: 15 }}>
          <span className="fw-bold">Education:</span> <span>{teacher.education}</span>
        </div>
        {teacher.achievements && (
          <div className="mt-auto" style={{ color: '#22c55e', fontSize: 15 }}>
            {teacher.achievements}
          </div>
        )}
      </div>
    </div>
  );
}
