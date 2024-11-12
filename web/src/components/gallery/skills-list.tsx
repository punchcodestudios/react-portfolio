import {
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import useSkills from "../../hooks/useSkills";
import getCroppedImageUrl from "../../services/image-url";
import useGalleryQueryStore from "../../state-management/gallery/gallery-store";

const SkillsList = () => {
  const { data, isLoading, error } = useSkills();
  const selectedSkillId = useGalleryQueryStore((s) => s.galleryQuery.skillId);
  const setSelectedSkillId = useGalleryQueryStore((s) => s.setSkillId);

  if (error) return null;

  {
    isLoading && <Spinner></Spinner>;
  }

  return (
    <>
      <Heading fontSize="2xl" marginTop={9} marginBottom={3}>
        Skills
      </Heading>
      <List>
        {data?.results.map((skill) => (
          <ListItem key={skill.id} paddingY="5px">
            <HStack>
              <Image
                boxSize="32px"
                borderRadius={8}
                objectFit="cover"
                src={getCroppedImageUrl(skill.image_background)}
              />
              <Button
                whiteSpace="normal"
                textAlign="left"
                fontWeight={skill.id === selectedSkillId ? "bold" : "normal"}
                onClick={() => setSelectedSkillId(skill.id)}
                fontSize="md"
                variant="link"
              >
                {skill.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SkillsList;
