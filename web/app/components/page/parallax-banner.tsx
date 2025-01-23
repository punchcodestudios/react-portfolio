import React from "react";

interface Props {
  text: string;
}

const ParallaxBanner = ({ text }: Props) => {
  return (
    <div
      id=""
      className="flex items-center justify-center h-96 bg-siteBlack bg-fixed bg-parallax bg-cover"
    >
      <h1 className="text-5xl text-siteWhite uppercase">{text}</h1>
    </div>
  );
};

export default ParallaxBanner;
