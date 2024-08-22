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
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
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
            const response = await axiosInstance.post("/suggestions",{local_name: dataSuggest.localName, latin_name: dataSuggest.latinName} );
            toast({
                title: "Saran berhasil ditambahkan",
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
                title: error.response.data.message || "Gagal menambahkan saran",                
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
              Saran
            </Heading>
            <Button colorScheme={"teal"} leftIcon={<AddIcon />} onClick={() => setIsAddOpen(true)}>Tambah</Button>
            <ModalSuggestion isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} dataSuggest={dataSuggest} setDataSuggest={setDataSuggest} onSubmit={handleAdd} title={"Tambah Saran"} />
            <TableSuggestion refetch={isRefetch} afterRefetch={() => setIsRefetch(false)} />
          </Container>
        </Flex>
      </main>
    </>
  );
}

const ModalSuggestion = ({ isOpen, onClose, dataSuggest, setDataSuggest, onSubmit, title }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
            <FormLabel>Nama Lokal</FormLabel>
            <Input
              placeholder="Nama Lokal"              
              value={dataSuggest.localName}
              onChange={(e) => setDataSuggest({ ...dataSuggest, localName: e.target.value })}
            />
            </FormControl>
            <FormControl mt={4}>
            <FormLabel>Nama Latin</FormLabel>
            <Input
              placeholder="Nama Latin"
              value={dataSuggest.latinName}
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
              Tutup
            </Button>
            <Button
              colorScheme="teal"
              mr={3}              
              onClick={onSubmit}
            >
              Simpan
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
  const [isEditOpen, setIsEditOpen] = useState(false);  
  const [dataSuggest, setDataSuggest] = useState({
    idSuggestion: 0,
    localName: "",
    latinName: "",
  })

  const fetchSuggestions = async () => {
    setIsLoadingComponent(true);
    try {
      const suggestionsResponse = await axiosInstance.get(`/suggestions`, {
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
        title: error?.response?.data?.message || "Terjadi kesalahan saat mengambil saran",
        status: "error",
      });
      console.error("Terjadi kesalahan saat mengambil saran:", error);
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
      await axiosInstance.delete(`/suggestions/${id}`);
      toast({
        title: "Saran telah dihapus",
        status: "warning",
      });
      fetchSuggestions();
    } catch (error) {
      toast({
        title: "Terjadi kesalahan saat menghapus saran",
        status: "error",
      });
      console.error("Terjadi kesalahan saat menghapus saran:", error);
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

  const handleEdit = async () => {
    if(!dataSuggest.localName || !dataSuggest.latinName){
        toast({
            title: "Silakan isi semua bidang yang diperlukan",
            status: "error",
            isClosable: true,
        })
        return
    }
    try {      
        const response = await axiosInstance.put(`/suggestions/${dataSuggest.idSuggestion}`,{local_name: dataSuggest.localName, latin_name: dataSuggest.latinName} );
        toast({
            title: "Saran berhasil diedit",
            status: "success",
            isClosable: true,
        })
        setIsEditOpen(false);
        setDataSuggest({
            localName: "",
            latinName: "",
        })
        await fetchSuggestions();
    } catch (error) {
        console.log(error);
        toast({
            title: error?.response?.data?.message || "Gagal mengedit saran",                
            status: "error",                
            isClosable: true,
        })            
    }
}

const handleOpenModal = async (data) =>{
  await setDataSuggest({localName: data.local_name, latinName: data.latin_name, idSuggestion: data.id_suggestion});
  await setIsEditOpen(true);
}


  if (isLoading) return <Loading />;
  return (
    <>    
    <ModalSuggestion isOpen={isEditOpen} onClose={() => {setIsEditOpen(false);setDataSuggest({localName: "", latinName: "", idSuggestion: 0})}} dataSuggest={dataSuggest} setDataSuggest={setDataSuggest} onSubmit={() => handleEdit()} title={"Edit Saran"} />
      <Flex gap={4} my={4}>
        <Input
          defaultValue={search}
          onChange={handleSearchChange}
          placeholder="Cari..."
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
              <Th>Nama Lokal</Th>
              <Th>Nama Latin</Th>              
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
            ) : suggestions?.values?.length === 0 && !isLoadingComponent ? (
              <>
                <Tr>
                  <Td colSpan={5} textAlign="center">
                    <Alert status="info">
                      <AlertIcon />
                      Tidak ada saran yang ditemukan
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
                    <Text as="b">{suggestion.local_name}</Text>                    
                  </Td>
                  <Td>                    
                    <Text>{suggestion.latin_name}</Text>
                  </Td>                                    
                  <Td>                   
                    <HStack>
                    <Center marginTop={1}>
                      <Button
                        colorScheme="teal"
                        onClick={() => {handleOpenModal(suggestion)}}
                      >
                        Edit
                      </Button>
                    </Center>
                    <Center marginTop={1}>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDelete(suggestion.id_suggestion)}
                      >
                        Hapus
                      </Button>
                    </Center>
                    </HStack>
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
                <Text as="b">Berikutnya</Text>
              </Button>
            </HStack>
          ) : null}
        </Center>
      </TableContainer>
    </>
  );
};

export default withAuth(Suggestion);
