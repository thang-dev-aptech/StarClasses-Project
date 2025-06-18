import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Achievements() {
  const stats = [
    { number: '95%', label: 'Tỷ lệ đỗ đại học' },
    { number: '8,500+', label: 'Học sinh đã học' },
    { number: '50+', label: 'Giáo viên chuyên môn' },
    { number: '25+', label: 'Giải thưởng đạt được' },
  ];

  return (
    <div className="pt-2" id='achievements'>
      <div className="py-5" style={{ backgroundColor: '#fffcdc' }}>
        <Container className="text-center">
          <h2 className="fw-bold display-5">Thành tích nổi bật</h2>
          <p className="text-muted mb-5">
            Chúng tôi tự hào về thành tích và sự thành công của học sinh Star Classes.
          </p>

          <Row className="g-4 justify-content-center">
            {stats.map((stat, idx) => (
              <Col xs={6} md={3} key={idx}>
                <Card className="border-0 shadow-sm rounded-4 py-4">
                  <Card.Body>
                    <h3 className="fw-bold text-warning">{stat.number}</h3>
                    <p className="mb-0 fw-semibold">{stat.label}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Achievements;
