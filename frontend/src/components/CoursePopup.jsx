import React, { useState, useEffect } from "react";
import { Modal, Tab, Nav } from "react-bootstrap";
import { Calendar, CheckCircle } from "lucide-react";
import "../App.css";

function CoursePopup({ show, onHide, course }) {
  const [activeKey, setActiveKey] = useState("overview");

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  if (!course) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      backdrop="static"
      keyboard={true}
      scrollable={true}
      contentClassName="rounded-4 shadow-lg border-0"
      dialogClassName="course-popup-dialog"
      style={{ padding: 0, maxWidth: '900px', width: '95%' }}
    >
      {/* Nút đóng popup */}
      <button
        type="button"
        className="btn-close position-absolute"
        aria-label="Close"
        onClick={onHide}
        style={{
          top: 18,
          right: 22,
          zIndex: 10,
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      ></button>
      {/* Banner with overlay and badge */}
      <div className="position-relative w-100" style={{ height: "170px", borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: 'hidden' }}>
        <img
          src={`http://localhost:8000/${course.image}`}
          alt={course.name}
          className="w-100 h-100 object-fit-cover"
          style={{ objectFit: "cover", filter: 'brightness(0.85)' }}
        />
        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.13)' }} />
        {/* Badge */}
        <div className="position-absolute top-0 start-0 m-3">
          <span className="badge rounded-pill px-3 py-2" style={{ background: '#ffe066', color: '#222', fontWeight: 600, fontSize: 15 }}>
            {course.category || course.subject}
          </span>
        </div>
      </div>
      {/* Title below image */}
      <div className="bg-white pt-3 pb-2 px-4">
        <h4 className="fw-bold mb-0" style={{ fontSize: 24 }}>{course.name}</h4>
      </div>
      {/* Tabs */}
      <div className="bg-white px-4 pt-2 pb-0 border-0">
        <Nav
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k)}
          className="justify-content-start gap-2 border-0"
          style={{ borderBottom: 'none' }}
        >
          <Nav.Item>
            <Nav.Link
              eventKey="overview"
              className={activeKey === 'overview' ? 'bg-white border border-bottom-0 rounded-top-3 fw-bold' : 'bg-light text-secondary'}
              style={{ minWidth: 120, textAlign: 'center', fontWeight: 600, fontSize: 16, borderColor: activeKey === 'overview' ? '#e5e7eb' : 'transparent' }}
            >Overview</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="curriculum"
              className={activeKey === 'curriculum' ? 'bg-white border border-bottom-0 rounded-top-3 fw-bold' : 'bg-light text-secondary'}
              style={{ minWidth: 120, textAlign: 'center', fontWeight: 600, fontSize: 16, borderColor: activeKey === 'curriculum' ? '#e5e7eb' : 'transparent' }}
            >Materials</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="teacher"
              className={activeKey === 'teacher' ? 'bg-white border border-bottom-0 rounded-top-3 fw-bold' : 'bg-light text-secondary'}
              style={{ minWidth: 120, textAlign: 'center', fontWeight: 600, fontSize: 16, borderColor: activeKey === 'teacher' ? '#e5e7eb' : 'transparent' }}
            >Teacher</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <Modal.Body className="pt-3 pb-0 px-4">
        <Tab.Container activeKey={activeKey}>
          <Tab.Content>
            {activeKey === "overview" && (
              <Tab.Pane eventKey="overview">
                {/* Mô tả */}
                <div className="mb-3 text-secondary" style={{ fontSize: 15 }}>
                  {course.description}
                </div>
                {/* Nội dung học tập */}
                <div className="fw-bold mb-2" style={{ fontSize: 17 }}>Learning outcomes</div>
                <div className="row mb-3">
                  {(course.aim || []).map((item, idx) => (
                    <div className="col-12 col-md-6 mb-2 d-flex align-items-start" key={idx}>
                      <CheckCircle size={20} className="me-2 text-success mt-1" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                {/* Schedule */}
                <div className="fw-bold mb-2" style={{ fontSize: 17 }}>Schedule</div>
                <div>
                  {(() => {
                    // Normalize schedule into an array of display strings
                    const raw = course.schedule;
                    let items = [];

                    if (Array.isArray(raw)) {
                      // Old format: array of strings
                      items = raw;
                    } else if (raw && typeof raw === 'object') {
                      // Possible new format: { schedule: { day, time } } or { day, time }
                      const sched = raw.schedule ? raw.schedule : raw;
                      const day = sched.day || '';
                      const time = sched.time || '';
                      const formatted = `${day}${day && time ? ' : ' : ''}${time}`.trim();
                      if (formatted) items = [formatted];
                    } else if (typeof raw === 'string') {
                      items = [raw];
                    }

                    return items.map((rawText, idx) => {
                      const text = typeof rawText === 'string' ? rawText.replace(' | ', ' : ') : rawText;
                      return (
                    <div className="mb-1 d-flex align-items-center" key={idx}>
                      <Calendar size={18} className="me-2 text-primary" />
                          <span>{text}</span>
                    </div>
                      );
                    });
                  })()}
                </div>
                {/* Giá tiền */}
                {course.price && (
                  <div className="fw-bold mt-3 mb-2" style={{ color: '#0d2144', fontSize: 20 }}>
                    Tuition fee:&nbsp;
                    {course.price.toLocaleString('vi-VN')}<span style={{fontSize:16}}>đ</span>
                  </div>
                )}
              </Tab.Pane>
            )}
            {activeKey === "teacher" && (
              <Tab.Pane eventKey="teacher">
                <div className="p-3">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle bg-secondary bg-opacity-25 d-flex align-items-center justify-content-center me-4"
                      style={{ width: "80px", height: "80px" }}
                    >
                      <img
                        src={`http://localhost:8000/${course.imageTeacher}`}
                        alt={course.nameTeacher}
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                      />
                    </div>
                    <div>
                      <div className="fw-bold fs-5">{course.nameTeacher}</div>
                      <div className="text-muted mb-1">{course.experience}</div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            )}
            {activeKey === "curriculum" && (
              <Tab.Pane eventKey="curriculum">
                <ul className="list-unstyled mt-3">
                  {(course.documents || []).map((item, idx) => (
                    <li key={idx}>
                      <div className="d-flex align-items-start bg-light rounded-4 p-3 mb-3 shadow-sm">
                        <div
                          className={`bg-${item.bg} bg-opacity-10 text-${item.bg} p-3 rounded-3 me-3 d-flex align-items-center justify-content-center`}
                          style={{ width: "3rem", height: "3rem" }}
                        >
                          <i className={`bi bi-${item.icon}`} style={{ fontSize: "1.5rem" }}></i>
                        </div>
                        <div>
                          <div className="fw-semibold">{item.title}</div>
                          <div className="text-muted small">{item.description}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Tab.Pane>
            )}
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer className="justify-content-center border-0 pt-0 pb-4 bg-white">
        <button className="w-100 fw-bold py-2 rounded-3 bg-warning border-0" style={{ fontSize: 17 }}
          onClick={() => {
            onHide();
            setTimeout(() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }, 300);
          }}>
          Contact for advice
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CoursePopup;
