import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GlobalContext } from "../../contexts";
import { ContractFunctions } from "../index";
import FunctionsTable from "./FunctionsTable";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import InfoTable from "./InfoTable";
import BalancesContext from "../../contexts/balancesContext";
import { ethers } from "ethers";
import { buildDisplayAddress } from "../../helpers";

const {
  utils: { formatEther },
  constants: { EtherSymbol },
} = ethers;

export default function (props) {
  const { contracts } = useContext(GlobalContext);
  const { getFormattedBalance } = useContext(BalancesContext);
  const navigate = useNavigate();

  const contractNames = useMemo(() => {
    let keys = Object.keys(contracts);
    keys = keys.filter((key) => contracts[key]?.address);
    keys.sort((a, b) => {
      if (contracts[a]?.address) {
        return -1;
      } else {
        return 1;
      }
    });
    return keys;
  }, [contracts]);

  useEffect(() => {
    if (contractNames.length === 0) {
      navigate("/setup-files");
    }
  }, [contractNames]);

  const isLazy = contractNames.length >= 20;
  return (
    <>
      <Tabs isLazy={isLazy} variant={"enclosed-colored"} pt={5} size={"md"}>
        <TabList overflowX={"auto"} overflowY={"hidden"}>
          {contractNames.map((name, idx) => (
            <Tooltip
              key={name}
              label={
                <Box>
                  <Text>
                    Address: {buildDisplayAddress(contracts[name].address)}
                  </Text>
                  <Text>
                    Balance: {EtherSymbol}{" "}
                    {getFormattedBalance(contracts[name].address)}
                  </Text>
                </Box>
              }
              hasArrow
            >
              <Tab>{name}</Tab>
            </Tooltip>
          ))}
        </TabList>
        <TabPanels>
          {contractNames.map((name) => (
            <TabPanel key={name}>
              <VStack spacing={2}>
                <FunctionsTable contractName={name} />
              </VStack>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
}
