import { useCallback, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts";

export default function useChainAddresses(chainProvider) {
  const [chainAddresses, updateChainAddresses] = useState([]);

  const fetchChainAddresses = useCallback(async () => {
    if (chainProvider) {
      const a = await chainProvider.listAccounts();
      updateChainAddresses(a);
    }
  }, [chainProvider]);

  useEffect(() => {
    fetchChainAddresses();
  }, [chainProvider]);

  return { fetchChainAddresses, chainAddresses };
}
