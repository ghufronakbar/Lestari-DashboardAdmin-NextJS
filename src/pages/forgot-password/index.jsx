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
    e.preventDefault(); 

    try {
      if (!email) {
        toast({
          title: "Masukkan Email Anda!",
          status: "error",
        });
      } else if (email && !otp) {
        await axiosInstance.post("/user/forgot-password", {
          email: email,
        });

        toast({
          title: "Periksa Email Anda untuk Kode OTP!",
          status: "info",
        });
      } else if (email && otp) {
        await axiosInstance.post("/user/forgot-password", {
          email: email,
          otp: otp,
        });

        toast({
          title: "Berhasil mengatur ulang kata sandi Anda! Periksa email Anda!",
          status: "success",
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      console.log(error?.message);
      toast({
        title: error?.response?.data?.message || "Terdapat kesalahan, ulangi beberapa saat lagi!",
        status: "error",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Lupa Password | Lestari</title>
        <meta name="Lestari" content="Lestari" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>{" "}
      <main>
        <Container>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Heading>Reset Kata Sandi</Heading>
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
            <Button
              mt={6}
              type="submit"
              colorScheme={"teal"}
              variant={!otp ? "solid" : "outline"}
            >
              {!otp ? "Kirim OTP" : "Reset Kata Sandi"}
            </Button>
          </form>
        </Container>
      </main>
    </>
  );
}

export default ForgotPassword;
