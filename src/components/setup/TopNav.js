import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Show,
  Spacer,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { WalletSetup } from "../index";
import SetupDrawer, {
  ChainIdBox,
  MetaMaskButtons,
  RpcUrlInputBox,
  WalletAddressCopyButton,
  WalletAddressDropDown,
  WalletBalance,
} from "./SetupDrawer";
import { useContext, useRef } from "react";
import { HamburgerIcon, RepeatIcon } from "@chakra-ui/icons";
import GlobalContext from "../../contexts/globalContext";
import useFileReloadToast from "../../hooks/useFileReloadToast";
import BalanceTransfer from "../BalanceTransfer";
import { ethers } from "ethers";
import { Link as ReactRouterLink } from "react-router-dom";

const ReloadAbi = (props) => {
  const { readAgain, handles, filePollingInterval } = useContext(GlobalContext);

  const { reloadToast } = useFileReloadToast();

  const reloadABiIconHandler = (evt) => {
    reloadToast();
    readAgain();
  };

  if (handles.length === 0) {
    return "";
  }

  return (
    <Tooltip label={"Reload files"}>
      <IconButton
        colorScheme={!filePollingInterval ? 'teal' : 'gray'}
        size={"md"}
        icon={<RepeatIcon />}
        variant={"solid"}
        onClick={reloadABiIconHandler}
      ></IconButton>
    </Tooltip>
  );
};

export default function TopNav(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Flex
        dirction={"row"}
        borderBottom={"1px"}
        borderColor={"gray.100"}
        position={"fixed"}
        top={0}
        h={"50px"}
        bg={"white"}
        zIndex={"sticky"}
        w={"full"}
        alignItems={"center"}
        px={5}
      >
        <Heading fontSize={"2xl"}>
          <ReactRouterLink to={"/"}>SideKik</ReactRouterLink>
        </Heading>
        <Spacer />
        <HStack spacing={2} w={"auto"}>
          <Show above={"sm"}>
            <ReloadAbi />
            <RpcUrlInputBox />
          </Show>
          <Show above={"md"}>
            <MetaMaskButtons />
            <WalletAddressDropDown width={"170px"} />
          </Show>
          <Show above={"lg"}>
            <WalletAddressCopyButton />
            <WalletBalance />
            <BalanceTransfer />
          </Show>
        </HStack>
        <Spacer />
        <IconButton
          variant={"outline"}
          ref={btnRef}
          onClick={onOpen}
          icon={<HamburgerIcon />}
        ></IconButton>
        <SetupDrawer btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
      </Flex>
    </>
  );
}
