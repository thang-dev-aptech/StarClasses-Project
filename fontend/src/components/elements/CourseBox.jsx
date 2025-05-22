import { Star } from 'lucide-react'; 

export default function CourseBox({ course }) {
    return (
        <div className="border rounded shadow text-start h-100">
            <div className="d-flex">
                <img
                    src={course.image}
                    alt={course.name}
                    className="img-fluid shadow-sm"
                    // style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900">{course.subject}</h2>
                <p className="text-sm text-gray-500 mb-3">{course.description}</p>

                <div className="flex items-center text-sm text-gray-700 mb-4">
                    <Star size={16} className="text-warning me-1" fill="currentColor" />
                    <span className="fw-semibold me-1">{course.rating} Rating</span>
                    <span className="text-gray-500">({course.reviews.length} student)</span>
                </div>

                <button className="w-full bg-warning text-dark font-semibold py-2 rounded-md">
                    Đăng kí tư vấn
                </button>
            </div>
            
        </div>
    );
}