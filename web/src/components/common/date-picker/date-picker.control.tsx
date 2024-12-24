import { SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Control } from "react-hook-form";

interface Props {
  name: string;
  control: any;
}

const CustomDatePicker = ({ name, control }: Props) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    control.setValue(name, date); // Update the form value
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      // Add any other props for customization
    />
  );
};

export default CustomDatePicker;

// interface Props {
//   id: string;
//   placeholder: string;
//   value: string;
//   cssClass?: string | "";
//   onFocus?: (() => void) | undefined;
//   onBlur?: (() => void) | undefined;
//   onChange: (value: string) => void;
// }

// const DatePicker: ForwardRefRenderFunction<HTMLInputElement, Props> = (
//   { id, placeholder, cssClass, value, onFocus, onBlur, onChange }: Props,
//   ref
// ) => {
//   const onDateFocus = (e: any) => {
//     e.target.type = "date";
//     if (onFocus) {
//       onFocus();
//     }
//   };

//   const onDateBlur = (e: any) => {
//     e.target.type = "text";
//     e.target.value = utcDateToLocalString(new Date(e.target.value));
//     if (onBlur) {
//       onBlur(e.target.value);
//     }
//   };

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const newValue = event.target.value;
//     onChange(newValue);
//   };
//   return (
//     <input
//       id={id}
//       ref={ref}
//       type="text"
//       value={value}
//       className={`input ${cssClass}`}
//       aria-label={placeholder}
//       placeholder={placeholder}
//       onFocus={(e) => onDateFocus(e)}
//       onBlur={(e) => onDateBlur(e)}
//       onChange={handleChange}
//     />
//   );
// };

// const ForwardRefDatePicker = React.forwardRef(DatePicker);
// export default ForwardRefDatePicker;
