import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {v4 as uuid} from 'uuid'
import axios from 'axios'
import Cookies from 'js-cookie'

function Auth() {

    const [check, setcheck] = useState([])
    useEffect(() => { 
        let params = (new URL(document.location)).searchParams
        let name = params.get('signup')
        if(name !== null){ 
            setcheck({ 
                state: true
            })
        }
        else { 
            setcheck({ 
                state: false
            })
        }

        let body = document.querySelector("body")
        body.style.overflow = "auto"
        body.style.overflowX = "hidden"
    }, [])


    const [fname, setfname] = useState('')
    const [lname, setlname] = useState('')
    const [semail, setsemail] = useState('')
    const [spass, setspass] = useState('')
    const [sconfirm, setsconfirm] = useState('')



     // Login

     const [email, setemail] = useState('')
     const [pass, setpass] = useState('')

  return (
    <div>

        <div id='error_alerts' className="error_alerts fixed w-[100%] top-0 left-0 " style={{display: "none"}}>
           <div id="alert-border-2" className="flex p-4 mb-4 bg-red-100 border-t-4 border-red-500 dark:bg-red-200" role="alert">
                <svg className="flex-shrink-0 w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                <div id='messagein_error' className="ml-3 text-sm font-medium text-red-700"></div>
                <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-red-100 dark:bg-red-200 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 dark:hover:bg-red-300 inline-flex h-8 w-8"  data-dismiss-target="#alert-border-2" aria-label="Close">
                </button>
            </div>
        </div>
            
     { 
       [check].map((val, key) => { 
         if(val.state === true){ 

            const handlesubmit = e => { 
                e.preventDefault()
                let emailregix = /^[\w.+\-]+@gmail\.com$/
                let passregix = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

                let error_alerts = document.querySelector("#error_alerts")
                let messagein_error = document.querySelector("#messagein_error")

                 if(semail === ""){ 
                    messagein_error.innerHTML = "Enter your email."
                    error_alerts.style.display = "block"
                }
                else if(!semail.match(emailregix)){ 
                    messagein_error.innerHTML = "No valid email | @gmail.com "
                    error_alerts.style.display = "block"
                }
                else if(spass === ""){ 
                    messagein_error.innerHTML = "Enter your password"
                    error_alerts.style.display = "block"
                }
                else if(!spass.match(passregix)){ 
                    messagein_error.innerHTML = "Your password is not secured. enter a secured password mixed with letters and symbols"
                    error_alerts.style.display = "block"
                }
                else if(sconfirm === ""){ 
                    messagein_error.innerHTML = "Confirm your password."
                    error_alerts.style.display = "block"
                }
                else if(spass !== sconfirm){ 
                    messagein_error.innerHTML = "These passwords do not match."
                    error_alerts.style.display = "block"
                }
                else  if(fname === ""){ 
                    messagein_error.innerHTML = "Enter your First name"
                    error_alerts.style.display = "block"
                }
                else if(fname.length < 2){ 
                    messagein_error.innerHTML = "Enter a valid First name."
                    error_alerts.style.display = "block"
                }

               else if(lname === ""){ 
                    messagein_error.innerHTML = "Enter your Last name"
                    error_alerts.style.display = "block"
                }
                else if(lname.length < 2){ 
                    messagein_error.innerHTML = "Enter a valid last name."
                    error_alerts.style.display = "block"
                }
                else { 
                    let button = document.querySelector("#button")
                    button.disabled = true
                    button.innerHTML = "Processing..."

                    messagein_error.innerHTML = ""
                    error_alerts.style.display = "none"
                    
                    let arr = {
                        fname: fname,
                        lname: lname,
                        semail: semail,
                        spass: spass,
                        unic_id: uuid(),
                        xs: uuid(),
                        _g: uuid(),
                        pageid: uuid(),
                        profilepic: 'https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg',
                        coverpic: '',
                    }

                    let remember = document.querySelector("#remember")

                    axios.post("http://192.168.1.43:3001/users/signup/auth", arr).then(res => { 
                       if(res.data.success === "success"){
                         Cookies.set("c_usr", res.data.c_usr, remember.checked === true ? {secure: true, expires: 365} : {secure: true})
                         Cookies.set("xs", res.data.xs, remember.checked === true ? {secure: true, expires: 365} : {secure: true})
                         localStorage.setItem("_g", res.data._g )
                         Cookies.set("presence_id", res.data.pageid, remember.checked === true ? {secure: true, expires: 365} : {secure: true})
                         localStorage.setItem("_p", res.data.xs)

                         window.open("/", "_self")
                       }
                       else { 
                        button.disabled = false
                        button.innerHTML = "Submit"
                        messagein_error.innerHTML = res.data.success
                        error_alerts.style.display = "block"
                
                       }
                    })
                }
            }

            return ( 
                <div key={key} className="signUP_part">
                        <img className='w-20 pointer-events-none' src="https://flowbite.com/docs/images/logo.svg" alt="" />
                        <br />
                        <b className="center_txt text-center">
                            Welcome! Let's get you ready. 
                            <h1 className="text-center h4">Sign up</h1>
                        </b>
                    <form onSubmit={handlesubmit} method="">
                        <div className="relative z-0 mb-6 w-full group">
                            <input onChange={e => setsemail(e.target.value)} type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input onChange={e => setspass(e.target.value)} type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input onChange={e => setsconfirm(e.target.value)} type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                            <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                        </div>
                        <b className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 mb-6 w-full group">
                                <input onChange={e => setfname(e.target.value)} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                            </div>
                            <div className="relative z-0 mb-6 w-full group">
                                <input onChange={e => setlname(e.target.value)} type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                            </div>
                        </b>
                        
                        <div style={{border: 'none'}} className="flex items-start mb-6 border-none">
                        <div style={{border: 'none'}} className="flex items-center h-5 border-none">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                        </div>
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>

                        <button type="submit" id='button' className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        <br />
                        <br />
                        <b className="text-center">Have an account? <a href="/">Login</a></b>
                        </form>

                </div>
            )
         }
         else { 


            const handlesubmit = e => { 
                e.preventDefault()
                let emailregix = /^[\w.+\-]+@gmail\.com$/
                let passregix = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

                let error_alerts = document.querySelector("#error_alerts")
                let messagein_error = document.querySelector("#messagein_error")

                 if(email === ""){ 
                    messagein_error.innerHTML = "Enter your email."
                    error_alerts.style.display = "block"
                }
                else if(!email.match(emailregix)){ 
                    messagein_error.innerHTML = "No valid email | @gmail.com required."
                    error_alerts.style.display = "block"
                }
                else if(pass === ""){ 
                    messagein_error.innerHTML = "Enter your password."
                    error_alerts.style.display = "block"
                }
                else if(!pass.match(passregix)){ 
                    messagein_error.innerHTML = "Your password is not secured. enter a secured password mixed with letters and symbols"
                    error_alerts.style.display = "block"
                }
                else { 
                    let button = document.querySelector("#button")
                    button.disabled = true
                    button.innerHTML = "Processing..."
                    let arr = {
                        email: email,
                        pass: pass,
                    }


                    messagein_error.innerHTML = ""
                    error_alerts.style.display = "none"

                    let remember = document.querySelector("#remember")

                    axios.post("http://localhost:3001/users/login/auth", arr).then(res => { 
                       if(res.data.success === "success"){ 
                        Cookies.set("c_usr", res.data.c_usr, remember.checked === true ? {secure: true, expires: 365} : {secure: true})
                        Cookies.set("xs", res.data.xs, remember.checked === true ? {secure: true, expires: 365} : {secure: true})
                        localStorage.setItem("_g", res.data._g )
                        Cookies.set("presence_id", res.data.pageid, remember.checked === true ? {secure: true, expires: 365} : {secure: true})
                        localStorage.setItem("_p", res.data.xs)

                        window.open("/", "_self")
                       }
                       else { 
                        button.disabled = false
                        button.innerHTML = "Login"
                        messagein_error.innerHTML = res.data.success
                        error_alerts.style.display = "block"
                       }
                    })
                }
            }


            return ( 
                <div key={key} className="log_part">

                        <div className="text-center">
                        <img className='w-20 pointer-events-none text-center' src="https://flowbite.com/docs/images/logo.svg" alt="" />
                        <br />
                        <b className="center_txt text-center">
                            <h1 className="text-center h4">Login</h1>
                        </b>
                        </div>
                    
                    <form onSubmit={handlesubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input onChange={e => setemail(e.target.value)} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input onChange={e => setpass(e.target.value)} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                        </div>
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div>
                    <button id='button' type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                    <br />
                        <br />
                        <b className="text-center">Don't have an account? <a href={"?signup=" + uuid()}>Sign_up</a></b>
                    </form>


                </div>
            )
         }
       })
     }

    </div>
  )
}

export default Auth
