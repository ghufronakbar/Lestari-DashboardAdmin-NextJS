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
import { useRouter } from "next/router";
import formatDate from "@/lib/formatDate";
import { useCallback, useEffect, useState } from "react";
import  Loading  from "@/component/Loading";
import { CloseIcon } from "@chakra-ui/icons";
import debounce from "@/lib/debounce";
import  LoadingComponent  from "@/component/LoadingComponent";

function RequestData() {
  return (
    <>      
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              Permintaan Data
            </Heading>
            <TableReqData />
          </Container>
        </Flex>
      </main>
    </>
  );
}

const TableReqData = () => {
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
          approve: router.query.approve,
        },
      });
      setIsLoading(false);
      setRequestDatas(reqResponse.data);  
      setIsLoadingComponent(false);    
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Gagal memuat data permintaan",
        status: "error",
      });
      console.error("Gagal memuat data permintaan:", error);
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
    setRequestDatas([]); // Kosongkan permintaan saat paginasi
    setIsLoading(true); 
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
    router.query.approve,
  ]);

  if (isLoading) return <Loading />;
  return (
    <>
      <Flex gap={4} my={4}>
        <Input
          value={search}
          onChange={handleSearchChange}
          placeholder="Cari..."
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
              <Th>Pengguna</Th>
              <Th>Perusahaan</Th>
              <Th>Kebutuhan</Th>
              <Th>Status</Th>
              <Th>Tanggal</Th>
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
                      Tidak ada permintaan ditemukan
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
                                  Tertunda
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
                                  Ditolak
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
                                  Disetujui
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
                <Text as="b">Halaman {requestDatas?.pagination?.page}</Text>{" "}
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
                <Text as="b">Sebelumnya</Text>
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
                <Text as="b">Berikutnya</Text>
              </Button>
            </HStack>
          ) : null}
        </Center>
      </TableContainer>
    </>
  );
}

export default withAuth(RequestData);
