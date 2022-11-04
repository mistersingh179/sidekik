import React, { useContext, useMemo } from "react";
import GlobalContext from "../../contexts/globalContext";
import {
  Box,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";
import BalancesContext from "../../contexts/balancesContext";
import { FormattedEthDisplay } from "../display";
import { parseEther } from "ethers/lib/utils";

const {
  utils: { formatEther },
  constants: { AddressZero },
} = ethers;

export default function InfoTable({ contractName }) {
  const { contracts } = useContext(GlobalContext);
  const { getFormattedBalance } = useContext(BalancesContext);

  const address = contracts[contractName]?.address ?? AddressZero;
  const abiArray = contracts[contractName]?.abi ?? [];
  const events = abiArray.filter((item) => item.type === "event");
  const functions = abiArray.filter((item) => item.type === "function");
  const viewFuncs = functions.filter((item) => item.stateMutability === "view");
  const pureFuncs = functions.filter((item) => item.stateMutability === "pure");
  const payableFuncs = functions.filter((item) => item.stateMutability === "payable");
  const nonPayableFuncs = functions.filter((item) => item.stateMutability === "nonpayable");
  const balance = getFormattedBalance(address);

  const info = [
    ["Name", contractName],
    ["Address", address],
    ["Events", events.length],
    ["Functions", functions.length],
    ["View Functions", viewFuncs.length],
    ["Pure Functions", pureFuncs.length],
    ["Payable Functions", payableFuncs.length],
    ["NonPayable Functions", nonPayableFuncs.length],
    ["Balance", balance]
  ]

  return (
    <Box w={"full"}>
      <Table
        size={"md"}
        variant="simple"
        border={"1px"}
        borderColor={"gray.200"}
      >
        {/*<TableCaption>Contract Information</TableCaption>*/}
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {info.map((item) => (
            <Tr>
              <Td>{item[0]}</Td>
              <Td>{item[1]}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
