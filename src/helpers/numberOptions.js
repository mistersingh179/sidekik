import { Icon, Text } from "@chakra-ui/react";
import { BsMegaphone } from "react-icons/bs";
import {
  RiCalendarCheckFill,
  RiCalendarCheckLine,
  RiGasStationLine, RiTimeLine
} from "react-icons/ri";
import { ethers } from "ethers";

const {
  utils: { formatEther, formatUnits },
  constants: { EtherSymbol },
} = ethers;

export const OPTS = {
  number: "number",
  gwei: "gwei",
  eth: "eth",
  mwei: "mwei",
  usdc: "usdc",
  date: "date",
  "datetime-utc": "datetime-utc",
  "datetime-local": "datetime-local",
};

export const OPTS_DISPLAY_VALUES = {
  number: "number",
  gwei: (
    <Text>
      10<sup>9</sup> – gwei
    </Text>
  ),
  eth: (
    <Text>
      10<sup>18</sup> – eth
    </Text>
  ),
  mwei: (
    <Text>
      10<sup>6</sup> - mwei aka USDC
    </Text>
  ),
  usdc: <Text>$ in decimals</Text>,
  date: "date",
  "datetime-utc": "datetime-utc",
  "datetime-local": "datetime-local",
};

export const OPT_ICONS = {
  number: "#",
  mwei: <Icon as={BsMegaphone} />,
  gwei: <Icon as={RiGasStationLine} />,
  eth: EtherSymbol,
  // eth: <Text fontSize={'sm'}>10<sup>18</sup></Text>,
  usdc: "$",
  date: <Icon as={RiCalendarCheckFill} />,
  "datetime-utc": <Icon as={RiCalendarCheckLine} />,
  "datetime-local": <Icon as={RiCalendarCheckLine} />,
};