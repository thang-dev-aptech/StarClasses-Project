import React from 'react';

export default function Introduction() {
  return (
    <div className="container-fluid d-flex align-items-center" style={{ height: '100vh' }}>
      <div className="row w-100 align-items-center">
        {/* Bên trái */}
        <div className="col-lg-6 text-center text-lg-start custom-padding-left">
          <span className="badge bg-gradient-warning text-dark fw-semibold mb-3 px-4 py-2 shadow-sm">
            Luyện thi THPT Quốc gia 2025
          </span>
          <h1 className="fw-bold display-4 mb-4" style={{ lineHeight: 1.2 }}>
            Chinh phục kỳ thi THPT Quốc gia cùng {' '}
            <span className="text-gradient-warning">Star Classes</span>
          </h1>
          <p className="text-muted fs-5 mb-5">
            Đội ngũ giáo viên chuyên nghiệp, phương pháp giảng dạy hiệu quả, giúp học sinh đạt điểm cao và đỗ đại học mơ ước.
          </p>
          <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
            <button className="btn btn-warning text-dark fw-semibold px-5 py-3 btn-hover-shadow">
              Bắt đầu ngay
            </button>
            <button className="btn btn-outline-secondary fw-semibold px-5 py-3 btn-hover-shadow">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
        <style jsx>{`
        @media (min-width: 1200px) {
            .custom-padding-left {
            padding-left: 100px !important;
            }
        }
        @media (max-width: 1199.98px) {
            .custom-padding-left {
            padding-left: 40px !important;
            }
        }
        `}</style>

        {/* Bên phải (Ảnh) */}
        <div className="col-lg-6 mt-5 mt-lg-0 d-flex justify-content-center px-5">
          <img
            src="/images/introduction2.webp"  // Đường dẫn ảnh bạn thay đổi tùy ý
            alt="Ảnh giới thiệu"
            className="img-fluid rounded shadow-lg my-5 animate-fade-in"
            style={{ maxHeight: '450px', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* CSS custom */}
      <style jsx>{`
        .bg-gradient-warning {
          background: linear-gradient(90deg, #f6d365 0%, #fda085 100%);
        }
        .text-gradient-warning {
          background: linear-gradient(90deg, #f6d365, #fda085);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 900;
        }
        .btn-hover-shadow:hover {
          box-shadow: 0 8px 20px rgba(253, 160, 133, 0.5);
          transform: translateY(-3px);
          transition: all 0.3s ease;
        }
        .animate-fade-in {
          animation: fadeInUp 1s ease forwards;
          opacity: 0;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
          from {
            opacity: 0;
            transform: translateY(20px);
          }
        }
        @media (max-width: 991px) {
          .img-fluid {
            max-height: 300px !important;
          }
          .px-5 {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
