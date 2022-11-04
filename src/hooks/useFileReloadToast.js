import { useToast } from "@chakra-ui/react";
import { useContext } from "react";
import GlobalContext from "../contexts/globalContext";
import pluralize from "pluralize";

export default function useFileReloadToast() {
  const toast = useToast();

  const { handles } = useContext(GlobalContext);

  const dirHandles = handles.filter((handle) => handle.kind === "directory");
  const fileHandles = handles.filter((handle) => handle.kind === "file");

  const reloadToast = () => {
    toast({
      status: "info",
      title: "ABI Reload",
      position: "bottom-right",
      isClosable: true,
      duration: 5000,
      description: `Processing ${fileHandles.length} ${pluralize(
        "file",
        fileHandles.length
      )} and ${dirHandles.length} ${pluralize(
        "directory",
        dirHandles.length
      )}`,
    });
  }

  const fileMissingToast = () => {
    toast({
      status: "warning",
      title: "ABI files missing",
      position: "bottom-right",
      isClosable: true,
      duration: 5000,
      description: `Please upload ABI files`,
    });
  }

  return {reloadToast, fileMissingToast}
}