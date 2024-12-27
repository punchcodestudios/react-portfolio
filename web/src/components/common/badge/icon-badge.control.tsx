import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
  icon: IconProp;
  text?: string | "";
  badgeClass?: string | "";
  iconClass?: string | "";
}

export const IconLeftBadge: React.FC<Props> = ({ ...props }) => {
  return (
    <div className={`icon-badge ${props.badgeClass || ""}`}>
      <FontAwesomeIcon
        icon={props.icon}
        className={`icon-left ${props.iconClass || ""}`}
      />
      {props.text}
    </div>
  );
};

export const IconRightBadge: React.FC<Props> = ({ ...props }) => {
  return (
    <div className={`icon-badge ${props.badgeClass || ""}`}>
      {props.text}
      <div>
        <FontAwesomeIcon
          icon={props.icon}
          className={`icon-right ${props.iconClass || ""}`}
        />
      </div>
    </div>
  );
};
