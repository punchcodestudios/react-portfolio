import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import useGalleryQueryStore from "../../../state-management/gallery/gallery-store";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useGalleryQueryStore((s) => s.setSearchText);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) setSearchText(ref.current.value);
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="select gallery"
          variant="filled"
        />
        {/* <button className="btn btn-primary" onClick={onClearSearch}>
          Show All
        </button> */}
      </InputGroup>
    </form>
  );
};

export default SearchInput;
