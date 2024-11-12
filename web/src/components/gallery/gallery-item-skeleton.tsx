import React from "react";
import { Button, Card, Col, Placeholder } from "react-bootstrap";

const GalleryItemSkeleton = () => {
  return (
    <Col>
      <Card
        className="m-4 ms-5"
        style={{
          width: "18rem",
          height: "450px",
          borderRadius: "10",
          overflow: "hidden",
        }}
      >
        <Card.Img variant="top" src="" />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} /> Loading
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6} />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default GalleryItemSkeleton;
