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

const {
  BigNumber,
  utils: { isAddress, parseEther, formatEther, parseUnits },
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
  const { chainProvider } = useContext(GlobalContext);

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
      description: `Tx Hash: ${buildDisplayAddress(result.hash)}`,
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
      failureToast(e);
      setError(e);
      onOpen();
    }
    refreshAllBalances();
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
                    <AlertDescription wordBreak={"break-all"}>
                      {error?.toString()}
                    </AlertDescription>
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
            <Button onClick={modalDisclosure.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
