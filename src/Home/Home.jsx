import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {motion} from 'framer-motion'
import axios from 'axios'
import Cookies from 'js-cookie'

function Home() {

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => { 
    let hero_image_center = document.querySelectorAll(".hero_image_center")
   hero_image_center.forEach(hero_image_center => { 
    hero_image_center.ontouchmove = e => { 
      let x = .3 * - e.clientY;
      hero_image_center.style.backgroundPositionY = x + 'px'
    }

    hero_image_center.onpointermove = e => { 
      let x = .3 * - e.clientY;
      hero_image_center.style.backgroundPositionY = x + 'px'
    }
   })


  }, [])

  let [udatas, setudatas] = useState('')
  let [sethomeful, home_ful_img] = useState('')

  useEffect(() => { 
    axios.post("http://localhost:3001/main/self", { 
      c_usr: Cookies.get("c_usr")
    }).then(res => { 
      if(res.data !== "notfound"){ 
        setudatas(res.data)
        res.data.map(val => { 
          if(val.c_usr === val.ownerid){ 
            home_ful_img(val)
          }
        })
      }
    })

  }, [])
  
  return (
    <motion.div 
     initial={{ opacity: 0}}
     animate={{ opacity: 1}}
     exit={{opacity: 0}}
     transition={{ duration: 1 }}
     className='main_home mb-[20px]'>
       <div className="welcome_home">
        
       </div>
       <div className="grid_play">
         <section id="slider">
          <div className="contains">
            <div className="sub_contain">
              <div className="slid_wrap">
                <div className="controllers">
                  <div>
                    <h1 className='h4'>Afro packs.</h1>
                  </div>
                  <div id="controls">
                    <button onClick={e => { 
                      let afropack = document.querySelector("#afropack")
                      afropack.scrollLeft -= 300
                    }} className="prev_now">
                      <i className="fa fa-angle-left"></i>
                    </button>
                    <button onClick={e => { 
                      let afropack = document.querySelector("#afropack")
                      afropack.scrollLeft += 300
                    }} className="next_now">
                      <i className="fa fa-angle-right"></i>
                    </button>
                  </div>
                </div>
                <div id='afropack' className="my_slider">
                { 
                     udatas === '' ? <div className="text-center w-full">Nothing Found.</div> :
                     udatas.map((val, key) => { 

                      let hidd_me = document.querySelector(".hidd_me")

                      if(val.c_usr === val.ownerid){ 
                       
                        if(localStorage.getItem("_u_") === val.audio_id || hidd_me.innerHTML === val.audio_id){ 
                          return ( 
                          
                            <div onClick={e => { 
                              localStorage.setItem("_u_", val.audio_id)
                              hidd_me.innerHTML =  val.audio_id
                            }
                            } key={key} className="cov_m">
                              <div className="slide">
                                <div className="slid_img img_1">
                                  <img src={val.songimg} alt="" />
                                  <i className="fa fa-play"></i>
                                </div>
                                <br />
                                <div className="mage_cont">
                                  <h1 className='h5'>{val.songt}</h1>
                                  <Link to={"../Profile/Usr/" + val.pageid}>{val.fname + " " + val.lname}</Link>
                                </div>
                              </div>
                            </div>

                        )
                        }
                        else { 
                          return ( 
                          
                            <div onClick={e => { 
                              localStorage.setItem("_u_", val.audio_id)
                              hidd_me.innerHTML =  val.audio_id
                            }
                            } key={key} className="cov_m">
                              <div className="slide">
                                <div className="slid_img img_1">
                                  <img src={val.songimg} alt="" />
                                  <i className="fa fa-play"></i>
                                </div>
                                <br />
                                <div className="mage_cont">
                                  <h1 className='h5'>{val.songt}</h1>
                                  <Link to={"../Profile/Usr/" + val.pageid}>{val.fname + " " + val.lname}</Link>
                                </div>
                              </div>
                            </div>

                        )
                        }

                       }
                      
                    })
                   }
                  </div>
              </div>
            </div>
          </div>
         </section>
       </div>

    </motion.div>
  )
}

export default Home
