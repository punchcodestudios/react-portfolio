import { ExperienceLineItem } from "@/entities/Resume";
import { ListGroup } from "react-bootstrap";

interface Props {
  items: ExperienceLineItem[] | [];
}
const ExperienceLineItems = ({ items }: Props) => {
  {
    if (items.length == 0) {
      return (
        <ListGroup variant="flush">
          <ListGroup.Item style={{ fontSize: "large" }} className="mt-3 pb-3">
            <p>no line items available</p>
          </ListGroup.Item>
        </ListGroup>
      );
    }
  }
  return (
    <ListGroup variant="flush">
      {items?.map((lineitem) => {
        return (
          <ListGroup.Item
            key={lineitem.refid}
            style={{ fontSize: "large" }}
            className="mt-3 pb-3"
          >
            <p>{lineitem.text}</p>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default ExperienceLineItems;
