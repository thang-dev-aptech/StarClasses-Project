import "../assets/css/contact.css";
import { useEffect, useState } from "react";
import { ButtonCustom } from "../components/ButtonCustom";
import "../App.css";
import "../assets/css/contact.css";
function Contact() {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState({});
  

  useEffect(() => {
    const fetchCourses = async () => {
      setLoadingCourses(true);
      try {
        const response = await fetch("http://localhost:8000/api/courses");
        const data = await response.json();
        if (data.status === "success" && Array.isArray(data.data)) {
          setCourses(data.data);
        } else if (data.status === "success" && Array.isArray(data)) {
          setCourses(data);
        } else {
          console.error('Invalid data format received:', data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
    
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  const validate = (data) => {
    const errors = {};
    if (!data.first_name) errors.first_name = "Vui lòng nhập tên.";
    if (!data.last_name) errors.last_name = "Vui lòng nhập họ.";
    if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Vui lòng nhập email hợp lệ.";
    if (!data.subject) errors.subject = "Vui lòng chọn khóa học.";
    if (!data.phone || !data.phone.match(/^(0|\+84)(\d{9,10})$/)) errors.phone = "Vui lòng nhập số điện thoại hợp lệ.";
    if (!data.message) errors.message = "Vui lòng nhập nội dung.";
    return errors;
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    }
    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });
      const response = await fetch(
        "http://localhost:8000/api/contact",
        {
          method: "POST",
          body: formDataObj,
        }
      );
      const resData = await response.json();
      if (resData.status === "success") {
        setSuccessMessage(
          "🎉 Cảm ơn bạn! Chúng tôi đã nhận được thông tin và sẽ liên hệ lại sớm nhất."
        );
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          subject: "",
          phone: "",
          message: "",
        });
        setErrorMessage({});
        setTimeout(() => setSuccessMessage(""), 2000);
      } else {
        setSuccessMessage("");
        alert("Gửi liên hệ thất bại. Vui lòng thử lại sau.");
      }
    } catch {
      setSuccessMessage("");
      alert("Có lỗi xảy ra khi gửi liên hệ.");
    }
  };

  return (
    <>
      <div className="container py-5" id="contact">
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5">Liên hệ với chúng tôi</h1>
          <p className="text-secondary fs-5">
            Có thắc mắc? Hãy để lại thông tin, chúng tôi sẽ hỗ trợ bạn nhanh nhất có thể.
          </p>
        </div>

        <div className="row gx-5 gy-4">
          <div className="col-lg-6 col-md-12">
            <div className="border rounded p-4 shadow-sm contact-form h-100">
              <h5 className="fw-semibold mb-2">Gửi tin nhắn cho chúng tôi</h5>
              <p className="text-secondary mb-4">
                Điền thông tin vào form dưới đây, chúng tôi sẽ phản hồi sớm nhất.
              </p>
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="form-label fw-medium">Tên</label>
                    <input
                      type="text"
                      className={`form-control ${errorMessage.first_name ? "input-error" : ""}`}
                      placeholder="Nhập tên"
                      name="first_name"
                      onChange={handleOnchange}
                      value={formData.first_name}
                    />
                    <div className="text-danger">
                      {errorMessage.first_name && (
                        <span>{errorMessage.first_name}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Họ</label>
                    <input
                      type="text"
                      className={`form-control ${errorMessage.last_name ? "input-error" : ""}`}
                      placeholder="Nhập họ"
                      name="last_name"
                      onChange={handleOnchange}
                      value={formData.last_name}
                    />
                    <div className="text-danger">
                      {errorMessage.last_name && (
                        <span>{errorMessage.last_name}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errorMessage.email ? "input-error" : ""}`}
                    placeholder="nhap.email@email.com"
                    name="email"
                    onChange={handleOnchange}
                    value={formData.email}
                  />
                  <div className="text-danger">
                    {errorMessage.email && <span>{errorMessage.email}</span>}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-medium">Khóa học quan tâm</label>
                  <select
                    className={`form-control ${errorMessage.subject ? "input-error" : ""}`}
                    name="subject"
                    onChange={handleOnchange}
                    value={formData.subject}
                  >
                    <option value="" disabled hidden>
                      --Chọn khóa học--
                    </option>
                    {loadingCourses ? (
                      <option disabled>Đang tải danh sách khóa học...</option>
                    ) : (
                      courses.map((course) => (
                        <option key={course.id} value={course.course_name}>
                          {course.course_name}
                        </option>
                      ))
                    )}
                  </select>
                  <div className="text-danger ">
                    {errorMessage.subject && (
                      <span>{errorMessage.subject}</span>
                    )}
                  </div>
                </div>

                <div className="mb-3 ">
                  <label className="form-label fw-medium">Số điện thoại</label>
                  <input
                    type="tel"
                    className={`form-control ${errorMessage.phone ? "input-error" : ""}`}
                    placeholder="Nhập số điện thoại"
                    name="phone"
                    onChange={handleOnchange}
                    value={formData.phone}
                  />
                  <div className="text-danger">
                    {errorMessage.phone && <span>{errorMessage.phone}</span>}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">Nội dung</label>
                  <textarea
                    className={`form-control ${errorMessage.message ? "input-error" : ""}`}
                    placeholder="Nhập nội dung liên hệ..."
                    name="message"
                    rows="4"
                    onChange={handleOnchange}
                    value={formData.message}
                  ></textarea>
                  <div className="text-danger">
                    {errorMessage.message && (
                      <span>{errorMessage.message}</span>
                    )}
                  </div>
                  {successMessage && (
                    <div className="alert alert-success fw-semibold mt-3">
                      {successMessage}
                    </div>
                  )}
                </div>

                <ButtonCustom
                  text="Gửi liên hệ"
                  className="btn btn-warning w-100 fw-semibold"
                  type="submit"
                />
              </form>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="border rounded p-4 mb-4 shadow-sm contact-info">
              <h5 className="mb-2">Đến trung tâm của chúng tôi</h5>
              <p className="text-secondary">
                Chúng tôi nằm tại trung tâm thành phố Hà Nội.
              </p>

              <div className="mb-3">
                <h6>Địa chỉ</h6>
                <p className="text-secondary">
                  285 Đội Cấn, Ba Đình, Hà Nội, Việt Nam.
                </p>
              </div>

              <div className="mb-3">
                <h6>Giờ làm việc</h6>
                <p className="text-secondary mb-0">
                  Thứ 2 - Thứ 6: 9:00 - 20:00
                </p>
                <p className="text-secondary mb-0">
                  Thứ 7: 10:00 - 16:00
                </p>
                <p className="text-secondary">Chủ nhật: Nghỉ</p>
              </div>

              <div className="mb-2">
                <h6>Liên hệ</h6>
                <p className="text-secondary mb-0">Số điện thoại: 1234567890</p>
                <p className="text-secondary">Email: info@starclasses.com</p>
              </div>
            </div>

            <div>
              <iframe
                title="Vị trí trung tâm"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.9232491378457!2d105.81641017508112!3d21.03575678061532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab0d127a01e7%3A0xab069cd4eaa76ff2!2zMjg1IFAuIMSQ4buZaSBD4bqlbiwgTGnhu4V1IEdpYWksIEJhIMSQw6xuaCwgSMOgIE7hu5lpIDEwMDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1747225727624!5m2!1svi!2s"
                height="300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-100 rounded border"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;