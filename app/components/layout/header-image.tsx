import type { PunchcodeImage } from "~/entities/punchcode-image";

interface Props {
  headerImage: PunchcodeImage;
}

export const HeaderImage = ({ headerImage }: Props) => {
  return (
    <div
      id="hero"
      className="flex flex-row w-full min-h-[100px] justify-center bg-slate-500"
    >
      <img
        id={headerImage.id}
        src={`/images/${headerImage.name}`}
        className="h-auto max-w-full object-cover"
        alt={headerImage.description}
        title={headerImage.title}
      ></img>
    </div>
  );
};

export const PortfolioImage = ({ headerImage }: Props) => {
  return (
    <img
      id={headerImage.id}
      src={`/images/${headerImage.name}`}
      className="rounded-[50%] object-fill"
      alt={headerImage.description}
      title={headerImage.title}
    ></img>
  );
};
export default HeaderImage;
