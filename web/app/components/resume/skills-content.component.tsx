import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconService from "~/service/icon-service";
import { SolidIcon } from "~/utils/enums";
import { TechBadge } from "../controls/tech-badge";
import type { Skill } from "~/entities/resume";

interface Props {
  items: Skill[];
  iconType: SolidIcon;
  textClass: string;
  fontSize?: number;
}

const SkillsContent: React.FC<Props> = ({
  items,
  iconType,
  textClass,
  fontSize,
}) => {
  return (
    <>
      <section className="flex flex-row justify-center mt-5 mb-5">
        <div className="grid grid-cols:1 w-[90%] justify-start items-center md:w-[80%] lg:grid-cols-3 xl:grid-cols-4 border-2 border-solid border-primaryLight">
          <div className="mx-auto p-4 lg:p-8 flex max-h-[300px] w-[300px]  items-center">
            <FontAwesomeIcon
              icon={IconService.getSolid(iconType)}
              fontSize={fontSize || 40}
              className={textClass}
            ></FontAwesomeIcon>
            <span className="font-bold text-lg ms-5">
              <h2>{items[0].skill_types[0].name}</h2>
            </span>
          </div>
          <div className="p-5 lg:col-span-2 xl:col-span-3 lg:p-5 md:lg-24">
            <div className="h-15 w-[90%] flex justify-center items-center flex-wrap">
              {items?.map((item) => {
                return (
                  <TechBadge text={item.name} key={item.refid}></TechBadge>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SkillsContent;
