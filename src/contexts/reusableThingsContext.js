import { createContext, useCallback, useState } from "react";
import BalancesContext from "./balancesContext";

const ReusableThingsContext = createContext();

export default ReusableThingsContext;

export const ReusableThingsProvider = ({ children }) => {
  const [strings, setStrings] = useState([]);
  const [numbers, setNumbers] = useState([]);

  const addString = useCallback((str) => {
    setStrings((prevState) => {
      if (prevState.includes(str)) {
        return prevState;
      } else {
        return [str, ...prevState];
      }
    });
  }, []);

  const addNumber = useCallback((str) => {
    setNumbers((prevState) => {
      if (prevState.includes(str)) {
        return prevState;
      } else {
        return [str, ...prevState];
      }
    });
  }, []);

  return (
    <ReusableThingsContext.Provider value={{strings, addString, numbers, addNumber}}>
      {children}
    </ReusableThingsContext.Provider>
  );
};
