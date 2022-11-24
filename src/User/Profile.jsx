import React from "react";
import Cropper from "react-easy-crop";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import HyperModal from "react-hyper-modal";
import Cookies from "js-cookie";
import axios from "axios";
import Linkify from "react-linkify";

function Profile() {
  let [states, setstates] = useState("");
  let [udatas, setudatas] = useState([]);
  let [useruploads, setuseruploads] = useState([]);
  let [uploadstate, setuploadstate] = useState("");

  const { id } = useParams();

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
            .post("http://localhost:3001/user/profile/info", {
              pageid: id,
            })
            .then((res) => {
              if (res.data !== "notfound") {
                setstates(true);
                setudatas(res.data);

                res.data.map((val) => {
                  axios
                    .post("http://localhost:3001/audio/posted/usr", {
                      ownerid: val.c_usr,
                    })
                    .then((re) => {
                      if (re.data !== "notfound") {
                        setuseruploads(re.data);
                      }
                    });
                });
              }
            });
        }
      }
    }
  }, [id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ marginLeft: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="up_set"
    >
      {states === ""
        ? "loading"
        : [states].map((vx, vk) => {
            return (
              <div key={vk}>
                {udatas.map((val, key) => {
                  if (val.c_usr === Cookies.get("c_usr")) {
                    if (
                      Cookies.get("c_usr") !== null &&
                      Cookies.get("xs") !== null &&
                      localStorage.getItem("_g") !== null &&
                      localStorage.getItem("_p") !== null &&
                      Cookies.get("presence_id") !== null
                    ) {
                      if (Cookies.get("xs") === localStorage.getItem("_p")) {
                        return (
                          <div key={key}>
                            <div
                              className="bg_img_s"
                              style={{
                                backgroundImage: `url(${
                                  val.coverpic === ""
                                    ? "https://i.pinimg.com/originals/91/b7/9d/91b79dbaaede239a8b261660ed81b1e7.jpg"
                                    : val.coverpic
                                })`,
                              }}
                            >
                              <div className="btn-group boot_btn">
                                <button
                                  type="button"
                                  className="btn btn-danger dropdown-toggle gap-10 items-center
                justify-center flex"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i className="fa fa-pen"></i>
                                  <span>Edit</span>
                                </button>
                                <div className="dropdown-menu">
                                  <a className="dropdown-item" href="#">
                                    Change Coverpic
                                  </a>
                                </div>
                              </div>
                              <div
                                className="profile_pic text-center absolute top-[230px] w-full flex  justify-center items-center gap-2 left-0"
                                style={{ flexDirection: "column" }}
                              >
                                <div className="btn-group dropup">
                                  <img
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    className="w-[10rem] h-[10rem] cursor-pointer text-center rounded-full  dropdown-toggle "
                                    style={{ objectPosition: "0px 0px" }}
                                    src={val.profilepic}
                                    alt=""
                                  />
                                  <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">
                                      Edit profilepic
                                    </a>
                                  </div>
                                </div>
                                <div className="large_text text-center">
                                  <div className="h4 text-center">
                                    {val.fname + " " + val.lname}
                                  </div>
                                  <div className="p">
                                    {"@" + val.fname.split(" ")[0] + ".Listen"}
                                  </div>
                                </div>
                                <div className="button_follow flex justify-center gap-2 items-center">
                                  <Link
                                    to={"../Uploads"}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <button className="btn btn-danger gap-2 flex items-center justify-center">
                                      <i className="fa fa-plus"></i>
                                      <span>Upload</span>
                                    </button>
                                  </Link>
                                  <button className="btn btn-primary">
                                    <i className="fa fa-play"></i>
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div style={{ border: "1px solid #eaeae9" }} />
                            <div className="song_box mt-[130px] w-full p-2 flex items-center justify-center">
                              <div
                                className="song_g"
                                style={{ maxWidth: "1000px", width: "100%" }}
                              >
                                {useruploads === "" ? (
                                  <div className="flex justify-center item-center w-full" style={{flexDecoration: 'column'}}>
                                    <div
                                      role="status"
                                      className="p-4 max-w-sm rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700 w-full"
                                    >
                                      <div className="flex justify-center items-center mb-4 h-48 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg
                                          className="w-12 h-12 text-gray-200 dark:text-gray-600"
                                          xmlns="http://www.w3.org/2000/svg"
                                          aria-hidden="true"
                                          fill="currentColor"
                                          viewBox="0 0 640 512"
                                        >
                                          <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                                        </svg>
                                      </div>
                                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                      <div className="flex items-center mt-4 space-x-3">
                                        <svg
                                          className="w-14 h-14 text-gray-200 dark:text-gray-700"
                                          aria-hidden="true"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                            clipRule="evenodd"
                                          ></path>
                                        </svg>
                                        <div>
                                          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                                          <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        </div>
                                      </div>
                                      <span className="sr-only">
                                        Loading...
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  useruploads.map((vvd, vkd) => {
                                    return (
                                      <div
                                        key={vkd}
                                        className="flex relative gap-2 items-center justify-between w-[100%]"
                                        style={{
                                          flexDirection: "column",
                                          padding: "10px",
                                          backgroundColor: "#283142",
                                          borderRadius: "5px",
                                        }}
                                      >
                                        <div className="play_this">
                                          Playing...
                                        </div>
                                        <div className="big_img">
                                          <img
                                            className="hover"
                                            src={vvd.songimg}
                                            style={{
                                              width: "20rem",
                                              height: "20rem",
                                              borderRadius: "5px",
                                              objectFit: "cover",
                                              cursor: "pointer",
                                            }}
                                            alt=""
                                          />
                                        </div>
                                        <div className="song_names w-full">
                                          <div className="h5">{vvd.songt}</div>
                                          <p className="text-gray-300">
                                            {vvd.songd}
                                          </p>
                                          <br />
                                          <button className="btn btn-danger">
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })
                                )}
                              </div>
                            </div>

                            <div
                              className="user_intro p-3 flex items-center justify-center flex-wrap text-center"
                              style={{ flexDirection: "column" }}
                            >
                              <div className="text-center h3">Intro</div>
                              <div className="user_info">
                                <div className="u1">
                                  <i className="fa fa-user"></i>
                                  <span>{val.fname + " " + val.lname}</span>
                                </div>

                                <div className="u1">
                                  <i className="fa fa-globe"></i>
                                  <Linkify>
                                    {val.websiteurl === ""
                                      ? "no social media links available"
                                      : val.websiteurl}
                                  </Linkify>
                                </div>

                                <div className="u1">
                                  <i className="fa fa-book"></i>
                                  <Linkify>
                                    {val.description === ""
                                      ? "no description"
                                      : val.description}
                                  </Linkify>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    }
                  } else {
                    if (
                      Cookies.get("c_usr") !== null &&
                      Cookies.get("xs") !== null &&
                      localStorage.getItem("_g") !== null &&
                      localStorage.getItem("_p") !== null &&
                      Cookies.get("presence_id") !== null
                    ) {
                      if (Cookies.get("xs") === localStorage.getItem("_p")) {
                        return (
                          <div key={key}>
                            <div
                              className="bg_img_s"
                              style={{
                                userSelect: "none",
                                WebkitUserSelect: "none",
                                backgroundImage: `url(${
                                  val.coverpic === ""
                                    ? "https://i.pinimg.com/originals/91/b7/9d/91b79dbaaede239a8b261660ed81b1e7.jpg"
                                    : val.coverpic
                                })`,
                              }}
                            >
                              <div
                                className="profile_pic text-center absolute top-[230px] w-full flex  justify-center items-center gap-2 left-0"
                                style={{ flexDirection: "column" }}
                              >
                                <img
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  className="w-[10rem] h-[10rem] pointer-events-none text-center rounded-full  dropdown-toggle "
                                  style={{ objectPosition: "0px 0px" }}
                                  src={val.profilepic}
                                  alt=""
                                />
                                <div className="large_text text-center">
                                  <div className="h4 text-center">
                                    {val.fname + " " + val.lname}
                                  </div>
                                  <div className="p">
                                    {"@" + val.fname.split(" ")[0] + ".Listen"}
                                  </div>
                                </div>
                                <div className="button_follow flex justify-center gap-2 items-center">
                                  <button
                                    className="btn btn-primary w-[200px]"
                                    title={"play " + val.fname + "'s songs"}
                                  >
                                    <i className="fa fa-play"></i>
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div style={{ border: "1px solid #eaeae9" }} />
                            <div className="song_box mt-[130px] w-full p-2 flex items-center justify-center">
                              <div
                                className="song_g"
                                style={{ maxWidth: "1000px", width: "100%" }}
                              >
                                {useruploads === "" ? (
                                  <div className="flex justify-center item-center w-full" style={{flexDecoration: 'column'}}>
                                    <div
                                      role="status"
                                      className="p-4 max-w-sm rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700 w-full"
                                    >
                                      <div className="flex justify-center items-center mb-4 h-48 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg
                                          className="w-12 h-12 text-gray-200 dark:text-gray-600"
                                          xmlns="http://www.w3.org/2000/svg"
                                          aria-hidden="true"
                                          fill="currentColor"
                                          viewBox="0 0 640 512"
                                        >
                                          <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                                        </svg>
                                      </div>
                                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                      <div className="flex items-center mt-4 space-x-3">
                                        <svg
                                          className="w-14 h-14 text-gray-200 dark:text-gray-700"
                                          aria-hidden="true"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                            clipRule="evenodd"
                                          ></path>
                                        </svg>
                                        <div>
                                          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                                          <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        </div>
                                      </div>
                                      <span className="sr-only">
                                        Loading...
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  useruploads.map((vvd, vkd) => {
                                    return (
                                      <div
                                        key={vkd}
                                        className="flex relative gap-2 items-center justify-between w-[100%]"
                                        style={{
                                          flexDirection: "column",
                                          padding: "10px",
                                          backgroundColor: "#283142",
                                          borderRadius: "5px",
                                        }}
                                      >
                                        <div className="play_this">
                                          Playing...
                                        </div>
                                        <div className="big_img">
                                          <img
                                            className="hover"
                                            src={vvd.songimg}
                                            style={{
                                              width: "20rem",
                                              height: "20rem",
                                              borderRadius: "5px",
                                              objectFit: "cover",
                                              cursor: "pointer",
                                            }}
                                            alt=""
                                          />
                                        </div>
                                        <div className="song_names w-full">
                                          <div className="h5">{vvd.songt}</div>
                                          <p className="text-gray-300">
                                            {vvd.songd}
                                          </p>
                                          <br />
                                          <button className="btn btn-danger">
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })
                                )}
                              </div>
                            </div>

                            <div
                              className="user_intro p-3 flex items-center justify-center flex-wrap text-center"
                              style={{ flexDirection: "column" }}
                            >
                              <div className="text-center h3">Intro</div>
                              <div className="user_info">
                                <div className="u1">
                                  <i className="fa fa-user"></i>
                                  <span>{val.fname + " " + val.lname}</span>
                                </div>

                                <div className="u1">
                                  <i className="fa fa-globe"></i>
                                  <Linkify>
                                    {val.websiteurl === ""
                                      ? "no social media links available"
                                      : val.websiteurl}
                                  </Linkify>
                                </div>

                                <div className="u1">
                                  <i className="fa fa-book"></i>
                                  <Linkify>
                                    {val.description === ""
                                      ? "no description"
                                      : val.description}
                                  </Linkify>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    }
                  }
                })}
              </div>
            );
          })}
    </motion.div>
  );
}

export default Profile;
