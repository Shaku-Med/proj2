import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Cookies from "js-cookie";

function Library() {
  useEffect(() => {
    let hero_image_center = document.querySelectorAll(".hero_image_center");
    hero_image_center.forEach((hero_image_center) => {
      hero_image_center.ontouchmove = (e) => {
        let x = 0.3 * -e.clientY;
        hero_image_center.style.backgroundPositionY = x + "px";
      };

      hero_image_center.onpointermove = (e) => {
        let x = 0.3 * -e.clientY;
        hero_image_center.style.backgroundPositionY = x + "px";
      };
    });
  }, []);

  let [useruploads, setuseruploads] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/audio/posted/usr", {
        ownerid: Cookies.get("c_usr"),
      })
      .then((re) => {
        if (re.data !== "notfound") {
          setuseruploads(re.data);
          console.log(re.data);
        }
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="main_home mb-[150px]"
    >
      <div className="grid_play">
        <section id="slider">
          <div className="contains">
            <div className="sub_contain">
              <div className="slid_wrap">
                <div className="controllers">
                  <div>
                    <h1 className="h4">Your Songs.</h1>
                  </div>
                  <div id="controls">
                    <button
                      onClick={(e) => {
                        let my_slider = document.querySelector(".my_slider");
                        my_slider.scrollLeft -= 300;
                      }}
                      className="prev_now"
                    >
                      <i className="fa fa-angle-left"></i>
                    </button>
                    <button
                      onClick={(e) => {
                        let my_slider = document.querySelector(".my_slider");
                        my_slider.scrollLeft += 300;
                      }}
                      className="next_now"
                    >
                      <i className="fa fa-angle-right"></i>
                    </button>
                  </div>
                </div>
                <div className="my_slider">
                  {useruploads.map((val, key) => {
                    if (val.ownerid === Cookies.get("c_usr")) {
                      return (
                        <div key={key} className="cov_m">
                          <div className="slide">
                            <br />
                            <div className="mage_cont">
                              <h1 className="h5">{val.songt}</h1>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="text-center">Over all uploads</div>
    </motion.div>
  );
}

export default Library;
