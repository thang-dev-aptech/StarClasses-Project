import { Card, Badge, Button, Modal } from "react-bootstrap";
import "../assets/css/courseCard.css";
export default function CourseCard({ course, onChangModal }) {
    return (
        <Card className="course-card-hover shadow-sm border-0 rounded-1 overflow-hidden mb-4 d-flex flex-column" style={{ minHeight: 420, height: '100%' }}>
            {/* Image */}
            <div style={{ height: 180, background: "#f5f6fa" }}>
                <Card.Img
                    src={`http://localhost:8000/${course.image}`}
                    alt={course.name}
                    style={{ height: 180, objectFit: "cover" }}
                />
            </div>

            {/* Info */}
            <Card.Body className="pb-3 d-flex flex-column flex-grow-1">
                <Card.Title className="fw-bold fs-5 mb-1" style={{ minHeight: 48, overflow: 'hidden' }}>
                    {course.name}
                </Card.Title>
                <Card.Text className="text-muted mb-2" style={{ minHeight: 48, maxHeight: 48, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {course.description}
                </Card.Text>
                <div className="d-flex align-items-center mb-2">
                    <img
                        src={`http://localhost:8000/${course.teacher.avatar}`}
                        alt={course.teacher.name}
                        className="rounded-circle me-2"
                        style={{ width: 36, height: 36, objectFit: "cover", background: "#f5f6fa" }}
                    />
                    <div>
                        <div className="fw-semibold">{course.teacher.name}</div>
                        <div className="text-muted small">{course.teacher.experience} years</div>
                    </div>
                </div>
                {/* Tags */}
                <div className="mb-3">
                    {course.tags && course.tags.map((tag, idx) => (
                        <Badge
                            key={idx}
                            bg={idx === 0 ? "success" : idx === 1 ? "primary" : "info"}
                            className="me-2 mb-1"
                            style={{ fontSize: 13, fontWeight: 500 }}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
                <div className="mt-auto">
                  <Button
                      variant="warning"
                      className="w-100 fw-bold py-2 rounded-2 shadow-sm border-0 btn-detail-course"
                      style={{
                          fontSize: 18,
                          letterSpacing: 0.5,
                          marginTop: 10,
                      }}
                      onClick={() => onChangModal && onChangModal(course.id)}
                  >
                      View course details
                  </Button>
                </div>
            </Card.Body>
        </Card>
    );
}