import { HeadAdmin } from "@/component/HeadAdmin";
import { Container, Flex } from "@chakra-ui/react";
import { SidebarMenu } from "@/component/SidebarMenu";
import { DetailAnimal } from "@/component/detail/DetailAnimal";
import { withAuth } from "@/lib/authorization";

function RequestDataID() {
  return (
    <>
      {HeadAdmin()}
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">{DetailAnimal()}</Container>
        </Flex>
      </main>
    </>
  );
}


export default withAuth(RequestDataID);