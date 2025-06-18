import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaTwitter,
  FaEnvelope,
  FaPinterest,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaFacebook
} from "react-icons/fa";
import logo from '../assets/images/logo.svg';

const Footer = () => (
  <footer style={{ background: "#232734", color: "#fff", padding: "40px 0" }}>
    <Container>
      <Row className="gy-4">
        {/* Cột 1 */}
        <Col lg={4} md={6}>
          <div className="mb-3 d-flex align-items-center">
            <img src={logo} alt="logo" style={{ width: 140, height: 44, objectFit: "cover" }} />
          </div>
          <p>
            Trung tâm luyện thi THPT Quốc gia hàng đầu với hơn 15 năm kinh nghiệm, giúp hàng nghìn học sinh đạt điểm cao và đỗ đại học mơ ước.
          </p>
          <div style={{ fontSize: 22 }}>
            <FaTwitter style={{ marginRight: 15, cursor: "pointer" }} className="hover-link"/>
            <FaEnvelope style={{ marginRight: 15, cursor: "pointer" }} className="hover-link"/>
            <FaPinterest style={{ marginRight: 15, cursor: "pointer" }} className="hover-link"/>
            <FaFacebook style={{ cursor: "pointer" }} className="hover-link" />
          </div>
        </Col>
        {/* Cột 2 */}
        <Col lg={2} md={6}>
          <h6 style={{ color: "#FFD600", fontWeight: "bold" }}>Liên kết nhanh</h6>
          <ul className="list-unstyled mt-3 ">
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#introduction">Trang chủ</a>              
            </li>
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#course">Khóa học</a>
            </li>
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#teacher">Giáo viên</a>
            </li>
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#achievements">Thành tích</a>
            </li>
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#contact">Liên hệ</a>
            </li>
          </ul>
        </Col>
        {/* Cột 3 */}
        <Col lg={3} md={6}>
          <h6 style={{ color: "#FFD600", fontWeight: "bold" }}>Khóa học nổi bật</h6>
          <ul className="list-unstyled mt-3">
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#course">Luyện thi Toán THPT</a>
            </li>
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#course">Luyện thi Ngữ văn THPT</a>
            </li>
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#course">Luyện thi Tiếng Anh THPT</a>
            </li>
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#course">Luyện thi Khối Xã Hội</a>
            </li>
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#course">Luyện thi Khối Tự Nhiên</a>
            </li>
          </ul>
        </Col>
        {/* Cột 4 */}
        <Col lg={3} md={6}>
          <h6 style={{ color: "#FFD600", fontWeight: "bold" }}>Thông tin liên hệ</h6>
          <ul className="list-unstyled mt-3" style={{ fontSize: 15 }}>
            <li>
              <FaMapMarkerAlt style={{ color: "#FFD600", marginRight: 8 }} />
              285 Đội Cấn, Ba Đình, Hà Nội, Việt Nam.
            </li>
            <li className="mt-2">
              <FaPhoneAlt style={{ color: "#FFD600", marginRight: 8 }} />
              0123 456 789
            </li>
            <li className="mt-2">
              <FaEnvelope style={{ color: "#FFD600", marginRight: 8 }} />
              info@starclasses.vn
            </li>
            <li className="mt-2">
              <FaClock style={{ color: "#FFD600", marginRight: 8 }} />
              Thứ 2 - CN: 8:00 - 22:00
            </li>
          </ul>
        </Col>
      </Row>
      <hr style={{ borderColor: "#444", margin: "32px 0 16px" }} />
      <div className="d-flex flex-wrap justify-content-between align-items-center" style={{ fontSize: 15, color: "#b0b3bb" }}>
        <div>
          © 2025 Star Classes. Bảo lưu mọi quyền. &nbsp;|&nbsp;
          <span>Chính sách bảo mật</span> &nbsp;|&nbsp;
          <span>Điều khoản sử dụng</span>
        </div>
        <div>
          Thiết kế bởi Star Classes &nbsp;|&nbsp; Hotline: 0123 456 789
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
