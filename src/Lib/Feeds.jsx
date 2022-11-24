import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'

function Feeds() {

    

    useEffect(() => { 
        let body = document.querySelector("body")
        body.style.overflow = 'auto'
        body.style.overflowX = 'hidden'
    }, [])

  return (
    <motion.div 
    initial={{opacity: 0}}
     animate={{marginLeft: 0, opacity: 1}}
     exit={{opacity: 0}}
     transition={{ duration: 1 }}
    className='main_home mb-[150px] mt-[100px]'>
      <div  className="welcome_home overflow-auto mt-[50px]">
      <div className="grid_play">
         <section id="slider">
          <div className="contains">
            <div className="sub_contain">
              <div className="slid_wrap">
                <div className="controllers">
                  <div>
                    <h1 className='h4'>All Songs.</h1>
                  </div>
                </div>
                 <div className="songs_in_grid">
                    <div className="cov_m_1">
                          <div className="slide">
                            <div className="slid_img img_4">
                            <img src="https://cdn.wallpapersafari.com/97/22/xA0M9g.jpg" alt="" />
                              <i className="fa fa-play"></i>
                            </div>
                            <br />
                            <div className="mage_cont">
                              <h1 className='h5'>Song Title.</h1>
                              <Link to={""}>Artist Name</Link>
                            </div>
                          </div>
                        </div>
                    <div className="cov_m_1">
                          <div className="slide">
                            <div className="slid_img img_4">
                            <img src="https://cdn.wallpapersafari.com/97/22/xA0M9g.jpg" alt="" />
                              <i className="fa fa-play"></i>
                            </div>
                            <br />
                            <div className="mage_cont">
                              <h1 className='h5'>Song Title.</h1>
                              <Link to={""}>Artist Name</Link>
                            </div>
                          </div>
                        </div>
                    <div className="cov_m_1">
                          <div className="slide">
                            <div className="slid_img img_4">
                            <img src="https://cdn.wallpapersafari.com/97/22/xA0M9g.jpg" alt="" />
                              <i className="fa fa-play"></i>
                            </div>
                            <br />
                            <div className="mage_cont">
                              <h1 className='h5'>Song Title donfodnfoidnfoi noidnfoidnfiod.</h1>
                              <Link to={""}>Artist Name</Link>
                            </div>
                          </div>
                        </div>
                    <div className="cov_m_1">
                          <div className="slide">
                            <div className="slid_img img_4">
                            <img src="https://cdn.wallpapersafari.com/97/22/xA0M9g.jpg" alt="" />
                              <i className="fa fa-play"></i>
                            </div>
                            <br />
                            <div className="mage_cont">
                              <h1 className='h5'>Song Title donfoidnfoidnoifdnoifndoifndio.</h1>
                              <Link to={""}>Artist Name</Link>
                            </div>
                          </div>
                    </div>

                    <div className="cov_m_1">
                          <div className="slide">
                            <div className="slid_img img_4">
                            <img src="https://cdn.wallpapersafari.com/97/22/xA0M9g.jpg" alt="" />
                              <i className="fa fa-play"></i>
                            </div>
                            <br />
                            <div className="mage_cont">
                              <h1 className='h5'>Song Title donfoidnfoidnoifdnoifndoifndio.</h1>
                              <Link to={""}>Artist Name</Link>
                            </div>
                          </div>
                    </div>

                    <div className="cov_m_1">
                          <div className="slide">
                            <div className="slid_img img_4">
                            <img src="https://cdn.wallpapersafari.com/97/22/xA0M9g.jpg" alt="" />
                              <i className="fa fa-play"></i>
                            </div>
                            <br />
                            <div className="mage_cont">
                              <h1 className='h5'>Song Title donfoidnfoidnoifdnoifndoifndio.</h1>
                              <Link to={""}>Artist Name</Link>
                            </div>
                          </div>
                    </div>

                    <div className="cov_m_1">
                          <div className="slide">
                            <div className="slid_img img_4">
                            <img src="https://cdn.wallpapersafari.com/97/22/xA0M9g.jpg" alt="" />
                              <i className="fa fa-play"></i>
                            </div>
                            <br />
                            <div className="mage_cont">
                              <h1 className='h5'>Song Title donfoidnfoidnoifdnoifndoifndio.</h1>
                              <Link to={""}>Artist Name</Link>
                            </div>
                          </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
         </section>
       </div>

       </div>
     </motion.div>
  )
}

export default Feeds
