import { useToast } from "@chakra-ui/react";
import pluralize from "pluralize";
import { buildDisplayAddress } from "../helpers";

export default function useImpersonatedToast() {
  const toast = useToast();

  const successImpersonation = (address) => {
    toast({
      status: "success",
      title: "Impersonation",
      position: "bottom-right",
      isClosable: true,
      duration: 5000,
      description: `Successfully Impersonated ${buildDisplayAddress(address)}`,
    });
  };

  const errorImpersonation = (address, error) => {
    toast({
      status: "error",
      title: "Impersonation",
      position: "bottom-right",
      isClosable: true,
      duration: 5000,
      description: `Failed to impersonate ${buildDisplayAddress(
        address
      )} ${error}`,
    });
  };

  return { successImpersonation, errorImpersonation };
}
