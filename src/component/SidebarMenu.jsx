import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";


export function SidebarMenu() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };
  return (
    <>
    
      <Sidebar>
      <br/>
          <Text as="b" fontSize="2xl" ml={6} mt={8}>
            Lestari
          </Text>
          <br/><br/>
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
          <MenuItem onClick={()=>{router.push(`/admin/animal`)}}> 🐦‍⬛ Animal </MenuItem>
          <MenuItem onClick={()=>{router.push(`/admin/history`)}}> 📑 History Request Data </MenuItem>
          <SubMenu label="🧾 Request">
            <MenuItem onClick={()=>{router.push(`/admin/request/account`)}}> 🧑‍🦰 Account </MenuItem>
            <MenuItem onClick={()=>{router.push(`/admin/request/data`)}}> 🧑‍💻 Data </MenuItem>            
          </SubMenu>          
          <MenuItem onClick={()=>{router.push(`/admin/user`)}}> 👤 User </MenuItem>
          <MenuItem onClick={()=>{handleLogout()}}> 🔒 Logout </MenuItem>
        </Menu>
      </Sidebar>
      ;
    </>
  );
}
