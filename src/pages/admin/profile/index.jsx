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
              Edit Profil
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
      console.error("Gagal memuat profil:", error);
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
        title: response?.data?.message || "Profil berhasil diperbarui",
        status: "success",
      });
      setPassword("");
      setConfirmationPassword("");
    } catch (error) {
      console.error("Gagal memperbarui profil:", error);
      toast({
        title: error?.response?.data?.message || "Gagal memperbarui admin",
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
          <ModalHeader>Perbarui Profil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Apakah Anda yakin ingin memperbarui profil Anda?</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() => {
                handleUpdate();
              }}
            >
              Ya
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Tidak
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
                <FormLabel>Edit Nama</FormLabel>
                <Input
                  placeholder={name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <Flex direction="column" gap={4} w={{ base: "100%", md: "50%" }}>
                <FormControl>
                  <FormLabel>Edit Kata Sandi</FormLabel>
                  <Input
                    placeholder="Kata Sandi"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    placeholder="Konfirmasi Kata Sandi"
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
                Perbarui
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
