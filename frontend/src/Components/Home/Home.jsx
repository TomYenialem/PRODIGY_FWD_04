import React, { useState, useEffect } from "react";
import User from "../UserInfo/User";
import Chat from "../Chat/Chat";
import "./Home.css";
import Header from "../Header/Header";
import { GiHamburgerMenu } from "react-icons/gi"; // Import hamburger menu icon

function Home({ show, setShow }) {
  // Set initial state based on screen width
  const [showUsers, setShowUsers] = useState(window.innerWidth >= 769);

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 769) {
        setShowUsers(true); // Always show users on large screens
      } else {
        setShowUsers(false); // Hide users on small screens
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="home-wrapper">
      <Header show={show} setShow={setShow} />
      <div className="home_container">
        {window.innerWidth < 769 && (
          <button
            className="menu-toggle"
            onClick={() => setShowUsers((prev) => !prev)}
          >
            <GiHamburgerMenu />
          </button>
        )}
        {showUsers && (
          <div className="user_cont">
            <User showUsers={showUsers} setShowUsers={setShowUsers} />
          </div>
        )}

        <div className="chat_cont">
          <Chat showUsers={showUsers} setShowUsers={setShowUsers} />
        </div>
      </div>
    </div>
  );
}

export default Home;
