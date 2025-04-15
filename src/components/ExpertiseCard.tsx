import React, { useState } from "react";
import { ExpertiseItem } from "../types/Expertise";
import { Card, Button } from "react-bootstrap";

interface Props {
  expertise: ExpertiseItem;
}

const ExpertiseCard: React.FC<Props> = ({ expertise }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="mb-3 shadow-sm h-100">
      <Card.Body>
        <Card.Title>{expertise.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{expertise.category}</Card.Subtitle>
        <Card.Text>{expertise.shortDescription}</Card.Text>

        {expanded && <Card.Text>{expertise.fullDescription}</Card.Text>}

        {/*}
        <div className="mb-2">
          <strong>Proficiency:</strong> {expertise.proficiency}/10
        </div>
        */}

        <div className="d-flex flex-wrap gap-1 mb-2">
          {expertise.tags.map(tag => (
            <span key={tag} className="badge bg-secondary">{tag}</span>
          ))}
        </div>

        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => setExpanded(prev => !prev)}
        >
          {expanded ? "Collapse" : "Expand"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ExpertiseCard;
