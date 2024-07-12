import { Container, Heading, Flex } from "@chakra-ui/react";
import SidebarMenu from "@/component/SidebarMenu";
import DetailReqAccount from "@/component/detail/DetailReqAccount";
import { withAuth } from "@/lib/authorization";

function RequestDataID() {
  return (
    <>      
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              Request Account
            </Heading>
            <DetailReqAccount />
          </Container>
        </Flex>
      </main>
    </>
  );
}

export default withAuth(RequestDataID);
