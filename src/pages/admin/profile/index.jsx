import SidebarMenu from "@/component/SidebarMenu";
import { withAuth } from "@/lib/authorization";
import { Container, Flex, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast, Button, Box, FormControl, FormLabel, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Profile = () => {
  return (
    <>      
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              Edit Profile
            </Heading>
            <FormProfile />
          </Container>
        </Flex>
      </main>
    </>
  );
};


const FormProfile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();  

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get(`/admin/profile`);
      setName(response?.data?.values?.name);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axiosInstance.put(`/admin/edit`, {
        name,
        password,
        confirmation_password: confirmationPassword,
      });

      setIsOpen(false);
      toast({
        title: response?.data?.message || "Success updating profile",
        status: "success",
      });
      setPassword("");
      setConfirmationPassword("");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: error?.response?.data?.message || "Error updating admin",
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
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to update your profile?</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() => {
                handleUpdate();
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
                <FormLabel>Edit Name</FormLabel>
                <Input
                  placeholder={name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <Flex direction="column" gap={4} w={{ base: "100%", md: "50%" }}>
                <FormControl>
                  <FormLabel>Edit Password</FormLabel>
                  <Input
                    placeholder="Password"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    placeholder="Confirmation Password"
                    value={confirmationPassword}
                    type="password"
                    onChange={(e) => setConfirmationPassword(e.target.value)}
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
                Update
              </Button>
            </Center>
          </Box>
        </Flex>
      </Box>
      <ModalConfirmation />
    </>
  );
};

export default withAuth(Profile);
