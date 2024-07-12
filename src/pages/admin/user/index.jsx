import HeadAdmin from "@/component/HeadAdmin";
import { Container, Heading, Flex } from "@chakra-ui/react";
import TableUser from "@/component/table/TableUser";
import SidebarMenu from "@/component/SidebarMenu";
import { withAuth } from "@/lib/authorization";

const User = () => {
  return (
    <>
      <HeadAdmin />
      <main>
        <Flex>
          <SidebarMenu flex={1} />{" "}
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              User
            </Heading>
            <TableUser />
          </Container>
        </Flex>
      </main>
    </>
  );
};
export default withAuth(User);
