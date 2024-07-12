import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Head from "next/head";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Head>
          <title>Admin - Lestari</title>
          <meta name="admin page" content="admin page for lestari app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="" />
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}
