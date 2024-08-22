import { Container, Flex, Heading } from "@chakra-ui/react";
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
  Divider,
  Spacer,
  Tbody,
  Tr,
  TableContainer,
  Th,
  Td,
} from "@chakra-ui/react";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/component/Loading";
import formatDate from "@/lib/formatDate";

function HistoryDataID() {
  return (
    <>      
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              Data Permintaan
            </Heading>
            <DetailHistory />
          </Container>
        </Flex>
      </main>
    </>
  );
}

const DetailHistory = () => {
  const router = useRouter();
  const { id } = router.query;
  const [requestData, setRequestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqDataResponse = await axiosInstance.get(
          `/history/request/data/${id}`
        );
        setRequestData(reqDataResponse.data.values[0]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error("Gagal memuat detail data permintaan:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleApprove = async () => {
    try {
      await axiosInstance.put(`/request/data/approve/${id}`, { approve: 2 });
      setIsModalOpen(false);
      // Refresh data after approval
      const reqDataResponse = await axiosInstance.get(`/request/data/${id}`);
      setRequestData(reqDataResponse.data.values[0]);
      toast({
        title: "Permintaan telah disetujui",
        status: "success",
      });
    } catch (error) {
      console.error("Gagal menyetujui permintaan:", error);
    }
  };

  const handleReject = async () => {
    try {
      await axiosInstance.put(`/request/data/approve/${id}`, { approve: 1 });
      setIsModalOpen(false);
      const reqDataResponse = await axiosInstance.get(`/request/data/${id}`);
      setRequestData(reqDataResponse.data.values[0]);
      toast({
        title: "Permintaan telah ditolak",
        status: "warning",
      });
    } catch (error) {
      console.error("Gagal menolak permintaan:", error);
    }
  };

  if (loading) return <Loading/>
  if (error) return <div>Gagal memuat data</div>;

  return (
    <>
      {requestData && (
        <Box>
          <Flex>
            <Box flex={5}>
              <Text fontWeight="semibold" fontSize="3xl" mb={2}>
                {requestData.subject}
              </Text>
              <Text>{requestData.body}</Text>
            </Box>
            <Spacer />
            <Box flex={4} mt={4}>
              <Box p={8} borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Text fontSize="xl" fontWeight="semibold">
                  {requestData.name}
                </Text>
                <Text as="em" fontSize="l">
                  {requestData.email}
                </Text>
                <Box mt={4}>
                  <TableContainer>
                    <Table>
                      <Tbody>
                        <Tr>
                          <Th>Profesi</Th>
                          <Td>{requestData.profession}</Td>
                        </Tr>
                        <Tr>
                          <Th>Instansi</Th>
                          <Td>{requestData.instances}</Td>
                        </Tr>
                        <Tr>
                          <Th>Dikirim pada</Th>
                          <Td>{formatDate(requestData.date)}</Td>
                        </Tr>
                        <Tr>
                          <Th>Dari</Th>
                          <Td>{formatDate(requestData.date_start)}</Td>
                        </Tr>
                        <Tr>
                          <Th>Sampai</Th>
                          <Td>{formatDate(requestData.date_end)}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>

                <Box
                  p={1}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  marginTop={4}
                >
                  {requestData.local_name == 1 && (
                    <Box
                      as="button"
                      borderRadius="md"
                      bg="#48BB78"
                      color="white"
                      px={4}
                      h={8}
                      margin={1}
                    >
                      Nama Lokal
                    </Box>
                  )}
                  {requestData.latin_name == 1 && (
                    <Box
                      as="button"
                      borderRadius="md"
                      bg="#48BB78"
                      color="white"
                      px={4}
                      h={8}
                      margin={1}
                    >
                      Nama Latin
                    </Box>
                  )}
                  {requestData.habitat == 1 && (
                    <Box
                      as="button"
                      borderRadius="md"
                      bg="#48BB78"
                      color="white"
                      px={4}
                      h={8}
                      margin={1}
                    >
                      Habitat
                    </Box>
                  )}
                  {requestData.description == 1 && (
                    <Box
                      as="button"
                      borderRadius="md"
                      bg="#48BB78"
                      color="white"
                      px={4}
                      h={8}
                      margin={1}
                    >
                      Deskripsi
                    </Box>
                  )}
                  {requestData.city == 1 && (
                    <Box
                      as="button"
                      borderRadius="md"
                      bg="#48BB78"
                      color="white"
                      px={4}
                      h={8}
                      margin={1}
                    >
                      Kota
                    </Box>
                  )}
                  {requestData.longitude == 1 && (
                    <Box
                      as="button"
                      borderRadius="md"
                      bg="#48BB78"
                      color="white"
                      px={4}
                      h={8}
                      margin={1}
                    >
                      Koordinat
                    </Box>
                  )}
                  {requestData.amount == 1 && (
                    <Box
                      as="button"
                      borderRadius="md"
                      bg="#48BB78"
                      color="white"
                      px={4}
                      h={8}
                      margin={1}
                    >
                      Jumlah
                    </Box>
                  )}
                </Box>
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
                  onClick={handleReject} // Handle reject action
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
                  onClick={handleApprove} // Handle approve action
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
}

export default withAuth(HistoryDataID);
