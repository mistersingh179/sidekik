import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { AddressDropdown } from "./inputs";
import { ethers } from "ethers";
import { useContext, useRef, useState } from "react";
import EthNumberInput from "./inputs/EthNumberInput";
import { FormattedEthDisplay } from "./display";
import BalancesContext from "../contexts/balancesContext";
import GlobalContext from "../contexts/globalContext";
import ChainAddressesDropdown from "./inputs/ChainAddressesDropdown";
import { buildDisplayAddress } from "../helpers";
import { BiTransfer } from "react-icons/bi";
import { getErrorString } from "../helpers/extractMessgeFromError";

const {
  BigNumber,
  utils: { isAddress, parseEther, formatEther, parseUnits, hexValue },
  constants: { AddressZero, EtherSymbol },
} = ethers;

export default function BalanceTransfer(props) {
  const [from, setFrom] = useState(AddressZero);
  const [to, setTo] = useState(AddressZero);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState();

  const modalDisclosure = useDisclosure();
  const { isOpen: isVisible, onClose, onOpen } = useDisclosure();

  const { getFormattedBalance, refreshAllBalances } =
    useContext(BalancesContext);
  const { chainProvider, isHardhat } = useContext(GlobalContext);

  const toast = useToast();
  const toastRef = useRef();
  const loadingToast = () => {
    toastRef.current = toast({
      position: "bottom-right",
      isClosable: true,
      title: "Trasnsfer Started",
      status: "loading",
    });
  };
  const successToast = (result) => {
    toast.update(toastRef.current, {
      position: "bottom-right",
      title: "Transfer Successful",
      isClosable: true,
      status: "success",
      description: result.hash
        ? `Tx Hash: ${buildDisplayAddress(result.hash)}`
        : "",
    });
  };
  const failureToast = (error) => {
    toast.update(toastRef.current, {
      position: "bottom-right",
      title: "Transfer Failed",
      isClosable: true,
      status: "error",
      description: error.toString(),
    });
  };

  const setBalance = async () => {
    onClose();
    setError();

    try {
      loadingToast();
      const result = await chainProvider.send("hardhat_setBalance", [
        to,
        hexValue(amount),
      ]);
      console.log("setBalance result is: ", result);
      successToast(result);
    } catch (e) {
      failureToast(getErrorString(e));
      setError(getErrorString(e));
      onOpen();
    }
    refreshAllBalances();
  };

  const transferHandler = async () => {
    onClose();
    setError();

    const fromWallet = chainProvider.getSigner(from);
    try {
      loadingToast();
      const result = await fromWallet.sendTransaction({
        to: to,
        value: amount,
      });
      console.log("transfer result: ", result);
      successToast(result);
    } catch (e) {
      failureToast(getErrorString(e));
      setError(getErrorString(e));
      onOpen();
    }
    refreshAllBalances();
  };

  const cleanUp = () => {
    setError();
    setFrom();
    setTo();
    setAmount();
    onClose();
  };

  return (
    <>
      <Tooltip label={"Transfer Funds between addresses"}>
        <IconButton
          icon={<Icon as={BiTransfer} />}
          onClick={modalDisclosure.onOpen}
        />
      </Tooltip>
      <Modal
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
        onCloseComplete={cleanUp}
        preserveScrollBarGap={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Balance Transfer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              <FormControl>
                <FormLabel>From</FormLabel>
                <Box minW={"250px"}>
                  <ChainAddressesDropdown
                    placeholder={"From Address"}
                    setInput={setFrom}
                    value={from}
                  />
                </Box>
                <FormHelperText>
                  Balance: {EtherSymbol} {getFormattedBalance(from)}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>To</FormLabel>
                <Box minW={"250px"}>
                  <AddressDropdown
                    placeholder={"To Address"}
                    setInput={setTo}
                    value={to}
                  />
                </Box>
                <FormHelperText>
                  Balance: {EtherSymbol} {getFormattedBalance(to)}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <EthNumberInput
                  setInput={setAmount}
                  value={amount}
                  placeholder={"Amount you want to Transfer"}
                />
                <FormHelperText></FormHelperText>
              </FormControl>
              {isVisible && (
                <Alert status="error">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Error!</AlertTitle>
                    {isHardhat && (
                      <AlertDescription wordBreak={"break-word"}>
                        The transfer of balance failed. This is common when the
                        receiver is a contract which doesn't accept Eth. Do you
                        want to use force and just set the balance?
                      </AlertDescription>
                    )}
                    {!isHardhat && (
                      <AlertDescription>
                        {error}
                      </AlertDescription>
                    )}
                  </Box>
                  <CloseButton
                    alignSelf="flex-start"
                    position="relative"
                    right={-1}
                    top={-1}
                    onClick={onClose}
                  />
                </Alert>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme={"blue"}
              mr={3}
              disabled={!from || !to || !amount}
              onClick={transferHandler}
            >
              Transfer
            </Button>
            {isHardhat && !!error && (
              <Button
                colorScheme={"orange"}
                mr={3}
                disabled={!from || !to || !amount}
                onClick={setBalance}
              >
                Set Balance
              </Button>
            )}
            <Button onClick={modalDisclosure.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
