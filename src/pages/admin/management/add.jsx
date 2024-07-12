import FormAdmin from "@/component/from/FormAdmin";
import HeadAdmin  from "@/component/HeadAdmin";
import { SidebarMenu } from "@/component/SidebarMenu";
import { withAuth } from "@/lib/authorization";
import { Container, Flex, Heading, HStack } from "@chakra-ui/react";

const AddAdmin = () => {
  return (
    <>
      <HeadAdmin />
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <HStack
              marginBottom="8"
              marginTop="8"
              justifyContent="space-between"
            >
              <Heading>Add Admin</Heading>
            </HStack>
            <FormAdmin />
          </Container>
        </Flex>
      </main>
    </>
  );
};

export default withAuth(AddAdmin);
