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
import { Loading } from "../Loading";
import { useEffect, useState } from "react";
import formatDate from "@/lib/formatDate";
import { CloseIcon } from "@chakra-ui/icons";

export function TableHistory() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(router.query.page || 1);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [error, setError] = useState(false);
  const [history, setHistory] = useState([]);
  const toast = useToast();

  const handleDetailClick = (id_request_data) => {
    router.push(`/admin/history/${id_request_data}`);
  };

  let i = 1;

  const fetchHistory = async () => {
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
      setHistory(historyResponse.data);
      setError(false); // Reset error state if fetch is successful
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Error fetching animals",
        status: "error",
      });
      console.error("Error fetching animals:", error);
      setIsLoading(false);
      setError(true);
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
    setHistory([]); // Clear animals when paginating
    setError(false); // Reset error state when paginating
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

              <Th>Date</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {history?.values?.length === 0 ? (
              <>
                <Tr>
                  <Td colSpan={8} textAlign="center">
                    <Alert status="info">
                      <AlertIcon />
                      No history found
                    </Alert>
                  </Td>
                </Tr>
              </>
            ) : (
              history?.values?.map((reqdata) => (
                <Tr key={reqdata.id_history_request_data}>
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
            {history?.pagination?.total_page > 0 ? (
              <>
                <Text as="b">Page {history?.pagination?.page}</Text>{" "}
                <Text>/ {history?.pagination?.total_page}</Text>
              </>
            ) : null}
          </HStack>
        </Center>
        <Center>
          {history?.pagination?.total_page > 0 ? (
            <HStack mt={4}>
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={() => handlePagination(page - 1)}
                isDisabled={page === 1}
              >
                <Text as="b">Previous</Text>
              </Button>
              {Array.from(
                { length: history?.pagination?.total_page },
                (_, index) => (
                  <Button
                    variant={page === index + 1 ? "solid" : "outline"}
                    colorScheme="teal"
                    onClick={() => handlePagination(index + 1)}
                    key={index}
                  >
                    {index + 1}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={() => handlePagination(page + 1)}
                isDisabled={page === history?.pagination?.total_page}
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
