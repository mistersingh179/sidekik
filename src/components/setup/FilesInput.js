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

export default function FilesInput(props) {
  const {
    contracts,
    readDirContent,
    readFileContent,
    handles,
    addHandle,
    removeHandle,
    removeFileChecksum,
    readAgain,
    filePollingInterval,
    updateFilePollingInterval,
  } = useContext(GlobalContext);

  const { reloadToast, rejectedToast } = useFileReloadToast();

  const contractNames = useMemo(() => Object.keys(contracts), [contracts]);

  const canAccessFiles = hasFileFeatures();
  const canNotAccessFiles = !canAccessFiles;
  const label =
    canNotAccessFiles &&
    "Sorry, but this feature is currently only available in Google Chrome v86+";

  const setupDirAccess = async (pathId, evt) => {
    console.debug(pathId, evt);
    let directoryHandle;
    try {
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
      console.log("got error: ", e);
    }
  };

  const setupFileAccess = async (evt) => {
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
  };

  const handleChangePollReRead = (evt) => {
    updateFilePollingInterval(evt.target.checked ? 1000 : null);
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
          <Tooltip hasArrow label={label} bg={"red.600"} shouldWrapChildren>
            <Button
              onClick={setupDirAccess.bind(this, "dirPath")}
              isDisabled={canNotAccessFiles}
            >
              Sync Directory
            </Button>
          </Tooltip>
        </WrapItem>
        <WrapItem>
          <Tooltip hasArrow label={label} bg={"red.600"} shouldWrapChildren>
            <Button onClick={setupFileAccess} isDisabled={canNotAccessFiles}>
              Upload File(s)
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
                <Tag size={"md"} borderRadius="full">
                  <TagLabel>
                    {handle.name}-{handle.kind}
                  </TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      console.log("going to delete handle: ", handle.name);
                      removeHandle(handle);
                      removeFileChecksum(handle.name);
                    }}
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
        <ReactRouterLink to={"/contracts"}>
          <Button
            colorScheme={"teal"}
            rightIcon={<ArrowForwardIcon />}
            isDisabled={contractNames.length == 0}
          >
            Continue
          </Button>
        </ReactRouterLink>
      </HStack>
    </VStack>
  );
}
