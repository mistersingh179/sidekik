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
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useContext, useEffect, useMemo, useState } from "react";
import { CheckIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import { FaRegAddressCard } from "react-icons/fa";
import { ethers } from "ethers";
import doesContractCodeExist from "../../helpers/doesContractCodeExist";
import { useContractFileData } from "../../hooks";
import GlobalContext from "../../contexts/globalContext";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import ChainAddressesDropdown from "../inputs/ChainAddressesDropdown";
import { AddressDropdown } from "../inputs";
import EthNumberInput from "../inputs/EthNumberInput";

const {
  utils: { isAddress, Interface },
  constants: { AddressZero },
} = ethers;

const options = [
  { label: "Etherscan", value: "etherscan" },
  { label: "Goerli (Etherscan)", value: "goerli" },
  { label: "Polygonscan", value: "polygonscan" },
  { label: "Mumbai (Polygonscan)", value: "mumbai" },
  { label: "Bscscan", value: "binance" },
  { label: "Bscscan (testnet)", value: "testnetbinance" },
  { label: "Ftmscan", value: "fantom" },
  { label: "Ftmscan (testnet)", value: "testnetfantom" },
  { label: "snowtrace", value: "avalanche" },
];

const keys = {
  etherscan: "S34ZMII7CD3FM1WS2ZK9QIHPYEMD2EYY4U",
  polygonscan: "DCHBRKPEEJJ7HR6N89NT5GWA8H2X2A9Y9J",
  binance: "2H977DDDEQWX7H32M9XIT5EW43STX8DAJH",
  fantom: "XCV6GYVQFUT47KKCYF6HGC8TQXI95YMVG4",
  avalanche: "39Z8MHAW4S9UTZRGAV74KE6SYHCISD8XQA",
};

export default function SetupContractManually({ editContract }) {
  const {
    addContractAddress,
    addContractAbi,
    markContractFound,
    chainProvider,
    contracts,
  } = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [abi, setAbi] = useState("");
  const addressHandler = (evt) => setAddress(evt.target.value);
  const nameHandler = (evt) => setName(evt.target.value);
  const abiChangeHandler = (evt) => setAbi(evt.target.value);

  const abiUrl = (name) => {
    if (name === "etherscan") {
      return `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${keys.etherscan}`;
    } else if (name === "goerli") {
      return `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${keys.etherscan}`;
    } else if (name === "polygonscan") {
      return `https://api.polygonscan.com/api?module=contract&action=getabi&address=${address}&apikey=${keys.polygonscan}`;
    } else if (name === "mumbai") {
      return `https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=${address}&apikey=${keys.polygonscan}`;
    } else if (name === "binance") {
      return `https://api.bscscan.com/api?module=contract&action=getabi&address=${address}&apikey=${keys.binance}`;
    } else if (name === "testnetbinance") {
      return `https://api-testnet.bscscan.com/api?module=contract&action=getabi&address=${address}&apikey=${keys.binance}`;
    } else if (name === "fantom") {
      return `https://api.ftmscan.com/api?module=contract&action=getabi&address=${address}&apikey=${keys.fantom}`;
    } else if (name === "testnetfantom") {
      return `https://api-testnet.ftmscan.com/api?module=contract&action=getabi&address=${address}&apikey=${keys.fantom}`;
    } else if (name === "avalanche") {
      return `https://api.snowtrace.io/api?module=contract&action=getabi&address=${address}&apikey=${keys.avalanche}`;
    }
  };

  const abiServiceHandler = async (option) => {
    if (option === null) {
      return;
    }
    const { label, value } = option;
    console.log("in abi service handler with: ", value);
    const url = abiUrl(value);
    const response = await fetch(url);
    const body = await response.json();
    if (body.status === "1" && body.result) {
      setAbi(body.result);
    }
  };

  const addContractHandler = async () => {
    addContractAddress(name, address);
    const found = await doesContractCodeExist(chainProvider, address);
    markContractFound(name, found);
    addContractAbi(name, JSON.parse(abi));
    modalDisclosure.onClose();
  };

  const modalDisclosure = useDisclosure();

  const isAddressValid = useMemo(() => {
    let ans = false;
    if (address && address.length && address.length > 0) {
      if (isAddress(address) === true) {
        ans = true;
      } else {
        ans = false;
      }
    }
    return ans;
  }, [address]);

  const isAbiValid = useMemo(() => {
    let ans = true;
    if (abi && abi.length > 0) {
      try {
        const result = JSON.parse(abi);
        if (result && result.length && result.length > 0) {
          new Interface(result);
          ans = true;
        } else {
          ans = false;
        }
      } catch (e) {
        console.log("got error when checking abi: ", abi, e);
        ans = false;
      }
    }
    return ans;
  }, [abi]);

  const addressRightElem = useMemo(() => {
    if (address.length == 0) {
      return "";
    } else if (isAddress(address)) {
      return (
        <Tooltip label={"This looks like a good address"}>
          <CheckIcon color="green.500" />
        </Tooltip>
      );
    } else if (!isAddress(address)) {
      return (
        <Tooltip label={"This address is invalid"}>
          <InfoIcon color="red.500" />
        </Tooltip>
      );
    }
  }, [address]);

  useEffect(() => {
    if (editContract && modalDisclosure.isOpen) {
      debugger;
      setName(editContract);
      setAddress(contracts[editContract].address || "");
      setAbi(JSON.stringify(contracts[editContract].abi) || "");
    }
  }, [editContract, modalDisclosure && modalDisclosure.isOpen]);

  return (
    <>
      {editContract && (
        <IconButton
          icon={<EditIcon />}
          variant={"outline"}
          onClick={modalDisclosure.onOpen}
        />
      )}
      {!editContract && (
        <Button onClick={modalDisclosure.onOpen}>Manually Enter</Button>
      )}
      <Modal
        size={"xl"}
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
        preserveScrollBarGap={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Setup Contract Manually</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              <FormControl isRequired isDisabled={!!editContract}>
                <FormLabel>Name</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Icon as={MdOutlineDriveFileRenameOutline} />
                  </InputLeftElement>
                  <Input value={name} type={"text"} onChange={nameHandler} />
                </InputGroup>
                <FormHelperText>Give the contract a unique name</FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Icon as={FaRegAddressCard} />
                  </InputLeftElement>
                  <Input
                    value={address}
                    type={"text"}
                    onChange={addressHandler}
                    errorBorderColor="red.300"
                  />
                  <InputRightElement children={addressRightElem} />
                </InputGroup>
                <FormHelperText>
                  Address at which the contract is deployed
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Auto Fetch ABI</FormLabel>
                <Select
                  options={options}
                  isClearable
                  placeholder={
                    "Optionally Select a provider from whom to fetch ABI"
                  }
                  selectedOptionStyle={"color"}
                  useBasicStyles
                  onChange={abiServiceHandler}
                />
              </FormControl>
              <FormControl isRequired isInvalid={!isAbiValid}>
                <FormLabel>ABI</FormLabel>
                <Tooltip label={"This ABI has been autofetched from"}>
                  <Textarea
                    resize={"vertical"}
                    h={"150px"}
                    value={abi}
                    onChange={abiChangeHandler}
                    focusBorderColor={isAbiValid ? "blue.500" : "red.500"}
                  ></Textarea>
                </Tooltip>
                {isAbiValid && (
                  <FormHelperText>
                    ABI of this contract formatted in the format of an Array
                  </FormHelperText>
                )}
                {!isAbiValid && (
                  <FormErrorMessage>
                    This ABI is not valid. At a minimum it should be an array
                    with 1 item.
                  </FormErrorMessage>
                )}
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme={"blue"}
              mr={3}
              disabled={
                !name || !address || !abi || !isAbiValid || !isAddressValid
              }
              onClick={addContractHandler}
            >
              {editContract && "Update "}
              {!editContract && "Add "}
              Contract
            </Button>
            <Button onClick={modalDisclosure.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
