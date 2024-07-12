import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import Head from "next/head";

function RequestData() {
  const toast = useToast();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [profession, setProfession] = useState();
  const [instances, setInstances] = useState();
  const [subject, setSubject] = useState();
  const [body, setBody] = useState();

  const handleRequestGuest = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/user/request-data", {
        name,
        email,
        profession,
        instances,
        subject,
        body,
      });
      toast({
        title: response?.data?.message,
        status: "success",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: error?.response?.data?.message,
        status: "error",
      });
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
          <Heading>Request Data</Heading>
          <form onSubmit={handleRequestGuest}>
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Instances</FormLabel>
              <Input
                value={instances}
                onChange={(e) => setInstances(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Profession</FormLabel>
              <Input
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Subject</FormLabel>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Body</FormLabel>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </FormControl>
            <Button mt={6} type="submit">
              SUBMIT
            </Button>
          </form>
        </Container>
      </main>
    </>
  );
}

export default RequestData;
