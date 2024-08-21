import NotFoundAdmin from "@/component/NotFoundAdmin";
import NotFoundUser from "@/component/NotFoundUser";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Custom404 = () => {
  const router = useRouter();
  const pathname = router.asPath;
  const [isAdmin, setIsAdmin] = useState(false);  
  
  useEffect(() => {
    if(router.isReady) {           
      if(pathname.includes("/admin")) {
        setIsAdmin(true);    
      }
    }
  }, [router.isReady, pathname])

  if(isAdmin) {
    return <NotFoundAdmin />
  } else {
    return <NotFoundUser />
  }
}

export default Custom404