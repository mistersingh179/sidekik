import {
  Box,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
} from "@chakra-ui/react";
import {  useEffect } from "react";
import { BsMegaphone } from "react-icons/bs";
import { GiSewingString } from "react-icons/gi";

export default function ({ value, setInput, placeholder }) {

  useEffect(() => {
    if (!value) {
      setInput("");
    }
  }, []);

  return (
    <InputGroup>
      <InputLeftElement
        color={"gray.400"}
        children={<Icon as={GiSewingString} />}
      />
      <Input
        placeholder={placeholder}
        onChange={(evt) => setInput(evt.target.value)}
      ></Input>
    </InputGroup>
  );
}
