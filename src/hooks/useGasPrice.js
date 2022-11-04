import { useEffect, useState } from "react";
import { ethers } from "ethers";

const {
  utils: { isAddress, formatEther, formatUnits, parseUnits },
  constants: { AddressZero },
} = ethers;

const etherscanKey = "4GNTDCMXVGECYNSES575CKBTAVFUE2GFXK";
const gasUrl = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${etherscanKey}`;


export default function useGasPrice() {
  const [wei, updateWei] = useState(0);

  useEffect(() => {
    const getGasPrice = async () => {
      console.log("in getGasPrice");
      const response = await fetch(gasUrl);
      const body = await response.json()
      console.log(body);
      if(body.status === '1' && body.result?.SafeGasPrice){
        updateWei(parseUnits(body.result.SafeGasPrice, 9));
      }
    }
    getGasPrice();
  }, []);

  return wei;
}
