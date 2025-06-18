import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, Image, Alert } from 'react-bootstrap';
import { teacherService } from '@/admin/services/teacherService';

// Khởi tạo form mặc định
const initialFormState = {
    full_name: '',
    avatar_url: '',
    subject: '',
    experience_years: '',
    education: '',
    achievements: '',
    bio: '',
    is_active: true
};

function TeachersModal({ show, onHide, teacher, onSuccess }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [subjectOptions, setSubjectOptions] = useState([]);

    // Effect để đồng bộ state local với prop show
    useEffect(() => {
        setIsModalOpen(show);
    }, [show]);

    // Effect để cập nhật form khi có dữ liệu giáo viên
    useEffect(() => {
        if (teacher) {
            setFormData({
                full_name: teacher.full_name || '',
                avatar_url: teacher.avatar_url || '',
                subject: teacher.subject || '',
                experience_years: teacher.experience_years || '',
                education: teacher.education || '',
                achievements: Array.isArray(teacher.achievements)
                    ? teacher.achievements.join('\n')
                    : (teacher.achievements || ''),
                bio: teacher.bio || '',
                is_active: teacher.is_active ?? true
            });
            setImagePreview(teacher.avatar_url || '');
        } else {
            setFormData(initialFormState);
            setImagePreview('');
        }
        setErrors({});
    }, [teacher]);

    // Fetch subjects list from existing teachers to suggest
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const allTeachers = await teacherService.getTeachers();
                const subjects = [...new Set(allTeachers.map(t => t.subject).filter(Boolean))];
                setSubjectOptions(subjects);
            } catch (err) {
                console.error('Error fetching subjects:', err);
            }
        };
        fetchSubjects();
    }, []);

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
        
        if (!formData.full_name?.trim()) {
            newErrors.full_name = 'Họ tên là bắt buộc';
        }

        if (!formData.subject) {
            newErrors.subject = 'Môn học là bắt buộc';
        }

        if (!formData.experience_years) {
            newErrors.experience_years = 'Kinh nghiệm là bắt buộc';
        }

        if (!formData.education?.trim()) {
            newErrors.education = 'Học vấn là bắt buộc';
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
                    avatar_url: 'Kích thước ảnh không được vượt quá 2MB'
                }));
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData(prev => ({
                    ...prev,
                    avatar_url: file
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
            // Xử lý achievements thành array
            const submitData = {
                ...formData,
                achievements: formData.achievements
                    ? formData.achievements.split('\n').map(s => s.trim()).filter(Boolean)
                    : [],
            };
            let result;
            if (teacher?.id) {
                result = await teacherService.updateTeacher(teacher.id, submitData);
            } else {
                result = await teacherService.createTeacher(submitData);
            }
            if (result && result.data) {
                onSuccess(result.data);
            } else {
                onSuccess();
            }
            handleClose();
        } catch (error) {
            console.error('Error saving teacher:', error);
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
                    {teacher ? 'Edit Teacher' : 'Add New Teacher'}
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
                                                Full Name <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="full_name"
                                                value={formData.full_name}
                                                onChange={handleChange}
                                                isInvalid={!!errors.full_name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.full_name}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>
                                                Subject <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                list="subjectOptionsList"
                                                placeholder="Enter subject"
                                                isInvalid={!!errors.subject}
                                            />
                                            <datalist id="subjectOptionsList">
                                                {subjectOptions.map((subj, idx) => (
                                                    <option key={idx} value={subj} />
                                                ))}
                                            </datalist>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>

                            <div className="mb-4">
                                <Row className="g-3">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>
                                                Experience (years) <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="experience_years"
                                                value={formData.experience_years}
                                                onChange={handleChange}
                                                isInvalid={!!errors.experience_years}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.experience_years}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>
                                                Education <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="education"
                                                value={formData.education}
                                                onChange={handleChange}
                                                isInvalid={!!errors.education}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.education}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>

                            <div className="mb-4">
                                <Form.Group className="mb-3">
                                    <Form.Label>Achievements</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="achievements"
                                        value={formData.achievements || ''}
                                        onChange={handleChange}
                                        placeholder="Mỗi dòng một thành tích"
                                    />
                                    <Form.Text className="text-muted mt-1">
                                        Mỗi dòng một thành tích
                                    </Form.Text>
                                </Form.Group>
                            </div>

                            <div className="mb-4">
                                <Form.Group>
                                    <Form.Label>Bio</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                        </Col>

                        {/* Right Column - Image & Status */}
                        <Col md={4}>
                            <div className="mb-4">
                                <h6 className="mb-3 text-primary">Profile Image</h6>
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
                                                    setFormData(prev => ({ ...prev, avatar_url: '' }));
                                                }}
                                            >
                                                <i className="bi bi-x"></i>
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="text-center mb-3">
                                            <i className="bi bi-person-circle fs-1 text-muted"></i>
                                            <p className="text-muted mb-0">No image selected</p>
                                        </div>
                                    )}
                                    <div className="d-grid">
                                        <Form.Control
                                            type="file"
                                            className="d-none"
                                            id="imageInput"
                                            accept="image/*"
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
                                    {errors.avatar_url && (
                                        <div className="text-danger small mt-1">{errors.avatar_url}</div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h6 className="mb-3 text-primary">Status</h6>
                                <Form.Check
                                    type="switch"
                                    id="is_active"
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

export default React.memo(TeachersModal); 