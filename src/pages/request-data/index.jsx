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
  const [attachment, setAttachment] = useState();

  const handleRequestGuest = async (e) => {
    e.preventDefault();
    if(!name || !email || !profession || !instances || !subject || !body){
      toast({
        title: "Semua kolom harus diisi!",
        status: "error",
      });
      return
    }
    if(!attachment){
      toast({
        title: "Lampiran harus diisi!",
        status: "error",
      });
      return
    }
    try {
      const formData = new FormData();
      formData.append("image", attachment);
      const uploadAttachment = await axiosInstance.post("/user/request-data/attachment", formData);            
      
      const response = await axiosInstance.post("/user/request-data", {
        name,
        email,
        profession,
        instances,
        subject,
        body,
        attachment: uploadAttachment.data.image_url
      });
      toast({
        title: response?.data?.message,
        status: "success",
      });
      setName("");
      setEmail("");
      setProfession("");
      setInstances("");
      setSubject("");
      setBody("");
      setAttachment(null);      
    } catch (error) {
      console.log(error);
      toast({
        title: error?.response?.data?.message || "Terdapat kesalahan, ulangi beberapa saat lagi!",
        status: "error",
      });
    }
  };

  return (
    <>
     <Head>
        <title>Permintaan Data | Lestari</title>
        <meta name="Lestari" content="Lestari" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>{" "}
      <main>
        <Container mb={16}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Heading>Permintaan Data</Heading>
          <form onSubmit={handleRequestGuest}>
            <FormControl mt={4}>
              <FormLabel>Nama</FormLabel>
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
              <FormLabel>Institusi</FormLabel>
              <Input
                value={instances}
                onChange={(e) => setInstances(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Profesi</FormLabel>
              <Input
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Subjek</FormLabel>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Isi</FormLabel>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Lampiran</FormLabel>
              <Input type="file" onChange={(e) => setAttachment(e.target.files[0])} value={attachment}/> 
            </FormControl>
            <Button mt={6} type="submit" colorScheme="teal">
              Kirim
            </Button>
          </form>
        </Container>
      </main>
    </>
  );
}

export default RequestData;
