import { Text } from "@chakra-ui/react";
import { ethers } from "ethers";

const {
  utils: { formatEther },
  constants: { EtherSymbol },
} = ethers;

export default function FormattedEthDisplay({value}) {
  const functionResult = Number(formatEther(value || 0)).toFixed(4);
  return <Text>{EtherSymbol} {functionResult}</Text>
}
