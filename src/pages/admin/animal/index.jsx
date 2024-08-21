import { Container, Stack } from "@chakra-ui/react";
import SidebarMenu from "@/component/SidebarMenu";
import { withAuth } from "@/lib/authorization";
import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
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
import { useEffect, useState, useCallback } from "react";
import Loading from "@/component/Loading";
import formatDate from "@/lib/formatDate";
import { CloseIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import debounce from "@/lib/debounce";
import LoadingComponent from "@/component/LoadingComponent";
import formatString from "@/lib/formatString";
import Image from "next/image";

function Animal() {
  return (
    <>
      <main>                            
            <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <HStack
              marginBottom="8"
              marginTop="8"
              justifyContent="space-between"
            >
              <Heading>Admin</Heading>
              <Button
                colorScheme={"teal"}
                py={4}
                onClick={() => router.push("/admin/management/add")}
              >
                Add
              </Button>
            </HStack>
            <TableAnimal />
          </Container>
        </Flex>
      </main>
    </>
  );
}

const TableAnimal = () => {
  const router = useRouter();
  const toast = useToast();
  const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(router.query.page || 1);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [isLoadingComponent, setIsLoadingComponent] = useState(true);

  const fetchAnimals = async () => {
    setIsLoadingComponent(true);
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
      setIsLoadingComponent(false);
      setAnimals(animalsResponse.data);
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Error fetching animals",
        status: "error",
      });
      console.error("Error fetching animals:", error);
      setIsLoading(false);
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

  const debouncedSearch = useCallback(
    debounce((value) => {
      setAnimals([]);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: value, page: 1 },
      });
    }, 1000),
    [router, setAnimals]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  const handlePagination = (newPage) => {
    setPage(newPage);
    setIsLoading(true);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  const debouncedDateStart = useCallback(
    debounce((value) => {
      setAnimals([]);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, date_start: value, page: 1 },
      });
    }, 1000),
    [router, setAnimals]
  );

  const handleDateStartChange = (e) => {
    const value = e.target.value;
    setDateStart(value);
    debouncedDateStart(value);
  };

  const debouncedDateEnd = useCallback(
    debounce((value) => {
      setAnimals([]);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, date_end: value, page: 1 },
      });
    }, 1000),
    [router, setAnimals]
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
          defaultValue={search}
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
            {isLoadingComponent === true ? (
              <Tr>
                <Td colSpan={8}>
                  <LoadingComponent />
                </Td>
              </Tr>
            ) : animals?.values?.length === 0 && !isLoadingComponent ? (
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
              animals.values.length > 0 &&
              animals?.values?.map((animal, index) => (
                <Tr key={animal.id_animal}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <Image
                      borderRadius="18"
                      boxSize="60px"
                      objectFit="cover"
                      width={60}
                      height={60}
                      src={
                        animal.image !== null ? animal.image : "/profile.webp"
                      }
                      alt={animal.latin_name}
                    />
                  </Td>
                  {/* {animal.image} */}
                  <Td>
                    <Text as="b">{animal.latin_name}</Text>
                    <Text>{animal.local_name}</Text>
                  </Td>
                  <Td>
                    <Text as="b">{formatString(animal.habitat, 25)}</Text>
                  </Td>
                  <Td>
                    <Text as="b">{animal.city}</Text>
                  </Td>
                  <Td>
                    <HStack justify={"space-between"}>
                      <Stack>
                        <Text isNumeric>{animal.longitude}</Text>
                        <Text isNumeric>{animal.latitude}</Text>
                      </Stack>
                      <a href={animal.url_google_map} target="_blank">
                        <ExternalLinkIcon />
                      </a>
                    </HStack>
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
                .filter(
                  (pageNumber) =>
                    pageNumber > 0 &&
                    pageNumber <= animals.pagination.total_page
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
              {page < animals.pagination.total_page - 2 && (
                <>
                  {page < animals.pagination.total_page - 3 && <Text>...</Text>}
                  <Button
                    variant="outline"
                    colorScheme="teal"
                    onClick={() =>
                      handlePagination(animals.pagination.total_page)
                    }
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
};

export default withAuth(Animal);
