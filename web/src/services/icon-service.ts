import { SolidIcon } from "@/utils/enums";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBackward,
  faForward,
  faTriangleExclamation,
  faSquareCheck,
  faSkullCrossbones,
  faSquarePlus,
  faSquareMinus,
} from "@fortawesome/free-solid-svg-icons";

const iconMap_solid: { [key: string]: IconProp } = {
  FORWARD: faForward,
  BACKWARD: faBackward,
  SUCCESS: faSquareCheck,
  WARNING: faTriangleExclamation,
  DANGER: faSkullCrossbones,
  ADD: faSquarePlus,
  SUBTRACT: faSquareMinus,
};

const IconService = {
  getSolid(key: SolidIcon): IconProp {
    return iconMap_solid[key];
  },
};

export default IconService;
