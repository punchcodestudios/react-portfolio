import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import BadgeBar, { BadgeItem } from "../common/badge-bar/badge-bar.component";

interface Props {
  name: string;
  thumbnail: string;
  description: string;
  badgeItems: BadgeItem[];
  slug: string;
}

const GalleryGridItem = ({
  name,
  thumbnail,
  description,
  badgeItems,
  slug,
}: Props) => {
  return (
    <Col className="apply-hover">
      <Card className="m-5">
        <Card.Img variant="top" src={thumbnail} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {description}
            Description : Some quick example text to build on the card title and
            make up the bulk of the card's content.
          </Card.Text>
          <hr />
          <BadgeBar badgeItems={badgeItems}></BadgeBar>
          <Row className="m-1">
            <Link to={`/galleries/${slug}`}>View Gallery Item</Link>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default GalleryGridItem;
