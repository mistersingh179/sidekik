import {
  Button,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import GrittedTeeth from "../../images/gritted_teeth.gif";

const hasFileFeatures = () => {
  return !!(window.showDirectoryPicker && window.showOpenFilePicker);
};

export default function BrowserIssue() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (hasFileFeatures() === false) {
      onOpen();
    } else {
      onClose();
    }
  }, []);

  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"lg"}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Incompatible Browser</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              For best experience, please use Google Chrome v86+.
            </Text>
            <Text>
              In sidekik you can sync local files and directories to it. Then
              sidekik can read those files as they change and hot reload its UI.
              This feature of connecting to a file and reading it as it changes
              are currently only available in Chrome. This is why for best
              experience you should use Chrome.
            </Text>
            <Center mt={5}>
              <Image
                src={GrittedTeeth}
                boxSize="220px"
                objectFit="cover"
                borderRadius="full"
              />
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Kapeesh?
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
