import { headAdmin } from "@/component/headAdmin";
import { Container, Heading, Flex } from "@chakra-ui/react";
import { SidebarMenu } from "@/component/SidebarMenu";
import { detailReqData } from "@/component/detail/detailReqData";
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
              Request Data
            </Heading>
            {detailReqData()}
          </Container>
        </Flex>
      </main>
    </>
  );
}

export default withAuth(RequestDataID);
