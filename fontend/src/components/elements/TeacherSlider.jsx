// elements/TeacherSlider.jsx
import React from 'react';
import Slider from 'react-slick';
import TeacherBox from './TeacherBox';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/css/CourseSlider.css";


// Mũi tên Prev
const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow custom-prev d-flex align-items-center justify-content-center`}
    style={style}
    onClick={onClick}
  >
    {/* <i className="bi bi-chevron-left"></i> */}
  </div>
);

const NextArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow custom-next d-flex align-items-center justify-content-center`}
    style={style}
    onClick={onClick}
  >
    {/* <i className="bi bi-chevron-right"></i> */}
  </div>
);


const TeacherSlider = ({teachers}) => {
  const settings = {
    dots: true,
    infinite: teachers.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {teachers.map((teacher) => (
        <div key={teacher.id} className="px-2">
          <TeacherBox teacher={teacher}/>
        </div>
      ))}
    </Slider>
  );
};

export default TeacherSlider;
