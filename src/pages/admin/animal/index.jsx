import { headAdmin } from "@/component/headAdmin";
import { tableAnimal } from "@/component/table/tableAnimal";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { SidebarMenu } from "@/component/SidebarMenu";
import { withAuth } from "@/lib/authorization";

function Animal() {
  return (
    <>
      {headAdmin()}
      <main>
        <Flex>
          <SidebarMenu flex={1} />{" "}
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              Animal
            </Heading>
            {tableAnimal()}
          </Container>
        </Flex>
      </main>
    </>
  );
}
export default withAuth(Animal);
