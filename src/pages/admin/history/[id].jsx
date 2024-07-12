import { Container, Flex, Heading } from "@chakra-ui/react";
import SidebarMenu from "@/component/SidebarMenu";
import DetailHistory from "@/component/detail/DetailHistory";
import { withAuth } from "@/lib/authorization";

function HistoryDataID() {
  return (
    <>      
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              Request Data
            </Heading>
            <DetailHistory />
          </Container>
        </Flex>
      </main>
    </>
  );
}

export default withAuth(HistoryDataID);
