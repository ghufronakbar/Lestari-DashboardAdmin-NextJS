import { AuthContext } from "@/lib/authorization";
import {
  Text,  
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { axiosInstance } from "@/lib/axios";

export function SidebarMenu() {
  const userData = useContext(AuthContext);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const router = useRouter();  

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  useEffect(() => {
    if (userData) {
      setIsSuperAdmin(userData.super_admin === 1);     
    }
  }, [userData]);

  useEffect(() => {
    if (router.isReady) {
      setIsSuperAdmin(userData?.super_admin === 1);
    }
  }, [router.asPath]);

  return (
    <>
      <Sidebar>
        <br />
        <Text as="b" fontSize="2xl" ml={6} mt={8}>
          Lestari
        </Text>
        <br />
        <br />
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0)
                return {
                  color: disabled ? "#f5d9ff" : "#000000",
                  backgroundColor: active ? "#eecef9" : undefined,
                };
            },
          }}
        >
          {isSuperAdmin && (
            <MenuItem
              onClick={() => {
                router.push(`/admin/management`);
              }}
            >
              🖥️ Admin
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              router.push(`/admin/animal`);
            }}
          >
            🐦‍⬛ Animal
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push(`/admin/history`);
            }}
          >
            📑 History Request Data
          </MenuItem>
          <SubMenu label="🧾 Request">
            <MenuItem
              onClick={() => {
                router.push(`/admin/request/account`);
              }}
            >
              🧑‍🦰 Account
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push(`/admin/request/data`);
              }}
            >
              🧑‍💻 Data
            </MenuItem>
          </SubMenu>
          <MenuItem
            onClick={() => {
              router.push(`/admin/user`);
            }}
          >
            👤 User
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push(`/admin/profile`);
            }}
          >
            🪪 Edit Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}> 🔒 Logout </MenuItem>
        </Menu>
      </Sidebar>      
    </>
  );
}
