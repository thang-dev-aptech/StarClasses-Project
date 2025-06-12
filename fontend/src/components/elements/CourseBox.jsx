import { Star } from 'lucide-react';
import { Card, Badge, Button } from "react-bootstrap";
import "../../assets/css/CourseBox.css";


export default function CourseBox({ course, onChangModal }) {
    return (
        // <div className="rounded shadow text-start h-100 overflow-hidden">
        //     <div className="">
        //         <img
        //             src={course.image}
        //             alt={course.name}
        //             className="img-fluid"
        //             style={{objectFit: 'cover' }}
        //         />
        //     </div>
        //     <div className="p-4">
        //         <h2 className="text-xl font-bold text-gray-900">{course.subject}</h2>
        //         <p className="text-sm text-gray-500 mb-3">{course.description}</p>

        //         <div className="flex items-center text-sm text-gray-700 mb-4">
        //             <Star size={16} className="text-warning me-1" fill="currentColor" />
        //             <span className="fw-semibold me-1">{course.rating} Rating</span>
        //             <span className="text-gray-500">({course.reviews.length} student)</span>
        //         </div>

        //         <button className="w-full bg-warning text-dark py-2 rounded-md" onClick={() => onChangModal(course.id)}>
        //             Consulting registration
        //         </button>
        //     </div>

        // </div>
        <Card className="course-card h-100 shadow border rounded overflow-hidden mb-2">
            <div className="bg-light d-flex align-items-center justify-content-center">
                <i >
                    <img
                        src={course.image}
                        alt={course.name}
                        className="img-fluid"
                        style={{ objectFit: 'cover' }}
                    />
                </i>
            </div>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <Badge bg="light" text="dark">{course.subject}</Badge>
                    <Badge bg="light" text="muted">
                        <i className="bi bi-clock me-1"></i>{course.duration}
                    </Badge>
                    <Badge bg="warning" text="dark">
                        <i className="bi bi-star-fill me-1"></i> {course.rating}
                    </Badge>
                </div>
                {/* <div className="text-muted mb-2 px-4 small d-flex justify-content-between align-items-center">
                    <div>
                        <i className="bi bi-people-fill me-1"></i>{course.reviews.length} students
                        <span className="mx-2">•</span>
                    </div>
                    <div>
                        <i className="bi bi-clock me-1"></i>{course.duration}
                    </div>
                </div> */}
                <Card.Title className="h6">{course.name}</Card.Title>
                <Card.Text className="mb-2 small text-start" style={{height: "60px"}}>{course.description}</Card.Text>
                <div className="d-flex align-items-center mb-3">
                    <img
                        src={course.imageTeacher} // hoặc đường dẫn ảnh cố định, ví dụ: "/path/to/avatar.jpg"
                        alt={course.nameTeacher}
                        className="rounded-circle me-3"
                        style={{ width: "40px", height: "40px", objectFit: "cover" }}
                    />
                    <div>
                        <div className="fw-semibold small text-start">{course.nameTeacher}</div>
                        <div className="text-muted small">{course.experience} of experience</div>
                    </div>
                </div>

                <Button variant="warning" className="w-100" onClick={() => onChangModal(course.id)}>Xem chi tiết khóa học</Button>
            </Card.Body>
        </Card>
    );
}