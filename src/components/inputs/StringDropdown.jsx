import {
  Box,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { CreatableSelect } from "chakra-react-select";
import ReusableThingsContext from "../../contexts/reusableThingsContext";
import { GiSewingString } from "react-icons/gi";

export const chakraStyles = {
  valueContainer: (provided, state) => ({
    // makes space for the left icon
    ...provided,
    marginLeft: "20px",
  }),
  container: (provided, state) => ({
    ...provided,
    width: "100%",
  }),
  menu: (provided, state) => ({
    ...provided,
    width: "100%",
  }),
  menuList: (provided, state) => ({
    ...provided,
    minW: "auto",
  }),
};

export const reactSelectStyles = {
  menuPortal: (provided) => ({ ...provided, zIndex: 1401 }),
};

export default function ({ value, setInput, placeholder }) {
  const { strings, addString } = useContext(ReusableThingsContext);

  useEffect(() => {
    if (!value) {
      setInput("");
    }
  }, []);

  const options = useMemo(
    () =>
      strings.map((item) => ({
        label: item,
        value: item,
      })),
    [strings]
  );

  const handleChange = useCallback(
    (newValue, actionMeta) => {
      let { value } = newValue || {};
      const { action } = actionMeta || {};

      if (action === "create-option") {
        addString(value);
      } else if (action === "clear") {
        value = "";
      }

      console.log("select change: ", value, action);
      setInput(value);
    },
    [setInput]
  );

  // const handleInputChange = (val, { action }) => {
  //   console.log("in handleInputChange", val, action);
  // };

  return (
    <InputGroup>
      <InputLeftElement
        color={"gray.400"}
        children={<Icon as={GiSewingString} />}
      />
        <CreatableSelect
          options={options}
          //onInputChange={handleInputChange} // fired when a key is pressed, useful for error checking
          onChange={handleChange} // fired when selected value changes, useful for saving select value
          backspaceRemovesValue={true} // remove selected item when hitting backspace, useful for clearing old value
          escapeClearsValue={true} // remove selected item when hitting esc, useful to remove current selected value
          placeholder={placeholder}
          createOptionPosition={"first"}
          isClearable
          useBasicStyles
          hasStickyGroupHeaders
          selectedOptionStyle={"color"}
          menuPlacement={"auto"}
          menuPortalTarget={document.body}
          styles={reactSelectStyles}
          chakraStyles={chakraStyles}
        />
    </InputGroup>
  );
}
