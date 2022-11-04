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
import { CalendarIcon, CopyIcon } from "@chakra-ui/icons";
import { AiOutlineNumber } from "react-icons/ai";
import { Select } from "chakra-react-select";
import { IoOptions, IoTextSharp } from "react-icons/io5";
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
import { BsHexagon } from "react-icons/bs";
import { SiHexo } from "react-icons/si";

const {
  utils: { formatEther, formatUnits },
  constants: { EtherSymbol },
} = ethers;

const OPTS = {
  bytes: "bytes",
  string: "string",
};

const OPT_ICONS = {
  bytes: <Icon as={SiHexo} />,
  string: <Icon as={IoTextSharp} />,
};

export default function BytesDisplay(props) {
  const { value } = props;
  const [displayOption, updateDisplayOption] = useState(OPTS.bytes);

  let formattedValue;

  if (displayOption === OPTS.bytes) {
    formattedValue = value.toString();
  } else if (displayOption === OPTS.string) {
    try {
      formattedValue = ethers.utils.toUtf8String(value);
    } catch (e) {
      console.error("error parsing bytes: ", value, e);
      formattedValue = "";
    }

    console.log("string formatted value: ", formattedValue);
  }

  return (
    <Box w={"full"}>
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

          {/*<InputRightElement>*/}
          {/*  <Menu>*/}
          {/*    <MenuButton as={IconButton} icon={<Icon as={IoOptions} />} size={'sm'} h={'1.75rem'}>*/}
          {/*      Actions*/}
          {/*    </MenuButton>*/}
          {/*    <MenuList zIndex={"100000"}>*/}
          {/*      <MenuOptionGroup*/}
          {/*        zIndex={"100000"}*/}
          {/*        type={"radio"}*/}
          {/*        value={displayOption}*/}
          {/*        onChange={updateDisplayOption}*/}
          {/*      >*/}
          {/*        {Object.entries(OPTS).map(([k, v]) => (*/}
          {/*          <MenuItemOption key={v} value={k}>{v}</MenuItemOption>*/}
          {/*        ))}*/}
          {/*      </MenuOptionGroup>*/}
          {/*    </MenuList>*/}
          {/*  </Menu>*/}
          {/*</InputRightElement>*/}
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
                <MenuItemOption key={k} value={k}>{v}</MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  );
}
