import { getChain } from "evm-chains";

const chainNames = {
  1337: 'hardhat',
  31337: 'hardhat',
}

export default function getChainName(chainid){
  if(chainNames[chainid]){
    return chainNames[chainid];
  }else{
    try{
      const result = getChain(chainid)
      return result.name;
    }catch{
      return "unknown"
    }
  }
}
