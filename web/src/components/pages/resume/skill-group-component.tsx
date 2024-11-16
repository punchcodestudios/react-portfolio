import { Skill } from "@/entities/Skill";
import { Grid, GridItem } from "@chakra-ui/react";
import { Image } from "react-bootstrap";
import { Card, Col, ListGroup } from "react-bootstrap";

interface Props {
  data: Skill[] | [];
  //   image?: HTMLImageElement;
}
const SkillGroup = ({ data }: Props) => {
  const image = require("../../../assets/img/about-me-hero.png");
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
      }}
      templateColumns={{
        base: "1fr",
      }}
    >
      <GridItem area="main">
        <div>
          <Col className="apply-hover">
            <Card className="mt-2">
              <div className="skills-card-header">
                <Card.Img
                  as={Image}
                  variant="top"
                  src={image}
                  className="header-img"
                />
                <Card.Title className="header-text">
                  {data[0].skill_types[0].name}
                </Card.Title>
              </div>
              <Card.Body>
                <ListGroup variant="flush">
                  {data.map((item) => {
                    return (
                      <ListGroup.Item
                        key={item.refid}
                        style={{ fontSize: "medium" }}
                      >
                        {item.name}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </div>
      </GridItem>
    </Grid>
  );
};

export default SkillGroup;
