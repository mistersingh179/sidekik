import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";

export default function useRpcUrlProcessor() {
  const [rpcUrl, updateRpcUrl] = useState("http://127.0.0.1:8545");
  const [isRpcValid, updateIsRpcValid] = useState(true);
  const [localProvider, updateLocalProvider] = useState(null);
  const [localNetwork, updateLocalNetwork] = useState({
    chainId: null,
    name: null,
  });
  const processRpcUrl = useCallback(async () => {
    console.log("checking on urlToProcess");
    try {
      const localProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const network = await localProvider.getNetwork();
      updateLocalProvider(localProvider);
      updateLocalNetwork(network);
      updateIsRpcValid(true);
    } catch (e) {
      console.log("got error while connecting to rpc: ", e);
      updateLocalProvider(null);
      updateLocalNetwork({ chainId: null, name: null });
      updateIsRpcValid(false);
    }
  }, [rpcUrl]);

  useEffect(() => {
    processRpcUrl();
  }, [rpcUrl]);

  return { processRpcUrl, rpcUrl, updateRpcUrl, isRpcValid, localProvider, localNetwork };
}
