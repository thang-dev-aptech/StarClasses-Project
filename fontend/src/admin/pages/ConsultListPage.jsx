import React from 'react';

const ConsultListPage = () => {
  // Mock data
  const consults = [
    { id: 1, name: 'Nguyen Van A', email: 'a@gmail.com', phone: '0123456789', message: 'I want consultation about the course.', created_at: '2024-05-26 10:00' },
    { id: 2, name: 'Tran Thi B', email: 'b@gmail.com', phone: '0987654321', message: 'Is there a trial for this course?', created_at: '2024-05-25 15:30' },
    { id: 3, name: 'Le Van C', email: 'c@gmail.com', phone: '0111222333', message: 'I need more consultation.', created_at: '2024-05-24 09:20' },
  ];

  return (
    <section className="p-4 main-content">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Consultation/Feedback List</h2>
      </div>
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="border-0 text-center" style={{width: '60px'}}>ID</th>
                  <th className="border-0">Name</th>
                  <th className="border-0">Email</th>
                  <th className="border-0">Phone</th>
                  <th className="border-0">Message</th>
                  <th className="border-0">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {consults.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center">No consultations found</td>
                  </tr>
                ) : (
                  consults.map(consult => (
                    <tr key={consult.id}>
                      <td className="text-center">{consult.id}</td>
                      <td>{consult.name}</td>
                      <td>{consult.email}</td>
                      <td>{consult.phone}</td>
                      <td>{consult.message}</td>
                      <td>{consult.created_at}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultListPage;