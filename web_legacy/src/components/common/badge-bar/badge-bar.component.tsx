import { Badge, Col, Row } from "react-bootstrap";

export interface BadgeItem {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

interface Props {
  badgeItems: BadgeItem[];
  fontSize?: string;
}

const BadgeBar = ({ badgeItems, fontSize = "pcs-font-xs" }: Props) => {
  return (
    <Row className={`ps-0 pe-0 me-0 ms-0 mt-2 mb-2 ${fontSize}`}>
      {badgeItems.map((item) => {
        return (
          <Col xs="auto" key={item.id}>
            <Badge bg="secondary">{item.name}</Badge>
          </Col>
        );
      })}
    </Row>
  );
};
export default BadgeBar;
