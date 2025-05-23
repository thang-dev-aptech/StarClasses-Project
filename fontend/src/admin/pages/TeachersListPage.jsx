import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const TeachersListPage = () => {
    return (
        <section className='p-4 main-content'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex gap-2">
                    <button className="btn btn-primary">
                        <i className="bi bi-plus-lg me-2"></i>Thêm giáo viên mới
                    </button>
                </div>
                <div className="d-flex gap-2">
                    <form method="get" className="d-flex gap-2" style={{maxWidth: '600px'}}>
                        <input type="text" name="search" className="form-control" placeholder="Tìm kiếm giáo viên..." />
                        <select name="category" className="form-select" style={{width: '180px'}}>
                            <option value="all">Tất cả danh mục</option>
                            <option value="programming">Lập trình</option>
                            <option value="design">Thiết kế</option>
                            <option value="business">Kinh doanh</option>
                        </select>
                        <button className="btn btn-outline-primary" type="submit">Search</button>
                    </form>
                </div>
            </div>
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                <th className="border-0" style={{width: '60px'}}>ID</th>
                                <th className="border-0">Tên giáo viên</th>
                                <th className="border-0">Danh mục</th>
                                <th className="border-0">Môn học</th>
                                <th className="border-0">Kinh nghiệm</th>
                                <th className="border-0">Trạng thái</th>
                                <th className="border-0">Ảnh đại diện</th>
                                <th className="border-0" style={{width: '150px'}}>Hành động</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeachersListPage;
