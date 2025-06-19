import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import '../assets/css/component.css';
import logo from '../assets/images/image.png';


function MenuBar() {
  
  // Scroll đến phần contact
  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
  <Navbar bg="white" expand="lg" className="border-bottom" fixed="top" style={{ minHeight: 70, zIndex: 1050 }}>
    <Container>
      {/* Logo bên trái */}
      <Navbar.Brand href="#" className="d-flex align-items-center fw-bold text-dark navbar-brand" style={{ paddingRight: 32 }}>
        <img src={logo} alt="logo" style={{ width: 180, height: 44, objectFit: "cover" }} />
      </Navbar.Brand>

      {/* Toggle button cho mobile */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      {/* Menu + Button */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto fw-semibold text-center text-lg-start" style={{ fontSize: '0.875rem', flex: 1, justifyContent: 'center' }}>
          <Nav.Link href="#introduction" className="text-dark px-3 hover-link">Home</Nav.Link>
          <Nav.Link href="#course" className="text-dark px-3 hover-link">Courses</Nav.Link>
          <Nav.Link href="#teacher" className="text-dark px-3 hover-link">Teachers</Nav.Link>
          <Nav.Link href="#achievements" className="text-dark px-3 hover-link">Achievements</Nav.Link>
          <Nav.Link href="#contact" className="text-dark px-3 hover-link">Contact</Nav.Link>
        </Nav>

        <div className="d-flex justify-content-start justify-content-lg-end mt-2 mt-lg-0">
          <Button
            variant="warning"
            className="fw-bold px-4 py-2 ms-lg-3 btn-signup-responsive"
            style={{
              borderRadius: 8,
              fontSize: "0.875rem",
              boxShadow: "none",
              whiteSpace: "nowrap"
            }}
            onClick={handleScrollToContact}
          >
            Sign up now
          </Button>
        </div>

      </Navbar.Collapse>
    </Container>
  </Navbar>
);

}

export default MenuBar;