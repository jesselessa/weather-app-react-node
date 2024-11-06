import { useLocation, Link } from "react-router-dom";
// UI
import { Disclosure } from "@headlessui/react";
// Icons
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// Logo
import logo from "../assets/logo.png";

export default function Navbar() {
  // Get current location object of the page
  const location = useLocation();

  // Define routes
  const routes = [
    { path: "/", name: "Home" },
    { path: "/favorites", name: "Favorites" },
  ];

  // Filter falsy values and concatenate remaining classes into a single string
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    // Conditional display content based on visibility
    <Disclosure as="nav" className="bg-cyan-950">
      {({ open }) => (
        <>
          {/* Desktop navigation */}
          <div className="max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Burger button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-indigo-600 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto"
                    src={logo}
                    alt="logo"
                  />
                  <h1 className="hidden lg:block h-8 ml-3 text-white font-bold justify-center align-middle py-1">
                    WEATHER IN THE CITY
                  </h1>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {routes.map((route) => (
                      <Link
                        key={route.path}
                        to={route.path}
                        className={classNames(
                          route.path === location.pathname
                            ? "bg-indigo-600 text-white"
                            : "text-white hover:bg-amber-400 hover:text-indigo-600",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={
                          route.path === location.pathname ? "page" : undefined
                        }
                      >
                        {route.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile navigation*/}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={`${
                    route.path === location.pathname
                      ? "bg-indigo-600 text-white"
                      : "text-white hover:bg-amber-300 hover:text-indigo-600"
                  } block px-3 py-2 rounded-md text-base font-medium`}
                  aria-current={
                    route.path === location.pathname ? "page" : undefined
                  }
                >
                  {route.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
