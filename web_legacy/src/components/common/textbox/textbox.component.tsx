import React, { useRef } from "react";

interface Props {
  id: string;
  name: string;
  cssClass?: string | "";
  placeholderText?: string | "";
  value?: string | "";
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
}

export const Textbox: React.FC<Props> = ({
  id,
  name,
  cssClass,
  placeholderText,
  value,
  onChange,
  onBlur,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const handleChange = () => {
    // console.log("ref.current: ", ref.current);
    if (onChange) {
      onChange(ref.current?.value || "");
    }
  };

  const handleBlur = () => {
    // console.log("ref.current: ", ref.current);
    if (onBlur) {
      onBlur(ref.current?.value || "");
    }
  };

  return (
    <input
      id={id}
      name={name}
      type="text"
      value={value}
      className={`input ${cssClass}`}
      ref={ref}
      placeholder={placeholderText}
      onChange={handleChange}
      onBlur={handleBlur}
    ></input>
  );
};
