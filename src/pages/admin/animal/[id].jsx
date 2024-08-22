import { Container, Flex } from "@chakra-ui/react";
import SidebarMenu from "@/component/SidebarMenu";
import { withAuth } from "@/lib/authorization";
import {
  Box,
  Center,  
  Table,  
  Text,  
  Spacer,
  TableContainer,
  Tbody,
  Tr,
  Th,
  Td,  
  HStack,
} from "@chakra-ui/react";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../../../component/Loading";
import Image from "next/image";
import formatDate from "@/lib/formatDate";

function RequestDataID() {
  const router = useRouter();
  const { id } = router.query;
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqDataResponse = await axiosInstance.get(`/animal/${id}`);
        setAnimal(reqDataResponse.data.values[0]);
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

  if (loading) return <Loading />;
  if (error) return <div>Gagal memuat data</div>;

  return (
    <>
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            {animal && (
              <Box>
                <Flex marginTop={8}>
                  <Box flex={5} mt={4}>
                    <Center>
                      <Image
                        borderRadius="18"
                        objectFit="cover"
                        width={200}
                        height={200}
                        src={animal.image  !== null ? animal.image : "/profile.webp"}
                        alt={animal.latin_name}
                      />
                    </Center>
                    <Text mt={4}>{animal.description}</Text>
                  </Box>
                  <Spacer />
                  <Box flex={4} mt={4}>
                    <Box
                      p={8}
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                    >
                      <Box>
                        <Box
                          p={8}
                          borderWidth="1px"
                          borderRadius="lg"
                          overflow="hidden"
                        >
                          <HStack justify={"space-evenly"}>
                            <Text as="b">PENULIS</Text>
                            <Image
                              borderRadius="18"
                              boxSize="60px"
                              width={60}
                              height={60}
                              objectFit="cover"
                              src={animal.user_picture  !== null ? animal.user_picture : "/profile.webp"}
                              alt={animal.name}
                            />
                          </HStack>
                          <Flex mt={4}>
                            <Table>
                              <Tr>
                                <Th>Nama</Th>
                                <Td>{animal.name}</Td>
                              </Tr>
                              <Tr>
                                <Th>Email</Th>
                                <Td>{animal.email}</Td>
                              </Tr>
                              <Tr>
                                <Th>Telepon</Th>
                                <Td>{animal.phone}</Td>
                              </Tr>
                            </Table>
                          </Flex>
                        </Box>
                        <TableContainer>
                          <Table>
                            <Tbody>
                              <Tr>
                                <Th>Nama Lokal</Th>
                                <Td>{animal.local_name}</Td>
                              </Tr>
                              <Tr>
                                <Th>Nama Latin</Th>
                                <Td>{animal.latin_name}</Td>
                              </Tr>
                              <Tr>
                                <Th>Habitat</Th>
                                <Td>{animal.habitat}</Td>
                              </Tr>
                              <Tr>
                                <Th>Kota</Th>
                                <Td>{animal.city}</Td>
                              </Tr>
                              <Tr>
                                <Th>Jumlah</Th>
                                <Td>{animal.amount}</Td>
                              </Tr>
                              <Tr>
                                <Th>Koordinat</Th>
                                <Td>
                                  {animal.longitude + ", " + animal.latitude}
                                </Td>
                              </Tr>

                              <Tr>
                                <Th>Dibuat pada</Th>
                                <Td>{formatDate(animal.date)}</Td>
                              </Tr>
                              <Tr>
                                <Th>Diperbarui pada</Th>
                                <Td>
                                  {animal.updated_at == animal.date ? (
                                    <Text as="b">-</Text>
                                  ) : (
                                    formatDate(animal.updated_at)
                                  )}
                                </Td>
                              </Tr>
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            )}{" "}
          </Container>
        </Flex>
      </main>
    </>
  );
}

export default withAuth(RequestDataID);
