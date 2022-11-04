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
import { VscSymbolBoolean, VscTextSize } from "react-icons/vsc";
import { IoTextSharp } from "react-icons/io5";

export default function BooleanDisplay(props) {
  const { value } = props;
  const formattedValue = value === true ? "true" : "false";
  return (
    <InputGroup>
      <InputLeftElement>
        <Tooltip as={"foo"}>
          <Icon as={VscSymbolBoolean} />
        </Tooltip>
      </InputLeftElement>
      <Input isReadOnly value={formattedValue}></Input>
    </InputGroup>
  );
}
