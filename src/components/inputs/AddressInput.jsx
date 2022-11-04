import {
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  Tooltip,
  useClipboard
} from "@chakra-ui/react";
import { FaRegAddressCard } from "react-icons/fa";
import { CheckIcon, CopyIcon, WarningIcon } from "@chakra-ui/icons";
import { isAddress } from "ethers/lib/utils";
import { useEffect, useState } from "react";

export default function AddressInput(props) {
  const { value } = props;
  let isError = false;
  if (value && !isAddress(value)) {
    isError = true;
  }
  let isValid = false;
  if (value && isAddress(value)) {
    isValid = true;
  }
  return (
    <>
      <InputGroup>
        <InputLeftElement>
          <Icon as={FaRegAddressCard} />
        </InputLeftElement>
        <Input isInvalid={isError} {...props}></Input>
        <InputRightElement>
          {isValid && <CheckIcon color={"green.500"} />}
          {isError && (
            <Tooltip label={"This is not a valid Address"}>
              <WarningIcon color={"red.500"} />
            </Tooltip>
          )}
        </InputRightElement>
      </InputGroup>

    </>
  );
}
