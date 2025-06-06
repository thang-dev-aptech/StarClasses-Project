import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const defaultForm = {
    course_name: '',
    category: '',
    price: '',
    description: '',
    overview: '',
    schedule: '',
    image_url: '',
    learning_outcomes: '',
    teacher_id: '',
    is_active: true,
};

function CoursesModal({ show, onHide, onSubmit, mode, course }) {
    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        if (mode === 'edit' && course) {
            setForm({
                course_name: course.course_name || '',
                category: course.category || '',
                price: course.price || '',
                description: course.description || '',
                overview: course.overview || '',
                schedule: course.schedule ? JSON.stringify(course.schedule, null, 2) : '',
                image_url: course.image_url || '',
                learning_outcomes: course.learning_outcomes ? JSON.stringify(course.learning_outcomes, null, 2) : '',
                teacher_id: course.teacher_id || '',
                is_active: course.is_active ?? true,
                id: course.id,
            });
        } else {
            setForm(defaultForm);
        }
    }, [show, mode, course]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let schedule = form.schedule;
        let learning_outcomes = form.learning_outcomes;
        try {
            schedule = schedule ? JSON.parse(schedule) : null;
        } catch {
            alert('Lịch học (schedule) phải là JSON hợp lệ!');
            return;
        }
        try {
            learning_outcomes = learning_outcomes ? JSON.parse(learning_outcomes) : null;
        } catch {
            alert('Kết quả đầu ra (learning_outcomes) phải là JSON hợp lệ!');
            return;
        }
        const submitData = {
            ...form,
            price: Number(form.price),
            teacher_id: Number(form.teacher_id),
            schedule,
            learning_outcomes,
        };
        onSubmit(submitData);
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {mode === 'edit' ? 'Sửa khoá học' : 'Thêm khoá học'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="g-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Tên khoá học <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="course_name"
                                    value={form.course_name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Nhập tên khoá học"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Danh mục</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: Toán, Lý, Hóa..."
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Giá (VNĐ)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    min="0"
                                    placeholder="Nhập giá khoá học"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Giáo viên (ID)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="teacher_id"
                                    value={form.teacher_id}
                                    onChange={handleChange}
                                    min="1"
                                    placeholder="ID giáo viên"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>Mô tả (Description)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Mô tả ngắn về khoá học"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>Tổng quan (Overview)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name="overview"
                                    value={form.overview}
                                    onChange={handleChange}
                                    placeholder="Tổng quan về khoá học"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Lịch học (Schedule, JSON)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name="schedule"
                                    value={form.schedule}
                                    onChange={handleChange}
                                    placeholder='{"day": "Monday", "time": "8:00"}'
                                />
                                <Form.Text className="text-muted">
                                    Nhập JSON, ví dụ: {"{\"day\": \"Monday\", \"time\": \"8:00\"}"}
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Kết quả đầu ra (Learning Outcomes, JSON)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name="learning_outcomes"
                                    value={form.learning_outcomes}
                                    onChange={handleChange}
                                    placeholder='["Hiểu kiến thức cơ bản", "Vận dụng thực tế"]'
                                />
                                <Form.Text className="text-muted">
                                    Nhập JSON, ví dụ: {`["Hiểu kiến thức cơ bản", "Vận dụng thực tế"]`}
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Ảnh (URL)</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="image_url"
                                    value={form.image_url}
                                    onChange={handleChange}
                                    placeholder="Link ảnh khoá học"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="d-flex align-items-center">
                            <Form.Group>
                                <Form.Label className="me-2">Trạng thái</Form.Label>
                                <Form.Check
                                    type="switch"
                                    name="is_active"
                                    label={form.is_active ? 'Hiển thị' : 'Ẩn'}
                                    checked={form.is_active}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Huỷ</Button>
                    <Button variant="primary" type="submit">{mode === 'edit' ? 'Lưu thay đổi' : 'Thêm mới'}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CoursesModal;