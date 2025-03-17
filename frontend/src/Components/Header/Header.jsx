import React from "react";
import { FaToggleOff } from "react-icons/fa6";
import { FaToggleOn } from "react-icons/fa";

import usersImg from "../../assets/images/user.jpg";
import "./Header.css";
import { useContextApi } from "../../context/UseContext";
import UseLogout from "../../Hooks/UseLogout";

function Header({ show, setShow }) {
  const { logout } = UseLogout();
  const { authUser } = useContextApi();
 const handleShowToggle = () => {
   setShow((prev) => {
     console.log("Previous show state:", prev);
     return !prev;
   });
 };
  const handleLogout = async () => {
    await logout()
  };
  return (
    <div className="header">
      <div className="header_container">
        <div className="user-info">
          <div className="user-img">
            <img src={authUser?.profilepic || usersImg} alt="" />
            <span>{authUser?.name}</span>
          </div>
        </div>
        <div className="logout">
          <button onClick={handleLogout}>Logout</button>
          <p onClick={handleShowToggle} className="toggler">
            {show ?  <FaToggleOff />:<FaToggleOn /> }
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
