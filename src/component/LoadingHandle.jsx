import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

const LoadingHandle = ({isVisible}) => {
    const toast = useToast();
    useEffect(() => {
        if (isVisible) {
            toast({
                title: "Loading...",
                status: "info",                
                duration: 10000,
            })
        }
    })
    if(isVisible){ return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50">
        </div>
    );}else{
        return <></>;
    }
};

export default LoadingHandle;