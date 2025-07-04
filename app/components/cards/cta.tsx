import React from "react";

export type ImageAlign = "right" | "left";

type CallToActionProps = {
  title: React.ReactNode;
  tagLine?: React.ReactNode;
  text?: React.ReactNode;
  imageUrl: string;
  imageAlt: string;
  actions?: React.ReactNode | null;
  imageAlign: ImageAlign;
  children?: React.ReactNode | null;
};

type CallToActionLeftProps = {
  title: React.ReactNode;
  tagLine?: React.ReactNode;
  text?: React.ReactNode;
  imageUrl: string;
  imageAlt: string;
  actions?: React.ReactNode | null;
  children?: React.ReactNode | null;
};

type CallToActionRightProps = {
  title: React.ReactNode;
  tagLine?: React.ReactNode;
  text?: React.ReactNode;
  imageUrl: string;
  imageAlt: string;
  actions?: React.ReactNode | null;
  children?: React.ReactNode | null;
};

export const CallToActionLeft: React.FC<CallToActionLeftProps> = ({
  imageUrl,
  imageAlt,
  title,
  tagLine,
  text,
  actions,
  children = null,
}: CallToActionLeftProps) => {
  return (
    <div
      id="cta_container"
      className="mx-auto max-w-full overflow-hidden md:max-w-[90%] 2xl-max-w-[70%]"
    >
      <div className="flex flex-col xl:flex-row">
        <div className="px-6 xl:p-0 xl:shrink-0">
          <img
            className="h-32 w-full object-cover xl:w-96 xl:h-full"
            src={imageUrl}
            alt={imageAlt}
          />
        </div>
        <div
          id="cta_content-container"
          className="p-6 xl:p-0 mt-2 xl:mt-0 xl:ms-10"
        >
          <div className="mb-3 xl:w-120">
            <h2
              id="cta_title"
              className="font-semibold tracking-wide text-primary font-header uppercase"
            >
              {title}
            </h2>
            {tagLine && (
              <p
                id="cta_tagline"
                className="mt-1 block text-xl leading-tight font-medium"
              >
                {tagLine}
              </p>
            )}
            {text && (
              <p id="cta_text" className="my-4">
                {text}
              </p>
            )}
          </div>
          <div id="cta_actions">{actions && actions}</div>
        </div>
      </div>
      <div id="cta_children">{children && children}</div>
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
  children = null,
}: CallToActionRightProps) => {
  return (
    <div
      id="cta_container"
      className="mx-auto max-w-full overflow-hidden md:max-w-[90%] 2xl-max-w-[70%]"
    >
      <div className="flex flex-col-reverse xl:flex-row">
        <div
          id="cta_content-container"
          className="p-6 xl:p-0 mt-2 xl:mt-0 xl:me-10"
        >
          <div className="mb-3 xl:w-120">
            <h2 className="font-semibold tracking-wide text-primary font-header uppercase">
              {title}
            </h2>
            {tagLine && (
              <p className="mt-1 block text-xl leading-tight font-medium text-black">
                {tagLine}
              </p>
            )}
            {text && <p className=" my-2 lg:my-4">{text}</p>}
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
      <div id="cta_children">{children && children}</div>
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
  children = null,
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
          children={children}
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
          children={children}
        ></CallToActionLeft>
      );
    }
  }
};
