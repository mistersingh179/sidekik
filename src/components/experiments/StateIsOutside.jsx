import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Highlight,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import groupSimilarFunctionNames from "group-similar-functions";

window.groupSimilarFunctionNames = groupSimilarFunctionNames;

const MyItem = React.memo(({ name, lastRanIdx, idx, highlight, callback }) => {
  // const bg = lastRanIdx === idx ? "yellow.50" : "white";
  const bg = highlight ? "yellow.50" : "white";
  return (
    <Box border={"1px"} p={5} bg={bg}>
      <HStack>
        <Text>Name is: {name}</Text>
        <Button onClick={() => callback(idx)}>Do {name}</Button>
      </HStack>
    </Box>
  );
});

const MyContainer = (props) => {
  const names = ["a", "b", "c"];
  const [lastRanIdx, updateLastRanIdx] = useState(null);
  const callback = useCallback(
    (id) => updateLastRanIdx(id),
    [updateLastRanIdx]
  );

  return (
    <VStack border={"2px"} p={5}>
      {names.map((name, idx) => {
        return (
          <MyItem
            name={name}
            key={idx}
            idx={idx}
            // lastRanIdx={lastRanIdx}
            highlight={lastRanIdx === idx}
            callback={callback}
          />
        );
      })}
    </VStack>
  );
};

export default function StateIsOutside(props) {
  const handler = () => {
    console.log("start");
    setTimeout(() => {
      console.log("***in timeout cb***");
    }, 0);
    for (let i = 0; i < 1_000; i++) {
      console.log('in loop');
    }
    console.log("end");
  };
  return (
    <>
      <Heading>State is Outside</Heading>
      <Button onClick={handler}>Call Worker</Button>
    </>
  );
}
