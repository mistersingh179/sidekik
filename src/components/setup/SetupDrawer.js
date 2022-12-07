import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  VStack,
  Box,
  IconButton,
  useClipboard,
  HStack,
  Badge,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  InputGroup,
  Tooltip,
  InputRightElement,
  Link,
  InputLeftAddon,
  InputRightAddon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { WalletSetup } from "../index";
// import Select from "react-select";
import { Select, CreatableSelect } from "chakra-react-select";
import { useContext, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "../../contexts";
import { BalancesContext } from "../../contexts";
import { useChainAddresses } from "../../hooks";
import { buildDisplayAddress } from "../../helpers";
import {
  ArrowForwardIcon,
  CheckIcon,
  CopyIcon,
  InfoIcon,
  InfoOutlineIcon,
  QuestionIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import { ethers } from "ethers";
import getChainName from "../../helpers/chainNames";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import BalanceTransfer from "../BalanceTransfer";
import useImpersonatedToast from "../../hooks/useImpersonatedToast";
import pluralize from "pluralize";
const {
  constants: { EtherSymbol },
  BigNumber,
  utils: { formatEther, isAddress },
  providers: { Web3Provider },
} = ethers;

export const ChainIdBox = () => {
  const { localNetwork, injectedNetwork } = useContext(GlobalContext);

  const chainId = injectedNetwork?.chainId || localNetwork?.chainId || "None";
  const chainName = getChainName(chainId);

  return (
    <HStack w={"full"}>
      <Text fontWeight={"medium"}>Chain:</Text>
      <Text>
        {chainId} / {chainName}
      </Text>
    </HStack>
  );
};

export const RpcUrlInputBox = () => {
  const {
    processRpcUrl,
    rpcUrl,
    updateRpcUrl,
    isRpcValid,
    localNetwork,
    injectedProvider,
    injectedNetwork,
  } = useContext(GlobalContext);
  const chainId = injectedNetwork?.chainId || localNetwork?.chainId || "None";
  const chainName = getChainName(chainId);

  const rpcTooltipMessage = useMemo(() => {
    let result;
    if (injectedProvider) {
      result =
        "This is not being used as you are connected to MetaMask and sidekik is using the RPC selected in MetaMask";
    } else {
      if (isRpcValid) {
        result = `Successfully connected to: ${chainId} / ${chainName} `;
      } else {
        result =
          "Unable to connect to this url. Make sure a node is running at the provided endpoint or connect to metamask and then select RPC endpoint in metamask.";
      }
    }
    return result;
  }, [injectedProvider, localNetwork, isRpcValid]);

  const rpcInputDisabled = !!injectedProvider;
  const RpcInputIcon = (props) => {
    let result;
    if (injectedProvider) {
      result = result = <InfoOutlineIcon color="gray.200" />;
    } else {
      if (isRpcValid) {
        result = <CheckIcon color="green.500" bg={"white"} />;
      } else {
        result = <InfoIcon color="red.500" bg={"alphas.500"} />;
      }
    }
    return result;
  };

  return (
    <>
      <Tooltip placement={"bottom"} hasArrow label={rpcTooltipMessage}>
        <InputGroup w={"auto"}>
          <Input
            isInvalid={!rpcInputDisabled && !isRpcValid}
            focusBorderColor={isRpcValid ? '': 'red.500'}
            isDisabled={rpcInputDisabled}
            placeholder={"RPC Url to the blockchain"}
            value={rpcUrl}
            onChange={(evt) => updateRpcUrl(evt.target.value)}
            w={"auto"}
          />

          <InputRightElement children={<RpcInputIcon />} />
        </InputGroup>
      </Tooltip>
    </>
  );
};

const MetaMaskConnectBox = () => {
  const { handleClickConnectWallet } = useContext(GlobalContext);
  const buttonText = useBreakpointValue({
    base: "or MetaMask",
    xl: "or Connect Via MetaMask",
  });
  return (
    <Tooltip
      label={"Use this to connect and inject RPC node via your wallet"}
      placement={"auto"}
      hasArrow
    >
      <Button
        onClick={handleClickConnectWallet}
        variant={"solid"}
        rightIcon={<ArrowForwardIcon />}
      >
        {buttonText}
      </Button>
    </Tooltip>
  );
};
const MetaMaskDisconnectBox = () => {
  const { handleClickDisconnectWallet, localNetwork, injectedNetwork } =
    useContext(GlobalContext);

  const chainId = injectedNetwork?.chainId || localNetwork?.chainId || "None";
  const chainName = getChainName(chainId);

  return (
    <Tooltip
      label={
        `Currently connected to: ${chainId} / ${chainName}. ` +
        `Use this button to disconnect your wallet and connect to an RPC node by providing its URL.`
      }
      placement={"auto"}
      hasArrow
    >
      <Button
        onClick={handleClickDisconnectWallet}
        variant={"solid"}
        rightIcon={<SmallCloseIcon />}
      >
        Disconnect MetaMask
      </Button>
    </Tooltip>
  );
};

export const MetaMaskButtons = () => {
  const { injectedProvider } = useContext(GlobalContext);
  return (
    <>
      {injectedProvider && <MetaMaskDisconnectBox />}
      {!injectedProvider && <MetaMaskConnectBox />}
    </>
  );
};

export const WalletBalance = (props) => {
  const { walletAddress } = useContext(GlobalContext);
  const { getFormattedBalance } = useContext(BalancesContext);

  const balance = getFormattedBalance(walletAddress);
  return (
    <Tooltip label={`Balance: ${EtherSymbol} ${balance}`} hasArrow>
      <Input
        isReadOnly
        type={"text"}
        w={"120px"}
        value={EtherSymbol + " " + balance}
      />
    </Tooltip>
  );
};

export const WalletAddressCopyButton = (props) => {
  const { walletAddress } = useContext(GlobalContext);
  const { hasCopied, onCopy } = useClipboard(walletAddress);
  return (
    <IconButton
      size={"md"}
      icon={<CopyIcon color={hasCopied ? "pink.500" : "gray.600"} />}
      onClick={onCopy}
    />
  );
};

export const WalletAddressDropDown = ({ width }) => {
  const {
    chainProvider,
    chainAddresses,
    impersonatedAddresses,
    addImpersonatedAddress,
    walletAddress,
    updateWalletAddress,
    isHardhat,
  } = useContext(GlobalContext);

  const buildOptionObj = (addr) => ({
    label: buildDisplayAddress(addr),
    value: addr,
  });

  const allWalletOptions = [
    {
      label: "Chain Addresses",
      options: chainAddresses.map((addr) => buildOptionObj(addr)),
    },
  ];
  if (isHardhat) {
    allWalletOptions.unshift({
      label: "Impersonated Addresses",
      options: impersonatedAddresses.map((addr) => buildOptionObj(addr)),
    });
  }

  const selectedWalletOption = {
    label: buildDisplayAddress(walletAddress),
    value: walletAddress,
  };
  const handleChangeForAccount = async ({ value }, { action }) => {
    if (action === "create-option") {
      console.log("asked to add address: ", value);
      try {
        await chainProvider.send("hardhat_impersonateAccount", [value]);
        addImpersonatedAddress(value);
        successImpersonation(value);
      } catch (e) {
        errorImpersonation(value, e);
        console.log("unable to impersonate & add address: ", e);
      }
    }
    console.log("select change: ", value, action);
    updateWalletAddress(value);
  };

  const [isError, updateIsError] = useState(false);
  const { successImpersonation, errorImpersonation } = useImpersonatedToast();

  const handleInputChange = (val) => {
    console.log("in handleInputChange", val);
    if (val && !isAddress(val)) {
      updateIsError(true);
    } else {
      updateIsError(false);
    }
  };

  const showCreateNewOption = (val) => {
    if (!isHardhat) {
      return false;
    }
    if (!isAddress(val)) {
      return false;
    }
    const alreadyExists = [
      ...chainAddresses,
      ...impersonatedAddresses,
      "",
    ].some((addr) => addr === val);
    return !alreadyExists;
  };

  const formatCreateLabel = (val) =>
    `Create & Impersonate ${buildDisplayAddress(val)}`;

  const noOptionsMessage = () => {
    return `Type in a valid address to Create & Impersonate it. `;
  };

  return (
    <CreatableSelect
      options={allWalletOptions}
      onChange={handleChangeForAccount}
      isClearable={false}
      value={selectedWalletOption}
      focusBorderColor={isError ? "red.500" : "blue.500"}
      onInputChange={handleInputChange}
      isValidNewOption={showCreateNewOption}
      formatCreateLabel={formatCreateLabel}
      noOptionsMessage={noOptionsMessage}
      selectedOptionStyle={"color"}
      useBasicStyles
      size={"md"}
      tagVariant={"outline"}
      menuPortalTarget={document.body}
      width={width ? width : "250px"}
      styles={{
        menuPortal: (provided) => ({
          ...provided,
          zIndex: 1401,
        }),
      }}
      chakraStyles={{
        container: (provided, state) => ({
          ...provided,
          width: state.selectProps.width,
        }),
        menu: (provided, state) => ({
          ...provided,
          width: state.selectProps.width,
        }),
        menuList: (provided, state) => ({
          ...provided,
          minW: "auto",
        }),
      }}
    />
  );
};

export default function SetupDrawer(props) {
  const { isOpen, onClose, btnRef } = props;
  const navigate = useNavigate();
  const closeAndNavigate = (url) => {
    onClose();
    navigate(url);
  };
  const closeAndChangeUrl = (url) => {
    document.location.href = url;
  };
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        preserveScrollBarGap={true}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>

          <DrawerBody>
            <VStack spacig={2} w={"full"} align={"stretch"}>
              <HStack>
                <WalletAddressDropDown width={"200px"} />
                <WalletAddressCopyButton />
              </HStack>
              <HStack>
                <WalletBalance />
                <BalanceTransfer />
              </HStack>
              <ChainIdBox />
              <MetaMaskButtons />
              <RpcUrlInputBox />
              <Button
                onClick={closeAndNavigate.bind(this, "setup-files")}
                variant={"outline"}
              >
                Setup Files
              </Button>
              <Button
                onClick={closeAndNavigate.bind(this, "contracts")}
                variant={"outline"}
              >
                Contracts
              </Button>
              {/*<Button*/}
              {/*  w={"full"}*/}
              {/*  onClick={closeAndChangeUrl.bind(this, "/contracts#count")}*/}
              {/*  variant={"outline"}*/}
              {/*>*/}
              {/*  Foo#count*/}
              {/*</Button>*/}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
