import { useState } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import SignIn from "./pages/SignIn/SignIn";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import { useContextApi } from "./context/UseContext";
import Home from "./Components/Home/Home";

function App() {
  const [show, setShow] = useState(false);
  const { authUser,tokenValue } = useContextApi();




  return (
    <>
      <div className={`${show ? "bg" : "container"}`}>
        <Routes>
          <Route
            path="/"
            element={authUser && tokenValue ? <Navigate to={"/home"} /> : <Login />}
          />
          <Route
            path="/signin"
            element={authUser && tokenValue? <Navigate to={"/home"} /> : <SignIn />}
          />
          <Route
            path="/home"
            element={
              <div>
                {authUser&& tokenValue ? (
                  <Home show={show} setShow={setShow} />
                ) : (
                  <Navigate to={"/"} />
                )}
              </div>
            }
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
