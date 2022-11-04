import { createContext } from "react";
import useGasPrice from "../hooks/useGasPrice";
import useEthPriceInUsd from "../hooks/useEthPriceInUsd";

const ExternalPriceContext = createContext();

export default ExternalPriceContext;

export const ExternalPriceProvider = ({children}) => {
  const gasPriceInWei = useGasPrice();
  const ethPriceInUsd = useEthPriceInUsd();

  return (
    <ExternalPriceContext.Provider value ={{gasPriceInWei, ethPriceInUsd}}>
      {children}
    </ExternalPriceContext.Provider>
  )
}