import { InputGroup } from "@/components/ui/input-group";
import { Flex, Input } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import useGalleryQueryStore from "../../../state-management/gallery/gallery-query-store";

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
      <InputGroup
        startElement={<BsSearch color="#FFF"></BsSearch>}
        className="mt-3 mt-md-0 col-12"
      >
        <Flex direction="row" className="col-12">
          <Input
            ref={ref}
            borderRadius={20}
            placeholder="search by name"
            variant="subtle"
            color="#fff"
            size={["sm"]}
            fontSize={["sm"]}
            textAlign="center"
            w="100%"
            className="me-2"
          />
        </Flex>
      </InputGroup>
    </form>
  );
};

export default SearchInput;
