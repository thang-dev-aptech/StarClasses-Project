import React, { useEffect, useState } from "react";

export default function Introduction() {
  const [introductionData, setIntroductionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIntroduction = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:8000/api/introduction"
        );
        const data = await response.json();
        console.log("API introduction data:", data.data);
        if (data.status === 'success' && data.data) {
          setIntroductionData(data.data);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchIntroduction();
  }, []);

  if (loading) {
    return (
      <div className="container d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  const intro = Array.isArray(introductionData) ? introductionData[0] : introductionData;
  console.log(intro.id);
  return (
    <div className="container d-flex align-items-center" style={{ height: "100vh" }}>
      <div className="row w-100 align-items-center">
        {/* Bên trái */}
        <div className="col-lg-6 text-center text-lg-start custom-padding-left">
          <span className="badge bg-warning text-dark fw-semibold mb-3 px-4 py-2 shadow-sm" style={{fontSize: '1rem', borderRadius: 8, letterSpacing: 0}}>
            {intro.badge_text}
          </span>
          <h1 className="fw-bold mb-4" style={{ fontSize: '3.2rem', lineHeight: 1.13, letterSpacing: '-1px', color: '#0d2144' }}
            dangerouslySetInnerHTML={{ __html: intro.title }}
          />
          <p className="text-muted fs-5 mb-5" style={{fontSize: '1.15rem', color: '#6c6e74'}}>{intro.description}</p>
          <div className="d-flex gap-3 justify-content-center justify-content-lg-start mb-4">
            <button className="btn btn-warning text-dark fw-semibold px-4 py-3 btn-hover-shadow rounded-3" style={{fontSize: '1.1rem', minWidth: 170}}>
              Đăng ký học thử
            </button>
            <button className="btn btn-outline-secondary fw-semibold px-4 py-3 btn-hover-shadow rounded-3" style={{fontSize: '1.1rem', minWidth: 170}}>
              Tìm hiểu thêm
            </button>
          </div>
          <div className="d-flex align-items-center gap-3 mb-2 justify-content-center justify-content-lg-start">
            {/* Slider indicator */}
            <div className="d-flex gap-2">
              <span style={{width:12, height:12, borderRadius:'50%', background:'#FFC107', display:'inline-block'}}></span>
              <span style={{width:12, height:12, borderRadius:'50%', background:'#E0E0E0', display:'inline-block'}}></span>
              <span style={{width:12, height:12, borderRadius:'50%', background:'#E0E0E0', display:'inline-block'}}></span>
              <span style={{width:12, height:12, borderRadius:'50%', background:'#E0E0E0', display:'inline-block'}}></span>
            </div>
            <span className="text-muted ms-3" style={{fontSize:'1rem'}}>
              Đã có <span className="fw-bold">8,500+</span> học sinh tin tưởng
            </span>
          </div>
        </div>
        {/* Bên phải (Ảnh) */}
        <div className="col-lg-6 mt-5 mt-lg-0 d-flex justify-content-center px-5">
          <div style={{width: '100%', maxWidth: 450, aspectRatio: '1/1', background: '#f3f3f3', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
            {intro.image_url ? (
              <img
                src={`http://localhost:8000/${intro.image_url}`}
                alt="Ảnh giới thiệu"
                className="img-fluid animate-fade-in"
                style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "cover" }}
              />
            ) : (
              <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: 48}}>
                <i className="bi bi-image"></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
