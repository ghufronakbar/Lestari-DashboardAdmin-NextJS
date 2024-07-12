import FormProfile from "@/component/from/FormProfile";
import SidebarMenu from "@/component/SidebarMenu";
import { withAuth } from "@/lib/authorization";
import { Container, Flex, Heading } from "@chakra-ui/react";

const Profile = () => {
  return (
    <>      
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              Edit Profile
            </Heading>
            <FormProfile />
          </Container>
        </Flex>
      </main>
    </>
  );
};
export default withAuth(Profile);
