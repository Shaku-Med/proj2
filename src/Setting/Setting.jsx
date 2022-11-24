import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'

function Setting() {
  return (
    <motion.div
    initial={{opacity: 0}}
     animate={{marginLeft: 0, opacity: 1}}
     exit={{opacity: 0}}
     transition={{ duration: 1 }}
    >
    <div className=" min-h-screen pt-2 font-mono my-16">
        <div className="container mx-auto">
            <div className="inputs w-full max-w-2xl p-6 mx-auto">
                <form className="mt-6 border-t border-gray-400 pt-4">
                    <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className="personal w-full  pt-4">
                            <h2 className="text-2xl text-gray-0">Personal info:</h2>
                            <div className="flex items-center justify-between mt-4">
                                <div className='w-full md:w-1/2 px-3 mb-6'>
                                    <label className='block uppercase tracking-wide text-gray-0 text-xs font-bold mb-2' >first name</label>
                                    <input placeholder='FirstName' className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text'  required/>
                                </div>
                                <div className='w-full md:w-1/2 px-3 mb-6'>
                                    <label className='block uppercase tracking-wide text-gray-0 text-xs font-bold mb-2' >last name</label>
                                    <input placeholder='LastName' className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text'  required/>
                                </div>
                            </div>
                            <div className='w-full md:w-full px-3 mb-6'>
                                <label className='block uppercase tracking-wide text-gray-0 text-xs font-bold mb-2'>Social Media Link.</label>
                                <input placeholder='Social Media Link' className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='url'  required/>
                            </div>
                            <div className='w-full md:w-full px-3 mb-6'>
                                <label className='block uppercase tracking-wide text-gray-0 text-xs font-bold mb-2' >Bio</label>
                                <textarea placeholder='Add your bio.' className='bg-gray-100 text-gray-700 rounded-md border leading-normal resize-none w-full h-20 py-2 px-3 shadow-inner border border-gray-400 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'  required></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3" type="submit">save changes</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </motion.div>
  )
}

export default Setting
