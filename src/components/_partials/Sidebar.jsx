import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Home, Clock, Settings, HelpCircle, LogIn, UserPlus, Moon, Sun } from "react-feather";

const Sidebar = () => {
  const [open, setOpen] = useState(localStorage.getItem("sidebarOpen") === "true");
  const [showHelpOptions, setShowHelpOptions] = useState(false);
  const [showSettingsOptions, setShowSettingsOptions] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const { pathname } = useLocation();
  const helpRef = useRef(null);
  const settingsRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", open);
  }, [open]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const handleClickOutside = (event) => {
    if (
      helpRef.current && !helpRef.current.contains(event.target) &&
      settingsRef.current && !settingsRef.current.contains(event.target)
    ) {
      setShowHelpOptions(false);
      setShowSettingsOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const toggleHelpOptions = () => {
    setShowHelpOptions(!showHelpOptions);
    setShowSettingsOptions(false);
  };

  const toggleSettingsOptions = () => {
    setShowSettingsOptions(!showSettingsOptions);
    setShowHelpOptions(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const signInIcon = LogIn;
  const signUpIcon = UserPlus;

  const Menus = [
    { title: "Sign In", Icon: signInIcon, path: "/", visible: pathname === "/" || pathname === "/signup" },
    { title: "Sign Up", Icon: signUpIcon, path: "/signup", visible: pathname === "/" || pathname === "/signup" },
    { title: "Home", Icon: Home, path: "/app", visible: pathname === "/app" || pathname === "/record" },
    { title: "Help", Icon: HelpCircle, subMenus: [
      { title: "FAQ", path: "/faq" },
      { title: "Contact Us", path: "/contact" },
    ], visible: pathname === "/app" || pathname === "/record" },
    { title: "Record", Icon: Clock, path: "/record", visible: pathname === "/app" || pathname === "/record" },
    { title: "Settings", Icon: Settings, subMenus: [
      { title: "Dark Mode", component: (
        <div className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">
          <div className="flex items-center">
            {darkMode ? <Moon className="text-gray-600" /> : <Sun className="text-yellow-500" />}
            <span className="ml-2">Dark Mode</span>
          </div>
          <label htmlFor="darkModeToggle" className="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              id="darkModeToggle"
              className="sr-only peer"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      )}
    ], visible: pathname === "/app" || pathname === "/record" },
  ];

  return (
    <div className={`flex ${darkMode ? "dark" : ""}`}>
      <div
        className={`${
          open ? "w-72" : "w-20"
        } bg-[#F0F4F9] h-screen p-5 pt-8 relative duration-300 shadow-md hidden md:block lg:block ${darkMode ? "dark:bg-gray-800" : ""}`}
      >
        <Menu
          className={`absolute cursor-pointer top-9 w-9 ${darkMode ? "text-white" : "text-black"} border-dark-purple`}
          onClick={toggleSidebar}
        />
        <div className="flex gap-x-4 items-center">
          {/* Aquí puedes agregar tu logo si lo deseas */}
          {/* <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open ? "rotate-[360deg]" : ""
            }`}
            alt="Logo"
          /> */}
          {/* <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open ? "scale-0" : ""
            }`}
          >
            Designer
          </h1> */}
        </div>
        <ul className="pt-9">
          {Menus.map((menu, index) => (
            menu.visible !== false && ( // Renderizar solo si visible es verdadero o no está definido
              <li
                key={index}
                className={`flex flex-col p-2 cursor-pointer hover:bg-light-white hover:shadow-md text-[#434343] text-sm items-start gap-x-4 mt-2 ${
                  index === 0 ? "bg-light-white" : ""
                }`}
                onClick={(e) => {
                  if (menu.subMenus) {
                    e.stopPropagation();
                    if (menu.title === "Help") {
                      toggleHelpOptions();
                    } else if (menu.title === "Settings") {
                      toggleSettingsOptions();
                    }
                  }
                }}
              >
                {menu.subMenus ? (
                  <>
                    <div className="relative">
                      <div className="flex items-center w-full">
                        {menu.Icon && <menu.Icon />}
                        <span className={`ml-2 ${!open ? "hidden" : ""} origin-left duration-200`}>
                          {menu.title}
                        </span>
                      </div>
                      {/* Opciones de Help */}
                      {menu.title === "Help" && (
                        <div ref={helpRef} className={`absolute top-0 left-full mt-[-10px] mr-2 w-44 bg-white rounded-lg shadow-md overflow-hidden transition-opacity ${showHelpOptions ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                          <ul className="py-1">
                            {menu.subMenus.map((subMenu, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  to={subMenu.path}
                                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleHelpOptions();
                                  }}
                                >
                                  {subMenu.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {/* Opciones de Settings */}
                      {menu.title === "Settings" && (
                        <div ref={settingsRef} className={`absolute top-0 left-full mt-[-10px] mr-2 w-44 bg-white rounded-lg shadow-md overflow-hidden transition-opacity ${showSettingsOptions ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                          <ul className="py-1">
                            {menu.subMenus.map((subMenu, subIndex) => (
                              <li key={subIndex}>
                                {subMenu.component || (
                                  <Link
                                    to={subMenu.path}
                                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleSettingsOptions();
                                    }}
                                  >
                                    {subMenu.title}
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <Link to={menu.path} className="flex items-center w-full">
                    {menu.Icon && <menu.Icon />}
                    <span className={`ml-2 ${!open ? "hidden" : ""} origin-left duration-200`}>
                      {menu.title}
                    </span>
                  </Link>
                )}
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
