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
import { IoOptions } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import moment from "moment/moment";
import { GlobalContext } from "../../contexts";
import { CalendarIcon } from "@chakra-ui/icons";
import { RiGasStationLine } from "react-icons/ri";
import { MdOutlineMonitorWeight } from "react-icons/md";
import { GiWeightScale } from "react-icons/gi";
import ExternalPriceContext from "../../contexts/externalPriceContext";

const {
  BigNumber,
  utils: { parseEther, formatEther, parseUnits },
  constants: { AddressZero, EtherSymbol },
} = ethers;

const OPTS = {
  wei: "wei",
  gwei: "gwei",
  eth: "eth",
  usdc: "usdc",
};

export default function EthNumberInput({ value, setInput, placeholder }) {
  const { ethPriceInUsd } = useContext(ExternalPriceContext);

  if (!value) {
    value = BigNumber.from(0);
  }
  const [format, updateFormat] = useState(OPTS.wei);
  const handleFormatChange = (formatValue) => {
    console.log("in handleFormatChange with: ", formatValue);
    updateFormat(formatValue);
  };
  const handleInputChange = () => {
    // let inputValue = inputRef.current.value || "0";
    let inputValue = inputRef.current.value;
    if(!inputValue){
      setInput("")
    } else if (format === OPTS.wei) {
      inputValue = inputValue.replace(/\.(.*)$/gm, "");
      setInput(BigNumber.from(inputValue));
    } else if (format === OPTS.eth) {
      setInput(parseEther(inputValue));
    } else if (format === OPTS.gwei) {
      setInput(parseUnits(inputValue, 9));
    } else if (format === OPTS.usdc) {
      const wei = ethers.constants.WeiPerEther.div(parseInt(ethPriceInUsd)).mul(
        BigNumber.from(inputValue)
      );
      setInput(wei);
    }
  };
  useEffect(() => {
    handleInputChange();
  }, [format]);

  const inputRef = useRef();

  let inputElementType = "number";
  let leftElementChild = "wei";
  if (format === OPTS.wei) {
    leftElementChild = <Icon as={GiWeightScale} />;
    inputElementType = "number";
  } else if (format === OPTS.gwei) {
    leftElementChild = <Icon as={RiGasStationLine} />;
    inputElementType = "number";
  } else if (format === OPTS.eth) {
    leftElementChild = EtherSymbol;
    inputElementType = "number";
  } else if (format === OPTS.usdc) {
    leftElementChild = "$";
    inputElementType = "number";
  }

  return (
    <>
      <Tooltip label={`Will submit: ${value.toString()}`} hasArrow>
        <HStack>
          <InputGroup>
            {leftElementChild && (
              <InputLeftElement color={'gray.400'} children={leftElementChild} />
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
                onChange={handleFormatChange}
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
