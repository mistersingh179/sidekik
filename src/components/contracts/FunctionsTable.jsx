import {
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  Code,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Link,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  NumberInput,
  Show,
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
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import GlobalContext from "../../contexts/globalContext";
import { BigNumber, ethers } from "ethers";
import { AddressDropdown } from "../inputs";
import {
  AddressDisplay,
  BooleanDisplay,
  NumberDisplay,
  StringDisplay,
} from "../display";
import { isAddress } from "ethers/lib/utils";
import {
  AddIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  DeleteIcon,
  MinusIcon,
  SearchIcon,
  SmallAddIcon,
  SmallCloseIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";
import GasDisplay from "../display/GasDisplay";
import useFunctionToast from "../../hooks/useFunctionToast";
import PropTypes from "prop-types";
import BasicInput from "../inputs/BasicInput";
import BasicNumberInput from "../inputs/BasicNumberInput";
import EthNumberInput from "../inputs/EthNumberInput";
import BalancesContext from "../../contexts/balancesContext";
import Bytes32Display from "../display/Bytes32Display";
import Bytes32Input from "../inputs/Bytes32Input";
import BytesDisplay from "../display/BytesDisplay";
import BytesInput from "../inputs/BytesInput";
import InfoTable from "./InfoTable";
import pluralize from "pluralize";
import hash from "object-hash";
import groupSimilarFunctionNames from "group-similar-functions";
import extractMessageFromError from "../../helpers/extractMessgeFromError";
import BooleanInput from "../inputs/BooleanInput";
import StringInput from "../inputs/StringInput";

const {
  utils: { formatEther },
  constants: { AddressZero },
} = ethers;

const TYPES = {
  SET_RESULT: "SET_RESULT",
  SET_RECEIPT: "SET_RECEIPT",
  SET_ERROR: "SET_ERROR",
  RESET: "RESET",
};

const reducerFn = (state, action) => {
  switch (action.type) {
    case TYPES.SET_RESULT:
      return {
        result: action.payload,
        receipt: null,
        error: null,
      };
    case TYPES.SET_RECEIPT:
      return {
        result: state.result,
        receipt: action.payload,
        error: null,
      };
    case TYPES.SET_ERROR:
      return {
        result: null,
        receipt: null,
        error: action.payload,
      };
    case TYPES.RESET:
      return {
        result: null,
        receipt: null,
        error: null,
      };
  }
};

const Inputs = ({
  inputsAbi,
  getInput,
  setInput,
  inputs,
  showRaw,
  payableAmount,
  setPayableAmount,
  isPayable,
}) => {
  let rawObj = inputs;
  if (isPayable) {
    rawObj = { ...rawObj, __payableAmount__: payableAmount };
  }
  return (
    <VStack spacing={2} align={"stretch"} w={"full"}>
      {inputsAbi.map((inputAbi, idx) => {
        let Elem;
        if (inputAbi.type === "tuple") {
          Elem = InputTupleContainer;
        } else if (inputAbi.type.endsWith("[]")) {
          Elem = InputArrayContainer;
        } else {
          Elem = InputElement;
        }
        return (
          <Elem
            key={inputAbi.name || idx}
            inputAbi={inputAbi}
            value={getInput(inputAbi.name)}
            setInput={setInput.bind(this, inputAbi.name)}
          />
        );
      })}
      {isPayable && (
        <EthNumberInput
          value={payableAmount}
          setInput={setPayableAmount}
          placeholder={"payable amount"}
        />
      )}
      {showRaw && (
        <Code
          maxW={"450px"}
          maxH={"400px"}
          overflowX={"auto"}
          whiteSpace={"pre"}
          colorScheme={"yellow"}
        >
          {JSON.stringify(rawObj, null, "\t")}
        </Code>
      )}
    </VStack>
  );
};
const MemoizedInputs = React.memo(Inputs);
MemoizedInputs.displayName = "MemoizedInputs";

const InputElement = ({ inputAbi, value, setInput }) => {
  const placeholder = `${inputAbi.name} – ${inputAbi.type}`;
  let Elem;
  if (inputAbi.type === "tuple[]") {
    Elem = InputTupleContainer;
  } else if (
    inputAbi.type.startsWith("uint") ||
    inputAbi.type.startsWith("int")
  ) {
    Elem = BasicNumberInput;
  } else if (inputAbi.type.startsWith("address")) {
    Elem = AddressDropdown;
  } else if (inputAbi.type.startsWith("bytes32")) {
    Elem = Bytes32Input;
  } else if (inputAbi.type.startsWith("bytes")) {
    Elem = BytesInput;
  } else if (inputAbi.type.startsWith("bool")) {
    Elem = BooleanInput;
  } else if (inputAbi.type.startsWith("string")) {
    Elem = StringInput;
  } else {
    Elem = BasicInput;
  }
  return (
    <HStack spacing={2} w={"full"}>
      {/*<Text>{`${inputAbi.name} ${inputAbi.type}`}</Text>*/}
      <Box w={"full"}>
        <Elem
          inputAbi={inputAbi}
          placeholder={placeholder}
          value={value}
          setInput={setInput}
        />
      </Box>
    </HStack>
  );
};

const InputTupleContainer = ({ inputAbi, value, setInput }) => {
  const emptyValue = {};
  const [state, setState] = useState({});

  // useEffect(() => {
  //   console.log("InputTupleContainer state is: ", state);
  // }, [state]);
  const updateItem = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  useEffect(() => {
    setInput(state);
  }, [state]);
  return (
    <VStack w={"full"} border="1px" borderColor="gray.200" p={2}>
      {inputAbi.components.map((item, idx) => {
        let Elem;
        if (item.type.endsWith("[]")) {
          Elem = InputArrayContainer;
        } else {
          Elem = InputElement;
        }
        return (
          <Elem
            key={idx}
            inputAbi={item}
            value={state[item.name]}
            setInput={updateItem.bind(this, item.name)}
          />
        );
      })}
    </VStack>
  );
};

const InputArrayContainer = ({ inputAbi, value, setInput }) => {
  const emptyValue = "";
  const [state, setState] = useState([]);
  const addItem = (idx, value) => {
    // console.log("in addItem with: ", idx, value);
    setState((prevState) => {
      const prefix = prevState.slice(0, idx);
      const suffix = prevState.slice(idx + 1);
      const newValue = value ? value : emptyValue;
      // return [...prefix, parseInt(newValue), ...suffix];
      // console.log("new state: ", [...prefix, newValue, ...suffix]);
      return [...prefix, newValue, ...suffix];
    });
  };
  const removeItem = (idx) => {
    console.log("***in remove Item with:", idx);
    setState((prevState) => {
      const prefix = prevState.slice(0, idx);
      const suffix = prevState.slice(idx + 1);
      return [...prefix, ...suffix];
    });
  };
  const removeLastItem = () => {
    setState((prevState) => {
      const nextState = prevState.slice(0, -1);
      return nextState;
    });
  };
  const numOfInputs = state.length;
  useEffect(() => {
    console.log("*** latest state: ", state);
    setInput(state);
  }, [state]);
  return (
    <VStack
      spacing={2}
      align={"stretch"}
      w={"full"}
      border="1px"
      borderColor="gray.200"
      p={2}
    >
      {Array(numOfInputs)
        .fill("")
        .map((item, idx) => (
          <HStack justify={"stretch"} w={"full"} key={idx}>
            <Box flexGrow={1}>
              <InputElement
                inputAbi={inputAbi}
                value={state[idx]}
                setInput={(value) => {
                  addItem(idx, value);
                }}
              />
            </Box>
          </HStack>
        ))}
      <HStack>
        <Button
          size={"sm"}
          rightIcon={<SmallAddIcon />}
          onClick={() => addItem(numOfInputs, emptyValue)}
        >
          Add {inputAbi.type.replace("[]", "")}
        </Button>
        {numOfInputs > 0 && (
          <Button
            size={"sm"}
            rightIcon={<SmallCloseIcon />}
            onClick={removeLastItem}
          >
            Remove {inputAbi.type.replace("[]", "")}
          </Button>
        )}
      </HStack>
    </VStack>
  );
};

const TransactionReceipt = ({ receipt, eventsAbi }) => {
  return (
    <VStack
      spacing={2}
      align={"stretch"}
      border={"1px"}
      borderColor={"gray.200"}
      p={2}
    >
      <Heading size={"sm"}>Tx Receipt</Heading>
      <HStack spacing={2}>
        <Text>Tx Hash</Text>
        <Input value={receipt?.transactionHash || ""} isReadOnly={true} />
      </HStack>
      <HStack spacing={2} justifyContent={"start"}>
        <Text>Block Number</Text>
        <Input value={receipt?.blockNumber || ""} isReadOnly={true} />
      </HStack>
      <HStack spacing={2} justifyContent={"start"}>
        <Text>Gas Consumed</Text>
        <GasDisplay value={receipt?.gasUsed || BigNumber.from(0)} />
      </HStack>
      <Events events={receipt?.events} eventsAbi={eventsAbi} />
    </VStack>
  );
};

const TransactionError = ({ error }) => {
  const extractedErrorObj = extractMessageFromError(error);
  console.log("final extractedErrorObj is: ", extractedErrorObj);

  return (
    <VStack
      spacing={2}
      align={"stretch"}
      border={"1px"}
      borderColor={"gray.200"}
      p={2}
    >
      <Heading size={"sm"}>Tx Error</Heading>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>There was an error running this Tx.</AlertDescription>
      </Alert>
      {Object.entries(extractedErrorObj).map(([key, value]) => (
        <Box key={key}>
          {value && (
            <HStack w={"full"}>
              <Text as={"span"} fontWeight={"bold"}>
                {key}:
              </Text>{" "}
              <Input value={value} isReadOnly />
            </HStack>
          )}
        </Box>
      ))}
    </VStack>
  );
};

const Events = ({ events, eventsAbi }) => {
  events = events.filter((eventObj) => !!eventObj.args && !!eventObj.event);
  console.debug("building events with: ", events, eventsAbi);
  if (!events || events.length == 0) {
    return "";
  }
  return (
    <VStack
      spacing={2}
      align={"stretch"}
      w={"full"}
      border="1px"
      borderColor="gray.200"
      p={2}
    >
      {events.map((item, idx) => (
        <Event key={idx} eventObj={item} eventsAbi={eventsAbi} />
      ))}
    </VStack>
  );
};

const Event = ({ eventObj, eventsAbi }) => {
  if (!eventObj.event || !eventObj.args) {
    return "";
  }

  const eventAbi = eventsAbi.find((item) => item.name === eventObj.event);

  return (
    <VStack align={"start"}>
      <Heading size={"xs"}>Event – {eventObj.event}</Heading>
      <Outputs outputsAbi={eventAbi.inputs} result={eventObj.args} />
    </VStack>
  );
};

const Outputs = ({ outputsAbi, result }) => {
  console.debug("*** in Outputs with abi & result: ", outputsAbi, result);
  return (
    <VStack
      spacing={2}
      align={"stretch"}
      border={"1px"}
      borderColor={"gray.200"}
      p={2}
      w={"full"}
    >
      <Heading size={"sm"}>{pluralize("Output", outputsAbi.length)}</Heading>
      {outputsAbi.map((outputAbi, idx) => {
        let Elem;
        if (outputAbi.type === "tuple[]") {
          Elem = OutputArrayOfArrayContainer;
        } else if (outputAbi.type === "tuple") {
          Elem = OutputArrayContainer;
        } else if (outputAbi.type.endsWith("[]")) {
          Elem = OutputArrayContainer;
        } else {
          Elem = OutputElement;
        }
        return (
          <Elem key={idx} outputAbi={outputAbi} result={result?.[idx] ?? ""} />
        );
      })}
    </VStack>
  );
};

const OutputArrayOfArrayContainer = ({ outputAbi, result }) => {
  return (
    <>
      <VStack w={"full"} border="1px" borderColor="gray.200" p={2}>
        {/*{!result && <Text>{outputAbi.type}</Text>}*/}
        {/*{result && result.length == 0 && <Text>{outputAbi.type}</Text>}*/}
        <Heading size={"sm"}>
          {outputAbi.type} {outputAbi.name && `- ${outputAbi.name}`}
        </Heading>
        {result &&
          result.map((item, idx) => (
            <OutputArrayContainer
              key={idx}
              outputAbi={outputAbi}
              result={item || ""}
              idx={idx}
            />
          ))}
      </VStack>
    </>
  );
};

const OutputArrayContainer = ({ outputAbi, result }) => {
  return (
    <>
      <VStack w={"full"} border="1px" borderColor="gray.200" p={2}>
        {/*{!result && <Text>{outputAbi.type}</Text>}*/}
        {/*{result && result.length == 0 && <Text>{outputAbi.type}</Text>}*/}
        <Heading size={"sm"}>
          {outputAbi.type} {outputAbi.name && `- ${outputAbi.name}`}
        </Heading>
        {result &&
          result.map((item, idx) => (
            <OutputElement
              key={idx}
              outputAbi={outputAbi}
              result={item || ""}
              idx={idx}
            />
          ))}
      </VStack>
    </>
  );
};
const OutputElement = ({ outputAbi, result, idx }) => {
  let Elem;
  let type = "";
  if (outputAbi.type === "tuple[]") {
    type = outputAbi.components[idx].type;
  } else if (outputAbi.type === "tuple") {
    type = outputAbi.components[idx].type;
  } else {
    type = outputAbi.type;
  }

  if (type === "address") {
    Elem = AddressDisplay;
  } else if (type === "string") {
    Elem = StringDisplay;
  } else if (type?.startsWith("uint") || type?.startsWith("int")) {
    Elem = NumberDisplay;
  } else if (type?.startsWith("bool")) {
    Elem = BooleanDisplay;
  } else if (type?.startsWith("bytes32")) {
    Elem = Bytes32Display;
  } else if (type?.startsWith("bytes")) {
    Elem = BytesDisplay;
  } else {
    Elem = Input;
  }
  return (
    <>
      <HStack spacing={2} w={"full"}>
        <Show above={"md"}>
          <Text>{`${outputAbi.name} ${type}`}</Text>
        </Show>
        <Elem value={result} isReadOnly />
        {/*<Text minW={'10rem'} minH={'1.5rem'} border='1px' borderColor={'gray.200'}> {result} </Text>*/}
      </HStack>
    </>
  );
};

const Result = ({ resultObj, abi, eventsAbi, showRaw, isView }) => {
  const { error, result, receipt } = resultObj;
  let outputElem;
  let rawOutputObj = {};
  if (error) {
    outputElem = <TransactionError error={resultObj.error} />;
    rawOutputObj = error;
  } else if (isView) {
    outputElem = <Outputs outputsAbi={abi.outputs} result={result} />;
    rawOutputObj = result;
  } else if (!isView && (receipt || result)) {
    outputElem = <TransactionReceipt receipt={receipt} eventsAbi={eventsAbi} />;
    rawOutputObj = receipt;
  }

  return (
    <VStack w={"full"} align={"stretch"} spacing={2}>
      {outputElem}
      {showRaw && (
        <Code
          maxW={"450px"}
          maxH={"400px"}
          overflowX={"auto"}
          whiteSpace={"pre"}
          colorScheme={"yellow"}
        >
          {JSON.stringify(rawOutputObj || {}, null, "\t")}
        </Code>
      )}
    </VStack>
  );
};
const MemoizedResult = React.memo(Result);
MemoizedResult.displayName = "MemoizedResult";

const FunctionExecButton = ({
  isView,
  runFunc,
  abi,
  showRaw,
  toggleShowingRaw,
  resetHandler,
}) => {
  return (
    <ButtonGroup isAttached colorScheme={isView ? "blue" : "orange"}>
      <Button onClick={runFunc}>
        <Text
          m={0}
          p={0}
          maxW={{ base: "100px", md: "200px" }}
          overflow={"hidden"}
        >
          {abi.name}
        </Text>
      </Button>
      <Show above={"md"}>
        <Menu>
          <MenuButton as={IconButton} icon={<ChevronDownIcon />} />
          <MenuList zIndex={"dropdown"}>
            <MenuItem icon={<ArrowRightIcon />} onClick={runFunc}>
              Execute {abi.name}
            </MenuItem>
            {!showRaw && (
              <MenuItem icon={<ViewIcon />} onClick={toggleShowingRaw}>
                Show Raw Inputs & Outputs
              </MenuItem>
            )}
            {showRaw && (
              <MenuItem icon={<ViewOffIcon />} onClick={toggleShowingRaw}>
                Hide Raw Inputs & Outputs
              </MenuItem>
            )}
            <MenuItem icon={<DeleteIcon />} onClick={resetHandler}>
              Reset (Clear Inputs & Outputs)
            </MenuItem>
          </MenuList>
        </Menu>
      </Show>
    </ButtonGroup>
  );
};

const FunctionRow = ({
  eventsAbi,
  abi,
  contractReadObj,
  contractWriteObj,
  address,
  addOutputAddress,
  updateLastRanId,
  highlight,
  refreshAllBalances,
}) => {
  const [payableAmount, setPayableAmount] = useState("");

  const [inputs, setInputs] = useState({});

  const setInput = useCallback(
    (name, value) =>
      setInputs((prevState) => ({ ...prevState, [name]: value })),
    []
  );

  const getInput = useCallback((name) => inputs[name] || "", [inputs]);

  const [resultObj, d] = useReducer(reducerFn, {
    result: null,
    receipt: null,
    error: null,
  });
  const dispatch = useCallback((action) => {
    console.log("** result dispatch: ", action);
    d(action);
  }, []);

  const [resetAt, setResetAt] = useState(Date.now());

  const resetHandler = (evt) => {
    dispatch({ type: TYPES.RESET });
    setInputs({});
    setPayableAmount("");
    setResetAt(Date.now());
  };

  const name = abi.name;
  let isView = ["view", "pure"].some((val) => val === abi.stateMutability);
  if (abi.constant !== undefined) {
    if (abi.constant === true) {
      isView = true;
    } else {
      isView = false;
    }
  }
  const isPayable = abi.stateMutability === "payable";

  const { initiate, finished, sent, mined, hasError } = useFunctionToast(name);

  const runFunc = async () => {
    updateLastRanId(abi.id);
    const inputsArray = abi.inputs.map((item) => inputs[item.name]);
    const contractObj = isView ? contractReadObj : contractWriteObj;
    try {
      initiate(inputsArray);
      const fullyQualifiedName = ethers.utils.Fragment.from(abi).format();
      console.log("function: ", fullyQualifiedName);
      console.log("input: ", inputsArray);
      const result = await contractObj.functions[fullyQualifiedName](
        ...inputsArray,
        {
          value: payableAmount,
        }
      );
      console.log("output: ", result);
      if (isView) {
        finished(result);
      } else {
        sent(result);
        refreshAllBalances();
      }

      if (result.wait) {
        const receipt = await result.wait();
        window.receipt = receipt;
        mined(receipt);

        dispatch({
          type: TYPES.SET_RECEIPT,
          payload: receipt,
        });
      } else {
        dispatch({
          type: TYPES.SET_RESULT,
          payload: result,
        });
      }

      if (isView) {
        for (let item of result) {
          if (isAddress(item)) {
            console.log("*** we have an address", item);
            addOutputAddress(item);
            console.log("*** done adding address");
          }
        }
      }
    } catch (e) {
      console.log("got error when executing function", e);
      console.log(e.code);
      console.log(e.method);
      console.log(e.reason);
      console.log(e.message);

      hasError(e);

      dispatch({
        type: TYPES.SET_ERROR,
        payload: e,
      });
    }
  };

  const { isOpen: showRaw, onToggle: toggleShowingRaw } = useDisclosure();
  return (
    <Tr
      bg={highlight ? "yellow.50" : "white"}
      id={abi.name}
      scrollMarginTop={"50px"}
    >
      <Td>
        <MemoizedInputs
          inputsAbi={abi.inputs}
          getInput={getInput}
          setInput={setInput}
          inputs={inputs}
          showRaw={showRaw}
          key={resetAt}
          isPayable={isPayable}
          setPayableAmount={setPayableAmount}
          payableAmount={payableAmount}
        />
      </Td>
      <Td>
        <FunctionExecButton
          isView={isView}
          runFunc={runFunc}
          abi={abi}
          showRaw={showRaw}
          toggleShowingRaw={toggleShowingRaw}
          resetHandler={resetHandler}
        />
      </Td>
      <Td>
        <MemoizedResult
          resultObj={resultObj}
          abi={abi}
          eventsAbi={eventsAbi}
          showRaw={showRaw}
          isView={isView}
        />
      </Td>
    </Tr>
  );
};

const MemoizedFunctionRow = React.memo(FunctionRow);
MemoizedFunctionRow.displayName = "MemoizedFunctionRow";

const ContractNotFoundError = ({ contracts, contractName }) => {
  const contract = contracts[contractName];
  const found = contract.found;
  if (found) {
    return "";
  }
  return (
    <>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        mb={5}
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Contract Not Found!
        </AlertTitle>
        <AlertDescription>
          <Box>
            Unable to find contract"{contractName}" with address "
            {contract.address}" on the chain.
          </Box>
          <Box>
            <ReactRouterLink to={"/setup-files"}>
              <Text as="u">
                Either update the contract address or change the RPC node.
              </Text>
            </ReactRouterLink>
          </Box>
        </AlertDescription>
      </Alert>
    </>
  );
};

export default function FunctionsTable({ contractName }) {
  const [lastRanId, updateLastRanId] = useState(null);
  const { contracts, chainProvider, wallet, addOutputAddress } =
    useContext(GlobalContext);
  const { refreshAllBalances } = useContext(BalancesContext);
  const address = contracts[contractName]?.address ?? AddressZero;

  const abiArray = useMemo(
    () => contracts[contractName]?.abi ?? [],
    [contracts, contractName]
  );

  const eventsAbi = useMemo(
    () => abiArray.filter((item) => item.type === "event"),
    [abiArray]
  );

  const functions = useMemo(() => {
    let funcs = abiArray.filter((item) => item.type === "function");
    funcs = funcs.map((abi) => ({ ...abi, id: hash(abi) }));
    funcs = groupSimilarFunctionNames(funcs, "name");
    return funcs;
  }, [abiArray]);

  const contractReadObj = useMemo(
    () => new ethers.Contract(address, abiArray, chainProvider),
    [address, abiArray, chainProvider]
  );
  const contractWriteObj = useMemo(
    () => new ethers.Contract(address, abiArray, wallet),
    [address, abiArray, wallet]
  );
  window.contractWriteObj = contractWriteObj;
  window.contractReadObj = contractReadObj;

  useEffect(() => {
    console.debug("got new functions: ", functions);
  }, [functions]);

  return (
    <>
      <ContractNotFoundError
        contracts={contracts}
        contractName={contractName}
      />
      <Box w={"full"} mb={500}>
        <Table
          size={"md"}
          variant="simple"
          border={"1px"}
          borderColor={"gray.200"}
          // sx={{tableLayout: 'fixed'}}
        >
          {/*<TableCaption>Functions read from contract's ABI</TableCaption>*/}
          <Thead>
            <Tr>
              <Th w={"50%"}>Inputs</Th>
              {/*<Th>Inputs</Th>*/}
              {/*<Th w={{base: 'auto', xl: '300px'}}>Function</Th>*/}
              <Th w={"auto"}>Function</Th>
              <Th w={"50%"}>Outputs</Th>
              {/*<Th>Outputs</Th>*/}
            </Tr>
          </Thead>
          <Tbody>
            {functions.map((abi, idx) => {
              return (
                <MemoizedFunctionRow
                  eventsAbi={eventsAbi}
                  abi={abi}
                  contractReadObj={contractReadObj}
                  contractWriteObj={contractWriteObj}
                  address={address}
                  addOutputAddress={addOutputAddress}
                  key={abi.id}
                  highlight={abi.id === lastRanId}
                  updateLastRanId={updateLastRanId}
                  refreshAllBalances={refreshAllBalances}
                />
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}
