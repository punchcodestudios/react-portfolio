import { Skill } from "@/entities/Skill";
import { Grid, GridItem } from "@chakra-ui/react";
import { Image } from "react-bootstrap";
import { Card, Col, ListGroup } from "react-bootstrap";
import { Tooltip } from "react-tooltip";

interface Props {
  data: Skill[] | [];
}
const SkillGroup = ({ data }: Props) => {
  const image = require("../../../assets/img/about-me-hero.png");
  console.log(data);
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
          <Col className="">
            <Card className="mt-2">
              <div className="skills-card-header">
                <Card.Img
                  as={Image}
                  variant="top"
                  src={image}
                  className="header-img"
                />
                <Card.Title className="header-text">
                  {data[0].skill_types[0].name.toUpperCase()}
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
                        <div className="d-flex flex-row justify-content-between">
                          <a
                            data-tooltip-id={`numprojex_${item.refid}`}
                            data-tooltip-content={item.description}
                          >
                            <div>{item.name}</div>
                          </a>
                          <Tooltip
                            id={`numprojex_${item.refid}`}
                            style={{ zIndex: "1000" }}
                          ></Tooltip>
                        </div>
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
