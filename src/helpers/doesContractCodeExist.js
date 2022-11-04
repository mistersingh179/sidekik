import { ethers } from "ethers";

const {
  utils: { isAddress },
  constants: { AddressZero },
} = ethers;

export default async function doesContractCodeExist(chainProvider, address){
  if (isAddress(address)) {
    try{
      const code = await chainProvider.getCode(address);
      return code !== "0x";
    }catch{
      return false
    }
  } else {
    return false;
  }
}