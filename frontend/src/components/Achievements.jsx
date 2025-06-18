import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Achievements() {
  const stats = [
    { number: '95%', label: 'University admission rate' },
    { number: '8,500+', label: 'Students enrolled' },
    { number: '50+', label: 'Expert teachers' },
    { number: '25+', label: 'Awards achieved' },
  ];

  return (
    <div className="pt-2" id='achievements'>
      <div className="py-5" style={{ backgroundColor: '#fffcdc' }}>
        <Container className="text-center">
          <h2 className="fw-bold display-5">Our Achievements</h2>
          <p className="text-muted mb-5">
            We are proud of the accomplishments and success of Star Classes students.
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
