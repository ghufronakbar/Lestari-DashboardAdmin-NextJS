import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function NotFoundAdmin() {
  const router = useRouter();
  return (    
      <Box style={{ display: "flex", alignItems: "center", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh", }}>
      <Heading>Lestari: Page 404 - Not Found</Heading>
      <Image
      src='/404.jpg'
      alt="Lestari: Page 404 - Not Found"
      priority
      width={500}
      height={500}/>            
      <Text marginTop="4">
        Return to{" "}
        <Text
          as="span"
          color="blue"
          cursor="pointer"          
          onClick={() => {
            router.push(`/admin/animal`);
          }}
        >
          Dashboard
        </Text>
      </Text>
      </Box>    
  );
}
