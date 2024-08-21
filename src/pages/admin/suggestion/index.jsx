import { Container, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
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
import { AddIcon, CloseIcon, PlusSquareIcon } from "@chakra-ui/icons";
import debounce from "@/lib/debounce";
import LoadingComponent from "@/component/LoadingComponent";


function Suggestion() {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isRefetch, setIsRefetch] = useState(false);
    const toast = useToast();
    const [dataSuggest, setDataSuggest] = useState({
      localName: "",
      latinName: "",
    })
    const handleAdd = async () => {
        try {
            const response = await axiosInstance.post("/admin/suggestions",{local_name: dataSuggest.localName, latin_name: dataSuggest.latinName} );
            toast({
                title: "Suggestion added successfully",
                status: "success",
                isClosable: true,
            })
            setIsAddOpen(false);
            setDataSuggest({
                localName: "",
                latinName: "",
            })
            setIsRefetch(true);
        } catch (error) {
            console.log(error);
            toast({
                title: error.response.data.message || "Failed to add suggestion",                
                status: "error",                
                isClosable: true,
            })            
        }
    }
  return (
    <>
      <main>
        <Flex>
          <SidebarMenu flex={1} />{" "}
          <Container maxW="80%">            
            <Heading marginBottom="8" marginTop="8">
              Suggestion
            </Heading>
            <Button colorScheme={"teal"} leftIcon={<AddIcon />} onClick={() => setIsAddOpen(true)}>Add</Button>
            <ModalAddSuggestion isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} dataSuggest={dataSuggest} setDataSuggest={setDataSuggest} onSubmit={handleAdd} />
            <TableSuggestion refetch={isRefetch} afterRefetch={() => setIsRefetch(false)} />
          </Container>
        </Flex>
      </main>
    </>
  );
}

const ModalAddSuggestion = ({ isOpen, onClose, dataSuggest, setDataSuggest, onSubmit }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Suggestion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
            <FormLabel>Local Name</FormLabel>
            <Input
              placeholder="Local Name"              
              value={dataSuggest.localName}
              onChange={(e) => setDataSuggest({ ...dataSuggest, localName: e.target.value })}
            />
            </FormControl>
            <FormControl mt={4}>
            <FormLabel>Latin Name</FormLabel>
            <Input
              placeholder="Latin Name"
              value={dataSuggest.englishName}
              onChange={(e) => setDataSuggest({ ...dataSuggest, latinName: e.target.value })}
            />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={onClose}              
            >
              Close
            </Button>
            <Button
              colorScheme="teal"
              mr={3}              
              onClick={onSubmit}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const TableSuggestion = ({refetch, afterRefetch}) => {
  const router = useRouter();
  const toast = useToast();
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(router.query.page || 1);  
  const [isLoadingComponent, setIsLoadingComponent] = useState(true);

  const fetchSuggestions = async () => {
    setIsLoadingComponent(true);
    try {
      const suggestionsResponse = await axiosInstance.get(`/admin/suggestions`, {
        params: {
          search: router.query.search,
          page: router.query.page,          
        },
      });
      setIsLoading(false);
      setIsLoadingComponent(false);
      setSuggestions(suggestionsResponse.data);
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Error fetching suggestions",
        status: "error",
      });
      console.error("Error fetching suggestions:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchSuggestions();
    }
  }, [
    router.isReady,
    router.query.search,
    router.query.page,    
  ]);

  useEffect(() => {
    if (refetch) {
      fetchSuggestions();
      afterRefetch();
    }
  }, [refetch]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/admin/suggestions/${id}`);
      toast({
        title: "Suggestion has been deleted",
        status: "warning",
      });
      fetchSuggestions();
    } catch (error) {
      toast({
        title: "Error deleting suggestion",
        status: "error",
      });
      console.error("Error deleting suggestion:", error);
    }
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSuggestions([]);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: value, page: 1 },
      });
    }, 1000),
    [router, setSuggestions]
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



  const handleDeleteFilter = () => {
    setSearch("");
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
        <Button bg="red">
          <CloseIcon color="white" onClick={() => handleDeleteFilter()} />
        </Button>
      </Flex>
      <TableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>No</Th>              
              <Th>Local Name</Th>
              <Th>Latin Name</Th>              
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
            ) : suggestions?.values?.length === 0 && !isLoadingComponent ? (
              <>
                <Tr>
                  <Td colSpan={8} textAlign="center">
                    <Alert status="info">
                      <AlertIcon />
                      No suggestions found
                    </Alert>
                  </Td>
                </Tr>
              </>
            ) : (
              suggestions.values.length > 0 &&
              suggestions?.values?.map((suggestion, index) => (
                <Tr key={suggestion.id_suggestion}>
                  <Td>{index + 1}</Td>                              
                  <Td>
                    <Text as="b">{suggestion.latin_name}</Text>                    
                  </Td>
                  <Td>                    
                    <Text>{suggestion.local_name}</Text>
                  </Td>                                    
                  <Td>                   
                    <Center marginTop={1}>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDelete(suggestion.id_suggestion)}
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
          {suggestions?.pagination?.total_page > 0 ? (
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
                    pageNumber <= suggestions.pagination.total_page
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
              {page < suggestions.pagination.total_page - 2 && (
                <>
                  {page < suggestions.pagination.total_page - 3 && <Text>...</Text>}
                  <Button
                    variant="outline"
                    colorScheme="teal"
                    onClick={() =>
                      handlePagination(suggestions.pagination.total_page)
                    }
                  >
                    {suggestions.pagination.total_page}
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={() => handlePagination(page + 1)}
                isDisabled={page === suggestions.pagination.total_page}
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

export default withAuth(Suggestion);
