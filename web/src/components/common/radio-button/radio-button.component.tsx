import React, { useState, useRef, useEffect } from "react";

export interface RadioButtonItem {
  id: string;
  name: string;
  label: string;
  checked?: boolean | false;
  cssClass?: string | "";
}

interface Props {
  options: RadioButtonItem[];
  onChange?: (selectedItem: string) => void;
}

export const RadioButtonGroup: React.FC<Props> = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const radioButtonRefs = useRef<HTMLInputElement[]>([]);

  const handleRadioChange = (option: RadioButtonItem) => {
    const selected = radioButtonRefs.current.find((opt) => opt.id == option.id);
    // console.log("selected: ", selected);
    setSelectedOption(selected?.id || "");
  };

  useEffect(() => {
    radioButtonRefs.current = radioButtonRefs.current.slice(0, options.length);
    // console.log("radiobuttonRefs: ", radioButtonRefs);
  }, [options]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedOption);
    }
  }, [selectedOption]);

  return (
    <div>
      {options.map((option, index) => (
        <label key={index}>
          <input
            id={option.id}
            name={option.name}
            className={option.cssClass}
            type="radio"
            ref={(el: HTMLInputElement) =>
              (radioButtonRefs.current[index] = el)
            }
            onChange={() => handleRadioChange(option)}
            checked={selectedOption == option.id}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export const RadioButtonList: React.FC<Props> = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const radioButtonRefs = useRef<HTMLInputElement[]>([]);

  const handleRadioChange = (option: RadioButtonItem) => {
    const selected = radioButtonRefs.current.find((opt) => opt.id == option.id);
    setSelectedOption(selected?.id || "");
  };

  useEffect(() => {
    radioButtonRefs.current = radioButtonRefs.current.slice(0, options.length);
  }, [options]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedOption);
    }
  }, [selectedOption]);

  return (
    <ul>
      {options.map((option, index) => (
        <li key={index}>
          <label>
            <input
              id={option.id}
              className={option.cssClass}
              type="radio"
              ref={(el: HTMLInputElement) =>
                (radioButtonRefs.current[index] = el)
              }
              onChange={() => handleRadioChange(option)}
              checked={selectedOption == option.id}
            />
            {option.label}
          </label>
        </li>
      ))}
    </ul>
  );
};
