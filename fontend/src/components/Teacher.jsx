import React, { useState } from 'react';
import teacherList from '../assets/teacherList.json';
import '../assets/css/teacher.css';

export default function Teachers() {
    const [selectedSubject, setSelectedSubject] = useState(0);
    const selectedSubjectName = teacherList.subjects[selectedSubject];
    const filteredTeachers = selectedSubject === 0 ? teacherList.teachers : teacherList.teachers.filter(
        teacher => teacher.subject === selectedSubjectName
    );

    // const filteredTeachers = teacherList.teachers;

    return (
        <div className="text-center">
            <h1 className="fw-bold display-5 text-capitalize">Meet our expert teachers</h1>
            <p className="text-secondary fs-5">Our team of highly qualified educator are dedicated to helping you succeed</p>
            <div className="row mx-5">
                <div>
                    <ul className="d-inline-flex flex-wrap gap-2 bg-body-secondary p-2 border rounded justify-content-center">
                        {teacherList.subjects.map((item, index) => (
                            <li className="nav-item" key={index}>
                                <button
                                    className={`btn ${selectedSubject === index ? 'btn-dark active' : 'btn-light'}`}
                                    onClick={() => setSelectedSubject(index)}
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
<div className="row align-items-stretch mx-2">
    {filteredTeachers.map((teacher) => (
        <div key={teacher.id} className="col-12 col-sm-6 col-lg-4 mb-4">
            <div className="p-4 border rounded shadow text-start h-100">
                <div className="d-flex text-center justify-content-center mb-3">
                <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="img-fluid rounded-circle shadow-sm mb-3"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
                </div>
                <h5 className="fw-bold">{teacher.name}</h5>
                <p className="text-muted mb-1">{teacher.subject}</p>
                <p className="mb-1">
                    <strong>Experience:</strong> {teacher.experience}
                </p>
                <p className="mb-0">
                    <strong>Education:</strong> {teacher.education}
                </p>
            </div>
        </div>
    ))}
</div>

            </div>
        </div>
    );
}
