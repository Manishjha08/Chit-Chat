import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";

const ProfileModel = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
          {children ? (
            <span onClick={onOpen}>{children}</span>
          ) : (
            <IconButton bg="#d9ed92" d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
          )}
          <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent h="410px" bg="#0a9396" fontFamily="cursive" borderWidth="10px" borderColor="#94d2bd" borderRadius="50px">
              <ModalHeader
                fontSize="40px"
                
                display="flex"
                justifyContent="center"
              >
                {user.name}
              </ModalHeader>
              <ModalCloseButton fontSize="15px"/>
              <ModalBody
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="space-between"
              >
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src={user.pic}
                  alt={user.name}
                />
                <Text
                  fontSize={{ base: "28px", md: "30px" }}
                  
                >
                  Email: {user.email}
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose} bg="#ade8f4">Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      );
    };
    
export default ProfileModel;
