import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/login'; 
import { Provider } from 'react-redux';
import appStore from '../utils/appStore';
import Body from "./components/Body";
function App() {

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter>
  
     <Routes>

          {/* Parent Route */}
          <Route path="/" element={<Body />}>

            {/* Child Routes */}
            <Route index element={<h1>Home</h1>} />
            <Route path="login" element={<Login />} />
            <Route path="about" element={<h1>About</h1>} />

          </Route>

        </Routes>
   
    {/* <h1 className="text-3xl font-bold underline text-red-500">
        Hello Tailwind
      </h1>
    */}
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
