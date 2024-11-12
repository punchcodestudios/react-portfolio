import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useDiscipline from "../../hooks/useDiscipline";
import useDisciplines from "../../hooks/useDisciplines";
import useGalleryQueryStore from "../../state-management/gallery/gallery-store";

const DisciplineSelector = () => {
  const { data, error } = useDisciplines();
  const setSelectedDisciplineId = useGalleryQueryStore(
    (s) => s.setDisciplineId
  );
  const selectedDisciplineId = useGalleryQueryStore(
    (s) => s.galleryQuery.disciplineId
  );
  const selectedDiscipline = useDiscipline(selectedDisciplineId);

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedDiscipline?.name || "Discipline"}
      </MenuButton>
      <MenuList>
        {data?.results.map((discipline) => (
          <MenuItem
            onClick={() => setSelectedDisciplineId(discipline.id)}
            key={discipline.id}
          >
            {discipline.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default DisciplineSelector;
