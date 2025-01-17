import { SolidIcon, TaskStatus } from "@/utils/enums";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBackward,
  faForward,
  faTriangleExclamation,
  faSquareCheck,
  faSkullCrossbones,
  faSquarePlus,
  faSquareMinus,
  faPenToSquare,
  faRecycle,
  faRectangleXmark,
  faCalendar,
  faObjectGroup,
} from "@fortawesome/free-solid-svg-icons";

const iconMap_solid: { [key: string]: IconProp } = {
  FORWARD: faForward,
  BACKWARD: faBackward,
  SUCCESS: faSquareCheck,
  WARNING: faTriangleExclamation,
  DANGER: faSkullCrossbones,
  ADD: faSquarePlus,
  SUBTRACT: faSquareMinus,
  SET_COMPLETE: faRectangleXmark,
  EDIT: faPenToSquare,
  DUE: faCalendar,
  GROUP: faObjectGroup,
  ACTIVE: faSquareCheck,
  COMPLETE: faRectangleXmark,
};

const IconService = {
  getSolid(key: SolidIcon): IconProp {
    return iconMap_solid[key];
  },
  getColorByStatus(status: TaskStatus) {
    switch (status) {
      case TaskStatus.ACTIVE:
        return "green";
      case TaskStatus.PAST_DUE:
        return "red";
      case TaskStatus.COMPLETE:
        return "black";
    }
  },
  getColorByDueDate(due: Date) {
    const oneDay = 1000 * 60 * 60 * 24;
    const now = new Date();
    const days: number = Math.round(
      (new Date(due).getTime() - now.getTime()) / oneDay
    );
    if (days < 1) {
      return "red";
    }
    if (days < 3) {
      return "orange";
    }
    return "green";
  },
  getIconByStatus(status: TaskStatus) {
    return iconMap_solid[status];
  },
};

export default IconService;
