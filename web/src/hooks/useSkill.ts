import useSkills from "./useSkills";

const useSkill = (id?: number) => {
  const { data: skills } = useSkills();
  return skills?.results.find((s) => s.id === id);
};

export default useSkill;
