import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  ListRoot,
  Spinner,
} from "@chakra-ui/react";
import useSkills from "../../hooks/useSkills";
import getCroppedImageUrl from "../../services/image-url";
import useGalleryQueryStore from "../../state-management/gallery/gallery-query-store";

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
      <List.Root listStyleType="none">
        {data?.results.map((skill) => (
          <List.Item key={skill.id} paddingY="5px">
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
                variant="ghost"
              >
                {skill.name}
              </Button>
            </HStack>
          </List.Item>
        ))}
      </List.Root>
    </>
  );
};

export default SkillsList;
