import React from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import io from 'socket.io-client'
import Home from './Home/Home'
import Feeds from './Lib/Feeds'
import {AnimatePresence} from 'framer-motion'
import Library from './Store/Library'
import Friends from './Friends/Friends'
import Setting from './Setting/Setting'
import Profile from './User/Profile'
import Uploads from './Upload/Uploads'
function Routing() {

  const location = useLocation();

  return (
    <React.Fragment>
      <AnimatePresence>
          <Routes key={location.pathname} location={location}>
                <Route path='/' element={<Home/>}/>
                <Route path='/Feeds' element={<Feeds/>}/>
                <Route path='/Library' element={<Library/>}/>
                <Route path='/Friends' element={<Friends/>}/>
                <Route path='/Account/Settings' element={<Setting/>}/>
                <Route path='/Profile/Usr/:id' element={<Profile/>}/>
                <Route path='/Uploads' element={<Uploads/>}/>
          </Routes>
      </AnimatePresence>
    </React.Fragment>
  )
}

export default Routing
