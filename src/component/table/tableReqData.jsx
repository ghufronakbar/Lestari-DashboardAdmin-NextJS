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

export function tableReqData() {
  const router = useRouter();
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
    router.push(`/admin/request/data/${id_request_data}`);
  };

  let i = 1;
  const { data, refetch: refetchData } = useQuery({
    queryFn: async () => {
      const animalsResponse = await axiosInstance.get("/request/datas");
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
            <Th>Company</Th>
            <Th>Needs</Th>
            <Th>Status</Th>
            <Th>Date</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.data.values.map((reqdata) => (
            <Tr key={reqdata.id_request_data}>
              <Td>{i++}</Td>
              <Td>
                <Text as="b">{reqdata.name}</Text>
                <Text>{reqdata.email}</Text>
              </Td>
              <Td>
                <Text as="b">{reqdata.profession}</Text>
                <Text>{reqdata.instances}</Text>
              </Td>
              <Td>
                <Text as="b">{reqdata.subject}</Text>
              </Td>
              <Td>
                <Center>
                  <Text as="b">
                    <Td>
                      <Center>
                        <Text as="b">
                          {reqdata.approve == 0 && (
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
                          {reqdata.approve == 1 && (
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
                          {reqdata.approve == 2 && (
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
                <Text as="b">{formatDate(reqdata.date)}</Text>
              </Td>
              <Td>
                <Button
                  variant="outline"
                  colorScheme="grey"
                  onClick={() => handleDetailClick(reqdata.id_request_data)}
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
