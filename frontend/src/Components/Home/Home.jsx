import React, { useState } from "react";
import User from "../UserInfo/User";
import Chat from "../Chat/Chat"
import "./Home.css";
import Header from "../Header/Header";

function Home({ show, setShow }) {
  return (
    <div className="home-wrapper">
      <Header show={show} setShow={setShow} />
      <div className="home_container">
        <div className="user_cont">
          <User />


        </div>
        <div className="chat_cont">
          <Chat />
        
        </div>
      </div>
    </div>
  );
}

export default Home;
