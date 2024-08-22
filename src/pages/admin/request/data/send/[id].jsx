import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { axiosInstance } from "@/lib/axios";
import SidebarMenu from "@/component/SidebarMenu";
import { Form } from "reactstrap";
import { useRouter } from "next/router";
import { withAuth } from "@/lib/authorization";
import toISODateString from "@/lib/formatISOString";

function SendData() {
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();

  const handleSendData = async () => {
    try {
      // Mendapatkan nilai dari checkbox
      const localNameChecked = document.getElementById("localNameCheckbox")
        .checked
        ? 1
        : 0;
      const latinNameChecked = document.getElementById("latinNameCheckbox")
        .checked
        ? 1
        : 0;
      const habitatChecked = document.getElementById("habitatCheckbox").checked
        ? 1
        : 0;
      const descriptionChecked = document.getElementById("descriptionCheckbox")
        .checked
        ? 1
        : 0;
      const cityChecked = document.getElementById("cityCheckbox").checked
        ? 1
        : 0;
      const coordinatesChecked = document.getElementById("coordinatesCheckbox")
        .checked
        ? 1
        : 0;
      const imageChecked = document.getElementById("imageCheckbox").checked
        ? 1
        : 0;
      const amountChecked = document.getElementById("amountCheckbox").checked
        ? 1
        : 0;

      // Mendapatkan nilai dari input date
      const dateStart = document.getElementById("dateStartInput").value;
      const dateEnd = document.getElementById("dateEndInput").value;

      // Memeriksa apakah setidaknya satu checkbox telah dicentang
      const checkboxes = [
        localNameChecked,
        latinNameChecked,
        habitatChecked,
        descriptionChecked,
        cityChecked,
        coordinatesChecked,
        imageChecked,
        amountChecked,
      ];
      const atLeastOneChecked = checkboxes.some((checkbox) => checkbox === 1);

      if (!atLeastOneChecked) {
        toast({
          title: "Setidaknya satu checkbox harus dicentang",
          status: "warning",
        });
      } else if (!dateStart || !dateEnd) {
        toast({
          title: "Tanggal tidak boleh kosong",
          status: "warning",
        });
      } else {
        // Menyiapkan data untuk dikirim
        const requestData = {
          local_name: localNameChecked,
          latin_name: latinNameChecked,
          habitat: habitatChecked,
          description: descriptionChecked,
          city: cityChecked,
          longitude: coordinatesChecked,
          latitude: coordinatesChecked,
          image: imageChecked,
          amount: amountChecked,
          date_start: toISODateString(dateStart),
          date_end: toISODateString(dateEnd),
          id_request_data: id, // Mengambil id_request_data dari parameter URL
        };

        // Melakukan request POST
        const response = await axiosInstance.post(
          `/request/data/approve/send`,
          requestData
        );
        toast({
          title: response?.data?.message,
          status: "success",
        });
        router.push(`/admin/request/data/${id}`);
      }
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Terjadi kesalahan saat mengirim data",
        status: "error",
      });

      console.error("Terjadi kesalahan saat mengirim data:", error);
    }
  };

  return (
    <>      
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              Kirim Data
            </Heading>

            <Box p={8} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Form>
                <Flex>
                  <FormLabel flex={1} marginRight={10}>
                    Tanggal Mulai
                  </FormLabel>
                  <FormLabel flex={1} marginRight={10}>
                    Tanggal Akhir
                  </FormLabel>
                </Flex>
                <Flex>
                  <Input
                    id="dateStartInput"
                    flex={1}
                    marginRight={10}
                    placeholder="Tanggal Mulai"
                    type="date"
                  ></Input>
                  <Input
                    id="dateEndInput"
                    flex={1}
                    marginRight={10}
                    placeholder="Tanggal Akhir"
                    type="date"
                  ></Input>
                </Flex>
                <Flex marginTop={8}>
                  <Checkbox
                    id="localNameCheckbox"
                    size="md"
                    colorScheme="teal"
                    flex={1}
                  >
                    Nama Lokal
                  </Checkbox>
                  <Checkbox
                    id="latinNameCheckbox"
                    size="md"
                    colorScheme="teal"
                    flex={1}
                  >
                    Nama Latin
                  </Checkbox>
                </Flex>
                <Flex marginTop={8}>
                  <Checkbox
                    id="habitatCheckbox"
                    size="md"
                    colorScheme="teal"
                    flex={1}
                  >
                    Habitat
                  </Checkbox>
                  <Checkbox
                    id="descriptionCheckbox"
                    size="md"
                    colorScheme="teal"
                    flex={1}
                  >
                    Deskripsi
                  </Checkbox>
                </Flex>
                <Flex marginTop={8}>
                  <Checkbox
                    id="cityCheckbox"
                    size="md"
                    colorScheme="teal"
                    flex={1}
                  >
                    Kota
                  </Checkbox>
                  <Checkbox
                    id="coordinatesCheckbox"
                    size="md"
                    colorScheme="teal"
                    flex={1}
                  >
                    Koordinat
                  </Checkbox>
                </Flex>
                <Flex marginTop={8}>
                  <Checkbox
                    id="imageCheckbox"
                    size="md"
                    colorScheme="teal"
                    flex={1}
                  >
                    Gambar
                  </Checkbox>
                  <Checkbox
                    id="amountCheckbox"
                    size="md"
                    colorScheme="teal"
                    flex={1}
                  >
                    Jumlah
                  </Checkbox>
                </Flex>
                <Button
                  borderRadius="md"
                  bg="#48BB78"
                  color="white"
                  px={4}
                  h={8}
                  marginTop={8}
                  onClick={handleSendData}
                >
                  Kirim
                </Button>
              </Form>
            </Box>
          </Container>
        </Flex>
      </main>
    </>
  );
}

export default withAuth(SendData);
