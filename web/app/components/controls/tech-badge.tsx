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
    <div className="text-siteWhite text-sm bg-primaryLight rounded-lg px-2 me-2 mb-2">
      <span className="whitespace-nowrap">{text}</span>
    </div>
  );
};

export const IconTechBadge: React.FC<WithIconProps> = ({ text, icon }) => {
  return (
    <div className="text-siteWhite bg-primaryLight rounded-lg px-2 me-2 flex items-center">
      <FontAwesomeIcon
        icon={IconService.getSolid(icon)}
        fontSize={12}
        className="text-siteWhite"
      ></FontAwesomeIcon>
      <span className="ms-2 whitespace-nowrap">{text}</span>
    </div>
  );
};
