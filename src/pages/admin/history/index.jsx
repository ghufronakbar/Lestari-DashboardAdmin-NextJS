import { headAdmin } from "@/component/headAdmin";
import { tableAnimal } from "@/component/table/tableAnimal";
import {
  Button,
  Container,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { tableUser } from "@/component/table/tableUser";
import { tableReqData } from "@/component/table/tableReqData";
import { navbar } from "@/component/navbar";
import { tableHistory } from "@/component/table/tableHistory";

function HistoryData() {
  return (
    <>
      {headAdmin()}
      <main>
        {navbar()}
        <Container maxW="80%">
          <Heading marginBottom="8" marginTop="8">
            History
          </Heading>
          {tableHistory()}
        </Container>
      </main>
    </>
  );
}
export default HistoryData;
