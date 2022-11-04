import {
  Box,
  Button,
  Code,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useContext, useState } from "react";
import GlobalContext from "../../contexts/globalContext";

export default function HardhatFunctions() {
  const { chainProvider, impersonatedAddresses, addImpersonatedAddress } =
    useContext(GlobalContext);
  const [account, setAccount] = useState("");

  const accountChangeHandler = useCallback((evt) => {
    setAccount(evt.target.value);
  }, []);

  const impersonateHandler = useCallback(
    async (evt) => {
      await chainProvider.send("hardhat_impersonateAccount", [account]);
      addImpersonatedAddress(account);
    },
    [chainProvider, account]
  );


  return (
    <>
      <Heading size={"md"} my={5}>
        Hardhat Functions
      </Heading>
      <VStack
        w={"lg"}
        border={"1px"}
        borderColor={"gray.200"}
        p={2}
        spacing={5}
      >
        <FormControl>
          <FormLabel>Account To Impersonate</FormLabel>
          <Input
            type={"text"}
            value={account}
            onChange={accountChangeHandler}
          />
          <FormHelperText>
            This is the account you want to impersonate
          </FormHelperText>
        </FormControl>
        <Button onClick={impersonateHandler}>Impersonate</Button>
        <Box>
          impersonatedAddresses: {impersonatedAddresses.length}
          <Code>{JSON.stringify(impersonatedAddresses)}</Code>
        </Box>
      </VStack>
    </>
  );
}
