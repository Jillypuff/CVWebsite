import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { EnvelopeFill, TelephoneFill, Github, Linkedin } from 'react-bootstrap-icons';

const Contact: React.FC = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center fw-bold mb-4">Contact</h2>
      <p className="text-center fs-5 text-muted mb-5">
        Feel free to reach out to me via email or connect with me on LinkedIn.
      </p>

      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <Row className="mb-3 align-items-center">
                <Col xs="auto"><EnvelopeFill size={20} className="me-2 text-primary" /></Col>
                <Col><a href="mailto:JesperLindberg92@protonmail.com" className="text-decoration-none">JesperLindberg92@protonmail.com</a></Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <Col xs="auto"><TelephoneFill size={20} className="me-2 text-primary" /></Col>
                <Col><span>+46 70 7877 420</span></Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <Col xs="auto"><Github size={20} className="me-2 text-dark" /></Col>
                <Col><a href="https://github.com/Jillypuff" target="_blank" rel="noopener noreferrer">Github</a></Col>
              </Row>

              <Row className="align-items-center">
                <Col xs="auto"><Linkedin size={20} className="me-2 text-primary" /></Col>
                <Col><a href="https://www.linkedin.com/in/jesper-lindberg-035593338/" target="_blank" rel="noopener noreferrer">Linked In</a></Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;