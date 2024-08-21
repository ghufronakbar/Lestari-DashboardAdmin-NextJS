import SidebarMenu from "@/component/SidebarMenu";
import { withAuth } from "@/lib/authorization";
import { Box, Button, Center, Container, Flex, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, useToast } from "@chakra-ui/react";
import { useState } from "react";

const AddAdmin = () => {
  return (
    <>      
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <HStack
              marginBottom="8"
              marginTop="8"
              justifyContent="space-between"
            >
              <Heading>Add Admin</Heading>
            </HStack>
            <FormAdmin />
          </Container>
        </Flex>
      </main>
    </>
  );
};

const FormAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const handleAdd = async () => {
    try {
      const response = await axiosInstance.post(`/create-account`, {
        name,
        email,
      });
      setIsOpen(false);
      toast({
        title: response?.data?.message || "Success creating admin, check email",
        status: "success",
      });
      setEmail("");
      setName("");
    } catch (error) {
      console.error("Error creating admin:", error);
      toast({
        title: error?.response?.data?.message || "Error creating admin",
        status: "error",
      });
    }
  };

  const ModalConfirmation = () => {
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure to add an admin?</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() => {
                handleAdd();
              }}
            >
              Yes
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  return (
    <>
      <Box>
        <Flex marginTop={8}>
          <Box flex={5} mt={4}>
            <Flex direction={{ base: "column", md: "row" }} gap={4} w={"100%"}>
              <FormControl w={{ base: "100%", md: "50%" }}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <Flex direction="column" gap={4} w={{ base: "100%", md: "50%" }}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Email"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
              </Flex>
            </Flex>
            <Center>
              <Button
                colorScheme="teal"
                mt={8}
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Add
              </Button>
            </Center>
          </Box>
        </Flex>
      </Box>
      <ModalConfirmation />
    </>
  );
};



export default withAuth(AddAdmin);
