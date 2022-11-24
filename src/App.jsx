import './App.css';
import {useState, useEffect} from 'react'
import { HashRouter } from 'react-router-dom';
import Routing from './Routing';
import Cookies from 'js-cookie'
import Auth from './Auth/Auth';
import Nav from './Nav/Nav';
import Audio from './Audio/Audio';

function App() {

  let [show, sets_show] = useState([])

  let body = document.querySelector("body")
  useEffect(() => { 
    if(window.top !== window.self){ 
      window.location = "http://www.zoneedit.com"
      sets_show({
        status1: true
      })
    }
    else { 
      if(Cookies.get("c_usr") && Cookies.get("xs") && localStorage.getItem("_g") && localStorage.getItem("_p") && Cookies.get("presence_id")){ 
        if(Cookies.get("c_usr") !== null && Cookies.get("xs") !== null && localStorage.getItem("_g") !== null && localStorage.getItem("_p") !== null && Cookies.get("presence_id") !== null ){ 
          if(Cookies.get("xs") === localStorage.getItem("_p")){ 
            sets_show({
              status1: false,
              outState: false
            })
          }
        }
      }
      else { 
        sets_show({
          status1: true,
          outState: true
        })
      }
    }

    body.style.overflow = "hidden"

  }, [])

 

  return (
    <>
        <div id='preloaders' className="preloaders fixed w-[100%] top-0 h-[100vh] z-50 flex items-center justify-center" style={{zIndex: 7000000000}}>
            <span className="flex h-[5rem] w-[5rem] absolute">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            </span>
            <img className='w-20 pointer-events-none' src="https://flowbite.com/docs/images/logo.svg" alt="" />
        </div>
        { 
           [show].map((val, key) => { 
              if(val.status1 === false && val.outState === false){ 
                return ( 
                  <div key={key}>
                    <Nav/>
                    <HashRouter>
                      <Audio/>
                      <Routing/>
                    </HashRouter>
                  </div>
                )
              }
              else { 

                function rammi(){ 
                  let randmath = Math.floor(Math.random() * 10000)
                  
                  setTimeout(() => {
                    let preloaders = document.querySelector("#preloaders")
                    preloaders.classList.add("prel")
                    body.style.overflow = "auto"
                    body.style.overflowX = "hidden"
                  }, randmath);
                }

                rammi()

                return ( 
                  <div key={key}>
                    <Auth/>
                  </div>
                )
              }
           })
        }
    </>
  );
}

export default App;
