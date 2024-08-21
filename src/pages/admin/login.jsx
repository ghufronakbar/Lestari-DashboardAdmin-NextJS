import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

const ModalForgotPassword = ({ isOpen, onClose, forgotEmail, setForgotEmail, handleForgotPassword }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Forgot Password</ModalHeader>
          <ModalCloseButton />            
          <ModalBody>

            <Input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter your email"
              />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={handleForgotPassword}
              type="submit"
              >
              Submit
            </Button>
          </ModalFooter>              
        </ModalContent>
      </Modal>
    </>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      const { success, message, token } = response.data;

      if (success) {
        localStorage.setItem("token", token);
        // Redirect to dashboard or other page
        toast({
          title: "Login Successfully",
          status: "success",
        });

        router.push(`/admin/animal`);
      } else {
        toast({
          title: "Email or Password doesn't match",
          status: "error",
        });
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      toast({
        title: "Email or Password doesn't match",
        status: "error",
      });
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axiosInstance.post("/reset-password", {
        email: forgotEmail,
      });
      toast({
        title: response.data.message,
        status: "info",
      });
      setIsOpen(false);
      setForgotEmail("");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast({
        title: error?.response?.data?.message || "Error resetting password",
        status: "error",
      });
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setForgotEmail("");
  };

  return (
    <>
      <main>
        <Container>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Heading>Login Admin</Heading>
          <form onSubmit={handleLogin}>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <HStack>
              <Button mt={6} type="submit" colorScheme="teal">
                Login
              </Button>
              <Button
                mt={6}
                colorScheme="teal"
                variant={"outline"}
                onClick={() => setIsOpen(true)}
              >
                Forgot Password
              </Button>
            </HStack>
          </form>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </Container>
      </main>
      <ModalForgotPassword
        isOpen={isOpen}
        onClose={handleCloseModal}
        forgotEmail={forgotEmail}
        setForgotEmail={setForgotEmail}
        handleForgotPassword={handleForgotPassword}
      />
    </>
  );
};

export default Login;
