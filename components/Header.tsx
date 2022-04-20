import Link from "next/link";
import React, { useEffect, useState } from "react";
import useUser from "../lib/useUser";

export default function Header() {
  const user = useUser();
  const [show, setShow] = useState("hidden");

  function showMenu() {
    if (show === "hidden") {
      setShow("");
    } else {
      setShow("hidden");
    }
  }

  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-3 mx-auto md:flex">
        <div className="flex items-center justify-between">
          <div>
            <a
              className="text-2xl font-bold text-gray-800 transition-colors duration-200 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
              href="#"
            >
              Brand
            </a>
          </div>

          {/* <!-- Mobile menu button --> */}
          <div className="flex md:hidden">
            <button
              onClick={showMenu}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* !-- Mobile Menu open: "block", Menu closed: "hidden" -- */}
        <div
          className={`${show} md:w-full md:flex md:items-center md:justify-between`}
        >
          <div className="flex flex-col px-2 py-3 -mx-4 md:flex-row md:mx-0 md:py-0">
            <Link href={"/"}>
              <a className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-blue-500 hover:text-gray-100 md:mx-2">
                Home
              </a>
            </Link>
            <Link href={"/posts"}>
              <a className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-blue-500 hover:text-gray-100 md:mx-2">
                Posts
              </a>
            </Link>
            <Link href={"/contact"}>
              <a className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-blue-500 hover:text-gray-100 md:mx-2">
                Contact
              </a>
            </Link>
          </div>
          <div className="flex flex-col px-2 py-3 -mx-4 md:flex-row">
            {!user && (
              <>
                <Link href={"/log-in"}>
                  <a className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-blue-500 hover:text-gray-100 md:mx-2">
                    Log In
                  </a>
                </Link>
                <Link href={"/sign-up"}>
                  <a className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-blue-500 hover:text-gray-100 md:mx-2">
                    Sign Up
                  </a>
                </Link>
              </>
            )}
            {user && (
              <>
                <Link href={`/${user.username}`}>
                  <a className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-blue-500 hover:text-gray-100 md:mx-2">
                    {user.username}
                  </a>
                </Link>
                <Link href={"/api/log-out"}>
                  <a className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-blue-500 hover:text-gray-100 md:mx-2">
                    Log Out
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
