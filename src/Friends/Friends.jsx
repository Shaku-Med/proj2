import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";

function Friends() {
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
            .post("http://localhost:3001/friends/users/alls", {
              c_usr: Cookies.get("c_usr"),
            })
            .then((res) => {
              if (res.data !== "notfound") {
                setstates(true);
                setudatas(res.data);
              }
            });
        }
      }
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ marginLeft: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="sm:p-5 lg:p-10 md:p-5 mb-[400px]"
    >
      <div className="h1 text-center mt-20">Friends</div>
      <br />
      <div className="flex gap-4 flex-wrap items-center justify-center">
        {states === ""
          ? "loading..."
          : [states].map((vv, vk) => {
              if (vv === true) {
                return (
                  <div key={vk}>
                    {udatas.map((val, key) => {
                      if (val.c_usr !== Cookies.get("c_usr")) {
                        return (
                          <div key={key} className="fcontainers">
                            <div className="flex justify-center">
                              <Link to={"../Profile/Usr/" + val.pageid} className="flex mt-1 flex-col md:flex-row md:max-w-xl rounded-lg  shadow-lg">
                                <img
                                  className=" cursor-pointer w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                                  src={val.profilepic}
                                  alt=""
                                />
                                <div className="p-6 flex flex-col justify-start">
                                  <h5 className=" cursor-pointer text-white text-xl font-medium mb-2">
                                    {val.fname + " " + val.lname}
                                  </h5>
                                  <p className="text-gray-300 text-base mb-4 overflow-auto max-h-[200px]">
                                    {val.description}
                                  </p>
                                </div>
                              </Link>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                );
              }
            })}
      </div>
    </motion.div>
  );
}

export default Friends;
