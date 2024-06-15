//import { Fragment } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Clock, Settings, HelpCircle } from "react-feather";
import { useLocation ,Link } from "react-router-dom";

const navigation = [
  { name: "Help", to: "/help", icon: <HelpCircle className="md:h-6 w-6 mr-2" />, current: true },
  { name: "Record", to: "/record", icon: <Clock className="md:h-6 w-6 mr-2" />, current: false },
  { name: "Settings", icon: <Settings className="md:h-6 w-6 mr-2" />, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  return (
    <Disclosure as="nav" className="bg-[#F0F4F9] dark:bg-gray-800">
      {({ open, close }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 hover:bg-light-white hover:shadow-md text-[#434343] focus:outline-none focus:ring-2 focus:ring-inset">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* <img
                    className="h-8 w-auto"
                    src="#"
                    alt="Your Company"
                  /> */}
                </div>
                <div className="hidden md:ml-6 md:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current
                            ? "hidden md:bg-gray-900 text-white"
                            : "hidden md:text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-md font-medium flex items-center"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.icon} {/* Agregar icono aquí */}
                        <span className="hidden">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hidden"
                >
                  <span className="absolute -inset-1.5" />
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </MenuButton>
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ active }) => (
                          <Link
                            to="/"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-md text-gray-700"
                            )}
                          >
                            Sign out
                          </Link>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div
              className={classNames(
                "fixed inset-0 z-40 flex",
                open ? "translate-x-0" : "-translate-x-full",
                "transition-transform duration-300"
              )}
            >
              <div className="bg-[#F0F4F9] w-64 h-full">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigation.map((item) => (
                   //Sidebar Color
                    <DisclosureButton
                      key={item.name}
                      as={Link}
                      to={item.to}
                      className={classNames(
                        item.current
                          ? "hover:bg-light-white hover:shadow-md text-[#434343]"
                          : "hover:bg-light-white hover:shadow-md text-[#434343]",
                        "rounded-md px-3 py-2 text-base font-medium flex items-center"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.icon} {/* Agregar icono aquí */}
                      <span>{item.name}</span>
                    </DisclosureButton>
                  ))}
                </div>
              </div>
              <div
                className={classNames(
                  "flex-grow bg-black bg-opacity-50",
                  open ? "block" : "hidden"
                )}
                aria-hidden="true"
                onClick={close}
              ></div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

function NavbarWrapper1() {
  const { pathname } = useLocation();
  if (pathname === "/" || pathname === "/signup") return null;
  return <Navbar />;
}

export default NavbarWrapper1;
