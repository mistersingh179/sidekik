import {
  Box,
  Button,
  HStack,
  Switch,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Tooltip,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  ArrowForwardIcon,
  RepeatClockIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { useContext, useMemo } from "react";
import { GlobalContext } from "../../contexts";
import { Link as ReactRouterLink } from "react-router-dom";
import pluralize from "pluralize";
import useFileReloadToast from "../../hooks/useFileReloadToast";
import SetupContractManually from "./SetupContractManually";
import { hasFileFeatures } from "./BrowserIssue";
import { isAddress } from "ethers/lib/utils";

export default function FilesInput(props) {
  const {
    contracts,
    readDirContent,
    readFileContent,
    handles,
    addHandle,
    removeHandle,
    removeFileChecksum,
    removeDirChecksum,
    readAgain,
    filePollingInterval,
    updateFilePollingInterval,
    chainProvider,
  } = useContext(GlobalContext);

  const { reloadToast, rejectedToast } = useFileReloadToast();

  const contractNames = useMemo(() => Object.keys(contracts), [contracts]);
  const hasContractWithAddress = useMemo(() => {
    const found = Object.values(contracts).find(
      (item) => item?.abi?.length > 0 && isAddress(item.address)
    );
    return !!found;
  }, [contracts]);
  const addressAbiMissingLabel =
    "🚦🚧🚦To continue forward and explore contracts, you first need to sync files or directories " +
    "which give sidekik your contracts address & ABI.";
  const chainNotAvailableLabel =
    "To continue forward you first need to connect to a valid Blockchain RPC node. " +
    "Either enter the address of your local blockchain node or simply connect to metamask.";
  let continueLabel;
  if (!chainProvider) {
    continueLabel = chainNotAvailableLabel;
  } else if (!hasContractWithAddress) {
    continueLabel = addressAbiMissingLabel;
  } else {
    continueLabel = "Lets go 🚀 and explore smart contracts 🔥";
  }

  const canAccessFiles = hasFileFeatures();
  const canNotAccessFiles = !canAccessFiles;
  const canNotAccessFilesLabel =
    "Sorry, but this feature is currently only available in Google Chrome v86+";
  const syncFileLabel =
    "This is the [recommended] way. Just upload a json file with yours contracts address & ABI. " +
    "Note: If you dont have any such file, you should first set that up.";
  const syncDirLabel =
    "Upload your project directory & let sidekik find the all contract addressses & their ABI's. " +
    "Note: Sidekik can only find addresses if you are actually storing them to a file.";

  const setupDirAccess = async (pathId, evt) => {
    let directoryHandle;
    try {
      evt.target.blur();
      directoryHandle = await window.showDirectoryPicker({ id: pathId });
      const alreadyExists = handles.find(
        (item) =>
          item.kind === "directory" && item.name === directoryHandle.name
      );
      if (alreadyExists) {
        rejectedToast(directoryHandle);
        console.log("not adding: ", directoryHandle, " as it already exists");
      } else {
        await readDirContent(directoryHandle, [directoryHandle.name]);
        addHandle(directoryHandle);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fileTagCloseHandler = (handle) => {
    console.log("going to delete handle: ", handle.name, handle.kind);
    removeHandle(handle);
    if (handle.kind === "file") {
      removeFileChecksum(handle.name);
    } else if (handle.kind === "directory") {
      removeDirChecksum(handle.name);
    }
  };

  const setupFileAccess = async (evt) => {
    try {
      evt.target.blur();
      const inputHandles = await window.showOpenFilePicker({
        types: [
          {
            description: "JSON format",
            accept: {
              "application/*": [".json"],
            },
          },
        ],
        multiple: true,
        excludeAcceptAllOption: true,
      });
      for (const inputHandle of inputHandles) {
        const alreadyExists = handles.find(
          (item) => item.kind === "file" && item.name === inputHandle.name
        );
        if (alreadyExists) {
          rejectedToast(inputHandle);
          console.log("not adding: ", inputHandle, " as it already exists");
        } else {
          await readFileContent(inputHandle, []);
          addHandle(inputHandle);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangePollReRead = (evt) => {
    updateFilePollingInterval(evt.target.checked ? 2000 : null);
  };

  const handleReadAgainClick = (evt) => {
    reloadToast();
    readAgain();
  };

  return (
    <VStack spacing={5} w={"500px"}>
      <Text>Provide Contract ABI's & their Addresses</Text>
      <Wrap spacing={2} flexWrap={"wrap"} justify={"center"}>
        <WrapItem>
          <Tooltip
            hasArrow
            label={canNotAccessFiles ? canNotAccessFilesLabel : syncDirLabel}
            shouldWrapChildren={true}
          >
            <Button
              onClick={setupDirAccess.bind(this, "dirPath")}
              isDisabled={canNotAccessFiles}
            >
              Sync Directory
            </Button>
          </Tooltip>
        </WrapItem>
        <WrapItem>
          <Tooltip
            hasArrow
            label={canNotAccessFiles ? canNotAccessFilesLabel : syncFileLabel}
            shouldWrapChildren
          >
            <Button onClick={setupFileAccess} isDisabled={canNotAccessFiles}>
              Sync File(s)
            </Button>
          </Tooltip>
        </WrapItem>
        <WrapItem>
          <SetupContractManually />
        </WrapItem>
      </Wrap>
      <HStack justify={"center"} w={"full"}>
        <Box w={"full"} maxHeight={"200px"} overflowY={"auto"} px={5}>
          <Wrap>
            {handles.map((handle) => (
              <WrapItem key={`${handle.name}-${handle.kind}`}>
                <Tag px={2} fontSize={"0.8em"} py={1} borderRadius="xl">
                  <TagLabel>
                    {handle.name}-{handle.kind}
                  </TagLabel>
                  <TagCloseButton
                    onClick={fileTagCloseHandler.bind(this, handle)}
                  />
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </HStack>
      <HStack spacing={2}>
        {!filePollingInterval && (
          <Text>Set to poll & re-read every few seconds</Text>
        )}
        {filePollingInterval && handles.length == 0 && (
          <Text>Will poll & read files every {filePollingInterval} ms</Text>
        )}
        {filePollingInterval && handles.length > 0 && (
          <Text>Re-reading files every {filePollingInterval} ms</Text>
        )}
        <Switch
          id="poll-re-read"
          colorScheme={"green"}
          onChange={handleChangePollReRead}
          isChecked={filePollingInterval ? true : false}
        />
        <RepeatClockIcon
          color={filePollingInterval ? "green.500" : "gray.200"}
        />
      </HStack>
      <HStack spacing={10}>
        <Button
          rightIcon={<RepeatIcon />}
          variant={"outline"}
          isDisabled={handles.length == 0}
          onClick={handleReadAgainClick}
        >
          Read Again
        </Button>
        <Tooltip hasArrow label={continueLabel}>
          <ReactRouterLink to={"/contracts"}>
            <Button
              colorScheme={"teal"}
              rightIcon={<ArrowForwardIcon />}
              isDisabled={!hasContractWithAddress || !chainProvider}
            >
              Continue
            </Button>
          </ReactRouterLink>
        </Tooltip>
      </HStack>
    </VStack>
  );
}
