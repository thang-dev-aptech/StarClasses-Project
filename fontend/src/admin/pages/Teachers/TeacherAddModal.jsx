import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function TeacherAddModal({ show, onHide, onSuccess }) {
    const [formData, setFormData] = useState({
        name: '',
        category: 'programming',
        subject: '',
        experience: '',
        bio: '',
        status: true,
        image: null
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (show) {
            setFormData({
                name: '',
                category: 'programming',
                subject: '',
                experience: '',
                bio: '',
                status: true,
                image: null
            });
        }
    }, [show]);

    const handleChange = (e) => {
        const { name, value, files, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append('teacher_name', formData.name);
        data.append('category', formData.category);
        data.append('subject', formData.subject);
        data.append('experience', formData.experience);
        data.append('bio', formData.bio);
        data.append('is_active', formData.status ? 1 : 0);
        if (formData.image) {
            data.append('image', formData.image);
        }
        try {
            const response = await fetch(`${API_URL}/api/teachers`, {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            if (response.ok && (result.status === 'success' || result.id || result.data)) {
                if (typeof onSuccess === 'function') onSuccess();
                onHide();
            } else {
                alert('Error: ' + (result.message || 'Could not add teacher'));
            }
        } catch {
            alert('Server connection error!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Teacher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} id="addTeacherForm">
                    <div className="row">
                        <div className="col-md-8">
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Name <span style={{color: 'red'}}>*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Category <span style={{color: 'red'}}>*</span>
                                </Form.Label>
                                <Form.Select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="programming">Programming</option>
                                    <option value="design">Design</option>
                                    <option value="business">Business</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Subject <span style={{color: 'red'}}>*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Experience</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
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
                        <div className="col-md-4">
                            <Form.Group className="mb-3">
                                <Form.Label>Profile Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                    accept="image/*"
                                />
                                <div className="form-text">
                                    Formats: JPG, PNG, GIF. Max 2MB
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3 d-flex align-items-center gap-2">
                                <Form.Check
                                    type="switch"
                                    id="status-switch"
                                    name="status"
                                    checked={formData.status}
                                    onChange={handleChange}
                                />
                                <Form.Label htmlFor="status-switch" className="mb-0">
                                    Active
                                </Form.Label>
                            </Form.Group>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} disabled={loading}>
                    Cancel
                </Button>
                <Button variant="primary" type="submit" form="addTeacherForm" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Teacher'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TeacherAddModal;
