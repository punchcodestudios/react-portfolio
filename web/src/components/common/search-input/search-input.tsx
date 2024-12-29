import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { FormControl, InputGroup } from "react-bootstrap";

interface Props {
  cssClass?: string | undefined;
  placeholderText?: string | undefined;
  clickEvent: (value: string) => void;
}
const SearchInput = ({ clickEvent, cssClass, placeholderText }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    clickEvent(ref.current?.value || "");
  };

  return (
    <InputGroup className="search-input-group">
      <FormControl
        className={`input ${cssClass ? cssClass : ""}`}
        type="text"
        placeholder={placeholderText ? placeholderText : ""}
        ref={ref}
      ></FormControl>
      <InputGroup.Text>
        <FontAwesomeIcon
          className="search-icon"
          icon={faSearch}
          onClick={handleClick}
        ></FontAwesomeIcon>
      </InputGroup.Text>
    </InputGroup>
  );
};

export default SearchInput;
