import { useState } from "react";
import { useChainAddresses, useInjectedProviderEventManager } from "./index";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const {
  providers: { Web3Provider },
} = ethers;

const web3Modal = new Web3Modal();

export default function useInjectedProvider() {
  const [injectedProvider, updateInjectedProvider] = useState(null);
  const [injectedNetwork, updateInjectedNetwork] = useState({
    chainId: null,
    name: null,
  });

  const handleClickConnectWallet = async (evt) => {
    const metaMaskProvider = await web3Modal.connect();
    const injectedProvider = new Web3Provider(metaMaskProvider);
    console.log("got valid ✅ RPC from metamask 🦊. awesome. 🥳 🎉 ");
    updateInjectedProvider(injectedProvider);
    const network = await injectedProvider.getNetwork();
    updateInjectedNetwork(network);
  };
  const handleClickDisconnectWallet = async (evt) => {
    console.log("IN handleClickDisconnectWallet")
    updateInjectedProvider(null);
    updateInjectedNetwork({ chainId: null, name: null });
  };





  // useInjectedProviderEventManager(
  //   injectedProvider,
  //   handleClickConnectWallet,
  //   handleClickDisconnectWallet,
  // );

  return {
    injectedProvider,
    injectedNetwork,
    handleClickConnectWallet,
    handleClickDisconnectWallet,
  };
}
