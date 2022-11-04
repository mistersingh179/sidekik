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
        try {
          const ans = await chainProvider.send(
            "hardhat_impersonateAccount",
            [AddressZero]
          );
          console.log("success when checking for hardhat: ", ans);
          setIsHardhat(true);
        } catch (e) {
          console.log("error when checking for hardhat: ", e);
          setIsHardhat(false);
        }
      }
    };
    checkChain();
  }, [chainProvider]);

  return isHardhat;
}
