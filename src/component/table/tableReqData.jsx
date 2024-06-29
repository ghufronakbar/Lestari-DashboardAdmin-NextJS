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
import { useEffect, useState } from "react";
import { Loading } from "../Loading";
import { CloseIcon } from "@chakra-ui/icons";

export function TableReqData() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(router.query.page || 1);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [error, setError] = useState(false);
  const [req, setReq] = useState([]);
  const toast = useToast();

  const handleDetailClick = (id_request_data) => {
    router.push(`/admin/request/data/${id_request_data}`);
  };

  let i = 1;

  const fetchRequest = async () => {
    try {
      const reqResponse = await axiosInstance.get(`/request/datas`, {
        params: {
          search: router.query.search,
          page: router.query.page,
          date_start: router.query.date_start,
          date_end: router.query.date_end,
          apporove: router.query.aprove,
        },
      });
      setIsLoading(false);
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
    setReq([]); // Clear req when paginating
    setIsloading(true); 
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  const handleDateStartChange = (e) => {
    const value = e.target.value;
    setDateStart(value);
    setError(false); // Reset error state when date changes
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
    setError(false); // Reset error state when date changes
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
              <Th>Company</Th>
              <Th>Needs</Th>
              <Th>Status</Th>
              <Th>Date</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {req?.values?.length === 0 ? (
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
              req?.values?.map((reqdata) => (
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
              ))
            )}
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
