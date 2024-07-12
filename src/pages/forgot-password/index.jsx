import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";


import Head from "next/head";

function ForgotPassword() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Mencegah perilaku default dari form

    try {
      if (!email) {
        toast({
          title: "Input Your Email!",
          status: "error",
        });
      } else if (email && !otp) {
        await axiosInstance.post("/user/forgot-password", {
          email: email,
        });

        toast({
          title: "Check Your Email for OTP Code!",
          status: "info",
        });
      } else if (email && otp) {
        await axiosInstance.post("/user/forgot_password", {
          email: email,
          otp: otp,
        });

        toast({
          title: "Success reset your password! Check your email!",
          status: "success",
        });
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : "An error occurred";
      if (errorMessage === "OTP Has Been Used!") {
        toast({
          title: "OTP Has Been Used!",
          status: "error",
        });
      } else if (errorMessage === "OTP Incorrect!") {
        toast({
          title: "OTP Incorrect!",
          status: "error",
        });
      } else if (errorMessage === "OTP Has Been Expired!") {
        toast({
          title: "OTP Has Been Expired!",
          status: "error",
        });
      } else if (errorMessage == `${email} Is Not User!`) {
        toast({
          title: `${email} Is Not User!`,
          status: "error",
        });
      } else {
        console.error("Error:", errorMessage);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Lestari</title>
        <meta name="admin page" content="admin page for lestari app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>{" "}
      <main>
        <Container>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Heading>Reset Password</Heading>
          <form onSubmit={handleForgotPassword}>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>OTP</FormLabel>
              <Input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </FormControl>
            <Button mt={6} type="submit">
              {!otp ? "Send OTP" : "Reset Password"}
            </Button>
          </form>
        </Container>
      </main>
    </>
  );
}

export default ForgotPassword;
