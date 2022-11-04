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
  Portal,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { AiOutlineNumber } from "react-icons/ai";
import { Select } from "chakra-react-select";
import { IoOptions } from "react-icons/io5";
import { FormattedEthDisplay } from "./index";
import { useContext, useState } from "react";
import { BigNumber, ethers } from "ethers";
import moment from "moment";
import { GlobalContext } from "../../contexts";
import {
  RiCalendarCheckFill,
  RiCalendarCheckLine,
  RiGasStationLine,
  RiTimeLine,
} from "react-icons/ri";
import { GiWeightScale } from "react-icons/gi";
import ExternalPriceContext from "../../contexts/externalPriceContext";

const {
  utils: { formatEther, formatUnits, parseUnits, commify, WeiPerEther },
  constants: { EtherSymbol },
} = ethers;

window.formatUnits = formatUnits;
window.formatEther = formatEther;
window.parseUnits = parseUnits;

/*
options can be const
drive menu, drive if state for formatted value
 */

const OPT = {
  units: "units",
  wei: "wei",
  gwei: "gwei",
  eth: "eth",
  usdc: "usdc",
};

const OPT_ICONS = {
  units: "#",
  wei: <Icon as={GiWeightScale} />,
  gwei: <Icon as={RiGasStationLine} />,
  eth: EtherSymbol,
  usdc: "$",
};

export default function GasDisplay({ value }) {
  const { gasPriceInWei, ethPriceInUsd } = useContext(ExternalPriceContext);
  const [displayOption, updateDisplayOption] = useState(OPT.units);
  const changeHandler = (val) => {
    console.log("val: ", val);
    updateDisplayOption(val);
  };
  const gasPriceInGwei = formatUnits(gasPriceInWei, 9);

  let formattedValue;
  if (displayOption === OPT.units) {
    formattedValue = value;
  } else if (displayOption === OPT.wei) {
    formattedValue = value.mul(gasPriceInWei);
  } else if (displayOption === OPT.gwei) {
    formattedValue = formatUnits(value.mul(gasPriceInWei), 9);
  } else if (displayOption === OPT.eth) {
    formattedValue = formatUnits(value.mul(gasPriceInWei), 18);
  } else if (displayOption === OPT.usdc) {
    const ethPrice = BigNumber.from(parseInt(ethPriceInUsd));
    const txEth = parseFloat(formatUnits(value.mul(gasPriceInWei), 18));
    const txUsd = txEth * ethPrice;
    formattedValue = txUsd;
  }
  formattedValue = commify(formattedValue);

  const leftElementChild = OPT_ICONS[displayOption];

  let label;
  if ([OPT.wei, OPT.gwei, OPT.eth].some((x) => x === displayOption)) {
    label = `Calculated by using Gas Price of ${gasPriceInGwei} Gwei`;
  } else if (displayOption === OPT.usdc) {
    label = `Calculated using Gas Price: ${gasPriceInGwei} Gwei & ETH/USD price: $${ethPriceInUsd}`;
  }

  return (
    <Box w={"full"}>
      <Tooltip label={label}>
        <HStack>
          <InputGroup>
            {leftElementChild && (
              <InputLeftElement
                color={"gray.400"}
                children={leftElementChild}
              />
            )}
            <Input isReadOnly value={formattedValue}></Input>
          </InputGroup>
          <Menu>
            <MenuButton as={IconButton} icon={<Icon as={IoOptions} />}>
              Actions
            </MenuButton>
            <MenuList zIndex={"dropdown"} onChange={changeHandler}>
              <MenuOptionGroup
                value={displayOption}
                type="radio"
                onChange={changeHandler}
              >
                {Object.entries(OPT).map((option) => (
                  <MenuItemOption key={option[1]} value={option[0]}>
                    {option[1]}
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
