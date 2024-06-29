import {
  Alert,
  AlertIcon,
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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loading } from "../Loading";
import formatDate from "@/lib/formatDate";
import { CloseIcon } from "@chakra-ui/icons";

export function TableAnimal() {
  const router = useRouter();
  const toast = useToast();
  const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(router.query.page || 1);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [error, setError] = useState(false);

  let i = 1;

  const fetchAnimals = async () => {
    try {
      const animalsResponse = await axiosInstance.get(`/animals`, {
        params: {
          search: router.query.search,
          page: router.query.page,
          date_start: router.query.date_start,
          date_end: router.query.date_end,
        },
      });
      setIsLoading(false);
      setAnimals(animalsResponse.data);
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
      fetchAnimals();
    }
  }, [
    router.isReady,
    router.query.search,
    router.query.page,
    router.query.date_start,
    router.query.date_end,
  ]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/animal/delete/${id}`);
      toast({
        title: "Animal has been deleted",
        status: "warning",
      });
      fetchAnimals();
    } catch (error) {
      toast({
        title: "Error deleting animal",
        status: "error",
      });
      console.error("Error deleting animal:", error);
    }
  };

  const handleDetail = (id) => {
    router.push(`/admin/animal/${id}`);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setAnimals([]); // Clear animals when searching
    setError(false); // Reset error state when searching
    router.push({
      pathname: router.pathname,
      query: { ...router.query, search: value, page: 1 },
    });
  };

  const handlePagination = (newPage) => {
    setPage(newPage);
    setIsLoading(true); 
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
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th></Th>
              <Th>Name</Th>
              <Th>Habitat</Th>
              <Th>Location</Th>
              <Th>Coordinates</Th>
              <Th>Stored</Th>
              <Th colSpan={2}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {animals?.values?.length === 0 ? (
              <>
                <Tr>
                  <Td colSpan={8} textAlign="center">
                    <Alert status="info">
                      <AlertIcon />
                      No animals found
                    </Alert>
                  </Td>
                </Tr>
              </>
            ) : (
              animals?.values?.map((animal) => (
                <Tr key={animal.id_animal}>
                  <Td>{i++}</Td>
                  <Td>
                    <Image
                      borderRadius="18"
                      boxSize="60px"
                      objectFit="cover"
                      src={animal.image}
                      alt={animal.latin_name}
                    />
                  </Td>
                  <Td>
                    <Text as="b">{animal.latin_name}</Text>
                    <Text>{animal.local_name}</Text>
                  </Td>
                  <Td>
                    <Text as="b">{animal.habitat}</Text>
                  </Td>
                  <Td>
                    <Text as="b">{animal.city}</Text>
                  </Td>
                  <Td>
                    <Text isNumeric>{animal.longitude}</Text>
                    <Text isNumeric>{animal.latitude}</Text>
                  </Td>
                  <Td>
                    <Text as="b">{formatDate(animal.date)}</Text>
                  </Td>
                  <Td>
                    <Center>
                      <Button
                        variant="outline"
                        colorScheme="grey"
                        onClick={() => handleDetail(animal.id_animal)}
                      >
                        <Text as="b">Detail</Text>
                      </Button>
                    </Center>
                    <Center marginTop={1}>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDelete(animal.id_animal)}
                      >
                        Delete
                      </Button>
                    </Center>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
        <Center>
          {animals?.pagination?.total_page > 0 ? (
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
                .filter((pageNumber) => pageNumber > 0 && pageNumber <= animals.pagination.total_page)
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
              {page < animals.pagination.total_page - 2 && (
                <>
                  {page < animals.pagination.total_page - 3 && <Text>...</Text>}
                  <Button
                    variant="outline"
                    colorScheme="teal"
                    onClick={() => handlePagination(animals.pagination.total_page)}
                  >
                    {animals.pagination.total_page}
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={() => handlePagination(page + 1)}
                isDisabled={page === animals.pagination.total_page}
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
