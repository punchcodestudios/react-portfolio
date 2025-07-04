export enum UserStatus {
  INITIAL = "INITIAL",
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  REJECTED = "REJECTED",
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum TaskStatus {
  ACTIVE = "ACTIVE",
  URGENT = "URGENT",
  PAST_DUE = "PAST DUE",
  COMPLETE = "COMPLETE",
  DISCARDED = "DISCARDED",
}

export enum SolidIcon {
  FORWARD = "FORWARD",
  BACKWARD = "BACKWARD",
  STEP_BACKWARD = "STEP_BACKWARD",
  STEP_FORWARD = "STEP_FORWARD",
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  DANGER = "DANGER",
  ADD = "ADD",
  SUBTRACT = "SUBTRACT",
  SET_COMPLETE = "SET_COMPLETE",
  EDIT = "EDIT",
  DUE = "DUE",
  GROUP = "GROUP",
  BACKEND = "BACKEND",
  FRONTEND = "FRONTEND",
  DESIGN = "DESIGN",
  DATABASE = "DATABASE",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  SOFTSKILLS = "SOFTSKILLS",
  LIGHT_THEME = "LIGHT_THEME",
  DARK_THEME = "DARK_THEME",
  FILE_DOWNLOAD = "FILE_DOWNLOAD",
  DOWNLOAD = "DOWNLOAD",
}

export enum FilterColumnDataType {
  STRING = "STRING",
  NUMBER = "NUMBER",
  DATE = "DATE",
  BOOLEAN = "BOOLEAN",
}

export enum FilterAction {
  EQUALS = "Equals",
  NOT_EQUALS = "Not Equal",
  CONTAINS = "Contains",
  NOT_CONTAINS = "Not Contain",
  GREATER_THAN = "Greater Than",
  LESS_THAN = "Less Than",
  IN_RANGE = "In Range",
  IS_NULL = "NULL",
  IS_NOT_NULL = "Not NULL",
  STARTS_WITH = "Starts With",
  ENDS_WITH = "Ends With",
  IN = "In",
  NOT_IN = "Not In",
}

export enum SortDirection {
  ASC = "Ascending",
  DESC = "Descending",
}
