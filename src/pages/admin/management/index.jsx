import Loading from "@/component/Loading";
import LoadingComponent from "@/component/LoadingComponent";
import SidebarMenu from "@/component/SidebarMenu";
import { withAuth } from "@/lib/authorization";
import debounce from "@/lib/debounce";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import formatDate from "@/lib/formatDate";

const AdminManagemet = () => {
  const router = useRouter();
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
            <TableAdmin />
          </Container>
        </Flex>
      </main>
    </>
  );
};

const TableAdmin = () => {
  const router = useRouter();
  const toast = useToast();
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(router.query.page || 1);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [isLoadingComponent, setIsLoadingComponent] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [idAdmin, setIdAdmin] = useState(0);

  const fetchAdmins = async () => {
    setIsLoadingComponent(true);
    try {
      const adminResponse = await axiosInstance.get(`/admins`, {
        params: {
          search: router.query.search,
          page: router.query.page,
          date_start: router.query.date_start,
          date_end: router.query.date_end,
        },
      });
      setIsLoading(false);
      setIsLoadingComponent(false);
      setAdmins(adminResponse.data);
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Error fetching admins",
        status: "error",
      });
      console.error("Error fetching admins:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchAdmins();
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
      const response = await axiosInstance.delete(`/admin/delete/${id}`);
      console.log(response);
      toast({
        title: response?.data?.message || "Success deleting admin",
        status: "info",
      });
      fetchAdmins();
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Error deleting admin",
        status: "error",
      });
      console.error("Error deleting admin:", error);
    }
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setAdmins([]);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: value, page: 1 },
      });
    }, 1000),
    [router, setAdmins]
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
      setAdmins([]);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, date_start: value, page: 1 },
      });
    }, 1000),
    [router, setAdmins]
  );

  const handleDateStartChange = (e) => {
    const value = e.target.value;
    setDateStart(value);
    debouncedDateStart(value);
  };

  const debouncedDateEnd = useCallback(
    debounce((value) => {
      setAdmins([]);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, date_end: value, page: 1 },
      });
    }, 1000),
    [router, setAdmins]
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

  const ModalConfirmation = () => {
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setIdAdmin(0);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Do you want to delete this admin?</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                handleDelete(idAdmin);
              }}
            >
              Yes
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setIsOpen(false);
                setIdAdmin(0);
              }}
            >
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
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
              <Th>Name</Th>
              <Th>Created At</Th>
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
            ) : admins?.values?.length === 0 && !isLoadingComponent ? (
              <>
                <Tr>
                  <Td colSpan={8} textAlign="center">
                    <Alert status="info">
                      <AlertIcon />
                      No admins found
                    </Alert>
                  </Td>
                </Tr>
              </>
            ) : (
              admins.values.length > 0 &&
              admins?.values?.map((admin, index) => (
                <Tr key={admin.id_admin}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <Text as="b">{admin.name}</Text>
                    <Text>{admin.email}</Text>
                  </Td>
                  <Td>
                    <Text as="b">{formatDate(admin.created_at)}</Text>
                  </Td>
                  <Td>
                    <Center>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          setIsOpen(true);
                          setIdAdmin(admin.id_admin);
                        }}
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
          {admins?.pagination?.total_page > 0 ? (
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
                    pageNumber > 0 && pageNumber <= admins.pagination.total_page
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
              {page < admins.pagination.total_page - 2 && (
                <>
                  {page < admins.pagination.total_page - 3 && <Text>...</Text>}
                  <Button
                    variant="outline"
                    colorScheme="teal"
                    onClick={() =>
                      handlePagination(admins.pagination.total_page)
                    }
                  >
                    {admins.pagination.total_page}
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={() => handlePagination(page + 1)}
                isDisabled={page === admins.pagination.total_page}
              >
                <Text as="b">Next</Text>
              </Button>
            </HStack>
          ) : null}
        </Center>
      </TableContainer>
      <ModalConfirmation />
    </>
  );
};

export default withAuth(AdminManagemet);
