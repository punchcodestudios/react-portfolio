import {
  // Button,
  Heading,
  // HStack,
  // Image,
  List,
  Spinner,
} from "@chakra-ui/react";
import useSkills from "../../hooks/useSkills";
// import useGalleryQueryStore from "../../state-management/gallery/gallery-query-store";
import { SkillRequest } from "@/entities/Resume";

const SkillsList = () => {
  const { isLoading, error } = useSkills({} as SkillRequest);
  // const selectedSkillId = useGalleryQueryStore((s) => s.galleryQuery.skillId);
  // const setSelectedSkillId = useGalleryQueryStore((s) => s.setSkillId);

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
        {/* {data?.results.map((skill, index) => (
          <List.Item key={index} paddingY="5px">
            <HStack>
              <Image
                boxSize="32px"
                borderRadius={8}
                objectFit="cover"
                src={""}
              />
              <Button
                whiteSpace="normal"
                textAlign="left"
                fontWeight="bold"
                onClick={() => setSelectedSkillId(1)}
                fontSize="md"
                variant="ghost"
              >
                skillname {skill.all[0].name}
              </Button>
            </HStack>
          </List.Item>
        ))} */}
      </List.Root>
    </>
  );
};

export default SkillsList;
