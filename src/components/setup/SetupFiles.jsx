import {
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { useContext, useMemo } from "react";

import { GlobalContext } from "../../contexts";
import ContractsTable from "./ContractsTable";
import FilesInput from "./FilesInput";

export default function SetupFiles(props) {
  const { contracts, handles } = useContext(GlobalContext);
  const contractNames = useMemo(() => Object.keys(contracts), [contracts]);
  return (
    <Center height={"calc(100vh - 50px)"} w={"full"}>
      <VStack
        spacing={10}
        boxShadow="md"
        borderWidth={1}
        borderStyle={"solid"}
        borderColor={"gray.100"}
        borderRadius={"md"}
        p={5}
      >
        <Box w={"full"} textAlign={"center"}>
          <Heading mb={5}>Setup Files</Heading>
          <Divider />
        </Box>
        <HStack w={"full"} justify={"center"}>
          <Spacer />
          <FilesInput />
          <Spacer />
          {(handles.length > 0 || contractNames.length > 0) && (
            <>
              <ContractsTable />
              <Spacer />
            </>
          )}
        </HStack>
      </VStack>
    </Center>
  );
}
