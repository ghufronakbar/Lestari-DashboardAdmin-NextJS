import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/lib/authorization";
import { useRouter } from "next/router";
import { Switch } from "@chakra-ui/react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { IoIosArrowForward,IoIosArrowDown } from "react-icons/io";

const SidebarMenu = () => {
  const userData = useContext(AuthContext);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const darkMode = localStorage.getItem("chakra-ui-color-mode");
    if (darkMode === "dark") {
      setIsDarkMode(true);
    } else if (darkMode === "light") {
      setIsDarkMode(false);
    } else {
      localStorage.setItem("chakra-ui-color-mode", "light");
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      setIsSuperAdmin(userData.super_admin === 1);
    }
  }, [userData]);

  useEffect(() => {
    if (router.isReady) {
      setIsSuperAdmin(userData?.super_admin === 1);
    }
  }, [router.asPath, router.isReady, userData?.super_admin]);

  const changeColor = () => {
    if (isDarkMode) {
      localStorage.setItem("chakra-ui-color-mode", "light");
      window.location.reload();
    } else {
      localStorage.setItem("chakra-ui-color-mode", "dark");
      window.location.reload();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleRequestMenu = () => {
    setIsRequestOpen(!isRequestOpen);
  };

  const menuItems = [
    {
      label: "Admin",
      icon: "🖥️",
      path: "/admin/management",
      isVisible: isSuperAdmin,
    },
    {
      label: "Animal",
      icon: "🐦‍⬛",
      path: "/admin/animal",
    },
    {
      label: "Manage Suggestion",
      icon: "🔎",
      path: "/admin/suggestion",
    },
    {
      label: "History Request Data",
      icon: "📑",
      path: "/admin/history",
    },
    {
      label: "Request",
      icon: "🧾",
      children: [
        { label: "Account", icon: "🧑‍🦰", path: "/admin/request/account" },
        { label: "Data", icon: "🧑‍💻", path: "/admin/request/data" },
      ],
    },
    {
      label: "User",
      icon: "👤",
      path: "/admin/user",
    },
    {
      label: "Edit Profile",
      icon: "🪪",
      path: "/admin/profile",
    },
    {
      label: "Logout",
      icon: "🔒",
      onClick: handleLogout,
    },
  ];

  return (
    <div
      className={`flex fixed z-50 top-0 ${
        isDarkMode ? "bg-transparent text-white" : "bg-transparent text-gray-900"
      }`}
      onClick={() => {
        setIsSidebarOpen(false);
      }}
    >
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-screen sm:w-[50vw] md:w-[40vw] lg:w-[36vw] xl:w-[22vw] transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isDarkMode ? "bg-gray-800" : "bg-gray-200"} w-64 z-50`}
      >
        <div className={`flex items-center p-4 gap-4`}>
          <div
            className={`border-2 w-8 h-8 flex items-center justify-center rounded-lg p-2 cursor-pointer transition-all duration-300 ${
              isDarkMode ? "hover:bg-gray-700 border-gray-700" : "hover:bg-gray-300 border-gray-300"
            }`}
            onClick={toggleSidebar}
          >
            <IoClose />
          </div>
          <span className="text-2xl font-bold self-start">Dashboard</span>
        </div>
        <nav className="flex-1 px-4 py-2">
          <ul>
            <li className="mb-2">
              <div className="flex items-center self-start">
                {isDarkMode ? <MdDarkMode /> : <MdLightMode />}
                {isDarkMode ? <p className="ml-1">Dark Mode</p> : <p className="ml-1">Light Mode</p>}
                <Switch isChecked={isDarkMode} onChange={changeColor} className="ml-4" />
              </div>
            </li>
            {menuItems.map((item, index) => {
              if (item.isVisible === false) return null;

              if (item.children) {
                return (
                  <li key={index} className="mb-2">
                    <button
                      className={`w-full text-left p-2 rounded-md flex items-center justify-between ${
                        isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-300"
                      } ${isRequestOpen ? (isDarkMode ? "bg-gray-700" : "bg-gray-300") : ""}`}
                      onClick={(e)=>{e.stopPropagation();toggleRequestMenu()}}
                    >
                      <span>{item.icon} {item.label}</span>
                      <span>{isRequestOpen ? <IoIosArrowDown /> : <IoIosArrowForward /> }</span>
                    </button>
                    {isRequestOpen && (
                      <ul className="pl-4 mt-2">
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex} className="mb-2">
                            <button
                              onClick={() => router.push(child.path)}
                              className={`w-full text-left p-2 rounded-md flex items-center ${
                                router.pathname === child.path
                                  ? isDarkMode
                                    ? "bg-gray-600 text-white"
                                    : "bg-gray-400 text-black"
                                  : isDarkMode
                                  ? "hover:bg-gray-700"
                                  : "hover:bg-gray-300"
                              }`}
                            >
                              {child.icon} {child.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              } else {
                return (
                  <li key={index} className="mb-2">
                    <button
                      onClick={item.onClick || (() => router.push(item.path))}
                      className={`w-full text-left p-2 rounded-md flex items-center ${
                        router.pathname === item.path
                          ? isDarkMode
                            ? "bg-gray-600 text-white"
                            : "bg-gray-400 text-black"
                          : isDarkMode
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-300"
                      }`}
                    >
                      {item.icon} {item.label}
                    </button>
                  </li>
                );
              }
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 ">
        <div
          className={`border-2 ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          } w-12 h-12 flex items-center justify-center rounded-lg p-2 cursor-pointer transition-all duration-300 ${
            isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-300"
          }`}
          onClick={(e) => {
            toggleSidebar();
            e.stopPropagation();
          }}
        >
          <GiHamburgerMenu />
        </div>
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default SidebarMenu;
