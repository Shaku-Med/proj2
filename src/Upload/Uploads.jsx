import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {v4 as uuid} from 'uuid'

function Uploads() {

    useEffect(() => { 
        let body = document.querySelector("body")
        body.style.overflow = "auto"
        body.style.overflowX = "hidden"
    }, [])

    let testaudio = document.createElement("audio")


    const [songt, setsongt] = useState('')
    const [songd, setsongd] = useState('')
    const [songimg, setsongimg] = useState([])
    const [songaudio, setsongaudio] = useState([])
    const [songtype, setsongtype] = useState('Afro')

    const handle_submit = e => { 
        if(songt === ""){ 
            alert("Enter Your song's title")
        }
        else if(songd === ""){ 
            alert("Enter your song's description.")
        }
        else if(songimg === ""){ 
            alert("Choose your song's image")
        }
        else if(songaudio === ""){ 
            alert("Choose your  Audio")
        }
        else if(songtype === ""){ 
            alert("Please Choose your song type")
        }
        else { 
            let date = new Date()
            let year  = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate()

                let soundimg = { 
                    songimg: songimg
                }

                axios.post("http://localhost:3001/upload/Image/send", soundimg, { 
                headers: { 
                    'Content-Type': 'multipart/form-data'
                }
               })
               
               let Send_requests = document.querySelector("#Send_requests")

               Send_requests.disabled = true

            let arr = { 
                songt: songt,
                songd: songd,
                songaudio: songaudio,
                songtype: songtype,
                c_usr: Cookies.get('c_usr'),
                audio_id: uuid(),
                date: year + "-" + month + "-" + day
            }

            axios.post("http://localhost:3001/upload/audio/send", arr, { 
                headers: { 
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => { 

                
                if(res.data === "success"){ 
                    testaudio.pause()
                    setTimeout(() => {
                        window.open("../#/", "_self")
                    }, 1000);
                }
            })
        }
    }


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
                  res.data.map((val) => { 
                    setudatas(val);
                  })
                }
              });
          }
        }
      }
    }, []);
  

  return (
    <div className='mt-[0px] mb-[200px] p-2 flex justify-center items-center overflow-auto h-[100vh]' style={{flexDirection: 'column', width: "100%"}}>
        <div className="previw_look_llike">
        <div className=" border-slate-100 bg-slate-800 dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
                <div className="flex items-center space-x-4">
                    <img style={{width: "3rem", height: "3rem", objectFit: 'cover', borderRadius: '5px', pointerEvents: 'none', userSelect: 'none', WebkitUserSelect: 'none'}} id='main_img_test' src={udatas.profilepic} loading="lazy" />
                    <div className="min-w-0 flex-auto space-y-1 font-semibold">
                    <p className="text-cyan-500 dark:text-cyan-400 text-sm leading-6">
                        <abbr id='artname' title={udatas.fname + " " + udatas.lname + " (You)."}>{udatas.fname + " " + udatas.lname}</abbr> 
                    </p>
                    <h2 id='songdesc' className="text-slate-500 dark:text-slate-400 text-sm leading-6 truncate">
                    Welcome! Your description will show here while you edit.
                    </h2>
                    <p id='song_title' className=" text-slate-50 text-lg">
                       Song Title
                    </p>
                    </div>
                </div>
                
                </div>
        </div>

        <div className="editing_us w-full p-2 flex justify-center items-center w-full" style={{flexDirection: 'column'}}>
            <div className="eidt_cont" style={{maxWidth: '500px', width: "100%"}}>
                <div className="edit_1">
                    <label htmlFor="helper-text" className="block mb-2 text-sm font-medium  text-white">Song Title</label>
                    <input onChange={e => { 
                         let main_img_test = document.querySelector("#main_img_test")
                         let songdesc = document.querySelector("#songdesc")
                         let song_title = document.querySelector("#song_title")
                         let artname = document.querySelector("#artname")

                         setsongt(e.target.value)

                         if(e.target.value === ""){ 
                            song_title.innerHTML = "Song Title"
                         }
                         else { 
                            song_title.innerHTML = e.target.value
                         }


                         if(main_img_test.src !== null){ 


                          if ('mediaSession' in navigator) {
                              navigator.mediaSession.metadata = new MediaMetadata({
                                title: song_title.innerHTML,
                                artist: artname.innerHTML,
                                album: songdesc.innerHTML,
                                artwork: [
                                  { src: main_img_test.src,   sizes: '96x96',   type: 'image/png' },
                                  { src: main_img_test.src, sizes: '128x128', type: 'image/png' },
                                  { src: main_img_test.src, sizes: '192x192', type: 'image/png' },
                                  { src: main_img_test.src, sizes: '256x256', type: 'image/png' },
                                  { src: main_img_test.src, sizes: '384x384', type: 'image/png' },
                                  { src: main_img_test.src, sizes: '512x512', type: 'image/png' },
                                ]
                              })
                          }
                        }

                    }} type="text" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Song Title"/>
                </div>
                <div className="edit_1">
                    <label htmlFor="helper-text" className="block mb-2 text-sm font-medium  text-white">Song Description.</label>
                    <input 
                      onChange={e => { 
                        let main_img_test = document.querySelector("#main_img_test")
                        let songdesc = document.querySelector("#songdesc")
                        let song_title = document.querySelector("#song_title")
                        let artname = document.querySelector("#artname")

                        setsongd(e.target.value)

                        if(e.target.value === ""){ 
                           songdesc.innerHTML = "Welcome! Your description will show here while you edit."
                        }
                        else { 
                           songdesc.innerHTML = e.target.value
                        }



                        if(main_img_test.src !== null){ 


                         if ('mediaSession' in navigator) {
                             navigator.mediaSession.metadata = new MediaMetadata({
                               title: song_title.innerHTML,
                               artist: artname.innerHTML,
                               album: songdesc.innerHTML,
                               artwork: [
                                 { src: main_img_test.src,   sizes: '96x96',   type: 'image/png' },
                                 { src: main_img_test.src, sizes: '128x128', type: 'image/png' },
                                 { src: main_img_test.src, sizes: '192x192', type: 'image/png' },
                                 { src: main_img_test.src, sizes: '256x256', type: 'image/png' },
                                 { src: main_img_test.src, sizes: '384x384', type: 'image/png' },
                                 { src: main_img_test.src, sizes: '512x512', type: 'image/png' },
                               ]
                             })
                         }
                       }

                   }}
                     type="text" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Song Description"/>
                </div>
                <div className="edit_1">
                    <label htmlFor="helper-text" className="block mb-2 text-sm font-medium  text-white">Choose Image</label>
                    <input onChange={e => { 
                         let main_img_test = document.querySelector("#main_img_test")
                         let songdesc = document.querySelector("#songdesc")
                         let song_title = document.querySelector("#song_title")
                         let artname = document.querySelector("#artname")
                         
                          let file = e.target.files[0]

                          setsongimg(file)

                          if(file){ 
                           let reader = new FileReader()
                           reader.onload = e => { 
                               let result = reader.result
                               main_img_test.src = result


                               if(main_img_test.src !== null){ 


                                if ('mediaSession' in navigator) {
                                    navigator.mediaSession.metadata = new MediaMetadata({
                                      title: song_title.innerHTML,
                                      artist: artname.innerHTML,
                                      album: songdesc.innerHTML,
                                      artwork: [
                                        { src: main_img_test.src,   sizes: '96x96',   type: 'image/png' },
                                        { src: main_img_test.src, sizes: '128x128', type: 'image/png' },
                                        { src: main_img_test.src, sizes: '192x192', type: 'image/png' },
                                        { src: main_img_test.src, sizes: '256x256', type: 'image/png' },
                                        { src: main_img_test.src, sizes: '384x384', type: 'image/png' },
                                        { src: main_img_test.src, sizes: '512x512', type: 'image/png' },
                                      ]
                                    })
                                }


                            }

                           }
                           reader.readAsDataURL(file)
                        }
                    }} accept='image/*' className="block w-full text-sm text-gray-900 border  rounded-lg cursor-pointer  dark:text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400" id="multiple_files" type="file" />
                </div>
                <div className="edit_1">
                    <label htmlFor="helper-text" className="block mb-2 text-sm font-medium  text-white">Choose Audio</label>
                    <input accept='audio/*' onChange={e => { 
                        let main_img_test = document.querySelector("#main_img_test")
                        let songdesc = document.querySelector("#songdesc")
                        let song_title = document.querySelector("#song_title")
                        let artname = document.querySelector("#artname")

                       let file = e.target.files[0]

                       setsongaudio(file)


                       if(file){ 
                        let reader = new FileReader()
                        reader.onload = e => { 
                            let result = reader.result
                            testaudio.src = result
                            testaudio.play()

                            if(main_img_test.src !== null){ 


                                if ('mediaSession' in navigator) {
                                    navigator.mediaSession.metadata = new MediaMetadata({
                                      title: song_title.innerHTML,
                                      artist: artname.innerHTML,
                                      album: songdesc.innerHTML,
                                      artwork: [
                                        { src: main_img_test.src,   sizes: '96x96',   type: 'image/png' },
                                        { src: main_img_test.src, sizes: '128x128', type: 'image/png' },
                                        { src: main_img_test.src, sizes: '192x192', type: 'image/png' },
                                        { src: main_img_test.src, sizes: '256x256', type: 'image/png' },
                                        { src: main_img_test.src, sizes: '384x384', type: 'image/png' },
                                        { src: main_img_test.src, sizes: '512x512', type: 'image/png' },
                                      ]
                                    })
                                }


                            }
                        }
                        reader.readAsDataURL(file)
                       }
                    }}  className="block w-full text-sm text-gray-900 border  rounded-lg cursor-pointer  dark:text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400" id="multiple_files" type="file" />
                </div>
                <label>Song Type</label>
                <select onChange={e => setsongtype(e.target.value)} className="w-full  p-2 rounded-sm" id="">
                    <option value="Afro">Afro</option>
                    <option value="Afro">Love</option>
                    <option value="Afro">EDM</option>
                    <option value="Afro">Rock</option>
                </select>
                <button id='Send_requests' onClick={handle_submit} className='btn btn-primary mt-2 w-full'>
                    Upload
                </button>
            </div>
        </div>
    </div>
  )
}

export default Uploads