import {
  Box,
  Button,
  Code,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AddressDropdown } from "./index";
import { ethers } from "ethers";

export default function ArrayContainer(props) {
  const a = {"a": 5, b: "5", c: "10"}
  const b = Object.keys(a);
  const c = Object.values(a);
  const d = null;
  return <>
    a: <Input value={a} />
    b: <Input value={b} />
    c: <Input value={c} />
    d: <Input value={d} />
  </>;
}
