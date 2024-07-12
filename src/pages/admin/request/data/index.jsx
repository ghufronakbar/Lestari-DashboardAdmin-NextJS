import HeadAdmin  from "@/component/HeadAdmin";
import { Container, Heading, Flex } from "@chakra-ui/react";
import TableReqData  from "@/component/table/TableReqData";
import  SidebarMenu  from "@/component/SidebarMenu";
import { withAuth } from "@/lib/authorization";

function RequestData() {
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
            <TableReqData/>
          </Container>
        </Flex>
      </main>
    </>
  );
}
export default withAuth(RequestData);
