import { headAdmin } from "@/component/headAdmin";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { SidebarMenu } from "@/component/SidebarMenu";
import { tableHistory } from "@/component/table/tableHistory";
import { withAuth } from "@/lib/authorization";

function HistoryData() {
  return (
    <>
      {headAdmin()}
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              History
            </Heading>
            {tableHistory()}
          </Container>
        </Flex>
      </main>
    </>
  );
}
export default withAuth(HistoryData);
