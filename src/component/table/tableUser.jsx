import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import {
  CloseIcon,
  LockIcon,
  UnlockIcon,
  WarningIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { baseURL } from "@/lib/baseUrl";
import { Loading } from "../Loading";
import formatDate from "@/lib/formatDate";
import { useRouter } from "next/router";

export function TableUser() {
  const router = useRouter();
  const [user, setRequestData] = useState(null);
  const toast = useToast();
  const [isLoading, setIsloading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(router.query.page || 1);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [error, setError] = useState(false);
  const [req, setReq] = useState([]);

  const suspendHandle = async (id) => {
    try {
      await axiosInstance.put(`/user/suspend`, { status: 0, id });
      toast({
        title: "User has been suspended",
        status: "warning",
      });
      fetchRequest();
    } catch (error) {
      console.error("Error suspending user:", error);
    }
  };

  const unsuspendHandle = async (id) => {
    try {
      const response = await axiosInstance.put(`/user/suspend`, {
        status: 1,
        id,
      });
      console.log(response);
      toast({
        title: "User has been activated",
        status: "success",
      });
      fetchRequest();
    } catch (error) {
      console.error("Error activating user:", error);
    }
  };

  let i = 1;

  const fetchRequest = async () => {
    try {
      const reqResponse = await axiosInstance.get(`/users`, {
        params: {
          search: router.query.search,
          page: router.query.page,
          date_start: router.query.date_start,
          date_end: router.query.date_end,
          apporove: router.query.aprove,
        },
      });
      setIsloading(false);
      setReq(reqResponse.data);
      setError(false); // Reset error state if fetch is successful
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Error fetching req",
        status: "error",
      });
      console.error("Error fetching req:", error);
      setIsLoading(false);
      setError(true);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setError(false); // Reset error state when searching
    router.push({
      pathname: router.pathname,
      query: { ...router.query, search: value, page: 1 },
    });
  };

  const handlePagination = (newPage) => {
    setPage(newPage);
    setIsloading(true); 
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  const handleDateStartChange = (e) => {
    const value = e.target.value;
    setDateStart(value);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, date_start: value, page: 1 },
    });
  };

  const handleDeleteFilter = () => {
    setSearch("");
    setDateStart("");
    setDateEnd("");
    router.push({
      pathname: router.pathname,
    });
  };

  const handleDateEndChange = (e) => {
    const value = e.target.value;
    setDateEnd(value);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, date_end: value, page: 1 },
    });
  };

  useEffect(() => {
    if (router.isReady) {
      fetchRequest();
    }
  }, [
    router.isReady,
    router.query.search,
    router.query.page,
    router.query.date_start,
    router.query.date_end,
    router.query.aprove,
  ]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Flex gap={4} my={4}>
        <Input
          value={search}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <Input type="date" value={dateStart} onChange={handleDateStartChange} />
        <Input type="date" value={dateEnd} onChange={handleDateEndChange} />
        <Button bg="red">
          <CloseIcon color="white" onClick={() => handleDeleteFilter()} />
        </Button>
      </Flex>
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
            {req.values.map((user) => (
              <Tr key={user.id_user}>
                <Td>{i++}</Td>
                <Td>
                  <Image
                    borderRadius="18"
                    boxSize="60px"
                    objectFit="cover"
                    src={user.picture}
                    alt={user.name}
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
                      <Box
                        as="button"
                        onClick={() => suspendHandle(user.id_user)}
                      >
                        <Center>
                          <WarningIcon />
                        </Center>
                        <Center>
                          <Text>Suspend</Text>
                        </Center>
                      </Box>
                    ) : (
                      <Box
                        as="button"
                        onClick={() => unsuspendHandle(user.id_user)}
                      >
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
        <Center>
          <HStack mt={4}>
            {req?.pagination?.total_page > 0 ? (
              <>
                <Text as="b">Page {req?.pagination?.page}</Text>{" "}
                <Text>/ {req?.pagination?.total_page}</Text>
              </>
            ) : null}
          </HStack>
        </Center>
        <Center>
          {req?.pagination?.total_page > 0 ? (
            <HStack mt={4}>
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={() => handlePagination(page - 1)}
                isDisabled={page === 1}
              >
                <Text as="b">Previous</Text>
              </Button>
              {page > 3 && (
                <>
                  <Button
                    variant="outline"
                    colorScheme="teal"
                    onClick={() => handlePagination(1)}
                  >
                    1
                  </Button>
                  {page > 4 && <Text>...</Text>}
                </>
              )}
              {Array.from({ length: 5 }, (_, index) => page - 2 + index)
                .filter(
                  (pageNumber) =>
                    pageNumber > 0 && pageNumber <= req.pagination.total_page
                )
                .map((pageNumber) => (
                  <Button
                    key={pageNumber}
                    variant={page === pageNumber ? "solid" : "outline"}
                    colorScheme="teal"
                    onClick={() => handlePagination(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                ))}
              {page < req.pagination.total_page - 2 && (
                <>
                  {page < req.pagination.total_page - 3 && <Text>...</Text>}
                  <Button
                    variant="outline"
                    colorScheme="teal"
                    onClick={() => handlePagination(req.pagination.total_page)}
                  >
                    {req.pagination.total_page}
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={() => handlePagination(page + 1)}
                isDisabled={page === req.pagination.total_page}
              >
                <Text as="b">Next</Text>
              </Button>
            </HStack>
          ) : null}
        </Center>
      </TableContainer>
    </>
  );
}
