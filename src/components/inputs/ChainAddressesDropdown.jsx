// import CreatableSelect from 'react-select/creatable';
import { Select } from "chakra-react-select";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts";
import { useChainAddresses } from "../../hooks";
import { ethers } from "ethers";
import { buildDisplayAddress } from "../../helpers";

const {
  utils: { isAddress },
  constants: { AddressZero },
} = ethers;

export default function ChainAddressesDropdown({
  placeholder,
  setInput,
  value,
}) {
  const {
    chainAddresses,
    impersonatedAddresses,
    isHardhat,
  } = useContext(GlobalContext);

  const buildOptionObj = (addr) => ({
    value: addr,
    label: buildDisplayAddress(addr),
  });

  const options = [
    {
      label: "Chain Wallet Addresses",
      options: chainAddresses.map((addr) => buildOptionObj(addr)),
    },
  ];
  if (isHardhat) {
    options.unshift({
      label: "Impersonated Addresses",
      options: impersonatedAddresses.map((addr) => buildOptionObj(addr)),
    });
  }


  const handleChange = (newValue, actionMeta) => {
    const { value } = newValue || {};
    const { action } = actionMeta || {};

    console.log("select change: ", value, action);
    setInput(value);
  };


  return (
    <Select
      options={options}
      onChange={handleChange}
      isClearable
      placeholder={placeholder}
      selectedOptionStyle={"color"}
      useBasicStyles
      hasStickyGroupHeaders
      size={"md"}
      tagVariant={"outline"}
      w={"full"}
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (provided) => ({ ...provided, zIndex: 1401 }),
      }}
    />
  );
}
