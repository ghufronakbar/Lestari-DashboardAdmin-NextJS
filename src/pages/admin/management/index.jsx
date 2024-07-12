import HeadAdmin from "@/component/HeadAdmin";
import SidebarMenu from "@/component/SidebarMenu";
import TableAdmin from "@/component/table/TableAdmin";
import { withAuth } from "@/lib/authorization";
import { Button, Container, Flex, Heading, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const AdminManagemet = () => {
  const router = useRouter();
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
              <Heading>Admin</Heading>
              <Button
                colorScheme={"teal"}
                py={4}
                onClick={() => router.push("/admin/management/add")}
              >
                Add
              </Button>
            </HStack>
            <TableAdmin />
          </Container>
        </Flex>
      </main>
    </>
  );
};

export default withAuth(AdminManagemet);
