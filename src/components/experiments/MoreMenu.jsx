import {
  Button,
  Heading, Icon, IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from "@chakra-ui/react";
import { IoOptions } from "react-icons/io5";

export default function MoreMenu(props){
  return (
    <>
      <Heading>
        MoreMenu
      </Heading>
      <Menu>
        <MenuButton as={IconButton} icon={<Icon as={IoOptions} />}>Actions</MenuButton>
        <MenuList>
          <MenuItem>A</MenuItem>
          <MenuItem>B</MenuItem>
          <MenuItem>C</MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}