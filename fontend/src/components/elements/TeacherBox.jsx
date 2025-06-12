import "../../assets/css/CourseBox.css";


export default function TeacherBox({ teacher }) {
    return (
        <div className=" course-card p-4 border rounded shadow text-start h-100">
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
    );
}