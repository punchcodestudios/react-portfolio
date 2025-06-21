import React from "react";

export type ImageAlign = "right" | "left";

type CallToActionProps = {
  title: string;
  tagLine?: string;
  text?: string;
  imageUrl: string;
  imageAlt: string;
  actions: React.ReactNode;
  imageAlign: ImageAlign;
};

type CallToActionLeftProps = {
  title: string;
  tagLine?: string;
  text?: string;
  imageUrl: string;
  imageAlt: string;
  actions: React.ReactNode;
};

type CallToActionRightProps = {
  title: string;
  tagLine?: string;
  text?: string;
  imageUrl: string;
  imageAlt: string;
  actions: React.ReactNode;
};

export const CallToActionLeft: React.FC<CallToActionLeftProps> = ({
  imageUrl,
  imageAlt,
  title,
  tagLine,
  text,
  actions,
}: CallToActionLeftProps) => {
  return (
    <div className="mx-auto max-w-full overflow-hidden xl:max-w-[90%] 2xl-max-w-[70%]">
      <div className="xl:flex">
        <div className="px-6 xl:p-0 xl:shrink-0">
          <img
            className="h-32 w-full object-cover xl:w-96 xl:h-full"
            src={imageUrl}
            alt={imageAlt}
          />
        </div>
        <div className="p-6 xl:p-0 mt-2 xl:px-5 xl:mt-0 xl:ms-10">
          <div className="mb-3 xl:w-120">
            <h2 className="font-semibold tracking-wide text-primary font-header uppercase">
              {title}
            </h2>
            {tagLine && (
              <p className="mt-1 block text-xl leading-tight font-medium">
                {tagLine}
              </p>
            )}
            {text && <p className="my-4">{text}</p>}
          </div>
          {actions && actions}
        </div>
      </div>
    </div>
  );
};

export const CallToActionRight: React.FC<CallToActionRightProps> = ({
  imageUrl,
  imageAlt,
  title,
  tagLine,
  text,
  actions,
}: CallToActionRightProps) => {
  return (
    <div className="mx-auto max-w-full overflow-hidden xl:max-w-[90%] 2xl-max-w-[70%]">
      <div className="flex flex-col-reverse xl:flex-row">
        <div className="p-6 xl:p-0 mt-2 xl:px-5 xl:mt-0 xl:me-10">
          <div className="mb-3 xl:w-120">
            <h2 className="font-semibold tracking-wide text-primary font-header uppercase">
              {title}
            </h2>
            {tagLine && (
              <p className="mt-1 block text-xl leading-tight font-medium text-black">
                {tagLine}
              </p>
            )}
            {text && <p className="my-4">{text}</p>}
          </div>
          {actions && actions}
        </div>
        <div className="px-6 xl:p-0 xl:shrink-0">
          <img
            className="h-32 w-full object-cover xl:w-96 xl:h-full"
            src={imageUrl}
            alt={imageAlt}
          />
        </div>
      </div>
    </div>
  );
};

export const CallToAction: React.FC<CallToActionProps> = ({
  imageUrl,
  imageAlt,
  title,
  tagLine,
  text,
  actions,
  imageAlign = "left",
}: CallToActionProps) => {
  switch (imageAlign) {
    case "left": {
      return (
        <CallToActionLeft
          imageUrl={imageUrl}
          imageAlt={imageAlt}
          title={title}
          tagLine={tagLine}
          text={text}
          actions={actions}
        ></CallToActionLeft>
      );
    }
    case "right": {
      return (
        <CallToActionLeft
          imageUrl={imageUrl}
          imageAlt={imageAlt}
          title={title}
          tagLine={tagLine}
          text={text}
          actions={actions}
        ></CallToActionLeft>
      );
    }
  }
};
