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
  bytes32: "bytes32",
  string: "string",
};

const OPT_ICONS = {
  bytes32: <Icon as={SiHexo} />,
  string: <Icon as={IoTextSharp} />,
};

export default function Bytes32Input({ value, setInput, placeholder }) {
  const [format, updateFormat] = useState(OPTS.bytes32);
  const [isValid, updateIsValid] = useState(true);

  if (!value) {
    value = '';
  }

  const handleInputChange = () => {
    let inputValue = inputRef.current.value;
    updateIsValid(true);
    if (!inputValue) {
      setInput("0x0000000000000000000000000000000000000000000000000000000000000000");
    } else if (format === OPTS.bytes32) {
      setInput(inputValue);
    } else if (format === OPTS.string) {
      try{
        const bytes32FromString = ethers.utils.formatBytes32String(inputValue);
        setInput(bytes32FromString);
      }catch(e){
        console.log('invalid value');
        updateIsValid(false);
      }
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
              focusBorderColor={isValid ? "" : "red.500"}
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
