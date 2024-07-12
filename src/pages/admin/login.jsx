import { useState } from "react";
// import axios from "axios";
import { axiosInstance } from "@/lib/axios";
// import { Main } from "next/document";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
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
            <Button mt={6} type="submit">
              Login
            </Button>
          </form>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </Container>
      </main>
    </>
  );
};

export default Login;
