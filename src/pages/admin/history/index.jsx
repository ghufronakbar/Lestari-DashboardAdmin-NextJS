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
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Loading from "@/component/Loading";
import LoadingComponent from "@/component/LoadingComponent";
import { useCallback, useEffect, useState } from "react";
import formatDate from "@/lib/formatDate";
import { CloseIcon } from "@chakra-ui/icons";
import debounce from "@/lib/debounce";

function HistoryData() {
  return (
    <>
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              Riwayat
            </Heading>
            <TableHistory />
          </Container>
        </Flex>
      </main>
    </>
  );
}
const TableHistory = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(router.query.page || 1);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [histories, setHistories] = useState([]);
  const toast = useToast();
  const [isLoadingComponent, setIsLoadingComponent] = useState(true);

  const handleDetailClick = (id_request_data) => {
    router.push(`/admin/history/${id_request_data}`);
  };

  const fetchHistory = async () => {
    setIsLoadingComponent(true);
    try {
      const historyResponse = await axiosInstance.get(`/history/request/data`, {
        params: {
          search: router.query.search,
          page: router.query.page,
          date_start: router.query.date_start,
          date_end: router.query.date_end,
        },
      });
      setIsLoading(false);
      setHistories(historyResponse.data);
      setIsLoadingComponent(false);
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Gagal memuat riwayat",
        status: "error",
      });
      console.error("Gagal memuat riwayat:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchHistory();
    }
  }, [
    router.isReady,
    router.query.search,
    router.query.page,
    router.query.date_start,
    router.query.date_end,
  ]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setHistories([]);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: value, page: 1 },
      });
    }, 1000),
    [router, setHistories]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  const handlePagination = (newPage) => {
    setPage(newPage);
    setHistories([]);
    setIsLoading(true);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  const debouncedDateStart = useCallback(
    debounce((value) => {
      setHistories([]);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, date_start: value, page: 1 },
      });
    }, 1000),
    [router, setHistories]
  );

  const handleDateStartChange = (e) => {
    const value = e.target.value;
    setDateStart(value);
    debouncedDateStart(value);
  };

  const debouncedDateEnd = useCallback(
    debounce((value) => {
      setHistories([]);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, date_end: value, page: 1 },
      });
    }, 1000),
    [router, setHistories]
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
            ) : histories?.values?.length === 0 && !isLoadingComponent ? (
              <>
                <Tr>
                  <Td colSpan={8} textAlign="center">
                    <Alert status="info">
                      <AlertIcon />
                      Tidak ada riwayat ditemukan
                    </Alert>
                  </Td>
                </Tr>
              </>
            ) : (
              histories?.values?.map((reqdata, index) => (
                <Tr key={reqdata.id_history_request_data}>
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
                    <Text as="b">{formatDate(reqdata.date)}</Text>
                  </Td>
                  <Td>
                    <Button
                      variant="outline"
                      colorScheme="grey"
                      onClick={() =>
                        handleDetailClick(reqdata.id_history_request_data)
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
            {histories?.pagination?.total_page > 0 ? (
              <>
                <Text as="b">Halaman {histories?.pagination?.page}</Text>{" "}
                <Text>/ {histories?.pagination?.total_page}</Text>
              </>
            ) : null}
          </HStack>
        </Center>
        <Center>
          {histories?.pagination?.total_page > 0 ? (
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
                    pageNumber > 0 &&
                    pageNumber <= histories.pagination.total_page
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
              {page < histories.pagination.total_page - 2 && (
                <>
                  {page < histories.pagination.total_page - 3 && (
                    <Text>...</Text>
                  )}
                  <Button
                    variant="outline"
                    colorScheme="teal"
                    onClick={() =>
                      handlePagination(histories.pagination.total_page)
                    }
                  >
                    {histories.pagination.total_page}
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={() => handlePagination(page + 1)}
                isDisabled={page === histories.pagination.total_page}
              >
                <Text as="b">Berikutnya</Text>
              </Button>
            </HStack>
          ) : null}
        </Center>
      </TableContainer>
    </>
  );
};

export default withAuth(HistoryData);
