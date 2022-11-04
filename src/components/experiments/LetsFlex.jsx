import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function LetsFlex(props) {
  return (
    <>
      <Heading>Lets Flex</Heading>
      <Box border={"1px"} borderColor={"green.500"}>
        <HStack>
          <Box bg={"green.100"} flexGrow={1}>
            A
          </Box>
          <Box bg={"yellow.100"}>B</Box>
          <Box bg={"pink.100"}>
            {/* will take all space without box */}
            <Select>
              <option>option a</option>
              <option>option b</option>
            </Select>
          </Box>
          {/* flexBasis or width both can limit its width */}
          <Input
            placeholder={"more stuff here more stuff here"}
            // flexBasis={700}
            // width={500}
            // width={"auto"}
            flexGrow={1}
          ></Input>
          <Button>Foo</Button>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <Input></Input>
      </Box>
    </>
  );
}
