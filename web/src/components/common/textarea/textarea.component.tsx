import React, { useRef } from "react";

interface Props {
  id: string;
  name: string;
  cssClass?: string | "";
  placeholderText?: string | "";
  cols?: number | 2;
  rows?: number | 10;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
}

export const Textarea: React.FC<Props> = ({
  id,
  name,
  cssClass,
  placeholderText,
  cols,
  rows,
  onChange,
  onBlur,
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);
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
    <textarea
      id={id}
      name={name}
      rows={rows}
      cols={cols}
      className={`input ${cssClass}`}
      ref={ref}
      placeholder={placeholderText}
      onChange={handleChange}
      onBlur={handleBlur}
    ></textarea>
  );
};
