import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, Image, Alert, Tab, Tabs } from 'react-bootstrap';
import { courseService } from '@/admin/services/courseService';

// Khởi tạo form mặc định
const initialFormState = {
    course_name: '',
    category: 'Tự Nhiên',
    price: '',
    description: '',
    overview: '',
    schedule_day: '',
    schedule_time: '',
    image_url: '',
    learning_outcomes: '',
    teacher_id: '',
    is_active: true,
};

const CATEGORIES = [
    { value: 'Tự Nhiên', label: 'Tự Nhiên' },
    { value: 'Xã Hội', label: 'Xã Hội' }
];

function CoursesModal({ show, onHide, course, onSuccess, teachers = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    // Effect để đồng bộ state local với prop show
    useEffect(() => {
        setIsModalOpen(show);
    }, [show]);

    // Effect để cập nhật form khi có dữ liệu khóa học
    useEffect(() => {
        if (course) {
            setFormData({
                ...course,
                schedule_day: course.schedule && course.schedule.schedule ? course.schedule.schedule.day || '' : '',
                schedule_time: course.schedule && course.schedule.schedule ? course.schedule.schedule.time || '' : '',
                learning_outcomes: course.learning_outcomes && Array.isArray(course.learning_outcomes.outcomes)
                    ? course.learning_outcomes.outcomes.join('\n')
                    : ''
            });
            setImagePreview(course.image_url || '');
        } else {
            setFormData(initialFormState);
            setImagePreview('');
        }
        setErrors({});
    }, [course]);

    // Xử lý khi đóng modal
    const handleClose = () => {
        setIsModalOpen(false);
        setFormData(initialFormState);
        setErrors({});
        setImagePreview('');
        onHide();
    };
    // Validate form
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.course_name?.trim()) {
            newErrors.course_name = 'Tên khóa học là bắt buộc';
        } else if (formData.course_name.length < 2) {
            newErrors.course_name = 'Tên khóa học phải có ít nhất 2 ký tự';
        }

        if (!formData.category) {
            newErrors.category = 'Danh mục là bắt buộc';
        }

        if (!formData.price) {
            newErrors.price = 'Giá là bắt buộc';
        } else if (isNaN(formData.price) || Number(formData.price) < 0) {
            newErrors.price = 'Giá phải là số dương';
        }

        if (!formData.teacher_id) {
            newErrors.teacher_id = 'ID giáo viên là bắt buộc';
        }

        if (!formData.description?.trim()) {
            newErrors.description = 'Mô tả là bắt buộc';
        } else if (formData.description.length < 10) {
            newErrors.description = 'Mô tả phải có ít nhất 10 ký tự';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Xử lý khi thay đổi giá trị form
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error khi user nhập
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    // Xử lý khi thay đổi ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    image: 'Kích thước ảnh không được vượt quá 2MB'
                }));
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData(prev => ({
                    ...prev,
                    image: file
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            const submitData = {
                ...formData,
                teacher_id: formData.teacher_id,
                schedule: {
                    schedule: {
                        day: formData.schedule_day || '',
                        time: formData.schedule_time || ''
                    }
                },
                learning_outcomes: {
                    outcomes: formData.learning_outcomes
                        ? formData.learning_outcomes.split('\n').map(s => s.trim()).filter(Boolean)
                        : []
                }
            };
            let result;
            if (course?.id) {
                result = await courseService.updateCourse(course.id, submitData);
            } else {
                result = await courseService.createCourse(submitData);
            }
            if (result && result.data) {
                onSuccess(result.data);
            } else {
                onSuccess();
            }
            handleClose();
        } catch (error) {
            console.error('Error saving course:', error);
            setErrors(prev => ({
                ...prev,
                submit: error.message
            }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal 
            show={isModalOpen} 
            onHide={handleClose} 
            size="lg"
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton className="border-0">
                <Modal.Title className="fw-bold">
                    {course ? 'Edit Course' : 'Add New Course'}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row className="g-4">
                        {/* Left Column - Basic Information */}
                        <Col md={8}>
                            <div className="mb-4">
                                <Row className="g-3">
                                    <Col md={8}>
                                        <Form.Group>
                                            <Form.Label>
                                                Name <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="course_name"
                                                value={formData.course_name}
                                                onChange={handleChange}
                                                isInvalid={!!errors.course_name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.course_name}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>
                                                Category <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                isInvalid={!!errors.category}
                                            >
                                                <option value="">Select category</option>
                                                {CATEGORIES.map(cat => (
                                                    <option key={cat.value} value={cat.value}>
                                                        {cat.label}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.category}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>

                            <div className="mb-4">
                                <Form.Group>
                                    <Form.Label>
                                        Description <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        isInvalid={!!errors.description}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>

                            <div className="mb-4">
                                <Row className="g-3">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>
                                                Teacher <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Select
                                                name="teacher_id"
                                                value={formData.teacher_id}
                                                onChange={handleChange}
                                                isInvalid={!!errors.teacher_id}
                                            >
                                                <option value="">Chọn giáo viên</option>
                                                {teachers.map(teacher => (
                                                    <option key={teacher.id} value={teacher.id}>
                                                        {teacher.full_name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.teacher_id}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>
                                                Price (VND) <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                isInvalid={!!errors.price}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.price}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>

                            <div className="mb-4">
                                <Form.Group>
                                    <Form.Label>Overview</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        name="overview"
                                        value={formData.overview}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>

                            <div className="mb-4">
                                <Row className="g-3">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Schedule Day</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="schedule_day"
                                                value={formData.schedule_day}
                                                onChange={handleChange}
                                                placeholder="Ví dụ: Thứ 2,4,6"
                                            />
                                            <Form.Text className="text-muted">
                                                Các ngày học, ví dụ: Thứ 2,4,6
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Schedule Time</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="schedule_time"
                                                value={formData.schedule_time}
                                                onChange={handleChange}
                                                placeholder="Ví dụ: 18:00-20:00"
                                            />
                                            <Form.Text className="text-muted">
                                                Thời gian học, ví dụ: 18:00-20:00
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>

                            <div className="mb-4">
                                <Form.Group>
                                    <Form.Label>Learning Outcomes</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="learning_outcomes"
                                        value={formData.learning_outcomes}
                                        onChange={handleChange}
                                        placeholder="Mỗi dòng một kết quả học tập&#10;Ví dụ:&#10;Hiểu được kiến thức cơ bản&#10;Áp dụng được vào thực tế"
                                    />
                                    <Form.Text className="text-muted">
                                        Mỗi dòng một kết quả học tập
                                    </Form.Text>
                                </Form.Group>
                            </div>
                        </Col>

                        {/* Right Column - Image & Status */}
                        <Col md={4}>
                            <div className="mb-4">
                                <h6 className="mb-3 text-primary">Course Image</h6>
                                <div className="d-flex flex-column align-items-center p-3 border rounded">
                                    {imagePreview ? (
                                        <div className="position-relative mb-3">
                                            <Image
                                                src={imagePreview}
                                                alt="Preview"
                                                fluid
                                                rounded
                                                style={{ maxHeight: '200px' }}
                                            />
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="position-absolute top-0 end-0 m-1"
                                                onClick={() => {
                                                    setImagePreview('');
                                                    setFormData(prev => ({ ...prev, image_url: '' }));
                                                }}
                                            >
                                                <i className="bi bi-x"></i>
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="text-center mb-3">
                                            <i className="bi bi-image fs-1 text-muted"></i>
                                            <p className="text-muted mb-0">No image selected</p>
                                        </div>
                                    )}
                                    <div className="d-grid">
                                        <Form.Control
                                            type="file"
                                            className="d-none"
                                            id="imageInput"
                                            accept="image/jpeg,image/png,image/gif"
                                            onChange={handleImageChange}
                                        />
                                        <Form.Label
                                            htmlFor="imageInput"
                                            className="btn btn-outline-primary mb-0"
                                        >
                                            Choose File
                                        </Form.Label>
                                    </div>
                                    <Form.Text className="text-muted mt-2">
                                        Formats: JPG, PNG, GIF. Max 2MB
                                    </Form.Text>
                                    {errors.image && (
                                        <div className="text-danger small mt-1">{errors.image}</div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h6 className="mb-3 text-primary">Status</h6>
                                <Form.Check
                                    type="switch"
                                    id="isActive"
                                    label="Active"
                                    name="is_active"
                                    checked={formData.is_active}
                                    onChange={handleChange}
                                />
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer className="border-0">
                    {errors.submit && (
                        <Alert variant="danger" className="w-100">
                            {errors.submit}
                        </Alert>
                    )}
                    
                    <Button variant="secondary" onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" />
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default React.memo(CoursesModal);