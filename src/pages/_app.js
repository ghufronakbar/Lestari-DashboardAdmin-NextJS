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
  const [isLoginRoute, setIsLoginRoute] = useState(false)
  const router = useRouter()
  const path = router.asPath
  useEffect(() => {
    if(router.isReady){
      if(path.includes("/admin")){
        setIsAdmin(true)
      }
      if(path.includes("/admin/login")){
        setIsLoginRoute(true)
      }
    }
  }, [router.isReady, path])
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Head>
          <title>Lestari</title>
          <meta name="Lestari" content="Legion " />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/images/logo.png" />
        </Head>
        {isAdmin && !isLoginRoute && <SidebarMenu/>}
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}
