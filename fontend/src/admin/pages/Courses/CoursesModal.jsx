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
    schedule: '',
    image_url: '',
    learning_outcomes: '',
    teacher_id: '',
    is_active: true,
    materials: []
};

const ALLOWED_FILE_TYPES = {
    'application/pdf': 'PDF',
    'application/msword': 'DOC',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
    'application/vnd.ms-powerpoint': 'PPT',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX',
    'video/mp4': 'MP4',
    'video/webm': 'WEBM'
};

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const CATEGORIES = [
    { value: 'Tự Nhiên', label: 'Tự Nhiên' },
    { value: 'Xã Hội', label: 'Xã Hội' }
];

function CoursesModal({ show, onHide, course, onSuccess }) {
    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [errors, setErrors] = useState({});
    const [activeTab, setActiveTab] = useState('basic');
    const [materials, setMaterials] = useState([]);

    // Effect để cập nhật form khi có dữ liệu khóa học
    useEffect(() => {
        if (course) {
            setFormData({
                ...course,
                schedule: Array.isArray(course.schedule) ? course.schedule.join('\n') : '',
                learning_outcomes: Array.isArray(course.learning_outcomes) ? course.learning_outcomes.join('\n') : ''
            });
            setImagePreview(course.image_url || '');
            loadCourseMaterials(course.id);
        } else {
            setFormData(initialFormState);
            setImagePreview('');
            setMaterials([]);
        }
        setErrors({});
        setActiveTab('basic');
    }, [course]);

    const loadCourseMaterials = async (courseId) => {
        try {
            const response = await courseService.getCourseMaterials(courseId);
            setMaterials(response.materials || []);
        } catch (error) {
            console.error('Error loading materials:', error);
        }
    };

    const handleDeleteMaterial = async (materialId) => {
        if (!window.confirm('Are you sure you want to delete this material?')) {
            return;
        }

        try {
            setLoading(true);
            await courseService.deleteMaterial(course.id, materialId);
            await loadCourseMaterials(course.id);
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                material: error.message
            }));
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Basic validation
        if (!formData.course_name.trim()) newErrors.course_name = 'Tên khóa học là bắt buộc';
        if (!formData.category) newErrors.category = 'Danh mục là bắt buộc';
        if (!formData.price) newErrors.price = 'Giá là bắt buộc';
        if (!formData.teacher_id) newErrors.teacher_id = 'ID giáo viên là bắt buộc';
        if (!formData.description) newErrors.description = 'Mô tả là bắt buộc';
        
        // Price validation
        if (formData.price && (isNaN(formData.price) || Number(formData.price) < 0)) {
            newErrors.price = 'Giá phải là số dương';
        }

        // Schedule validation
        if (formData.schedule) {
            const scheduleLines = formData.schedule.split('\n').filter(line => line.trim());
            if (scheduleLines.length === 0) {
                newErrors.schedule = 'Lịch học không được để trống';
            }
        }

        // Learning outcomes validation
        if (formData.learning_outcomes) {
            const outcomesLines = formData.learning_outcomes.split('\n').filter(line => line.trim());
            if (outcomesLines.length === 0) {
                newErrors.learning_outcomes = 'Kết quả học tập không được để trống';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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

    const handleMaterialUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!ALLOWED_FILE_TYPES[file.type]) {
            setErrors(prev => ({
                ...prev,
                material: `Loại file không được hỗ trợ. Chỉ chấp nhận: ${Object.values(ALLOWED_FILE_TYPES).join(', ')}`
            }));
            return;
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            setErrors(prev => ({
                ...prev,
                material: 'Kích thước file không được vượt quá 50MB'
            }));
            return;
        }

        try {
            setLoading(true);
            const material = {
                file,
                type: ALLOWED_FILE_TYPES[file.type],
                description: 'Course material'
            };

            await courseService.uploadCourseMaterial(course.id, material);
            await loadCourseMaterials(course.id);
            
            // Clear the file input
            e.target.value = '';
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                material: error.message
            }));
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            
            if (course) {
                await courseService.updateCourse(course.id, formData);
            } else {
                await courseService.createCourse(formData);
            }
            onSuccess();
            onHide();
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton className="border-0">
                <Modal.Title className="fw-bold">
                    {course ? 'Edit Course' : 'Add New Course'}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Tabs
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTab(k)}
                        className="mb-4"
                    >
                        <Tab eventKey="basic" title="Basic Information">
                            <Row className="g-4">
                                {/* Left Column - Basic Information */}
                                <Col md={6}>
                                    <h6 className="mb-3 text-primary">Basic Information</h6>
                                    
                                    <Form.Group className="mb-3">
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

                                    <Form.Item
                                        name="description"
                                        label="Description"
                                        rules={[
                                            { required: true, message: 'Please input description!' },
                                            { min: 10, message: 'Description must be at least 10 characters!' }
                                        ]}
                                    >
                                        <TextArea rows={4} />
                                    </Form.Item>

                                    <Form.Item
                                        name="category"
                                        label="Category"
                                        rules={[{ required: true, message: 'Please select category!' }]}
                                    >
                                        <Select
                                            options={CATEGORIES}
                                            showSearch
                                            allowClear
                                        />
                                    </Form.Item>

                                    <Form.Group className="mb-3">
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

                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Teacher ID <span className="text-danger">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="teacher_id"
                                            value={formData.teacher_id}
                                            onChange={handleChange}
                                            isInvalid={!!errors.teacher_id}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.teacher_id}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
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

                                    <Form.Group className="mb-3">
                                        <Form.Label>Overview</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="overview"
                                            value={formData.overview}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>

                                {/* Right Column - Additional Information */}
                                <Col md={6}>
                                    <h6 className="mb-3 text-primary">Additional Information</h6>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Course Image</Form.Label>
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
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Schedule</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="schedule"
                                            value={formData.schedule}
                                            onChange={handleChange}
                                            placeholder="Mỗi dòng một lịch học&#10;Ví dụ:&#10;Thứ 2: 8:00 - 10:00&#10;Thứ 4: 14:00 - 16:00"
                                        />
                                        <Form.Text className="text-muted">
                                            Mỗi dòng sẽ được xử lý như một lịch học riêng biệt
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
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
                                            Mỗi dòng sẽ được xử lý như một kết quả học tập riêng biệt
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Check
                                        type="switch"
                                        id="isActive"
                                        label="Active"
                                        name="is_active"
                                        checked={formData.is_active}
                                        onChange={handleChange}
                                        className="mb-3"
                                    />
                                </Col>
                            </Row>
                        </Tab>

                        <Tab eventKey="materials" title="Course Materials" disabled={!course}>
                            <div className="p-3">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h6 className="mb-0">Course Materials</h6>
                                    <div>
                                        <input
                                            type="file"
                                            id="material-upload"
                                            className="d-none"
                                            onChange={handleMaterialUpload}
                                            accept={Object.keys(ALLOWED_FILE_TYPES).join(',')}
                                        />
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => document.getElementById('material-upload').click()}
                                            disabled={loading}
                                        >
                                            <i className="bi bi-upload me-2"></i>
                                            Upload Material
                                        </Button>
                                    </div>
                                </div>

                                {errors.material && (
                                    <Alert variant="danger" onClose={() => setErrors(prev => ({ ...prev, material: null }))} dismissible>
                                        {errors.material}
                                    </Alert>
                                )}

                                {materials.length === 0 ? (
                                    <div className="text-center text-muted py-5">
                                        <i className="bi bi-file-earmark-text display-4"></i>
                                        <p className="mt-3">No materials uploaded yet</p>
                                    </div>
                                ) : (
                                    <div className="list-group">
                                        {materials.map((material, index) => (
                                            <div key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                                <div>
                                                    <i className={`bi bi-file-earmark-${material.type.toLowerCase()} me-2`}></i>
                                                    {material.name}
                                                </div>
                                                <div>
                                                    <Button
                                                        variant="link"
                                                        size="sm"
                                                        className="text-danger"
                                                        onClick={() => handleDeleteMaterial(material.id)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Tab>
                    </Tabs>
                </Modal.Body>

                <Modal.Footer className="border-0">
                    {errors.submit && (
                        <Alert variant="danger" className="w-100">
                            {errors.submit}
                        </Alert>
                    )}
                    
                    <Button variant="secondary" onClick={onHide} disabled={loading}>
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