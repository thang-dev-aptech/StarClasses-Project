import React, { useState, useEffect } from "react";
import { Modal, Tab, Nav } from "react-bootstrap";
import '../assets/css/component.css';

function CoursePopup ({ show, onHide, course }) {
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
    <Modal show={show} onHide={onHide} size="xl" centered backdrop="static" keyboard={true} scrollable={true}>
      <Modal.Header closeButton className="custom-modal-header" >
        <div>
          <h4 className="mb-0">{course.title}</h4>
          <small className="text-muted">
            {course.subject} | Instructor: {course.teacher}
          </small>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
          <Nav variant="tabs" className="mb-3">
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

          <Tab.Content>
            {activeKey === "overview" && (
              <Tab.Pane eventKey="overview">
                <h5>Course Overview</h5>
                <p>{course.overview}</p>
              </Tab.Pane>
            )}
            {activeKey === "teacher" && (
              <Tab.Pane eventKey="teacher">
                <h5>About the Instructor</h5>
                <p>{course.teacherBio}</p>
              </Tab.Pane>
            )}
            {activeKey === "curriculum" && (
              <Tab.Pane eventKey="curriculum">
                <h5>Curriculum</h5>
                {/* <ul>
                  {course.curriculum.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul> */}
              </Tab.Pane>
            )}
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
};

export default CoursePopup;
