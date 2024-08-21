import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Head from "next/head";
import '../styles/globals.css'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SidebarMenu from "@/component/SidebarMenu";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const path = router.asPath
  useEffect(() => {
    if(router.isReady){
      if(path.includes("/admin")){
        setIsAdmin(true)
      }
    }
  }, [router.isReady, path])
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Head>
          <title>Admin - Lestari</title>
          <meta name="admin page" content="admin page for lestari app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="" />
        </Head>
        {isAdmin && <SidebarMenu/>}
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}
