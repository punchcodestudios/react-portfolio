import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import useDiscipline from "../../hooks/useDiscipline";
import useDisciplines from "../../hooks/useDisciplines";
import useGalleryQueryStore from "../../state-management/gallery/gallery-query-store";
import { BsChevronDown } from "react-icons/bs";

const SkillTagSelector = () => {
  const { data, error } = useDisciplines();
  // console.log(data?.results);
  const setSelectedDisciplineId = useGalleryQueryStore(
    (s) => s.setDisciplineId
  );
  const selectedDisciplineId = useGalleryQueryStore(
    (s) => s.galleryQuery.disciplineId
  );
  const selectedDiscipline = useDiscipline(selectedDisciplineId);

  if (error) return null;

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm" fontSize="sm">
          {selectedDiscipline?.name || "Discipline"} <BsChevronDown />
        </Button>
      </MenuTrigger>
      <MenuContent>
        {data?.results.map((discipline) => (
          <MenuItem
            onClick={() => setSelectedDisciplineId(discipline.id)}
            key={discipline.id}
            value={discipline.name}
          >
            {discipline.name}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
};

export default SkillTagSelector;
