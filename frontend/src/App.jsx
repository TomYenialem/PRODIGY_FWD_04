import { useState } from 'react'
import { Toaster } from "react-hot-toast";
import './App.css'
import SignIn from './pages/SignIn/SignIn'
import {Routes ,Route} from 'react-router-dom'
import Login from './pages/Login/login';

function App() {
const [show,setShow]=useState(false)

  return (
    <>
      <div className={`${show ? "bg" : "container"}`}>
        <Routes>
          <Route
            path="/"
            element={<Login/>}
          />
          <Route
            path="/signin"
            element={<SignIn/>}
          />
          {/* <Route
            path="/home"
            element={
              <div>
                {authUser ? (
                  <Home show={show} setShow={setShow} />
                ) : (
                  <Navigate to={"/"} />
                )}
              </div>
            }
          /> */}
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App
