import { AddressInput } from "../inputs";
import { useState } from "react";
import Select from "react-select";
import { CreatableSelect } from "chakra-react-select";
import { InputGroup, InputRightAddon, VStack } from "@chakra-ui/react";

export default function Dropdown(props) {
  const [options, setOptions] = useState([
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ]);
  const [selectedOption, updateSelectedOption] = useState(options[2]);
  const handleChangeForSelect = (val, actionObj) => {
    console.log("in handleChangeForSelect: ", val, actionObj);
    updateSelectedOption(val);
    if (actionObj.action === "create-option") {
      const { value, label } = val;
      setOptions((prevState) => [{ value, label }, ...options]);
    }
  };
  const handleCreateOptionForSelect = (str) => {
    console.log("in handleCreateOptionForSelect: ", str);
  };
  return (
    <>
      <VStack spacing={4} alignItems={"left"} w={'md'}>
          <CreatableSelect
            options={options}
            isSearchable={true}
            onChange={handleChangeForSelect}
            value={selectedOption}
            isSearchable={true}
            isClearable={false}
            isInvalid={false}
            focusBorderColor={"green.500"}
            useBasicStyles={true}
            selectedOptionStyle={"check"}
          />
      </VStack>
    </>
  );
}
