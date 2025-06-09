import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../assets/css/component.css';

import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaClock,
    FaMapMarkerAlt,
    FaUsers
} from "react-icons/fa";
import { BsStar } from "react-icons/bs";

const Footer = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    // Cập nhật thời gian mỗi giây
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleString("en-US", {
            hour12: true,
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        });
    };

    return (
        <footer className="bg-light text-dark pt-5 pb-3 mx-5">
            <Container>
                <Row className="mb-4">
                    {/* Cột 1 */}
                    <Col md={3}>
                        <h5 className="d-flex align-items-center">
                            <BsStar className="text-warning me-2" />
                            <strong>Star Classes</strong>
                        </h5>
                        <p className="text-muted">
                            Empowering students to achieve academic excellence through personalized tutoring.
                        </p>
                    </Col>

                    {/* Cột 2 */}
                    <Col md={3}>
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="">Home</a></li>
                            <li><a href="">Courses</a></li>
                            <li><a href="">Teachers</a></li>
                            <li><a href="">Achievements</a></li>
                            <li><a href="">Tư vấn</a></li>
                            <li><a href="">Đăng kí</a></li>
                        </ul>
                    </Col>

                    {/* Cột 3 */}
                    <Col md={3}>
                        <h5>Legal</h5>
                        <ul className="list-unstyled">
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                            <li>Cookie Policy</li>
                        </ul>
                    </Col>

                    {/* Cột 4 */}
                    <Col md={3}>
                        <h5>Connect With Us</h5>
                        <div className="d-flex gap-3 fs-5 mt-2">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-dark">
                                <FaFacebookF />
                            </a>
                            <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" className="text-dark">
                                <FaTwitter />

                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-dark">
                                <FaInstagram />

                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-dark">
                                <FaLinkedin />
                            </a>

                        </div>
                    </Col>
                </Row>

                {/* Footer Bottom Line */}
                <hr />

                <Row className="text-muted small d-flex align-items-center">
                    <Col md={4} className="d-flex align-items-center mb-2 mb-md-0">
                        <FaClock className="me-2" />
                        {formatTime(currentTime)}
                    </Col>
                    <Col md={4} className="d-flex align-items-center mb-2 mb-md-0">
                        <FaMapMarkerAlt className="me-2" />
                        Location access denied
                    </Col>
                    <Col md={4} className="d-flex align-items-center justify-content-md-end">
                        <FaUsers className="me-2" />
                        10,546 Visitors
                    </Col>
                </Row>

                <div className="text-center text-muted small mt-3">
                    © 2025 Star Classes. All rights reserved.
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
