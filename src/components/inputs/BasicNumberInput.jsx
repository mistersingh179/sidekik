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
import {
  RiCalendarCheckFill,
  RiCalendarCheckLine,
  RiGasStationLine, RiTimeLine
} from "react-icons/ri";
import ExternalPriceContext from "../../contexts/externalPriceContext";
import { BsFillMegaphoneFill, BsMegaphone } from "react-icons/bs";
import {
  OPT_ICONS,
  OPTS,
  OPTS_DISPLAY_VALUES
} from "../../helpers/numberOptions";

const {
  BigNumber,
  utils: { parseEther, formatEther, parseUnits },
  constants: { AddressZero, EtherSymbol },
} = ethers;

export default function BasicNumberInput({ value, setInput, placeholder }) {
  const { ethPriceInUsd } = useContext(ExternalPriceContext);

  if (!value) {
    value = BigNumber.from(0);
  }
  const [format, updateFormat] = useState(OPTS.number);
  const handleFormatChange = (formatValue) => {
    console.log("in handleFormatChange with: ", formatValue);
    updateFormat(formatValue);
  };
  const handleInputChange = () => {
    // let inputValue = inputRef.current.value || "0";
    let inputValue = inputRef.current.value;
    if (!inputValue) {
      setInput("");
    } else if (format === OPTS.number) {
      inputValue = inputValue.replace(/\.(.*)$/gm, "");
      setInput(BigNumber.from(inputValue));
    } else if (format === OPTS.eth) {
      setInput(parseEther(inputValue));
    } else if (format === OPTS.gwei) {
      setInput(parseUnits(inputValue, 9));
    } else if (format === OPTS.mwei) {
      setInput(parseUnits(inputValue, 6));
    } else if (format === OPTS.usdc) {
      const wei = ethers.constants.WeiPerEther.div(parseInt(ethPriceInUsd)).mul(
        BigNumber.from(parseInt(inputValue))
      );
      setInput(wei);
    } else if (format === OPTS.date) {
      setInput(moment.utc(inputValue).unix());
    } else if (format === OPTS["datetime-local"]) {
      setInput(moment(inputValue).unix());
    } else if (format === OPTS["datetime-utc"]) {
      setInput(moment.utc(inputValue).unix());
    }
  };
  useEffect(() => {
    handleInputChange();
  }, [format]);

  const inputRef = useRef();

  let label = `Will submit: ${value.toString()}`;
  let inputElementType = "number";
  if (format === OPTS.number) {
    inputElementType = "number";
  } else if (format === OPTS.eth) {
    inputElementType = "number";
  } else if (format === OPTS.gwei) {
    inputElementType = "number";
  } else if (format === OPTS.mwei) {
    inputElementType = "number";
  } else if (format === OPTS.usdc) {
    inputElementType = "number";
    label = (
      <Text>
        Will submit: {value.toString()}. Calculated by converting the inputted
        number first to ETH by using ETH/USD price of ${ethPriceInUsd} and then
        converting 1 ETH to 10<sup>18</sup> Wei.
      </Text>
    );
  } else if (format === OPTS.date) {
    inputElementType = "date";
  } else if (format === OPTS["datetime-local"]) {
    inputElementType = "datetime-local";
  } else if (format === OPTS["datetime-utc"]) {
    inputElementType = "datetime-local";
  }

  return (
    <>
      <Tooltip label={label} hasArrow>
        <HStack>
          <InputGroup>
            {OPT_ICONS[format] && (
              <InputLeftElement
                color={"gray.400"}
                children={OPT_ICONS[format]}
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
            <MenuList zIndex={"dropdown"}>
              <MenuOptionGroup
                type={"radio"}
                value={format}
                onChange={handleFormatChange}
              >
                {Object.entries(OPTS).map(([k, v]) => (
                  <MenuItemOption key={v} value={k}>
                    {OPTS_DISPLAY_VALUES[k]}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </HStack>
      </Tooltip>
    </>
  );
}
