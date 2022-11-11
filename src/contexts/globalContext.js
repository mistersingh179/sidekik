import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ethers } from "ethers";
import {
  useChainAddresses,
  useContractFileData,
  useInjectedProviderEventManager,
  useInterval,
  useRpcUrlProcessor,
} from "../hooks";
import readJsonObjFromFileHandle from "../helpers/readJsonObjFromFileHandle";
import _ from "lodash";
import getChainName from "../helpers/chainNames";
import useResourceHandles from "../hooks/useResourceHandles";
import useInjectedProvider from "../hooks/useInjectedProvider";
import doesContractCodeExist from "../helpers/doesContractCodeExist";
import md5 from "md5";
import { useIsHardhat } from "../hooks/useIsHardhat";

const {
  utils: { isAddress, formatEther, formatUnits, parseUnits },
  constants: { AddressZero },
} = ethers;

const GlobalContext = createContext();

export default GlobalContext;

const ignoredFileNames = ["package.json", "package-lock.json", "manifest.json"];
const ignoredDirNames = ["cache", "node_modules"];

export const GlobalProvider = (props) => {
  const { children } = props;

  const [filesChecksum, setFilesChecksum] = useState({});
  window.filesChecksum = filesChecksum;
  const setFileChecksum = (name, md5CheckSum) => {
    setFilesChecksum((prevState) => ({ ...prevState, [name]: md5CheckSum }));
  };
  const removeFileChecksum = (name) => {
    setFilesChecksum((prevState) => {
      const newState = { ...prevState };
      delete newState[name];
      return newState;
    });
  };

  const {
    processRpcUrl,
    rpcUrl,
    updateRpcUrl,
    isRpcValid,
    localProvider,
    localNetwork,
  } = useRpcUrlProcessor();

  const {
    injectedProvider,
    injectedNetwork,
    handleClickConnectWallet,
    handleClickDisconnectWallet,
  } = useInjectedProvider();

  const chainProvider = injectedProvider || localProvider;
  window.chainProvider = chainProvider;
  const chainNetwork = injectedNetwork?.chainId
    ? injectedNetwork
    : localNetwork;
  const chainId = chainNetwork.chainId;
  const chainName = getChainName(chainId);

  const isHardhat = useIsHardhat(chainProvider);

  const { fetchChainAddresses, chainAddresses } =
    useChainAddresses(chainProvider);

  useInjectedProviderEventManager(
    injectedProvider,
    handleClickConnectWallet,
    handleClickDisconnectWallet,
    fetchChainAddresses
  );

  const [walletAddress, updateWalletAddress] = useState("");

  useEffect(() => {
    if (chainAddresses && chainAddresses.length > 0) {
      updateWalletAddress(chainAddresses[0]);
    }
  }, [chainAddresses]);

  const [customAddresses, updateCustomAddresses] = useState([]);
  const addCustomAddress = useCallback((addr) => {
    updateCustomAddresses((prevState) => {
      if (prevState.includes(addr)) {
        return prevState;
      } else {
        return [addr, ...prevState];
      }
    });
  }, []);

  const [outputAddresses, updateOutputAddresses] = useState([]);
  const addOutputAddress = useCallback((addr) => {
    updateOutputAddresses((prevState) => {
      if (prevState.includes(addr)) {
        return prevState;
      } else {
        return [addr, ...prevState];
      }
    });
  }, []);

  const [impersonatedAddresses, setImpersonatedAddresses] = useState([]);
  const addImpersonatedAddress = useCallback((addr) => {
    setImpersonatedAddresses((prevState) => {
      if (prevState.includes(addr)) {
        return prevState;
      } else {
        return [addr, ...prevState];
      }
    });
  }, []);

  const {
    contracts,
    addContractAddress,
    addContractAbi,
    removeContract,
    markContractFound,
  } = useContractFileData();
  const contractNames = useMemo(() => Object.keys(contracts), [contracts]);

  const { handles, addHandle, removeHandle } = useResourceHandles();
  const dirHandles = handles.filter((handle) => handle.kind === "directory");
  const fileHandles = handles.filter((handle) => handle.kind === "file");

  const [filePollingInterval, updateFilePollingInterval] = useState(1000);
  useInterval(() => readAgain(), filePollingInterval);

  const [readyToReadAgain, setReadyToReadAgain] = useState(false);

  useEffect(() => {
    contractNames.forEach((name) => removeContract(name));
    setFilesChecksum({});
    setReadyToReadAgain(true);
  }, [chainNetwork]);

  useEffect(() => {
    if (
      readyToReadAgain &&
      contractNames.length == 0 &&
      Object.keys(filesChecksum).length == 0
    ) {
      readAgain();
      setReadyToReadAgain(false);
    }
  }, [readyToReadAgain, filesChecksum, contractNames]);

  const reCheckAllContractsExistence = async () => {
    for (const name of contractNames) {
      const address = contracts[name].address;
      const found = await doesContractCodeExist(chainProvider, address);
      markContractFound(name, found);
    }
  };

  const readAgain = async (evt) => {
    console.debug("in readAgain");
    reCheckAllContractsExistence();
    for (const handle of handles) {
      if (handle.kind === "directory") {
        await readDirContent(handle);
      } else if (handle.kind === "file") {
        await readFileContent(handle);
      }
    }
  };

  // let wallet;
  // if (chainProvider && walletAddress) {
  //   wallet = chainProvider.getSigner(walletAddress);
  // }

  let wallet = useMemo(() => {
    if (chainProvider && walletAddress) {
      return chainProvider.getSigner(walletAddress);
    } else {
      return null;
    }
  }, [chainProvider, walletAddress]);

  const readDirContent = async (dirHandle) => {
    for await (const item of dirHandle.values()) {
      if (item.kind == "file") {
        const name = item.name;
        if (
          !name.startsWith(".") &&
          name.endsWith(".json") &&
          !name.endsWith(".dbg.json") &&
          !ignoredFileNames.some((n) => n == name)
        ) {
          console.log("** we have file: ", item);
          await readFileContent(item);
        } else {
          console.debug("skipping file: ", item.name);
        }
      } else if (item.kind == "directory") {
        if (
          !item.name.startsWith(".") &&
          !ignoredDirNames.some((n) => n == item.name)
        ) {
          readDirContent(item);
        } else {
          console.debug("skipping reading dir: ", item.name);
        }
      }
    }
  };

  const readFileContent = async (fileHandle) => {
    const fileJsonObj = await readJsonObjFromFileHandle(fileHandle);
    const fileStringObj = JSON.stringify(fileJsonObj);
    const fileMd5 = md5(fileStringObj);

    if (filesChecksum[fileHandle.name] == fileMd5) {
      console.debug(
        "skipping: ",
        fileHandle.name,
        " as md5 is same: ",
        fileMd5
      );
      return;
    } else {
      console.debug("saving file md5 for next use");
      setFileChecksum(fileHandle.name, fileMd5);
    }

    // for Artifact Files
    if (fileJsonObj["contractName"] && fileJsonObj["abi"]) {
      const name = fileJsonObj["contractName"];
      const abi = fileJsonObj["abi"];
      if (_.isArray(abi) && _.isString(name)) {
        addContractAbi(name, abi);
      }
    }

    // todo - for ABI files
    // name of the file is contract
    // and content is just ABI array

    // and contracts object has key for contract name and address & abi as values
    // this is hardhat-deploy --export-all
    if (_.isArray(fileJsonObj[chainId])) {
      for (const item of fileJsonObj[chainId]) {
        if (item.chainId == chainId && _.isObject(item.contracts)) {
          for (const key of Object.keys(item.contracts)) {
            const address = item.contracts[key]["address"];
            const abi = item.contracts[key]["abi"];
            const name = key;
            if (isAddress(address) && _.isArray(abi) && _.isString(name)) {
              addContractAddress(name, address);
              const found = await doesContractCodeExist(chainProvider, address);
              markContractFound(name, found);
              addContractAbi(name, abi);
            }
          }
        }
      }
    }

    // and contracts object has key for contract name and address & abi as values
    // this is hardhat-deploy --export
    if (fileJsonObj.chainId == chainId && _.isObject(fileJsonObj.contracts)) {
      for (const key of Object.keys(fileJsonObj.contracts)) {
        const address = fileJsonObj.contracts[key]["address"];
        const abi = fileJsonObj.contracts[key]["abi"];
        const name = key;
        if (isAddress(address) && _.isArray(abi) && _.isString(name)) {
          addContractAddress(name, address);
          const found = await doesContractCodeExist(chainProvider, address);
          markContractFound(name, found);
          addContractAbi(name, abi);
        }
      }
    }

    if (_.isObject(fileJsonObj?.[chainId])) {
      // for contract under chain id kind of file
      for (const key of Object.keys(fileJsonObj[chainId])) {
        const address = fileJsonObj[chainId][key]["address"];
        const abi = fileJsonObj[chainId][key]["abi"];
        const name = key;
        if (isAddress(address) && _.isArray(abi) && _.isString(name)) {
          addContractAddress(name, address);
          const found = await doesContractCodeExist(chainProvider, address);
          markContractFound(name, found);
          addContractAbi(name, abi);
        }
      }
    }

    // for contract under chain id and chain name kind of file
    if (_.isObject(fileJsonObj?.[chainId]?.[chainName])) {
      for (const key of Object.keys(fileJsonObj[chainId][chainName])) {
        const address = fileJsonObj[chainId][chainName][key]["address"];
        const abi = fileJsonObj[chainId][chainName][key]["abi"];
        const name = key;
        if (isAddress(address) && _.isArray(abi) && _.isString(name)) {
          addContractAddress(name, address);
          const found = await doesContractCodeExist(address);
          markContractFound(name, found);
          addContractAbi(name, abi);
        }
      }
    }

    // for file with contractName as key and value as address
    // here we use existing contract names we know of
    for (const name of contractNames) {
      if (fileJsonObj[name] && isAddress(fileJsonObj[name])) {
        const address = fileJsonObj[name];
        if (isAddress(address)) {
          addContractAddress(name, address);
          const found = await doesContractCodeExist(chainProvider, address);
          markContractFound(name, found);
        }
      }
    }

    // file with json where all keys are contract names & and all values are addresses
    if (Object.values(fileJsonObj).length > 0) {
      const allValuesAreAddresses = Object.values(fileJsonObj).every((val) =>
        isAddress(val)
      );
      const allKeysAreStrings = Object.keys(fileJsonObj).every((val) =>
        _.isString(val)
      );
      if (allValuesAreAddresses && allKeysAreStrings) {
        for (const name of Object.keys(fileJsonObj)) {
          const address = fileJsonObj[name];
          addContractAddress(name, address);
          const found = await doesContractCodeExist(chainProvider, address);
          markContractFound(name, found);
        }
      }
    }

    // for file with contractName as key and object of address & abi as value
    // again using contract names we know of
    for (const name of contractNames) {
      if (
        fileJsonObj[name] &&
        fileJsonObj[name]?.["address"] &&
        fileJsonObj[name]?.["abi"]
      ) {
        const address = fileJsonObj[name]["address"];
        const abi = fileJsonObj[name]["abi"];
        if (isAddress(address) && _.isArray(abi)) {
          addContractAddress(name, address);
          const found = await doesContractCodeExist(address);
          markContractFound(name, found);
          addContractAbi(name, abi);
        }
      }
    }
  };

  useEffect(() => {
    let intervalHandler;
    if (!isRpcValid && !injectedProvider) {
      console.log(
        "!!!injectedProvider is not there & rpc is not valid. will setup polling for RPC"
      );
      intervalHandler = setInterval(() => {
        console.log("!!!in interval function. processing RPC url again");
        processRpcUrl();
      }, [1000]);
    } else {
      console.log(
        "!!!we have a provider now. no need to poll for RPC. removing polling"
      );
      clearInterval(intervalHandler);
    }
    return () => {
      console.log("!!!removing polling as going to be re-rendered");
      clearInterval(intervalHandler);
    };
  }, [injectedProvider, isRpcValid]);

  return (
    <GlobalContext.Provider
      value={{
        contracts,
        addContractAddress,
        addContractAbi,
        removeContract,
        markContractFound,
        chainProvider,
        chainNetwork,
        chainAddresses,
        walletAddress,
        updateWalletAddress,
        wallet,
        customAddresses,
        addCustomAddress,
        outputAddresses,
        addOutputAddress,
        impersonatedAddresses,
        addImpersonatedAddress,
        readDirContent,
        readFileContent,
        handles,
        addHandle,
        removeHandle,
        removeFileChecksum,
        readAgain,
        filePollingInterval,
        updateFilePollingInterval,
        processRpcUrl,
        rpcUrl,
        updateRpcUrl,
        isRpcValid,
        localProvider,
        localNetwork,
        injectedProvider,
        injectedNetwork,
        handleClickConnectWallet,
        handleClickDisconnectWallet,
        isHardhat,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
