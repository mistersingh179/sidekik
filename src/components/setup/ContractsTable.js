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

const {
  utils: { isAddress, Interface, FormatTypes },
  constants: { AddressZero },
} = ethers;

const AbiTag = ({ abi }) => {
  console.debug("in AbiTag with: ", abi);
  if (!abi || abi.length == 0) {
    return (
      <Tooltip
        label={
          `The ABI of this contract has not been uploaded. ` +
          `You can upload additional files which have the ABI or ` +
          `just upload your artifacts directory as they have ABI's of all contracts being used.`
        }
      >
        <Badge colorScheme="red">Missing</Badge>
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
          label={
            `ABI has ` +
            `${fragCount} ${pluralize("fragement", fragCount)}, ` +
            `${errCount} ${pluralize("error", errCount)}, ` +
            `${evtCount} ${pluralize("event", evtCount)} and ` +
            `${fnCount} ${pluralize("function", fnCount)}.`
          }
        >
          {/*  <VStack spacing={1}>*/}
          {/*    <Heading size={'xs'}>ABI processed with following properties: </Heading>*/}
          {/*    <Text>{Object.keys(iface.fragments).length} fragments</Text>*/}
          {/*    <Text>{Object.keys(iface.errors).length} errors</Text>*/}
          {/*    <Text>{Object.keys(iface.events).length} events</Text>*/}
          {/*    <Text>{Object.keys(iface.functions).length} functions</Text>*/}
          {/*  </VStack>*/}
          <Badge colorScheme="green">Found</Badge>
        </Tooltip>
      </>
    );
    console.log("interface: ", iface);
  } catch (e) {
    console.log("error processing: ", abi, e);
    return <Badge colorScheme="red">Not Found</Badge>;
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

  console.debug("**** contractNames are: ", contractNames);

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
                  <InputGroup size={"sm"}>
                    <Input
                      isReadOnly={true}
                      value={buildDisplayAddress(contracts[name].address)}
                      onChange={handleInputChange.bind(this, name)}
                    />
                    <InputRightElement>
                      {contracts[name].found && (
                        <Tooltip label={"Found Contract Code"}>
                          <CheckIcon color={"green.400"} />
                        </Tooltip>
                      )}
                      {!contracts[name].found && (
                        <Tooltip
                          label={
                            "Unable to find contract code on the connected contract chain"
                          }
                        >
                          <WarningIcon color={"red.400"} />
                        </Tooltip>
                      )}
                    </InputRightElement>
                  </InputGroup>
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
