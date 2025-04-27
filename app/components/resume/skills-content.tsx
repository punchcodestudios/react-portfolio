import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconService from "~/service/icon-service";
import { SolidIcon } from "~/utils/enums";
import { TechBadge } from "~/components/ui/tech-badge";
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
      <section className="flex flex-row justify-center item-center mt-3 mb-3">
        <div className="grid grid-cols:1 w-[90%] shadow-lg rounded-3xl justify-center items-center lg:grid-cols-3 xl:grid-cols-4 border-2 border-solid border-primaryLight">
          <div className="mx-auto p-2 flex max-h-[300px] w-[100%] justify-center items-center lg:justify-start lg:p-4">
            <FontAwesomeIcon
              icon={IconService.getSolid(iconType)}
              fontSize={fontSize || 40}
              className={textClass}
            ></FontAwesomeIcon>
            <span className="font-bold text-lg ms-5">
              <p>{items[0].skill_types[0].name}</p>
            </span>
          </div>
          <div className="p-5 lg:col-span-2 justify-center items-center xl:col-span-3">
            <div className="h-15 flex justify-center items-center flex-wrap">
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
