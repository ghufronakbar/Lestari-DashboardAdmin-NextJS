import { headAdmin } from "@/component/headAdmin";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { SidebarMenu } from "@/component/SidebarMenu";
import { detailHistory } from "@/component/detail/detailHistory";
import { withAuth } from "@/lib/authorization";

function HistoryDataID() {
  return (
    <>
      {headAdmin()}
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              Request Data
            </Heading>
            {detailHistory()}
          </Container>
        </Flex>
      </main>
    </>
  );
}

export default withAuth(HistoryDataID);
