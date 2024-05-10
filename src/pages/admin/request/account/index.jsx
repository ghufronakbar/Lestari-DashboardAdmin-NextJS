import { headAdmin } from "@/component/headAdmin";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { tableReqAccount } from "@/component/table/tableReqAccount";
import { SidebarMenu } from "@/component/SidebarMenu";
import { withAuth } from "@/lib/authorization";

function RequestAccount() {
  return (
    <>
      {headAdmin()}
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              Request Account
            </Heading>
            {tableReqAccount()}
          </Container>
        </Flex>
      </main>
    </>
  );
}
export default withAuth(RequestAccount);
