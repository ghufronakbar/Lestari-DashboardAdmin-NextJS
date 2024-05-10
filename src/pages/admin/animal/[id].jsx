import { headAdmin } from "@/component/headAdmin";
import { Container, Flex } from "@chakra-ui/react";
import { SidebarMenu } from "@/component/SidebarMenu";
import { detailAnimal } from "@/component/detail/detailAnimal";
import { withAuth } from "@/lib/authorization";

function RequestDataID() {
  return (
    <>
      {headAdmin()}
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">{detailAnimal()}</Container>
        </Flex>
      </main>
    </>
  );
}


export default withAuth(RequestDataID);