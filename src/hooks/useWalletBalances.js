import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "../contexts";
import { ethers } from "ethers";
import useDebounce from "./useDebounce";
const {
  constants: { EtherSymbol },
  BigNumber,
  utils: { formatEther },
  providers: { Web3Provider },
} = ethers;

export default function useWalletBalances(
  chainProvider,
  chainAddresses,
  contractAddresses,
  impersonatedAddresses,
  walletAddress
) {
  const [walletBalanceHash, updateWalletBalanceHash] = useState({});

  const debouncedContractAddresses = useDebounce(contractAddresses, 200);

  const refreshAllBalances = useCallback(async () => {
    const updatedBalances = {};
    const addresses = [
      ...chainAddresses,
      ...contractAddresses,
      ...impersonatedAddresses,
    ];
    if (chainProvider) {
      const balanceResults = await Promise.allSettled(
        addresses.map((address) => chainProvider.getBalance(address))
      );
      addresses.forEach((address, index) => {
        const balanceResult = balanceResults[index];
        if (balanceResult.status === "fulfilled") {
          updatedBalances[address] = balanceResult.value;
        } else {
          updatedBalances[address] = BigNumber.from(0);
        }
      });
      updateWalletBalanceHash((prevState) => {
        return { ...prevState, ...updatedBalances };
      });
    }
  }, [
    chainProvider,
    debouncedContractAddresses,
    chainAddresses,
    impersonatedAddresses,
  ]);

  useEffect(() => {
    refreshAllBalances();
  }, [
    chainProvider,
    chainAddresses,
    impersonatedAddresses,
    debouncedContractAddresses,
    walletAddress,
    refreshAllBalances,
  ]);

  const getFormattedBalance = useCallback(
    (address) => {
      let selectedBalance = "00000.0000";
      if (walletBalanceHash[address]) {
        selectedBalance = Number(formatEther(walletBalanceHash[address]));
        selectedBalance = selectedBalance.toFixed(4);
      }
      return selectedBalance;
    },
    [walletBalanceHash]
  );

  return { getFormattedBalance, refreshAllBalances };
}
