import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import React from "react";
import IconService from "~/service/icon-service";
import { SolidIcon } from "~/utils/enums";

interface Props {
  text: string;
}

interface WithIconProps {
  text: string;
  icon: SolidIcon;
}

export const TechBadge: React.FC<Props> = ({ text }) => {
  return (
    <div className="text-siteWhite text-md bg-primaryLight rounded-lg p-2 ps-6 mx-2 mb-2 lg:ps-4">
      <span className="whitespace-nowrap font-text">{text}</span>
    </div>
  );
};

export const IconTechBadge: React.FC<WithIconProps> = ({ text, icon }) => {
  return (
    <div className="text-siteWhite bg-primaryLight rounded-lg p-4 pb-2 me-2 flex items-center">
      <FontAwesomeIcon
        icon={IconService.getSolid(icon)}
        fontSize={12}
        className="text-siteWhite"
      ></FontAwesomeIcon>
      <span className="ms-2 whitespace-nowrap font-text">{text}</span>
    </div>
  );
};
