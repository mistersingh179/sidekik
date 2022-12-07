import { useEffect } from "react";

export default function useInjectedProviderEventManager(
  injectedProvider,
  handleClickConnectWallet,
  handleClickDisconnectWallet,
  fetchChainAddresses
) {
  useEffect(() => {
    if (injectedProvider?.provider?.on) {

      const handleAccountChanged = ([account]) => {
        console.log("got new account: ", account);
        if (account) {
          fetchChainAddresses()
          // handleClickConnectWallet();
        } else {
          handleClickDisconnectWallet();
        }
      };
      const handleChainChanged = (_hexChainId) => {
        console.log("got a chainChanged: ", _hexChainId);
        handleClickConnectWallet();
      };

      injectedProvider.provider.on("disconnect", handleClickDisconnectWallet);
      injectedProvider.provider.on("accountsChanged", handleAccountChanged);
      injectedProvider.provider.on("chainChanged", handleChainChanged);
      return () => {
        injectedProvider.provider.removeListener(
          "disconnect",
          handleClickDisconnectWallet
        );
        injectedProvider.provider.removeListener(
          "accountsChanged",
          handleAccountChanged
        );
        injectedProvider.provider.removeListener(
          "chainChanged",
          handleChainChanged
        );
      };
    } else {
      // console.log("injectProvider doesn't have ON: ", injectedProvider);
    }
  }, [injectedProvider, injectedProvider && injectedProvider.provider]);
}
