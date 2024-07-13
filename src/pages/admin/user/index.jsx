import { Container, Heading, Flex } from "@chakra-ui/react";
import SidebarMenu from "@/component/SidebarMenu";
import { withAuth } from "@/lib/authorization";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,  
  HStack,  
  Input,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
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
import { useState, useEffect, useCallback } from "react";
import { baseURL } from "@/lib/baseUrl";
import  Loading  from "@/component/Loading";
import formatDate from "@/lib/formatDate";
import { useRouter } from "next/router";
import debounce from "@/lib/debounce";
import LoadingComponent from "@/component/LoadingComponent";
import Image from "next/image";

const User = () => {
  return (
    <>      
      <main>
        <Flex>
          <SidebarMenu flex={1} />{" "}
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              User
            </Heading>
            <TableUser />
          </Container>
        </Flex>
      </main>
    </>
  );
};

const TableUser = () => {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsloading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(router.query.page || 1);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoadingComponent, setIsLoadingComponent] = useState(true);
  const [disabled, setDisabled] = useState(false);

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

  const fetchRequest = async () => {
    setIsLoadingComponent(true);
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
      setUsers(reqResponse.data);
      setIsLoadingComponent(false);
      setDisabled(false);
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Error fetching req",
        status: "error",
      });
      console.error("Error fetching req:", error);
      setIsloading(false);
    }
  };
  const debouncedSearch = useCallback(
    debounce((value) => {
      setUsers([]);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: value, page: 1 },
      });
    }, 1000),
    [router, setUsers]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  const handlePagination = (newPage) => {
    setPage(newPage);
    setIsloading(true);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  const debouncedDateStart = useCallback(
    debounce((value) => {
      setUsers([]);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, date_start: value, page: 1 },
      });
    }, 1000),
    [router, setUsers]
  );

  const handleDateStartChange = (e) => {
    const value = e.target.value;
    setDateStart(value);
    debouncedDateStart(value);
  };

  const debouncedDateEnd = useCallback(
    debounce((value) => {
      setUsers([]);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, date_end: value, page: 1 },
      });
    }, 1000),
    [router, setUsers]
  );

  const handleDateEndChange = (e) => {
    const value = e.target.value;
    setDateEnd(value);
    debouncedDateEnd(value);
  };

  const handleDeleteFilter = () => {
    setSearch("");
    setDateStart("");
    setDateEnd("");
    router.push({
      pathname: router.pathname,
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
          focus={true}
          autoFocus
        />
        <Input type="date" value={dateStart} onChange={handleDateStartChange} />
        <Input type="date" value={dateEnd} onChange={handleDateEndChange} />
        <Button bg="red">
          <CloseIcon color="white" onClick={() => handleDeleteFilter()} />
        </Button>
      </Flex>
      <TableContainer>
        <Table size={"sm"}>
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
            {isLoadingComponent === true ? (
              <Tr>
                <Td colSpan={8}>
                  <LoadingComponent />
                </Td>
              </Tr>
            ) : users?.values?.length === 0 && !isLoadingComponent ? (
              <>
                <Tr>
                  <Td colSpan={8} textAlign="center">
                    <Alert status="info">
                      <AlertIcon />
                      No user found
                    </Alert>
                  </Td>
                </Tr>
              </>
            ) : (
              users.values.map((user, index) => (
                <Tr key={user.id_user}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <Image
                      borderRadius="18"
                      boxSize="60px"
                      objectFit="cover"
                      width={60}
                      height={60}                      
                      src={user.picture !== null ? user.picture : "/profile.webp"}
                      alt={user?.name}
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
                          onClick={() => {
                            suspendHandle(user.id_user);
                            setDisabled(true);
                          }}
                          disabled={disabled}
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
                          onClick={() => {
                            unsuspendHandle(user.id_user);
                            setDisabled(true);
                          }}
                          disabled={disabled}
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
              ))
            )}
          </Tbody>
        </Table>
        <Center>
          <HStack mt={4}>
            {users?.pagination?.total_page > 0 ? (
              <>
                <Text as="b">Page {users?.pagination?.page}</Text>{" "}
                <Text>/ {users?.pagination?.total_page}</Text>
              </>
            ) : null}
          </HStack>
        </Center>
        <Center>
          {users?.pagination?.total_page > 0 ? (
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
                    pageNumber > 0 && pageNumber <= users.pagination.total_page
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
              {page < users.pagination.total_page - 2 && (
                <>
                  {page < users.pagination.total_page - 3 && <Text>...</Text>}
                  <Button
                    variant="outline"
                    colorScheme="teal"
                    onClick={() =>
                      handlePagination(users.pagination.total_page)
                    }
                  >
                    {users.pagination.total_page}
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={() => handlePagination(page + 1)}
                isDisabled={page === users.pagination.total_page}
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


export default withAuth(User);
