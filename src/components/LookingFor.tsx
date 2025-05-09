import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const LookingFor: React.FC = () => {
  return (
    <Container className="my-5">
      <Card className="shadow-sm border-0 bg-light">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={12}>
              <h3 className="fw-bold text-center mb-3">
                Looking for Internship
              </h3>
              <p className="text-center fs-5">
                I'm currently looking for a{" "}
                <strong>software development internship</strong> as part of my
                LIA <i>(lärande i arbete)</i> for my education. The internship
                would run from October 13, 2025 to March 13, 2026. My education
                is in Java but I can take an internship in any related language or field.
                Ideally it would be a position in Uppsala but I am open to any
                close commutes or remote work.
              </p>
              <p className="text-center text-muted">
                <i>
                  Open to remote or on-site positions in software development or
                  related fields.
                </i>
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LookingFor;
