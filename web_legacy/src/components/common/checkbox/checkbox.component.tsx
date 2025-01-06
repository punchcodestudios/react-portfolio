import React, { useState, useRef, useEffect } from "react";

export interface CheckboxItem {
  id: string;
  name: string;
  label: string;
  checked?: boolean | false;
  cssClass?: string | "";
}

interface Props {
  options: CheckboxItem[];
  onChange?: (selectedItems: string[]) => void;
}

export const CheckboxGroup: React.FC<Props> = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const checkboxRefs = useRef<HTMLInputElement[]>([]);

  const handleCheckboxChange = (option: CheckboxItem) => {
    const selected = checkboxRefs.current.filter((opt) => opt.id == option.id);
    if (!selected[0].checked) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option.id));
    } else {
      setSelectedOptions([...selectedOptions, option.id]);
    }
  };

  useEffect(() => {
    let initialChecked: string[] = [];
    options.map((option) => {
      if (option.checked) {
        initialChecked.push(option.id);
      }
    });
    setSelectedOptions([...selectedOptions, ...initialChecked]);
  }, []);

  useEffect(() => {
    checkboxRefs.current = checkboxRefs.current.slice(0, options.length);
  }, [options]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedOptions);
    }
  }, [selectedOptions]);

  return (
    <div className="checkbox-group">
      {options.map((option, index) => (
        <label key={index} className="checkbox-group-item">
          <input
            id={option.id}
            name={option.name}
            className={`checkbox-item ${option.cssClass || ""}`}
            type="checkbox"
            ref={(el: HTMLInputElement) => (checkboxRefs.current[index] = el)}
            onChange={() => handleCheckboxChange(option)}
            checked={selectedOptions.includes(option.id)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export const CheckboxList: React.FC<Props> = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const checkboxRefs = useRef<HTMLInputElement[]>([]);

  const handleCheckboxChange = (option: CheckboxItem) => {
    const selected = checkboxRefs.current.filter((opt) => opt.id == option.id);
    if (!selected[0].checked) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option.id));
    } else {
      setSelectedOptions([...selectedOptions, option.id]);
    }
  };

  useEffect(() => {
    checkboxRefs.current = checkboxRefs.current.slice(0, options.length);
  }, [options]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedOptions);
    }
  }, [selectedOptions]);

  return (
    <ul>
      {options.map((option, index) => (
        <li key={index}>
          <label className="checkbox-list-item">
            <input
              id={option.id}
              name={option.name}
              className={`${option.cssClass || ""}`}
              type="checkbox"
              ref={(el: HTMLInputElement) => (checkboxRefs.current[index] = el)}
              onChange={() => handleCheckboxChange(option)}
              checked={selectedOptions.includes(option.id)}
            />
            {option.label}
          </label>
        </li>
      ))}
    </ul>
  );
};
