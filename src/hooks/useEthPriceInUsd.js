import { useEffect, useState } from "react";
import { ethers } from "ethers";

const {
  utils: { isAddress, formatEther, formatUnits, parseUnits },
  constants: { AddressZero },
} = ethers;

const etherscanKey = "4GNTDCMXVGECYNSES575CKBTAVFUE2GFXK";
const ethPriceUrl = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${etherscanKey}`;


export default function useEthPriceInUsd() {
  const [usdPrice, updateUsdPrice] = useState(1200);

  useEffect(() => {
    const getEthPrice = async () => {
      const response = await fetch(ethPriceUrl);
      const body = await response.json()
      if(body.status === '1' && body.result?.ethusd){
        updateUsdPrice(body.result.ethusd);
      }
    }
    getEthPrice();
  }, []);

  return usdPrice;
}
