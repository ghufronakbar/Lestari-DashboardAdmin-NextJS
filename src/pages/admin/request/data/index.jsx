import { headAdmin } from "@/component/headAdmin";
import { Container, Heading, Flex } from "@chakra-ui/react";
import { tableReqData } from "@/component/table/tableReqData";
import { SidebarMenu } from "@/component/SidebarMenu";
import { withAuth } from "@/lib/authorization";

function RequestData() {
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
            {tableReqData()}
          </Container>
        </Flex>
      </main>
    </>
  );
}
export default withAuth(RequestData);
