import React, { useState, useEffect } from "react";
import { Modal, Tab, Nav } from "react-bootstrap";
import '../assets/css/component.css';

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
    <Modal className="custom-tab-nav fixed-height-modal" show={show} onHide={onHide} size="md" centered backdrop="static" keyboard={true} scrollable={true}>
      <Modal.Header closeButton className="custom-modal-header p-0 border-0 position-relative overflow-hidden">
        <div className="position-relative w-100" style={{ height: "180px" }}>
          {/* Ảnh nền */}
          <img
            src={course.image}
            alt={course.name}
            className="w-100 h-100 object-fit-cover"
            style={{ objectFit: "cover" }}
          />
          <div className="position-absolute text-white z-1" style={{ bottom: "-10px", left: "20%" }}>
            <div className="text-center mb-4 d-flex align-items-center ">
              <div className="bg-warning text-dark px-3 rounded-pill fw-bold d-inline-block">
                {course.subject}
              </div>
              <h5 className="m-0 ps-5 fw-bold">{course.name}</h5>
            </div>
          </div>
        </div>
      </Modal.Header>
      <div className="bg-white py-2">
        <Nav
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k)}
          className="justify-content-center"
        >
          <Nav.Item>
            <Nav.Link eventKey="overview">Overview</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="teacher">Teacher</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="curriculum">Curriculum</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      <Modal.Body>
        <Tab.Container activeKey={activeKey}>
          <Tab.Content>
            {activeKey === "overview" && (
              <Tab.Pane eventKey="overview">
                <div className="container py-4">
                  {/* Mô tả */}
                  <p className="text-muted">
                    {course.aim}
                  </p>

                  {/* Nội dung học tập */}
                  <h5 className="fw-bold mt-4">Nội dung học tập</h5>
                  <div className="row row-cols-1 row-cols-md-2">
                    {course.aim.map((item, idx) => (
                      <div key={idx} className="d-flex align-items-start mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Lịch học */}
                  <h5 className="fw-bold mt-4">Lịch học</h5>
                  {course.schedule.map((item, idx) => (
                    <div key={idx} className="d-flex align-items-center mb-1">
                      <i className={`bi bi-calendar text-primary me-2`}></i>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Tab.Pane>
            )}
            {activeKey === "teacher" && (
              <Tab.Pane eventKey="teacher">
                <div className="p-4">
                  <div className="d-flex align-items-start">
                    <div
                      className="rounded-circle bg-secondary bg-opacity-25 d-flex align-items-center justify-content-center me-4"
                      style={{ width: "80px", height: "80px" }}
                    >
                      <img
                        src={course.imageTeacher}
                        alt={course.nameTeacher}
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                      />
                    </div>
                    <div>
                      <div className="fw-bold fs-5">{course.nameTeacher}</div>
                      <div className="text-muted mb-1">{course.experience} of experience</div>
                    </div>
                  </div>
                </div>

              </Tab.Pane>
            )}
            {activeKey === "curriculum" && (
              <Tab.Pane eventKey="curriculum">
                <ul>
                  {course.documents.map((item, idx) => (
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
      <Modal.Footer className="justify-content-center">
        <button className=" w-50 text-dark nav-tab-hover ">
          <a href="#contact">Liên hệ tư vấn</a>
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CoursePopup;
