import { HeadAdmin } from "@/component/HeadAdmin";
import { TableAnimal } from "@/component/table/TableAnimal";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { SidebarMenu } from "@/component/SidebarMenu";
import { withAuth } from "@/lib/authorization";

function Animal() {
  return (
    <>
      <HeadAdmin/>
      <main>
        <Flex>
          <SidebarMenu flex={1} />{" "}
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              Animal
            </Heading>
            <TableAnimal/>
          </Container>
        </Flex>
      </main>
    </>
  );
}
export default withAuth(Animal);
