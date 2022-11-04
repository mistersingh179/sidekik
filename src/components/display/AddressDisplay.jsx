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
import { FaRegAddressCard } from "react-icons/fa";
import { CheckIcon, CopyIcon, WarningIcon } from "@chakra-ui/icons";

export default function AddressDisplay(props) {
  const { value } = props;
  return (
    <InputGroup>
      <InputLeftElement>
        <Icon as={FaRegAddressCard} />
      </InputLeftElement>
      <Input isReadOnly {...props}></Input>
    </InputGroup>
  );
}
