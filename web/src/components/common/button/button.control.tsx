import { ReactEventHandler, ReactNode } from "react";

interface Props {
  id: string;
  name: string;
  label: string;
  onClick: ReactEventHandler<HTMLButtonElement>;
  children: ReactNode;
  cssClass: string | "btn-primary";
  type?: "button" | "submit" | "reset" | undefined;
}

const ButtonControl = ({ ...props }: Props) => {
  return (
    <button
      id={props.id}
      name={props.name}
      onClick={props.onClick}
      className={`btn ${props.cssClass}`}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default ButtonControl;
