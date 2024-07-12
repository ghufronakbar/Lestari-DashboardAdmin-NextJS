import { HeadAdmin } from "@/component/HeadAdmin";
import { Container, Heading, Flex } from "@chakra-ui/react";
import { SidebarMenu } from "@/component/SidebarMenu";
import { DetailReqData } from "@/component/detail/DetailReqData";
import { withAuth } from "@/lib/authorization";

function RequestDataID() {
  return (
    <>
      <HeadAdmin/>
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              Request Data
            </Heading>
            <DetailReqData/>
          </Container>
        </Flex>
      </main>
    </>
  );
}

export default withAuth(RequestDataID);
