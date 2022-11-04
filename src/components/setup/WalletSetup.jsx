import {
  Badge,
  Box,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  useClipboard,
} from "@chakra-ui/react";
import { useContext, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "../../contexts";
import { ethers } from "ethers";
import { CopyIcon } from "@chakra-ui/icons";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
// import {
//   Select, CreatableSelect,
// } from "chakra-react-select";
import { useChainAddresses } from "../../hooks";
import { buildDisplayAddress } from "../../helpers";

const {
  constants: { EtherSymbol },
  BigNumber,
  utils: { formatEther },
  providers: { Web3Provider },
} = ethers;

export default function (props) {
  const { chainProvider, chainAddresses: addresses, walletAddress, updateWalletAddress } =
    useContext(GlobalContext);
  const [walletBalanceHash, updateWalletBalanceHash] = useState({});
  const addWalletBalance = (wallet, balance) => {
    updateWalletBalanceHash((prevState) => {
      const nextState = { ...prevState };
      nextState[wallet] = balance;
      return nextState;
    });
  };
  let selectedBalance;
  if (walletBalanceHash[walletAddress]) {
    selectedBalance = Number(formatEther(walletBalanceHash[walletAddress]));
    selectedBalance = selectedBalance.toFixed(4);
  } else {
    selectedBalance = "00000.0000";
  }
  selectedBalance = `${EtherSymbol} ${selectedBalance}`;

  const allWalletOptions = addresses.map((addr) => ({
    label: buildDisplayAddress(addr),
    value: addr,
  }));
  const selectedWalletOption = {
    label: buildDisplayAddress(walletAddress),
    value: walletAddress,
  };

  useEffect(() => {
    const fetchBalance = async () => {
      if (chainProvider && walletAddress) {
        const balance = await chainProvider.getBalance(walletAddress);
        addWalletBalance(walletAddress, balance);
      }
    };
    fetchBalance();
  }, [chainProvider, walletAddress]);

  const handleChangeForAccount = ({ value }, { action }) => {
    updateWalletAddress(value);
  };
  const { hasCopied, onCopy } = useClipboard(walletAddress);
  const customStyles = {
    menuList: (provided, state) => ({
      ...provided,
      minHeight: addresses.length > 5 ? "700px" : "auto",
    }),
  };
  return (
    <HStack spacing={2}>
      <Box w={"full"}>
        <Select
          options={allWalletOptions}
          // useBasicStyles
          selectedOptionStyle={"color"} // this adds padding on left for check box
          onChange={handleChangeForAccount}
          // menuPortalTarget={document.body}
          // styles={{ menuPortal: (base) => ({ ...base, zIndex: 5 }) }}
          value={selectedWalletOption}
          // menuPlacement="auto"
          // menuPosition="fixed"
          // styles={customStyles}
        />
      </Box>

      <IconButton
        icon={<CopyIcon color={hasCopied ? "pink.500" : "gray.600"} />}
        onClick={onCopy}
      />

      {/*<Badge*/}
      {/*  py={1}*/}
      {/*  borderRadius={"lg"}*/}
      {/*  fontSize={"1.1em"}*/}
      {/*  fontWeight={"medium"}*/}
      {/*>*/}
      {/*  {selectedBalance}*/}
      {/*</Badge>*/}
    </HStack>
  );
}
