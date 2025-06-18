import React, { useState, useEffect } from 'react';
import { getTeachers } from '../services/teacherService';
import TeacherCard from './TeacherCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/css/component.css';

function Arrow(props) {
    const { className, style, onClick, direction } = props;
    return (
        <button
            className={className}
            style={{
                ...style,   
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fff',
                border: '1.5px solid #e0e7ef',
                borderRadius: 10,
                boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
                width: 45,
                height: 70,
                zIndex: 2,
                top: '50%',
                transform: 'translateY(-50%)',
                [direction === 'left' ? 'left' : 'right']: -28,
                transition: 'box-shadow 0.2s',
                outline: 'none',
                fontSize: 24,
                color: '#111827',
                opacity: 1
            }}
            onClick={onClick}
            aria-label={direction === 'left' ? 'Trước' : 'Sau'}
        >
            {direction === 'left' ? (
                <svg width="28" height="28" viewBox="8 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            ) : (
                <svg width="28" height="28" viewBox="10 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 6 15 12 9 18" />
                </svg>
            )}
        </button>
    );
}

export default function Teacher() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getTeachers()
            .then(data => {
                setTeachers(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load teachers');
                setLoading(false);
            });
    }, []);

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <Arrow direction="right" />,
        prevArrow: <Arrow direction="left" />,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 3 } },
            { breakpoint: 900, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } }
        ]
    };

    return (
        <div className="container text-center pt-5 my-5" id='teacher'>
            <h1 className="fw-bold display-5 text-capitalize">Our Teachers</h1>
            <p className="text-secondary fs-5">Our highly qualified teachers are dedicated to your success</p>
            <div className="row mx-5">
                <div className="mx-2">
                    {loading ? (
                        <div className="col-12 text-center py-5">Loading data...</div>
                    ) : error ? (
                        <div className="col-12 text-center text-danger py-5">{error}</div>
                    ) : teachers.length === 0 ? (
                        <div className="col-12 text-center text-gray-400 py-5">No suitable teacher found</div>
                    ) : (
                        <Slider {...settings}>
                            {teachers
                                .filter(teacher => teacher.is_active)
                                .map((teacher) => (
                                    <div key={teacher.id} className='p-2'>
                                        <TeacherCard teacher={teacher} minHeight={340} />
                                    </div>
                                ))}
                        </Slider>
                    )}
                </div>
            </div>
        </div>
    );
}
