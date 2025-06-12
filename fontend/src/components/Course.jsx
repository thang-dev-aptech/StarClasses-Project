import React, { useState } from 'react';
import CourseBox from './elements/CourseBox';
import CourseSlider from './elements/CourseSlider';
import teacherList from '../assets/teacherList.json';
import CoursePopup from './CoursePopup';
import '../assets/css/component.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function Course() {
    const [selectedSubject, setSelectedSubject] = useState(0);
    const [selectedID, setSelectedID] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const selectedSubjectName = teacherList.subjects[selectedSubject];
    // const filteredCourses = selectedSubject === 0 ? teacherList.courses : teacherList.courses.filter(
    //     course => course.subject === selectedSubjectName
    // );
    const filteredCourses = teacherList.courses
        .filter(course =>
            selectedSubject === 0 || course.subject === selectedSubjectName
        )
        .filter(course =>
            course.name.toLowerCase().includes(searchTerm.toLowerCase())
        );


    const selectedCourse = teacherList.courses.find(course => course.id === selectedID);

    return (
        <div className="text-center pt-5" id='course'>
            <h1 className="fw-bold display-5 text-capitalize">Our Classes</h1>
            <p className="text-secondary fs-5">Explore our wide range of courses designed to help you excel in your academic journey.</p>
            <div className="row mx-5">
                {/* <div>
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
                </div> */}
                <div className="subject-selector my-3">
                    {/* Dropdown cho mobile */}
                    <div className="d-block d-md-none">
                        <select
                            className="form-select bg-secondary text-white text-center"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(Number(e.target.value))}
                        >
                            {teacherList.subjects.map((item, index) => (
                                <option key={index} value={index}>{item}</option>
                            ))}
                        </select>
                    </div>

                    {/* Nút button cho desktop */}
                    <ul className="d-none d-md-flex flex-wrap gap-2 bg-body-secondary p-2 border rounded justify-content-center list-unstyled">
                        {teacherList.subjects.map((item, index) => (
                            <li key={index}>
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
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search course by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>


                {/* <div className="row align-items-stretch mx-2 ">
                    <CourseSlider courses={filteredCourses} onChangModal={setSelectedID} />
                    {filteredCourses.map((course) => (
                        <div key={course.id} className="col-12 col-md-6 col-lg-4 mb-4">
                            <CourseBox course={course} onChangModal={setSelectedID}/>
                        </div>
                    ))}
                </div> */}
                <div className="row align-items-stretch mx-2 ">
                    {filteredCourses.length === 0 ? (
                        <div className="text-center text-muted py-5">
                            <h5>No courses found.</h5>
                        </div>
                    ) : (
                        <CourseSlider courses={filteredCourses} onChangModal={setSelectedID} />
                    )}
                </div>

            </div>
            <CoursePopup
                show={selectedID !== null}
                onHide={() => setSelectedID(null)}
                course={selectedCourse}
            />
        </div>
    );
}
