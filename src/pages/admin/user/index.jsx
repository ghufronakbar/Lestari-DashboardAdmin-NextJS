import { headAdmin } from "@/component/headAdmin";
import {
  Container,
  Heading,
  Flex
} from "@chakra-ui/react";
import { tableUser } from "@/component/table/tableUser";
import { SidebarMenu } from "@/component/SidebarMenu";
import { withAuth } from "@/lib/authorization";

function User() {
  return (
    <>
      {headAdmin()}
      <main>
      <Flex>
          <SidebarMenu flex={1} /> <Container maxW="80%">
          <Heading marginBottom="8" marginTop="8">
            User
          </Heading>
          {tableUser()}
        </Container></Flex>
       
      </main>
    </>
  );
}
export default withAuth(User);
