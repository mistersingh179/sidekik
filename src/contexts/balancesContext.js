import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import useWalletBalances from "../hooks/useWalletBalances";
import GlobalContext from "./globalContext";

const BalancesContext = createContext();

export default BalancesContext;

export const BalancesProvider = ({ children }) => {
  const {
    contracts,
    chainProvider,
    chainAddresses,
    walletAddress,
    impersonatedAddresses,
  } = useContext(GlobalContext);

  const contractAddresses = useMemo(
    () => Object.entries(contracts).map(([k, v]) => v.address),
    [contracts]
  );

  const { getFormattedBalance, refreshAllBalances } = useWalletBalances(
    chainProvider,
    chainAddresses,
    contractAddresses,
    impersonatedAddresses,
    walletAddress
  );

  return (
    <BalancesContext.Provider
      value={{
        getFormattedBalance,
        refreshAllBalances,
      }}
    >
      {children}
    </BalancesContext.Provider>
  );
};
