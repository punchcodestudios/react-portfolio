import { useState } from "react";

const useUniqueArray = (initialValue: string[] = []) => {
  const [array, setArray] = useState<string[]>(initialValue);

  const addUnique = (value: string) => {
    setArray((prev) => (prev.includes(value) ? prev : [...prev, value]));
  };

  const remove = (value: string) => {
    setArray((prev) => prev.filter((item) => item !== value));
  };

  const toggle = (value: string) => {
    setArray((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const clear = () => setArray([]);

  return { array, addUnique, remove, toggle, clear, setArray };
};

export default useUniqueArray;
