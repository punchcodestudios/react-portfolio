import type { IconProp } from "@fortawesome/fontawesome-svg-core";

import {
  faBackward,
  faStepBackward,
  faForward,
  faStepForward,
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
  faCode,
  faPalette,
  faFileCode,
  faDatabase,
  faScrewdriverWrench,
  faHandshake,
  faSun,
  faMoon,
  faFileDownload,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { SolidIcon, TaskStatus } from "~/utils/enums";

const iconMap_solid: { [key: string]: IconProp } = {
  FORWARD: faForward,
  BACKWARD: faBackward,
  STEP_BACKWARD: faStepBackward,
  STEP_FORWARD: faStepForward,
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
  BACKEND: faCode,
  FRONTEND: faFileCode,
  DESIGN: faPalette,
  DATABASE: faDatabase,
  INFRASTRUCTURE: faScrewdriverWrench,
  SOFTSKILLS: faHandshake,
  LIGHT_THEME: faSun,
  DARK_THEME: faMoon,
  FILE_DOWNLOAD: faFileDownload,
  DOWNLOAD: faDownload,
  RECYCLE: faRecycle,
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

export { IconService };
