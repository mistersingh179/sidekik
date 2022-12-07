import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";

export default function useRpcUrlProcessor(workerRef) {
  const [rpcUrl, updateRpcUrl] = useState("http://127.0.0.1:8545");
  const [isRpcValid, updateIsRpcValid] = useState(true);
  const [localProvider, updateLocalProvider] = useState(null);
  const [localNetwork, updateLocalNetwork] = useState({
    chainId: null,
    name: null,
  });
  const processRpcUrl = useCallback(async () => {
    if (workerRef.current) {
      try {
        const fetchedChainId = await workerRef.current.fetchChainId(rpcUrl);
        if (fetchedChainId) {
          const localProvider = new ethers.providers.JsonRpcProvider(
            rpcUrl ? rpcUrl : true
          );
          const network = await localProvider.getNetwork();
          updateLocalProvider(localProvider);
          updateLocalNetwork(network);
          updateIsRpcValid(true);
          console.log("RPC connection valid ✅");
        } else {
          throw {};
        }
      } catch (e) {
        console.log(
          "🚦 🚧 🚦 Unable to connect to RPC Endpoint! 🚦 🚧 🚦\n" +
            "Tell sidekik which blockchain node to connect to. \n" +
            "There are 2️⃣ ways to tell this: \n" +
            "1️⃣. Enter URL of your blockchain node (hardhat, foundry etc.) in input box 🔤 \n" +
            "2️⃣. Connect metamask 🦊 and then select a blockchain within metamask 🦊. \n" +
            "For step-by-step instructions 🎉 go here: \n" +
            "👉 https://docs.sidekik.xyz/setup/overview/connecting-to-a-blockchain 👈"
        );
        updateLocalProvider(null);
        updateLocalNetwork((prevState) => {
          if (prevState.name === null && prevState.chainId === null) {
            return prevState;
          } else {
            return { chainId: null, name: null };
          }
        });
        updateIsRpcValid(false);
      }
    }
  }, [rpcUrl]);

  useEffect(() => {
    console.clear();
    processRpcUrl();
  }, [workerRef.current, rpcUrl]);

  return {
    processRpcUrl,
    rpcUrl,
    updateRpcUrl,
    isRpcValid,
    localProvider,
    localNetwork,
  };
}
