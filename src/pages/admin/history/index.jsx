import { HeadAdmin } from "@/component/HeadAdmin";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { SidebarMenu } from "@/component/SidebarMenu";
import { TableHistory } from "@/component/table/TableHistory";
import { withAuth } from "@/lib/authorization";

function HistoryData() {
  return (
    <>
      {HeadAdmin()}
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              History
            </Heading>
            {TableHistory()}
          </Container>
        </Flex>
      </main>
    </>
  );
}
export default withAuth(HistoryData);
