import {
  Button,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { VscTextSize } from "react-icons/vsc";
import { IoTextSharp } from "react-icons/io5";

export default function StringDisplay(props) {
  const { value } = props;
  return (
      <InputGroup>
        <InputLeftElement>
          <Tooltip as={'foo'}><Icon as={IoTextSharp} /></Tooltip>
        </InputLeftElement>
        <Input isReadOnly {...props}></Input>
      </InputGroup>
  );
}
