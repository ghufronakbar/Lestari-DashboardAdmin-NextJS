import { headAdmin } from "@/component/headAdmin";
import { Container, Heading, Flex } from "@chakra-ui/react";
import { SidebarMenu } from "@/component/SidebarMenu";
import { detailReqAccount } from "@/component/detail/detailReqAccount";
import { withAuth } from "@/lib/authorization";

function RequestDataID() {
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
            {detailReqAccount()}
          </Container>
        </Flex>
      </main>
    </>
  );
}

export default withAuth(RequestDataID);