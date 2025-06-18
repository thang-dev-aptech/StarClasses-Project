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
            Leading national high-school exam prep center with 15+ years of experience, helping thousands of students achieve high scores and enter their dream universities.
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
          <h6 style={{ color: "#FFD600", fontWeight: "bold" }}>Quick Links</h6>
          <ul className="list-unstyled mt-3 ">
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#introduction">Home</a>              
            </li>
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#course">Courses</a>
            </li>
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#teacher">Teachers</a>
            </li>
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#achievements">Achievements</a>
            </li>
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </Col>
        {/* Cột 3 */}
        <Col lg={3} md={6}>
          <h6 style={{ color: "#FFD600", fontWeight: "bold" }}>Featured Courses</h6>
          <ul className="list-unstyled mt-3">
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#course">Mathematics Exam Prep</a>
            </li>
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#course">Literature Exam Prep</a>
            </li>
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#course">English Exam Prep</a>
            </li>
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#course">Social Sciences Track</a>
            </li>
            <li className="hover-link" style={{ cursor: "pointer" }}>
              <a href="#course">Natural Sciences Track</a>
            </li>
          </ul>
        </Col>
        {/* Cột 4 */}
        <Col lg={3} md={6}>
          <h6 style={{ color: "#FFD600", fontWeight: "bold" }}>Contact Information</h6>
          <ul className="list-unstyled mt-3" style={{ fontSize: 15 }}>
            <li>
              <FaMapMarkerAlt style={{ color: "#FFD600", marginRight: 8 }} />
              285 Doi Can St, Ba Dinh, Hanoi, Vietnam
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
              Mon – Sun: 8:00 – 22:00
            </li>
          </ul>
        </Col>
      </Row>
      <hr style={{ borderColor: "#444", margin: "32px 0 16px" }} />
      <div className="d-flex flex-wrap justify-content-between align-items-center" style={{ fontSize: 15, color: "#b0b3bb" }}>
        <div>
          © 2025 Star Classes. All rights reserved.&nbsp;|&nbsp;
          <span>Privacy Policy</span> &nbsp;|&nbsp;
          <span>Terms of Use</span>
        </div>
        <div>
          Designed by Star Classes &nbsp;|&nbsp; Hotline: 0123 456 789
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
