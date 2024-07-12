
import { Container, Flex } from "@chakra-ui/react";
import { SidebarMenu } from "@/component/SidebarMenu";
import { withAuth } from "@/lib/authorization";
import HeadAdmin from "@/component/HeadAdmin";
import DetailAnimal  from "@/component/detail/DetailAnimal";

function RequestDataID() {
  return (
    <>
      <HeadAdmin/>
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%"><DetailAnimal/></Container>
        </Flex>
      </main>
    </>
  );
}


export default withAuth(RequestDataID);