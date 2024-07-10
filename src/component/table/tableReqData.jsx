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

export function TableReqData() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(router.query.page || 1);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");  
  const [requestDatas, setRequestDatas] = useState([]);
  const toast = useToast();
  const [isLoadingComponent, setIsLoadingComponent] = useState(true);


  const handleDetailClick = (id_request_data) => {
    router.push(`/admin/request/data/${id_request_data}`);
  };  

  const fetchRequest = async () => {
    setIsLoadingComponent(true);
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
      setRequestDatas(reqResponse.data);  
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
      setRequestDatas([]);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: value, page: 1 },
      });
    }, 1000),
    [router, setRequestDatas]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };


  const handlePagination = (newPage) => {
    setPage(newPage);
    setRequestDatas([]); // Clear req when paginating
    setIsloading(true); 
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };


  const debouncedDateStart = useCallback(
    debounce((value) => {
      setRequestDatas([]);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, date_start: value, page: 1 },
      });
    }, 1000),
    [router, setRequestDatas]
  );

  const handleDateStartChange = (e) => {
    const value = e.target.value;
    setDateStart(value);
    debouncedDateStart(value);
  };

  const debouncedDateEnd = useCallback(
    debounce((value) => {
      setRequestDatas([]);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, date_end: value, page: 1 },
      });
    }, 1000),
    [router, setRequestDatas]
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
              <Th>Company</Th>
              <Th>Needs</Th>
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
            ) : requestDatas?.values?.length === 0 && !isLoadingComponent ? (
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
              requestDatas?.values?.map((reqdata, index) => (
                <Tr key={reqdata.id_request_data}>
                  <Td>{index + 1}</Td>
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
            {requestDatas?.pagination?.total_page > 0 ? (
              <>
                <Text as="b">Page {requestDatas?.pagination?.page}</Text>{" "}
                <Text>/ {requestDatas?.pagination?.total_page}</Text>
              </>
            ) : null}
          </HStack>
        </Center>
        <Center>
          {requestDatas?.pagination?.total_page > 0 ? (
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
                    pageNumber > 0 && pageNumber <= requestDatas.pagination.total_page
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
              {page < requestDatas.pagination.total_page - 2 && (
                <>
                  {page < requestDatas.pagination.total_page - 3 && <Text>...</Text>}
                  <Button
                    variant="outline"
                    colorScheme="teal"
                    onClick={() => handlePagination(requestDatas.pagination.total_page)}
                  >
                    {requestDatas.pagination.total_page}
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={() => handlePagination(page + 1)}
                isDisabled={page === requestDatas.pagination.total_page}
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
