import {
  Box,
  Button,
  Center,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export function tableReqAccount() {
  const router = useRouter()
  function formatDate(dateString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  const handleDetailClick = (id_request_data) => {
    router.push(`/admin/request/account/${id_request_data}`);
  };
  let i = 1;
  const { data, refetch: refetchData } = useQuery({
    queryFn: async () => {
      const animalsResponse = await axiosInstance.get("/request/accounts");
      return animalsResponse;
    },
  });

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>User</Th>
            <Th>Organization</Th>
            <Th>Phone</Th>
            <Th>Status</Th>
            <Th>Date</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.data.values.map((reqacc) => (
            <Tr key={reqacc.id_request_account}>
              <Td>{i++}</Td>
              <Td>
                <Text as="b">{reqacc.name}</Text>
                <Text>{reqacc.email}</Text>
              </Td>
              <Td>
                <Text as="b">{reqacc.profession}</Text>
                <Text>{reqacc.instances}</Text>
              </Td>
              <Td>
                <Text as="b">{reqacc.phone}</Text>
              </Td>
              <Td>
                <Center>
                  <Text as="b">
                    <Td>
                      <Center>
                        <Text as="b">
                          {reqacc.approve == 0 && (
                            <Box
                              as="button"
                              borderRadius="md"
                              bg="#CBD5E0"
                              color="white"
                              px={4}
                              h={8}
                            >
                              Pending
                            </Box>
                          )}
                          {reqacc.approve == 1 && (
                            <Box
                              as="button"
                              borderRadius="md"
                              bg="#E53E3E"
                              color="white"
                              px={4}
                              h={8}
                            >
                              Rejected
                            </Box>
                          )}
                          {reqacc.approve == 2 && (
                            <Box
                              as="button"
                              borderRadius="md"
                              bg="#48BB78"
                              color="white"
                              px={4}
                              h={8}
                            >
                              Approved
                            </Box>
                          )}
                        </Text>
                      </Center>
                    </Td>
                  </Text>
                </Center>
              </Td>
              <Td>
                <Text as="b">{formatDate(reqacc.date)}</Text>
              </Td>
              <Td>
              <Button
                  variant="outline"
                  colorScheme="grey"
                  onClick={() => handleDetailClick(reqacc.id_request_account)}
                >
                  <Text as="b">Detail</Text>
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
