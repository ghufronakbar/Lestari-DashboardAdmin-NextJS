import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast
} from "@chakra-ui/react";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import {
  LockIcon,
  UnlockIcon,
  WarningIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { baseURL } from "@/lib/baseUrl";

export function tableUser() {
  const [user, setRequestData] = useState(null);
  const toast = useToast()
  function formatDate(dateString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  const suspendHandle = async (id) => {
    try {
      await axiosInstance.put(`/user/suspend`, { status: 0, id });
      
      toast({
        title: "User has been suspended",
        status: "warning",
      });
      refetchData();
    } catch (error) {
      console.error("Error suspending user:", error);
    }
  };

  const unsuspendHandle = async (id) => {
    try {
      await axiosInstance.put(`/user/suspend`, { status: 1, id});
      
      toast({
        title: "User has been activated",
        status: "success",
      });
      refetchData();
      
    } catch (error) {
      console.error("Error activating user:", error);
    }    
  };

  let i = 1;
  const { data, refetch: refetchData } = useQuery({
    queryFn: async () => {
      const animalsResponse = await axiosInstance.get("/users");
      return animalsResponse;
    },
    refetchOnWindowFocus: true, 
  });

  useEffect(() => {
    if (user !== null) {
      refetchData();
    }
  }, [user, refetchData]);

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>User</Th>
            <Th></Th>
            <Th>Phone</Th>
            <Th>Status</Th>
            <Th rowSpan={2}>Registered & Updated At</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.data.values.map((user) => (
            <Tr key={user.id_user}>
              <Td>{i++}</Td>
              <Td>
                <Image
                  borderRadius="18"
                  boxSize="60px"
                  objectFit="cover"
                  src={baseURL+user.picture}
                  alt={user.picture}
                />
              </Td>
              <Td>
                <Text as="b">{user.name}</Text>
                <Text>{user.email}</Text>
              </Td>
              <Td>
                <Text as="b">{user.phone}</Text>
              </Td>
              <Td>
                <Center>
                  <Text as="b">
                    
                    {user.status == 1 ? (
                      <Box
                        as="button"
                        borderRadius="md"
                        bg="#48BB78"
                        color="white"
                        px={4}
                        h={8}
                      >
                        Active
                      </Box>
                    ) : (
                      <Box
                        as="button"
                        borderRadius="md"
                        bg="#E53E3E"
                        color="white"
                        px={4}
                        h={8}
                      >
                        Suspended
                      </Box>
                    )}
                    
                    
                  </Text>
                </Center>
              </Td>
              <Td>
                <Text as="b">{formatDate(user.created_at)}</Text>
                <Text>{formatDate(user.updated_at)}</Text>
              </Td>
              <Td>
                <Center>
                  {user.status == 1 ? (
                    <Box as="button" onClick={() => suspendHandle(user.id_user)}>
                      <Center>
                        <WarningIcon />
                      </Center>
                      <Center>
                        <Text>Suspend</Text>
                      </Center>
                    </Box>
                  ) : (
                    <Box as="button" onClick={() => unsuspendHandle(user.id_user)}>
                      <Center>
                        <UnlockIcon />
                      </Center>
                      <Center>
                        <Text>Unsuspend</Text>
                      </Center>
                    </Box>
                  )}
                </Center>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
