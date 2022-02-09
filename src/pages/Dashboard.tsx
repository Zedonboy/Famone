import { Fragment, useCallback, useContext, useRef } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";

import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, Outlet } from "react-router-dom";
import { WalletConnectClient } from "../context";

const navigation = [
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "Estates", href: "estates", current: false },
  { name: "Create Account", href: "create_account", current: false },
];

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  let connector = useContext(WalletConnectClient)
  return (
    <>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <Disclosure
            as="nav"
            className="bg-gray-800 border-b border-indigo-300 border-opacity-25 lg:border-none"
          >
            {({ open }) => (
              <>
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                  <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
                    <div className="px-2 flex items-center lg:px-0">
                      <div className="flex-shrink-0">
                        <img
                          className="block h-8 w-8"
                          src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
                          alt="Workflow"
                        />
                      </div>
                      <div className="hidden lg:block lg:ml-10">
                        <div className="flex space-x-4">
                          {navigation.map((item) => (
                            <Link to={item.href}>
                             <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-indigo-700 text-white"
                                  : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                                "rounded-md py-2 px-3 text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </a>
                            </Link>
                           
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div className="flex items-center">
                        <button
                          onClick={(e) => {
                            connector.createSession();
                          }}
                          disabled={connector.connected}
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white disabled:bg-transparent disabled:border-green-500 disabled:text-green-500 disabled:border bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          {connector.connected ? "Connected" : "Connect Wallet"}
                        </button>
                      </div>
                    </div>
                    <div className="flex lg:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="bg-indigo-600 p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="lg:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                      <Link to={item.href}>
                       <Disclosure.Button
                        key={item.name}
                        as="a"
                        className={classNames(
                          item.current
                            ? "bg-indigo-700 text-white"
                            : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                          "block rounded-md py-2 px-3 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                      </Link>
                     
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <header className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
              <div className="min-h-96 border-4 border-dashed border-gray-200 rounded-lg">
                <Outlet />
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}
