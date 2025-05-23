// src/admin/components/courses/CourseAddModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

function CourseAddModal({ show, onHide }) {
    const [formData, setFormData] = useState({
        course_name: '',
        short_description: '',
        description: '',         // << Bổ sung
        category: '',           // << Bổ sung
        price: '',
        rating: '',             // << Bổ sung
        rating_count: '',       // << Bổ sung
        image: null,
        is_active: true,
    });

    useEffect(() => {
        if (show) {
            setFormData({
                course_name: '',
                short_description: '',
                description: '',
                category: '',
                price: '',
                rating: '',
                rating_count: '',
                image: null,
                is_active: true,
            });
        }
    }, [show]);

    const handleInputChange = (event) => {
        const { name, value, type, checked, files } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitting Course Data:', formData);
        alert('Khóa học đã được thêm (test)!');
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm khóa học mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} id="addCourseForm">
                    <Row>
                        <Col md={8}>
                            <Form.Group className="mb-3" controlId="formCourseName">
                                <Form.Label>Tên khóa học <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="course_name"
                                    value={formData.course_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formShortDescription">
                                <Form.Label>Mô tả ngắn</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="short_description"
                                    value={formData.short_description}
                                    onChange={handleInputChange}
                                    maxLength={255}
                                />
                                <Form.Text>Hiển thị trên thẻ khóa học (tối đa 255 ký tự)</Form.Text>
                            </Form.Group>

                            {/* ======= BỔ SUNG MÔ TẢ CHI TIẾT ======= */}
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Mô tả chi tiết</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            {/* ======= BỔ SUNG DANH MỤC (CHO CỘT TRÁI) ======= */}
                            <Form.Group className="mb-3" controlId="formCategoryLeft">
                                <Form.Label>Danh mục <span className="text-danger">*</span></Form.Label>
                                <Form.Select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Chọn danh mục</option>
                                    <option value="programming">Programming</option>
                                    <option value="design">Design</option>
                                    <option value="business">Business</option>
                                    {/* Thêm các option khác nếu cần */}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group className="mb-3" controlId="formPrice">
                                <Form.Label>Giá khóa học (VNĐ) <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required min="0" step="1000"
                                />
                            </Form.Group>

                            {/* Bạn có 2 trường "Danh mục" trong HTML gốc, mình gộp lại thành một ở cột trái.
                                Nếu bạn muốn có một trường select danh mục khác ở cột phải, bạn có thể thêm vào đây.
                                Ví dụ, nếu đây là sub-category:
                            */}
                            {/*
                            <Form.Group className="mb-3" controlId="formSubCategoryRight">
                                <Form.Label>Danh mục phụ <span className="text-danger">*</span></Form.Label>
                                <Form.Select
                                    name="sub_category" // Đổi name cho phù hợp
                                    value={formData.sub_category} // Thêm state cho sub_category
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Chọn danh mục phụ</option>
                                    <option value="web_dev">Web Development (Programming)</option>
                                    <option value="mobile_dev">Mobile Development (Programming)</option>
                                </Form.Select>
                            </Form.Group>
                            */}


                            {/* ======= BỔ SUNG ĐIỂM ĐÁNH GIÁ ======= */}
                            {/* Thông thường, rating và rating_count không phải là thứ bạn nhập tay khi thêm mới
                                mà sẽ được tính toán hoặc để người dùng đánh giá sau.
                                Nhưng nếu bạn vẫn muốn thêm, đây là cách:
                            */}
                            <Form.Group className="mb-3" controlId="formRating">
                                <Form.Label>Điểm đánh giá (Rating)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleInputChange}
                                    min="0" max="5" step="0.1"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formRatingCount">
                                <Form.Label>Số lượt đánh giá (Rating Count)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="rating_count"
                                    value={formData.rating_count}
                                    onChange={handleInputChange}
                                    min="0"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formImage">
                                <Form.Label>Ảnh đại diện</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="image"
                                    onChange={handleInputChange}
                                    accept="image/*"
                                />
                                <Form.Text>Định dạng: JPG, PNG, GIF. Tối đa 2MB</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formIsActive">
                                <Form.Check
                                    type="switch"
                                    name="is_active"
                                    label="Hiển thị khóa học"
                                    checked={formData.is_active}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Hủy
                </Button>
                <Button variant="primary" type="submit" form="addCourseForm">
                    Lưu khóa học
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CourseAddModal;