import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css'
import Navbar from './assets/Navbar'
import Footer from './assets/Footer'
import Login from './assets/login'; 
function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
  
    <Routes>
         <Route path="/" element={<h1>Home</h1>}></Route>
         <Route path="/login" element={<Login/>}></Route>
         <Route path="/about" element="welcome about"></Route>
    </Routes>
    
    <Footer/>
    {/* <h1 className="text-3xl font-bold underline text-red-500">
        Hello Tailwind
      </h1>
    */}
    </BrowserRouter>
    
    </>
  )
}

export default App
