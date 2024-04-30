import {
  Flex,
  Spacer,
  Box,
  Heading,
  Link as ChakraLink,
  Button,
  UnorderedList,
  List,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Nav, NavbarBrand } from "reactstrap";

export function navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  return (
    <Flex p={1} bg="#4FD1C5" color="white" padding='3'>
      <Box>
        <NavbarBrand>
          
        <Button colorScheme="white" variant="ghost">
                  LESTARI ADMIN
                </Button>
        </NavbarBrand>
      </Box>
      <Spacer />
      <Box>
        <Nav vertical>
          <UnorderedList
            style={{
              display: "flex",
              listStyleType: "none",
              gap: "20px",
              margin: 0,
              padding: 0,
            }}
          >
            <List>
              <ChakraLink href="/admin/animal">
                <Button colorScheme="white" variant="ghost">
                  Animal
                </Button>
              </ChakraLink>
            </List>
            <List>
              <ChakraLink href="/admin/user">
                <Button colorScheme="white" variant="ghost">
                  User
                </Button>
              </ChakraLink>
            </List>
            <List>
              <ChakraLink href="/admin/request/account">
                <Button colorScheme="white" variant="ghost">
                  Request Account
                </Button>
              </ChakraLink>
            </List>
            <List>
              <ChakraLink href="/admin/request/data">
                <Button colorScheme="white" variant="ghost">
                Request Data
                </Button>
              </ChakraLink>
            </List>   
            <List>
              <ChakraLink href="/admin/history">
                <Button colorScheme="white" variant="ghost">
                History
                </Button>
              </ChakraLink>
            </List>            
          </UnorderedList>
        </Nav>
      </Box>
    </Flex>
  );
}
