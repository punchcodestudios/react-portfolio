export interface ScreenSize {
  width: number;
  height: number;
}

export type Theme = "light" | "dark";

export type SelectOption<T> = {
  key: string | number;
  label: string;
  value: T;
};
