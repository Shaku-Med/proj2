import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useEffect } from 'react'

function Audio() {
  
  const [audio, setaudio] = useState()

  useEffect(() => { 
    let ranging = document.querySelector("#ranging")
    ranging.value = "0"
    setaudio(document.querySelector("audio"))
  }, [])

   let [idd, setidd] = useState('')
  useEffect(() => { 
    setInterval(() => {
      let hidd_me = document.querySelector(".hidd_me")
      setidd(hidd_me.innerHTML)
    }, 10);
  }, [])

  

  let [udatas, setudatas] = useState([])
  let [sethomeful, home_ful_img] = useState('')

  useEffect(() => { 
    axios.post("http://localhost:3001/main/self", { 
      c_usr: Cookies.get("c_usr")
    }).then(res => { 
      if(res.data !== "notfound"){ 
        audio.currentTime = 0
        setudatas(res.data)
      }
    })

  }, [])


  useEffect(() => { 
    let Song_image = document.querySelector("#Song_image")
    let trap_name = document.querySelector(".trap_name")
    let hov_usr = document.querySelector(".hov_usr")
    udatas.map(udatas => { 
      if(udatas.audio_id === idd || udatas.audio_id === localStorage.getItem("_u_")){ 
        audio.currentTime = 0
        audio.pause()
        audio.src = udatas.songaudio
        Song_image.src = udatas.songimg
        trap_name.innerHTML = udatas.songt
        hov_usr.innerHTML = udatas.songd
      }
    })
  })

  const handle_click  = e => { 
  
    udatas.map(udatas => {
      if(udatas.audio_id === idd || udatas.audio_id === localStorage.getItem("_u_")){ 
         audio.currentTime = 0
         audio.pause()
        audio.src = udatas.songaudio
         setTimeout(() => {
          audio.play()
         }, 2000);

        if ('mediaSession' in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: udatas.songt,
            artist: udatas.fname + " " + udatas.lname,
            album: udatas.songd,
            artwork: [
              { src: udatas.songimg,   sizes: '96x96',   type: 'image/png' },
              { src: udatas.songimg, sizes: '128x128', type: 'image/png' },
              { src: udatas.songimg, sizes: '192x192', type: 'image/png' },
              { src: udatas.songimg, sizes: '256x256', type: 'image/png' },
              { src: udatas.songimg, sizes: '384x384', type: 'image/png' },
              { src: udatas.songimg, sizes: '512x512', type: 'image/png' },
            ]
          })
      }
      }
    })
  }
  

  return (
    <div style={{zIndex: 50000000}}>
      <audio src="" className="hidden"></audio>
      <div style={{zIndex: 50000000}} className="audio_containser flex items-center justify-between relative gap-5">
      <div className="hidden hidd_me"></div>
      <div className="user_tools">
           <img id='Song_image' className='rounded-md' style={{objectPosition: 'center'}} src="https://cdn.wallpapersafari.com/97/22/xA0M9g.jpg" alt="" />
           <div className="name_artists">
            <div className="trap_name">Songtitle</div>

            <div className="artist_name relative w-full">
              <div className="actual_usr  w-full">
                 <div onMouseOver={e => { 
                  let tip_up_usr = document.querySelector(".tip_up_usr")
                  tip_up_usr.classList.add("tip_show")
                 }}
                 onMouseOut={e => { 
                  let tip_up_usr = document.querySelector(".tip_up_usr")
                  tip_up_usr.classList.remove("tip_show")
                 }}  style={{zIndex: 200000}} className="tip_up_usr">
                  <div className="user_img flex w-full item-center justify-between mb-2">
                     <img className='w-[3rem] h-[3rem] cursor-pointer object-cover rounded-full object-center' style={{objectPosition: ' 0 0 '}} src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  </div>
                  <div className="user_name_and text-center mb-3">
                    <b>Mohamed Brima Amara</b>
                    <br />
                    <a href="#">
                      @MohamedAmara
                    </a>
                  </div>
                   <div className="text_m">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium libero eligendi quisquam facere. Libero, dolor facere! Similique dolor ipsum consectetur? Dolorum vitae impedit magnam obcaecati totam delectus, illum tempora dignissimos!
                   </div>
                 </div>
                 <marquee onMouseOver={e => { 
                  let tip_up_usr = document.querySelector(".tip_up_usr")
                  tip_up_usr.classList.add("tip_show")
                 }}
                 onMouseOut={e => { 
                  let tip_up_usr = document.querySelector(".tip_up_usr")
                  tip_up_usr.classList.remove("tip_show")
                 }}
                  className="hov_usr cursor-pointer">Songdesc</marquee>
              </div>
            </div>
           </div>
         </div>


         <div className="controls flex gap-10 items-center
          justify-center">
              <div title='Back' className="btn_1 cursor-pointer">
                  <i className="fa fa-backward"></i>
              </div>
              <div onClick={handle_click} title='' className="btn_1 cursor-pointer">
                  <i className="fa fa-play"></i>
              </div>
              <div title='Play Next Song.' className="btn_1 cursor-pointer">
                <i className="fa fa-forward"></i>
              </div>
              <div title='Repeat' className="btn_1 cursor-pointer">
               <i className="fa fa-repeat"></i>
              </div>
         </div>
         <div className="slider_part w-[100%] flex gap-10">
            <div className="timer_count">0:04</div>
            <div className="ra_input w-full relative">
              <input onChange={e => { 
                let output = document.querySelector("output")
                output.innerHTML = e.target.value 
                output.style.left = e.target.value + '%'
              }} id='ranging' type="range" className='w-full' />
              <output style={{pointerEvents: 'none'}}>0</output>
            </div>
            <div className="song_time">3:50</div>
            <div className="volume_up_down"></div>
         </div>
        
      </div>

     
    </div>
  )
}

export default Audio
