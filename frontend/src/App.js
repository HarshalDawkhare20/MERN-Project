import React, { createContext, useReducer } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/Signup'
import Logout from './components/Logout'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'

import { initialState, reducer } from './reducer/UseReducer'

// 1. context API
export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes >
      <Route exact path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/logout" element={<Logout />}/>
    </Routes>
  )
}

const App = () => {

  const  [state, dispatch] = useReducer(reducer, initialState)

  return (

    <>
      <UserContext.Provider value={{state, dispatch}}>
          <Navbar />
          <Routing />
      </UserContext.Provider>
      

      {/* <Routes>
      <Route exact path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/logout" element={<Logout />}/>
      </Routes> */}



    </>
  )
}

export default App