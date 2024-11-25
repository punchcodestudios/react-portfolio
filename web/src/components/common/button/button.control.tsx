import { ReactEventHandler, ReactNode } from "react";

interface Props {
  id: string;
  name: string;
  onClick?: ReactEventHandler<HTMLButtonElement>;
  children: ReactNode;
  cssClass?: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}

const ButtonControl = ({ ...props }: Props) => {
  return (
    <button
      id={props.id}
      name={props.name}
      onClick={props.onClick}
      className={props.cssClass || "btn btn-primary"}
      type={props.type || "submit"}
      disabled={props.disabled || false}
    >
      {props.children}
    </button>
  );
};

export default ButtonControl;
