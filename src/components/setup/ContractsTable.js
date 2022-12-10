import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Code,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, WarningIcon } from "@chakra-ui/icons";
import { GlobalContext } from "../../contexts";
import { useContext, useMemo } from "react";
import doesContractCodeExist from "../../helpers/doesContractCodeExist";
import SetupContractManually from "./SetupContractManually";
import { buildDisplayAddress } from "../../helpers";
import { ethers } from "ethers";
import pluralize from "pluralize";
import { forwardRef } from "react";
const {
  utils: { isAddress, Interface, FormatTypes },
  constants: { AddressZero },
} = ethers;

const RoundedSpacedBadge = forwardRef((props, ref) => {
  const { children, ...rest } = props;
  return (
    <Badge
      ref={ref}
      fontSize={"0.8em"}
      px={2}
      py={1}
      borderRadius="xl"
      {...rest}
    >
      {children}
    </Badge>
  );
});

const AddressTag = ({ address, found }) => {
  if (!address) {
    return (
      <Tooltip
        hasArrow
        label={
          `The address of this contract has not been uploaded. ` +
          `You can either upload additional files which have the address or ` +
          `just click on the edit action & manually enter the address.`
        }
      >
        <RoundedSpacedBadge colorScheme="red">Missing</RoundedSpacedBadge>
      </Tooltip>
    );
  } else if (!isAddress(address)) {
    return (
      <Tooltip
        hasArrow
        label={
          `The address uploaded for this contract is invalid.` +
          `You can either upload different files which have the correct address or ` +
          `just click on the edit action & manually enter the address.`
        }
      >
        <RoundedSpacedBadge colorScheme="red">
          {buildDisplayAddress(address)} – Invalid
        </RoundedSpacedBadge>
      </Tooltip>
    );
  } else if (!found) {
    return (
      <Tooltip
        hasArrow
        label={
          `The address uploaded for this contract was not found on the chain. ` +
          `Either connect to the correct chain where this contract is deployed ` +
          `or upload different files which have the correct address ` +
          `or just click on the edit action & manually enter the address.`
        }
      >
        <RoundedSpacedBadge colorScheme="red">
          {buildDisplayAddress(address)} – Not Found
        </RoundedSpacedBadge>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip hasArrow label={`Contract Code Found`}>
        <RoundedSpacedBadge colorScheme="green">
          {buildDisplayAddress(address)}
        </RoundedSpacedBadge>
      </Tooltip>
    );
  }
};

const AbiTag = ({ abi }) => {
  if (!abi || abi.length == 0) {
    return (
      <Tooltip
        hasArrow
        label={
          `The ABI of this contract has not been uploaded. ` +
          `You can upload additional files which have the ABI or ` +
          `just upload your artifacts directory as they have ABI's of all contracts being used.`
        }
      >
        <RoundedSpacedBadge colorScheme="red">Missing</RoundedSpacedBadge>
      </Tooltip>
    );
  }
  try {
    const iface = new Interface(abi);
    const fragCount = Object.keys(iface.fragments).length;
    const errCount = Object.keys(iface.errors).length;
    const evtCount = Object.keys(iface.events).length;
    const fnCount = Object.keys(iface.functions).length;

    return (
      <>
        <Tooltip
          hasArrow
          label={
            `ABI has ` +
            `${fragCount} ${pluralize("fragement", fragCount)}, ` +
            `${errCount} ${pluralize("error", errCount)}, ` +
            `${evtCount} ${pluralize("event", evtCount)} and ` +
            `${fnCount} ${pluralize("function", fnCount)}.`
          }
        >
          <RoundedSpacedBadge colorScheme="green">Found</RoundedSpacedBadge>
        </Tooltip>
      </>
    );
  } catch (e) {
    return <RoundedSpacedBadge colorScheme="red">Not Found</RoundedSpacedBadge>;
  }
};

export default function ContractsTable(props) {
  const {
    chainProvider,
    contracts,
    addContractAddress,
    removeContract,
    markContractFound,
  } = useContext(GlobalContext);

  const contractNames = useMemo(() => {
    const keys = Object.keys(contracts);
    keys.sort((a, b) => {
      if (contracts[a]?.address) {
        return -1;
      } else {
        return 1;
      }
    });
    return keys;
  }, [contracts]);

  const handleInputChange = async (name, evt) => {
    const address = evt.target.value;
    addContractAddress(name, evt.target.value);
    addContractAddress(name, address);
    const found = await doesContractCodeExist(chainProvider, address);
    markContractFound(name, found);
  };

  return (
    <>
      <TableContainer
        maxH={"calc(100vh - 300px)"}
        minH={"300px"}
        overflowY={"auto"}
        w={"600px"}
      >
        <Table size="sm">
          <TableCaption placement={"top"}>Contracts</TableCaption>
          <Thead position={"sticky"} top={0} zIndex={"docked"} bg={"white"}>
            <Tr>
              <Th>Name</Th>
              <Th>Address</Th>
              <Th>Abi</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {contractNames.map((name) => (
              <Tr key={name}>
                <Td>{name}</Td>
                <Td>
                  <AddressTag
                    address={contracts[name]?.address}
                    found={contracts[name]?.found}
                  />
                </Td>
                <Td>
                  <AbiTag abi={contracts[name].abi} />
                  {/*<Input*/}
                  {/*  value={JSON.stringify(contracts[name].abi, null, 0) || ""}*/}
                  {/*  isReadOnly*/}
                  {/*/>*/}
                </Td>
                <Td>
                  <ButtonGroup>
                    <SetupContractManually editContract={name} />
                    <IconButton
                      icon={<DeleteIcon />}
                      variant={"outline"}
                      onClick={removeContract.bind(this, name)}
                    >
                      Remove
                    </IconButton>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
            {contractNames.length == 0 && (
              <Tr>
                <Td colSpan={4}>
                  <Alert
                    status="warning"
                    variant={"ghost"}
                    justifyContent={"center"}
                  >
                    <AlertIcon />
                    No Contracts Found
                  </Alert>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Spacer />
    </>
  );
}
