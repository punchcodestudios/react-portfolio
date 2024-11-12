import useDisciplines from "./useDisciplines";

const useDiscipline = (id?: number) => {
  const { data: disciplines } = useDisciplines();
  return disciplines?.results.find((d) => d.id === id);
};
export default useDiscipline;
