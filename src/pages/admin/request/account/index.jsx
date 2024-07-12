import { Container, Flex, Heading } from "@chakra-ui/react";
import TableReqAccount from "@/component/table/TableReqAccount";
import SidebarMenu from "@/component/SidebarMenu";
import { withAuth } from "@/lib/authorization";

function RequestAccount() {
  return (
    <>      
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              Request Account
            </Heading>
            <TableReqAccount />
          </Container>
        </Flex>
      </main>
    </>
  );
}
export default withAuth(RequestAccount);
