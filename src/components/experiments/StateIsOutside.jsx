import {
  Box,
  Button, ButtonGroup,
  Heading,
  Highlight,
  HStack, IconButton,
  Text,
  VStack
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
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
  return (
    <>
      <Heading>State is Outside</Heading>
      <MyContainer />
    </>
  );
}
