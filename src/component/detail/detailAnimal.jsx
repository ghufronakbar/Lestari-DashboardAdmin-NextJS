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
  Flex,
  Text,
  useToast,
  Spacer,
  Heading,
  TableContainer,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  HStack,
  VStack,
  Tab,
  TableCaption,
} from "@chakra-ui/react";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { baseURL } from "@/lib/baseUrl";

export function DetailAnimal() {
  const router = useRouter();
  const { id } = router.query;
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqDataResponse = await axiosInstance.get(`/animal/${id}`);
        setAnimal(reqDataResponse.data.values[0]);
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

  function formatDate(dateString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <>
      {animal && (
        <Box>
          <Flex marginTop={8}>
            <Box flex={5} mt={4}>
              <Center>
                <Image
                  borderRadius="18"
                  objectFit="cover"
                  src={animal.image}
                  alt={animal.latin_name}
                />
              </Center>

              <Text mt={4}>{animal.description}</Text>
            </Box>
            <Spacer />
            <Box flex={4} mt={4}>
              <Box p={8} borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Box>
                  <Box
                    p={8}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Text as="b">AUTHOR</Text>
                    <Flex mt={4}>
                      <Image
                        borderRadius="18"
                        boxSize="60px"
                        objectFit="cover"
                        src={animal.user_picture}
                        alt={animal.name}
                      />

                      <Table>
                        <Tr>
                          <Th>Name</Th>
                          <Td>{animal.name}</Td>
                        </Tr>
                        <Tr>
                          <Th>Email</Th>
                          <Td>{animal.email}</Td>
                        </Tr>
                        <Tr>
                          <Th>Phone</Th>
                          <Td>{animal.phone}</Td>
                        </Tr>
                      </Table>
                    </Flex>
                  </Box>
                  <TableContainer>
                    <Table>
                      <Tbody>
                        <Tr>
                          <Th>Local Name</Th>
                          <Td>{animal.local_name}</Td>
                        </Tr>
                        <Tr>
                          <Th>Latin Name</Th>
                          <Td>{animal.latin_name}</Td>
                        </Tr>
                        <Tr>
                          <Th>Habitat</Th>
                          <Td>{animal.habitat}</Td>
                        </Tr>
                        <Tr>
                          <Th>City</Th>
                          <Td>{animal.city}</Td>
                        </Tr>
                        <Tr>
                          <Th>Amount</Th>
                          <Td>{animal.amount}</Td>
                        </Tr>
                        <Tr>
                          <Th>Coordinates</Th>
                          <Td>{animal.longitude + ", " + animal.latitude}</Td>
                        </Tr>

                        <Tr>
                          <Th>Created at</Th>
                          <Td>{formatDate(animal.date)}</Td>
                        </Tr>
                        <Tr>
                          <Th>Updated at</Th>
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
      )}
    </>
  );
}
