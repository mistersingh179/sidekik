import {
  formatUnits,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Select,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { IoOptions, IoTextSharp } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import moment from "moment/moment";
import { GlobalContext } from "../../contexts";
import { CalendarIcon } from "@chakra-ui/icons";
import { RiGasStationLine } from "react-icons/ri";
import { MdOutlineMonitorWeight } from "react-icons/md";
import { GiWeightScale } from "react-icons/gi";
import { SiHexo } from "react-icons/si";

const {
  BigNumber,
  utils: { parseEther, formatEther, parseUnits },
  constants: { AddressZero, EtherSymbol },
} = ethers;

const OPTS = {
  bytes: "bytes",
  string: "string",
};

const OPT_ICONS = {
  bytes: <Icon as={SiHexo} />,
  string: <Icon as={IoTextSharp} />,
};

function toHex(str) {
  var result = "";
  for (var i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result ? "0x" + result : result;
}

export default function BytesInput({ inputAbi, value, setInput, placeholder }) {
  const [format, updateFormat] = useState(OPTS.bytes);

  const handleInputChange = () => {
    let inputValue = inputRef.current.value;
    if (!inputValue) {
      setInput("");
    } else if (format === OPTS.bytes) {
      setInput(inputValue);
    } else if (format === OPTS.string) {
      let bytesFromString = "";
      const utf8BytesArray = ethers.utils.toUtf8Bytes(inputValue);
      let utf8BytesArrayPadded = utf8BytesArray;
      try {
        const bytesNumber = inputAbi.type.split("bytes")[1];
        if (bytesNumber && (inputValue.length < bytesNumber)) {
          utf8BytesArrayPadded = ethers.utils.zeroPad(
            utf8BytesArray,
            bytesNumber
          );
        }
        bytesFromString = ethers.utils.hexlify(utf8BytesArrayPadded);
      } catch (e) {
        console.error("error converting string to bytes", inputValue, e);
        bytesFromString = "";
      }
      console.log("bytesFromString: ", bytesFromString);
      setInput(bytesFromString);
    }
  };
  useEffect(() => {
    handleInputChange();
  }, [format]);

  const inputRef = useRef();

  let inputElementType = "text";
  let leftElementChild = OPT_ICONS[format];

  return (
    <>
      <Tooltip label={`Will submit: ${value.toString()}`} hasArrow>
        <HStack>
          <InputGroup>
            {leftElementChild && (
              <InputLeftElement
                color={"gray.400"}
                children={leftElementChild}
              />
            )}
            <Input
              ref={inputRef}
              placeholder={placeholder}
              onChange={handleInputChange}
              type={inputElementType}
            />
          </InputGroup>

          <Menu>
            <MenuButton as={IconButton} icon={<Icon as={IoOptions} />} />
            <MenuList>
              <MenuOptionGroup
                type={"radio"}
                value={format}
                onChange={updateFormat}
              >
                {Object.entries(OPTS).map(([k, v]) => (
                  <MenuItemOption key={v} value={k}>{v}</MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </HStack>
      </Tooltip>
    </>
  );
}
