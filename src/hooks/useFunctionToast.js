import { Box, Link, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { buildDisplayAddress } from "../helpers";

export default function useFunctionToast(name) {
  const toast = useToast();
  const toastIdRef = React.useRef();

  const defaultOptions = {
    position: "bottom-right",
    isClosable: true,
  };

  const initiate = (inputsArray) => {
    console.log("** in initiate for: ", name, " with: ", ...inputsArray);

    toastIdRef.current = toast({
      ...defaultOptions,
      title: `Tx Initiated – ${name}`,
      status: "loading",
      duration: null
    });
  };

  const finished = (result) => {
    console.log("** in finished for: ", name, " with: ", result);
    toast.update(toastIdRef.current, {
      ...defaultOptions,
      title: `Tx Finished – ${name}`,
      status: "success",
      duration: 5000,
    });
  };

  const sent = (result) => {
    toast.update(toastIdRef.current, {
      ...defaultOptions,
      title: `Tx Sent – ${name}`,
      status: "info",
      description: `Hash: ${buildDisplayAddress(result.hash)}`,
      duration: 5000,
    });
  };

  const mined = (receipt) => {
    toast.update(toastIdRef.current, {
      ...defaultOptions,
      title: `Tx Mined – ${name}`,
      status: "success",
      description: `Hash: ${buildDisplayAddress(receipt.transactionHash)}`,
      duration: 5000,
    });
  };

  const hasError = (error) => {
    toast.update(toastIdRef.current, {
      ...defaultOptions,
      title: `Tx Failed – ${name}`,
      status: "error",
      duration: 5000,
    });
  };

  return { initiate, finished, sent, mined, hasError };
}
