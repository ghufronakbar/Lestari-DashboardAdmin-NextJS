import {
  Button,
  Center,
  Image,
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
import { baseURL } from "@/lib/baseUrl";

export function tableAnimal() {
  const router = useRouter()
  const toast = useToast();
  function formatDate(dateString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  let i = 1;
  const { data, refetch: refetchData } = useQuery({
    queryFn: async () => {
      const animalsResponse = await axiosInstance.get("/animals");
      return animalsResponse;
    },
  });

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/animal/delete/${id}`);

      toast({
        title: "Animal has been deleted",
        status: "warning",
      });
      refetchData();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleDetail = (id) => {
    router.push(`/admin/animal/${id}`);
  };

  return (
    <TableContainer>
      <Table>
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
          {data?.data.values.map((animal) => (
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
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
