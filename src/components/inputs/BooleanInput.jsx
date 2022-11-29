import { Input } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { OPTS } from "../../helpers/numberOptions";
import { ethers } from "ethers";
import moment from "moment";

export default function ({ value, setInput, placeholder }) {
  const handleInputChange = () => {
    let inputValue = inputRef.current.value;
    if (
      !inputValue ||
      inputValue === "false" ||
      inputValue === "0" ||
      inputValue === "null" ||
      inputValue === "undefined"
    ) {
      setInput(false);
    } else {
      setInput(Boolean(inputValue));
    }
  };
  useEffect(() => {
    if (value === undefined) {
      handleInputChange();
    }
  }, []);

  const inputRef = useRef();

  return (
    <Input
      ref={inputRef}
      placeholder={placeholder}
      onChange={handleInputChange}
    ></Input>
  );
}
