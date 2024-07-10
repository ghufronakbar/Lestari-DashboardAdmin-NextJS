import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Flex,
  HStack,
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
  useToast,
} from "@chakra-ui/react";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import formatDate from "@/lib/formatDate";
import { useCallback, useEffect, useState } from "react";
import { Loading } from "../Loading";
import { CloseIcon } from "@chakra-ui/icons";
import debounce from "@/lib/debounce";
import { LoadingComponent } from "../LoadingComponent";

export function TableReqAccount() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(router.query.page || 1);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [requestAccounts, setRequestAccounts] = useState([]);
  const toast = useToast();
  const [isLoadingComponent, setIsLoadingComponent] = useState(true);


  const handleDetailClick = (id_request_data) => {
    router.push(`/admin/request/account/${id_request_data}`);
  };

  const fetchRequest = async () => {
    try {
      setIsLoadingComponent(true);
      const reqResponse = await axiosInstance.get(`/request/accounts`, {
        params: {
          search: router.query.search,
          page: router.query.page,
          date_start: router.query.date_start,
          date_end: router.query.date_end,
          apporove: router.query.aprove,
        },
      });
      setIsLoading(false);
      setRequestAccounts(reqResponse.data);     
      setIsLoadingComponent(false); 
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Error fetching req",
        status: "error",
      });
      console.error("Error fetching req:", error);
      setIsLoading(false);      
    }
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setRequestAccounts([]);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: value, page: 1 },
      });
    }, 1000),
    [router, setRequestAccounts]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };


  const handlePagination = (newPage) => {
    setPage(newPage);
    setRequestAccounts([]); // Clear req when paginating
    setIsloading(true); 
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  
  const debouncedDateStart = useCallback(
    debounce((value) => {
      setRequestAccounts([]);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, date_start: value, page: 1 },
      });
    }, 1000),
    [router, setRequestAccounts]
  );

  const handleDateStartChange = (e) => {
    const value = e.target.value;
    setDateStart(value);
    debouncedDateStart(value);
  };

  const debouncedDateEnd = useCallback(
    debounce((value) => {
      setRequestAccounts([]);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, date_end: value, page: 1 },
      });
    }, 1000),
    [router, setRequestAccounts]
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
              <Th>Organization</Th>
              <Th>Phone</Th>
              <Th>Status</Th>
              <Th>Date</Th>
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
            ) : requestAccounts?.values?.length === 0 && !isLoadingComponent ? (
              <>
                <Tr>
                  <Td colSpan={8} textAlign="center">
                    <Alert status="info">
                      <AlertIcon />
                      No request found
                    </Alert>
                  </Td>
                </Tr>
              </>
            ) : (
              requestAccounts?.values?.map((reqacc, index) => (
                <Tr key={reqacc.id_request_account}>
                  <Td>{index + 1}</Td>
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
                      onClick={() =>
                        handleDetailClick(reqacc.id_request_account)
                      }
                    >
                      <Text as="b">Detail</Text>
                    </Button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
        <Center>
          <HStack mt={4}>
            {requestAccounts?.pagination?.total_page > 0 ? (
              <>
                <Text as="b">Page {requestAccounts?.pagination?.page}</Text>{" "}
                <Text>/ {requestAccounts?.pagination?.total_page}</Text>
              </>
            ) : null}
          </HStack>
        </Center>
        <Center>
          {requestAccounts?.pagination?.total_page > 0 ? (
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
                    pageNumber > 0 && pageNumber <= requestAccounts.pagination.total_page
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
              {page < requestAccounts.pagination.total_page - 2 && (
                <>
                  {page < requestAccounts.pagination.total_page - 3 && <Text>...</Text>}
                  <Button
                    variant="outline"
                    colorScheme="teal"
                    onClick={() => handlePagination(requestAccounts.pagination.total_page)}
                  >
                    {requestAccounts.pagination.total_page}
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={() => handlePagination(page + 1)}
                isDisabled={page === requestAccounts.pagination.total_page}
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
