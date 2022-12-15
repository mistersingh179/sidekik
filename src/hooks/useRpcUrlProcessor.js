import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";

export default function useRpcUrlProcessor(bgWorker) {
  const [rpcUrl, updateRpcUrl] = useState("http://127.0.0.1:8545");
  const [isRpcValid, updateIsRpcValid] = useState(true);
  const [localProvider, updateLocalProvider] = useState(null);
  const [localNetwork, updateLocalNetwork] = useState({
    chainId: null,
    name: null,
  });
  window.localNetwork = localNetwork;
  const processRpcUrl = useCallback(async () => {
    if (bgWorker && rpcUrl) {
      try {
        const fetchedChainId = await bgWorker.fetchChainId(rpcUrl);
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
  }, [bgWorker, rpcUrl]);

  useEffect(() => {
    process.env.NODE_ENV !== "development" && console.clear();
    processRpcUrl();
  }, [bgWorker, rpcUrl]);

  return {
    processRpcUrl,
    rpcUrl,
    updateRpcUrl,
    isRpcValid,
    localProvider,
    localNetwork,
  };
}
