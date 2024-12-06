import { SimpleGrid, Text } from "@chakra-ui/react";
import { Gallery } from "../../../entities/Gallery";
import DefinitionItem from "../../common/definition-item/definition-item.component";

interface Props {
  gallery: Gallery;
}
const GalleryAttributes = ({ gallery }: Props) => {
  return (
    <SimpleGrid columns={2} as="dl">
      <DefinitionItem term="Skills">
        {gallery.genres?.map((skill, index) => (
          <Text key={index}>{skill.name}</Text>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Disciplines">
        {gallery.parent_platforms?.map(({ platform }) => (
          <Text key={platform.id}>{platform.name}</Text>
        ))}
      </DefinitionItem>
    </SimpleGrid>
  );
};

export default GalleryAttributes;
