import { Container, Flex, Heading } from "@chakra-ui/react";
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
import Loading from "@/component/Loading";
import { CloseIcon } from "@chakra-ui/icons";
import debounce from "@/lib/debounce";
import LoadingComponent from "@/component/LoadingComponent";

function RequestAccount() {
  return (
    <>      
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              Permintaan Akun
            </Heading>
            <TableReqAccount />
          </Container>
        </Flex>
      </main>
    </>
  );
}

const TableReqAccount = () => {  
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
          approve: router.query.approve,
        },
      });
      setIsLoading(false);
      setRequestAccounts(reqResponse.data);     
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
    setRequestAccounts([]); // Kosongkan data permintaan saat paginasi
    setIsLoading(true); 
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
              <Th>Organisasi</Th>
              <Th>Telepon</Th>
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
            ) : requestAccounts?.values?.length === 0 && !isLoadingComponent ? (
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
                                  Tertunda
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
                                  Ditolak
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
                <Text as="b">Halaman {requestAccounts?.pagination?.page}</Text>{" "}
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
                <Text as="b">Berikutnya</Text>
              </Button>
            </HStack>
          ) : null}
        </Center>
      </TableContainer>
    </>
  );
}

export default withAuth(RequestAccount);
