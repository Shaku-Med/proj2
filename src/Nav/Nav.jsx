import Cookies from "js-cookie";
import React from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";



function Nav() {
  var a;
  var b;

  let [states, setstates] = useState("");
  let [udatas, setudatas] = useState([]);
  useEffect(() => {
    if (
      Cookies.get("c_usr") &&
      Cookies.get("xs") &&
      localStorage.getItem("_g") &&
      localStorage.getItem("_p") &&
      Cookies.get("presence_id")
    ) {
      if (
        Cookies.get("c_usr") !== null &&
        Cookies.get("xs") !== null &&
        localStorage.getItem("_g") !== null &&
        localStorage.getItem("_p") !== null &&
        Cookies.get("presence_id") !== null
      ) {
        if (Cookies.get("xs") === localStorage.getItem("_p")) {
          axios
            .post("http://localhost:3001/user/data/info", {
              c_usr: Cookies.get("c_usr"),
            })
            .then((res) => {
              if (res.data === "notfound") {
                Cookies.remove("c_usr");
                Cookies.remove("xs");
                Cookies.remove("presence_id");
                localStorage.clear();
                window.location.reload();
              } else {
                setstates(true);
                setudatas(res.data);
              }
            });
        }
      }
    }
  }, []);

  return (
    <div>
      {states === ""
        ? "loading"
        : [states].map((vx, vk) => {
            return (
              <div key={vk}>
                {udatas.map((val, key) => {
                  if (val.c_usr === Cookies.get("c_usr")) {
                    return (
                      <div key={key}>
                        <nav
                          className="bg-gray-800"
                          style={{
                            zIndex: 400000000,
                            position: "fixed",
                            width: "100%",
                            top: 0,
                          }}
                        >
                          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                              <div
                                onClick={(e) => {
                                  let svj =
                                    document.querySelector(" #mobile-menu");

                                  if (b === 1) {
                                    svj.classList.remove("prev");
                                    b = 0;
                                  } else {
                                    svj.classList.add("prev");
                                    b = 1;
                                  }
                                }}
                                className="absolute inset-y-0 left-0 flex items-center sm:hidden"
                              >
                                <button
                                  type="button"
                                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                  aria-controls="mobile-menu"
                                  aria-expanded="false"
                                >
                                  <span className="sr-only">
                                    Open main menu
                                  </span>
                                  <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                  </svg>
                                  <svg
                                    className="hidden h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                  <img
                                    className="block h-8 w-auto lg:hidden"
                                    src="https://flowbite.com/docs/images/logo.svg"
                                    alt="Your Company"
                                  />
                                  <img
                                    className="hidden h-8 w-auto lg:block"
                                    src="https://flowbite.com/docs/images/logo.svg"
                                    alt="Your Company"
                                  />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                  <div className="flex space-x-4">
                                    <a
                                      onClick={(e) => {
                                        let svj =
                                          document.querySelector(
                                            " #mobile-menu"
                                          );
                                        svj.classList.remove("prev");
                                        b = 0;
                                      }}
                                      href="../#/"
                                      style={{ textDecoration: "none" }}
                                      className=" text-white px-3 py-2 rounded-md text-sm font-medium text"
                                      aria-current="page"
                                    >
                                      Home
                                    </a>

                                    <a
                                      onClick={(e) => {
                                        let svj =
                                          document.querySelector(
                                            " #mobile-menu"
                                          );
                                        svj.classList.remove("prev");
                                        b = 0;
                                      }}
                                      href={"../#/Feeds"}
                                      style={{ textDecoration: "none" }}
                                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                      Feed
                                    </a>

                                    <a
                                      onClick={(e) => {
                                        let svj =
                                          document.querySelector(
                                            " #mobile-menu"
                                          );
                                        svj.classList.remove("prev");
                                        b = 0;
                                      }}
                                      href="../#/Library"
                                      style={{ textDecoration: "none" }}
                                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                      Library
                                    </a>

                                    <a
                                      onClick={(e) => {
                                        let svj =
                                          document.querySelector(
                                            " #mobile-menu"
                                          );
                                        svj.classList.remove("prev");
                                        b = 0;
                                      }}
                                      href="../#/Friends"
                                      style={{ textDecoration: "none" }}
                                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                      Friends
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className="relative ml-3">
                                  <div>
                                    <button
                                      onClick={(e) => {
                                        let profile_drop =
                                          document.getElementById(
                                            "profile_drop"
                                          );
                                        if (a === 1) {
                                          profile_drop.style.display = "none";
                                          a = 0;
                                        } else {
                                          profile_drop.style.display = "block";
                                          a = 1;
                                        }
                                      }}
                                      type="button"
                                      className="flex ttcp rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                      id="user-menu-button"
                                      aria-expanded="false"
                                      aria-haspopup="true"
                                    >
                                      <span className="sr-only">
                                        Open user menu
                                      </span>
                                      <img
                                        className="h-8 w-8 rounded-full"
                                        src={val.profilepic}
                                        alt=""
                                      />
                                    </button>
                                  </div>
                                  <motion.div
                                    id="profile_drop"
                                    style={{ display: "none" }}
                                    drag
                                    className="absolute ttcp right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                    tabIndex="-1"
                                  >
                                    <a
                                      href={"../#/Profile/Usr/" + val.pageid}
                                      className="block px-4 py-2 text-sm text-gray-700"
                                      role="menuitem"
                                      tabIndex="-1"
                                      id="user-menu-item-0"
                                      style={{
                                        color: "black",
                                        cursor: "pointer",
                                      }}
                                    >
                                      Your Profile
                                    </a>
                                    <a
                                      href="../#/Account/Settings"
                                      className="block px-4 py-2 text-sm text-gray-700"
                                      role="menuitem"
                                      tabIndex="-1"
                                      id="user-menu-item-1"
                                      style={{
                                        color: "black",
                                        cursor: "pointer",
                                      }}
                                    >
                                      Settings
                                    </a>
                                    <a
                                      onClick={(e) => {
                                        let log_out_modal =
                                          document.querySelector(
                                            ".log_out_modal"
                                          );
                                        log_out_modal.classList.add(
                                          "show_modals"
                                        );
                                      }}
                                      className="block px-4 py-2 text-sm"
                                      style={{
                                        color: "red",
                                        cursor: "pointer",
                                      }}
                                      role="menuitem"
                                      tabIndex="-1"
                                      id="user-menu-item-2"
                                    >
                                      Sign out
                                    </a>
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="sm:hidden" id="mobile-menu">
                            <div className="space-y-1 px-2 pt-2 pb-3">
                              <a
                                onClick={(e) => {
                                  let svj =
                                    document.querySelector(" #mobile-menu");
                                  svj.classList.remove("prev");
                                  b = 0;
                                }}
                                href={"../#/"}
                                style={{ textDecoration: "none" }}
                                className=" text-white block px-3 py-2 rounded-md text-base font-medium"
                                aria-current="page"
                              >
                                Home
                              </a>

                              <a
                                onClick={(e) => {
                                  let svj =
                                    document.querySelector(" #mobile-menu");
                                  svj.classList.remove("prev");
                                  b = 0;
                                }}
                                href="../#/Feeds"
                                style={{ textDecoration: "none" }}
                                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                              >
                                Feed
                              </a>

                              <a
                                onClick={(e) => {
                                  let svj =
                                    document.querySelector(" #mobile-menu");
                                  svj.classList.remove("prev");
                                  b = 0;
                                }}
                                href="../#/Library"
                                style={{ textDecoration: "none" }}
                                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                              >
                                Library
                              </a>

                              <a
                                onClick={(e) => {
                                  let svj =
                                    document.querySelector(" #mobile-menu");
                                  svj.classList.remove("prev");
                                  b = 0;
                                }}
                                href="../#/Friends"
                                style={{ textDecoration: "none" }}
                                className=" hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                              >
                                Friends
                              </a>
                            </div>
                          </div>
                        </nav>

                        <div
                          className="log_out_modal"
                          style={{
                            width: "100%",
                            top: 0,
                            position: "fixed",
                            zIndex: 500000000,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100vh",
                          }}
                        >
                          <div
                            id="defaultModal"
                            tabIndex="-1"
                            aria-hidden="true"
                            className=" overflow-y-auto overflow-x-hidden  top-0 right-0 left-0 z-50 p-4"
                          >
                            <div className="relative w-full max-w-2xl h-full md:h-auto">
                              <div className="relative  rounded-lg shadow bg-gray-700">
                                <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                  <h3 className="text-xl font-semibold text-white">
                                    Signing Out?
                                  </h3>
                                  <button
                                    onClick={(e) => {
                                      let log_out_modal =
                                        document.querySelector(
                                          ".log_out_modal"
                                        );
                                      log_out_modal.classList.remove(
                                        "show_modals"
                                      );
                                    }}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-toggle="defaultModal"
                                  >
                                    <svg
                                      aria-hidden="true"
                                      className="w-5 h-5"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                  </button>
                                </div>
                                <div className="p-6 space-y-2">
                                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Do you wish to Sign out?
                                  </p>
                                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    This action will remove your session and
                                    you'll not be able to access this page till
                                    you login.
                                  </p>
                                </div>
                                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                  <button
                                    onClick={(e) => {
                                      Cookies.remove("c_usr");
                                      Cookies.remove("xs");
                                      localStorage.clear();
                                      Cookies.remove("presence_id");

                                      window.location.reload();
                                    }}
                                    data-modal-toggle="defaultModal"
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                  >
                                    SignOut
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      let log_out_modal =
                                        document.querySelector(
                                          ".log_out_modal"
                                        );
                                      log_out_modal.classList.remove(
                                        "show_modals"
                                      );
                                    }}
                                    data-modal-toggle="defaultModal"
                                    type="button"
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10  "
                                  >
                                    Decline
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
    </div>
  );
}

export default Nav;
