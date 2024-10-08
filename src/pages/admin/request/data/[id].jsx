import { Container, Heading, Flex } from "@chakra-ui/react";
import SidebarMenu from "@/component/SidebarMenu";
import { withAuth } from "@/lib/authorization";
import {
  Box,
  Button,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Text,
  useToast,
  Spacer,
  TableContainer,
  Tr,
  Th,
  Td,
  Tbody,
} from "@chakra-ui/react";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/component/Loading";
import { InfoIcon } from "@chakra-ui/icons";
import Image from "next/image";
import formatDate from "@/lib/formatDate";

function RequestDataID() {
  return (
    <>
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              Permintaan Data
            </Heading>
            <DetailReqData />
          </Container>
        </Flex>
      </main>
    </>
  );
}

const DetailReqData = () => {
  const router = useRouter();
  const { id } = router.query;
  const [requestAccount, setrequestAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqDataResponse = await axiosInstance.get(`/request/data/${id}`);
        setrequestAccount(reqDataResponse.data.values[0]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error("Error fetching detail request data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);  

  const handleApprove = async () => {
    try {
      await axiosInstance.put(`/request/data/approve/${id}`, { approve: 2 });

      const reqDataResponse = await axiosInstance.get(`/request/data/${id}`);
      setrequestAccount(reqDataResponse.data.values[0]);
      toast({
        title: "Permintaan telah disetujui",
        status: "success",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = async () => {
    try {
      await axiosInstance.put(`/request/data/approve/${id}`, { approve: 1 });

      const reqDataResponse = await axiosInstance.get(`/request/data/${id}`);
      setrequestAccount(reqDataResponse.data.values[0]);
      toast({
        title: "Permintaan telah ditolak",
        status: "warning",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div>Error fetching data</div>;

  return (
    <>
      {requestAccount && (
        <Box>
          <Flex>
            <Box flex={5}>
              <Text fontWeight="semibold" fontSize="3xl" mb={2}>
                {requestAccount.subject}
              </Text>
              <ModalImage
                image={requestAccount.attachment}
                isOpen={isAttachmentOpen}
                onClose={() => setIsAttachmentOpen(false)}
                title={requestAccount.subject}
              />
              <Text
                style={{ alignItems: "center", display: "flex", gap: "5px", cursor: "pointer" }}
                fontSize={"sm"}
                onClick={() => {
                  setIsAttachmentOpen(true);
                }}
              >
                Lihat Lampiran <InfoIcon />
              </Text>
              <Text>{requestAccount.body}</Text>
            </Box>
            <Spacer />
            <Box flex={4} mt={4}>
              <Box p={8} borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Text fontSize="xl" fontWeight="semibold">
                  {requestAccount.name}
                </Text>
                <Text as="em" fontSize="l">
                  {requestAccount.email}
                </Text>
                <Box mt={4}>
                  <TableContainer>
                    <Table>
                      <Tbody>
                        <Tr>
                          <Th>Profesi</Th>
                          <Td>{requestAccount.profession}</Td>
                        </Tr>
                        <Tr>
                          <Th>Instansi</Th>
                          <Td>{requestAccount.instances}</Td>
                        </Tr>
                        <Tr>
                          <Th>Tanggal Kirim</Th>
                          <Td>{formatDate(requestAccount.date)}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
                <Center mt={4}>
                  {requestAccount.approve == 0 && (
                    <Button
                      borderRadius="md"
                      bg="#CBD5E0"
                      color="white"
                      px={4}
                      h={8}
                      onClick={() => setIsModalOpen(true)}
                    >
                      Pending
                    </Button>
                  )}
                  {requestAccount.approve == 1 && (
                    <Button
                      borderRadius="md"
                      bg="#E53E3E"
                      color="white"
                      px={4}
                      h={8}
                      onClick={() => {
                        toast({
                          title: "Permintaan telah ditolak",
                          status: "warning",
                        });
                      }}
                    >
                      Ditolak
                    </Button>
                  )}
                  {requestAccount.approve == 2 && (
                    <Button
                      borderRadius="md"
                      bg="#48BB78"
                      color="white"
                      px={4}
                      h={8}
                      onClick={() => {
                        router.push(`/admin/request/data/send/${requestAccount.id_request_data}`);
                      }}
                    >
                      Disetujui
                    </Button>
                  )}
                </Center>
              </Box>
            </Box>
          </Flex>
        </Box>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Konfirmasi Permintaan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Center flex={1}>
                <Button
                  borderRadius="md"
                  bg="#E53E3E"
                  color="white"
                  px={4}
                  h={8}
                  onClick={handleReject}
                >
                  Tolak
                </Button>
              </Center>
              <Center flex={1}>
                <Button
                  borderRadius="md"
                  bg="#48BB78"
                  color="white"
                  px={4}
                  h={8}
                  onClick={handleApprove}
                >
                  Setujui
                </Button>
              </Center>
            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const ModalImage = ({ isOpen, onClose, image, title }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Lampiran</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image
            src={image}
            alt={title}
            width={500}
            height={500}
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Tutup</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default withAuth(RequestDataID);
