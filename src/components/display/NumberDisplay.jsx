import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Portal, Text,
  Tooltip,
  useClipboard
} from "@chakra-ui/react";
import { CalendarIcon, CopyIcon } from "@chakra-ui/icons";
import { AiOutlineNumber } from "react-icons/ai";
import { Select } from "chakra-react-select";
import { IoOptions } from "react-icons/io5";
import { FormattedEthDisplay } from "./index";
import { useContext, useState } from "react";
import { ethers } from "ethers";
import moment from "moment";
import {
  RiCalendarCheckFill,
  RiCalendarCheckLine,
  RiGasStationLine,
  RiTimeLine,
} from "react-icons/ri";
import { GlobalContext } from "../../contexts";
import ExternalPriceContext from "../../contexts/externalPriceContext";

const {
  utils: { formatEther, formatUnits },
  constants: { EtherSymbol },
} = ethers;

const OPTS = {
  number: "number",
  gwei: "gwei",
  eth: "eth",
  usdc: "usdc",
  date: "date",
  "datetime-utc": "datetime-utc",
  "datetime-local": "datetime-local",
  time: "time",
};

const OPT_ICONS = {
  number: "#",
  gwei: <Icon as={RiGasStationLine} />,
  eth: EtherSymbol,
  usdc: "$",
  date: <Icon as={RiCalendarCheckFill} />,
  "datetime-utc": <Icon as={RiCalendarCheckLine} />,
  "datetime-local": <Icon as={RiCalendarCheckLine} />,
  time: <Icon as={RiTimeLine} />,
};

export default function NumberDisplay({ value }) {
  const { ethPriceInUsd } = useContext(ExternalPriceContext);

  const [displayOption, updateDisplayOption] = useState("number");

  let formattedValue;

  if (displayOption === OPTS.number) {
    formattedValue = value.toString();
  } else if (displayOption === OPTS.eth) {
    formattedValue = Number(formatEther(value || 0)).toFixed(4);
  } else if (displayOption === OPTS.gwei) {
    formattedValue = Number(formatUnits(value || 0, 9)).toFixed(4);
  } else if (displayOption === OPTS.usdc) {
    formattedValue = Number(
      parseFloat(formatEther(value)) * ethPriceInUsd
    ).toFixed(4);
  } else if (displayOption === OPTS["datetime-utc"]) {
    formattedValue = moment.unix(value).utc().format();
  } else if (displayOption === OPTS["datetime-local"]) {
    formattedValue = moment.unix(value).format();
  } else if (displayOption === OPTS.date) {
    formattedValue = moment.unix(value).utc().format("YYYY-MM-DD");
  } else if (displayOption === OPTS.time) {
    formattedValue = moment.unix(value).utc().format("LTS");
  }

  let label;
  if (displayOption === OPTS.usdc) {
    label = (
      <Text>
        Calculated by turning 10<sup>18</sup> Wei to 1 ETH & then using ETH/USD price of $
        {ethPriceInUsd}
      </Text>
    );
  }

  return (
    <Box w={"full"}>
      <Tooltip label={label}>
        <HStack>
          <InputGroup>
            <InputGroup>
              {OPT_ICONS[displayOption] && (
                <InputLeftElement
                  color={"gray.400"}
                  children={OPT_ICONS[displayOption]}
                />
              )}
              <Input isReadOnly value={formattedValue}></Input>
            </InputGroup>
          </InputGroup>
          <Menu>
            <MenuButton as={IconButton} icon={<Icon as={IoOptions} />}>
              Actions
            </MenuButton>
            <MenuList zIndex={"dropdown"}>
              <MenuOptionGroup
                type={"radio"}
                value={displayOption}
                onChange={updateDisplayOption}
              >
                {Object.entries(OPTS).map(([k, v]) => (
                  <MenuItemOption key={v} value={k}>
                    {v}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </HStack>
      </Tooltip>
    </Box>
  );
}
