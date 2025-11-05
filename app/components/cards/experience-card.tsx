import React from "react";

export type ExperienceCardProps = {
  title: React.ReactNode;
  tagLine?: React.ReactNode;
  text?: React.ReactNode;
  imageUrl: string;
  imageAlt: string;
  actions?: React.ReactNode | null;
  children?: React.ReactNode | null;
};

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  imageUrl,
  imageAlt,
  title,
  tagLine,
  text,
  actions,
  children = null,
}: ExperienceCardProps) => {
  return (
    <div
      id="cta_container"
      className="flex flex-col mx-auto overflow-hidden md:max-w-[90%] 2xl-max-w-[70%]"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-col lg:flex-row items-center justify-between p-2 md:p-6 bg-slate-100">
          <h3
            id="cta_title"
            className="mb-0 w-full lg:w-2/3 text-sm md:text-xl lg:text-2xl flex-nowrap font-semibold tracking-wide text-primary font-header uppercase gap-3"
          >
            <img
              className="h-8 w-8 sm:h-12 sm:w-12 object-cover me-4"
              src={imageUrl}
              alt={imageAlt}
              style={{ display: "inline-block", verticalAlign: "middle" }}
            />
            {title}
          </h3>
          <div className="flex flex-col w-full my-3 lg:my-0 lg:w-1/3 justify-end">
            <div className="text-lg flex lg:justify-end">{tagLine}</div>
            <div className="text-gray-500 text-sm md:text-lg flex lg:justify-end">
              {text}
            </div>
          </div>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default ExperienceCard;
