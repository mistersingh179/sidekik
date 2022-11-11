// import CreatableSelect from 'react-select/creatable';
import { CreatableSelect } from "chakra-react-select";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts";
import { useChainAddresses } from "../../hooks";
import { ethers } from "ethers";
import { buildDisplayAddress } from "../../helpers";

const {
  utils: { isAddress },
  constants: { AddressZero },
} = ethers;

export default function AddressDropdown({
  placeholder,
  setInput,
  value,
  onlyChainAddresses,
}) {
  const {
    contracts,
    customAddresses,
    addCustomAddress,
    outputAddresses,
    chainAddresses,
    impersonatedAddresses,
  } = useContext(GlobalContext);

  const buildOptionObj = (addr) => ({
    value: addr,
    label: buildDisplayAddress(addr),
  });

  let options;
  if (onlyChainAddresses) {
    options = [
      {
        label: "Chain Wallet Addresses",
        options: chainAddresses.map((addr) => buildOptionObj(addr)),
      },
    ];
  } else {
    options = [
      {
        label: "Custom Addresses",
        options: customAddresses.map((addr) => buildOptionObj(addr)),
      },
      {
        label: "Impersonated Addresses",
        options: impersonatedAddresses.map((addr) => buildOptionObj(addr)),
      },
      {
        label: "Chain Wallet Addresses",
        options: chainAddresses.map((addr, idx) => ({
          value: addr,
          label: `${buildDisplayAddress(addr)} – Wallet ${idx}`
        })),
      },
      {
        label: "Contract Addresses",
        options: Object.entries(contracts).map(([k, v]) => ({
          value: v.address,
          label: `${buildDisplayAddress(v.address)} – ${k}`,
        })),
      },
      {
        label: "Output Addresses",
        options: outputAddresses.map((addr) => buildOptionObj(addr)),
      },
      {
        label: "Common Addresses",
        options: [AddressZero].map((addr) => buildOptionObj(addr)),
      },
    ];
  }

  let selectedOption;
  if (value) {
    buildOptionObj(value);
  }

  const handleChange = (newValue, actionMeta) => {
    const { value } = newValue || {};
    const { action } = actionMeta || {};

    if (action === "create-option") {
      addCustomAddress(value);
    }
    console.log("select change: ", value, action);
    setInput(value);
  };
  const [isError, updateIsError] = useState(false);

  const handleInputChange = (val) => {
    console.log("in handleInputChange", val);
    if (val && !isAddress(val)) {
      updateIsError(true);
    } else {
      updateIsError(false);
    }
  };
  const showCreateNewOption = (val) => {
    const alreadyExists = [...chainAddresses, ...customAddresses, ""].some(
      (addr) => addr === val
    );
    return !alreadyExists;
  };
  return (
    <CreatableSelect
      options={options}
      onChange={handleChange}
      isClearable
      value={selectedOption}
      focusBorderColor={isError ? "red.500" : "blue.500"}
      placeholder={placeholder}
      onInputChange={handleInputChange}
      isValidNewOption={showCreateNewOption}
      selectedOptionStyle={"color"}
      useBasicStyles
      hasStickyGroupHeaders
      menuPlacement={"auto"}
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (provided) => ({ ...provided, zIndex: 1401 }),
      }}
    />
  );
}
