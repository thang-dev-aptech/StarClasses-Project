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
    <Navbar bg="white" expand="lg" className="border-bottom" fixed="top" style={{minHeight: 70, zIndex: 1050}}>
      <Container>
        {/* Logo bên trái */}
        <Navbar.Brand href="#" className="d-flex align-items-center fw-bold text-dark navbar-brand" style={{paddingRight: 32}}>
          <img src={logo} alt="logo" style={{ width: 180, height: 44, objectFit: "cover" }} />
        </Navbar.Brand>

        {/* Menu căn giữa */}
        <Nav className="mx-auto fw-semibold" style={{fontSize: '0.875rem', flex: 1, justifyContent: 'center'}}>
          <Nav.Link href="#introduction" className="text-dark px-3 hover-link">Trang chủ</Nav.Link>
          <Nav.Link href="#course" className="text-dark px-3 hover-link">Khóa học</Nav.Link>
          <Nav.Link href="#teacher" className="text-dark px-3 hover-link">Giáo viên</Nav.Link>
          <Nav.Link href="#achievements" className="text-dark px-3 hover-link">Thành tích</Nav.Link>
          <Nav.Link href="#contact" className="text-dark px-3 hover-link">Liên hệ</Nav.Link>
        </Nav>

        {/* Nút đăng ký bên phải */}
        <Button
          variant="warning"
          className="fw-bold px-4 py-2 ms-3 btn-signup-responsive"
          style={{
            borderRadius: 8,
            fontSize: "0.875rem",
            boxShadow: "none",
            whiteSpace: "nowrap"
          }}
          onClick={handleScrollToContact}
        >
          Đăng ký ngay
        </Button>
      </Container>
    </Navbar>
  );
}

export default MenuBar;