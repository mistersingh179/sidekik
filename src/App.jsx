import "./App.css";
import { ChakraProvider, Container, Heading } from "@chakra-ui/react";
import { theme } from "./themes";
import { ContractTabs, SetupFiles } from "./components";
import { GlobalProvider } from "./contexts";
import { Contract, ethers } from "ethers";
import TopNav from "./components/setup/TopNav";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { Route } from "react-router";
import Home from "./components/routes/Home";
import InputCursorGone from "./components/experiments/InputCursorGone";
import ComponentIsReRendered from "./components/experiments/ComponentIsRerendered";
import ArrayContainer from "./components/inputs/ArrayContainer";
import StateIsOutside from "./components/experiments/StateIsOutside";
import { BalancesProvider } from "./contexts/balancesContext";
import BalanceTransfer from "./components/BalanceTransfer";
import { ExternalPriceProvider } from "./contexts/externalPriceContext";
import HardhatFunctions from "./components/setup/HardhatFunctions";
import SetupContractManually from "./components/setup/SetupContractManually";
import { ReusableThingsProvider } from "./contexts/reusableThingsContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={"/*"} element={<Home />}>
      <Route path={"setup-files"} element={<SetupFiles />} />
      <Route path={"contracts"} element={<ContractTabs />} />
      <Route path={"exp"} element={<StateIsOutside />} />
      <Route path={"hardhat-functions"} element={<HardhatFunctions />} />
      <Route
        path={"setup-contract-manually"}
        element={<SetupContractManually />}
      />
      <Route index element={<SetupFiles />} />
    </Route>
  )
);

function App() {
  window.ethers = ethers;
  return (
    <ChakraProvider theme={theme}>
      <GlobalProvider>
        <ExternalPriceProvider>
          <BalancesProvider>
            <ReusableThingsProvider>
              <RouterProvider router={router} />
            </ReusableThingsProvider>
          </BalancesProvider>
        </ExternalPriceProvider>
      </GlobalProvider>
    </ChakraProvider>
  );
}

export default App;
