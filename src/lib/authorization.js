import { useRouter } from "next/router";
import { useEffect, useState, createContext } from "react";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext();

export function withAuth(Component) {
  const WithAuth = (props) => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/admin/login");
      } else {
        try {
          const payload = jwtDecode(token);
          if (!payload.id_admin || payload.id_admin.length === 0) {
            router.push("/admin/login");
          } else if (payload.exp < Date.now() / 1000) {
            localStorage.removeItem("token");
            router.push("/admin/login");
          } else {
            setUserData(payload);
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          router.push("/admin/login");
        }
      }
    }, [router]);

    return (
      <AuthContext.Provider value={userData}>
        <Component {...props} />
      </AuthContext.Provider>
    );
  };

  WithAuth.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;

  return WithAuth;
}