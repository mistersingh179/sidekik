import { useContext, useEffect, useState } from "react";
import GlobalContext from "../contexts/globalContext";
import { ethers } from "ethers";

const {
  utils: { isAddress, formatEther, formatUnits, parseUnits },
  constants: { AddressZero },
} = ethers;

export function useIsHardhat(chainProvider) {
  const [isHardhat, setIsHardhat] = useState(false);

  useEffect(() => {
    const checkChain = async () => {
      if (chainProvider) {
        console.log("🕵️‍ checking if chain is hardhat 👷 or foundry ‍🏭 compatible");
        try {
          const ans = await chainProvider.send(
            "hardhat_getAutomine",
            []
          );
          console.log("yes it is ✅ 🥳")
          setIsHardhat(true);
        } catch (e) {
          // console.debug("error when checking for hardhat: ", e);
          console.log("it is not. that's cool 👍. lets proceed 🛺.");
          setIsHardhat(false);
        }
        console.clear();
        console.log("yay! 🎉🥳🎉. RPC connection valid ✅");
        console.log("🚧 🚦 🚧 to proceed forward 🚜 and explore 🏗 contracts 🗞 \n" +
        "tell sidekik the contract's address 🏠 & its ABI ‍💾. \n" +
        "There are 3️⃣ ways to tell this: \n" +
        "1️⃣. Sync a json file which has a list of addresses & ABI's. \n" +
         "In development, this is the [recommended] way. \n" +
        "2️⃣. or Sync your project directory and let sidekik search for them. \n" +
        "This method will find all ABI's but can find addresses only if you are actually storing them to a file. So YMMV 😬. \n"+
        "3️⃣. or Manually enter your contract addresses & ABI's in the input box 🔤. \n" +
        "This method works well for contracts already deployed to ⛓ chain, " +
        "but in a development environment it's not the best way as addresses may change everytime you deploy contracts. \n" +
        "For step-by-step instructions 🎉 along with a how-to video 🥳 go here: \n" +
        "👉 https://docs.sidekik.xyz/setup/overview/setting-up-contracts-with-sidekik 👈");
      }
    };
    checkChain();
  }, [chainProvider]);

  return isHardhat;
}
