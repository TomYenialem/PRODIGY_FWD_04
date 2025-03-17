import React, { useContext, useEffect, useRef, useState } from "react";
import "./Chat.css";
import { FaPhoneAlt } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { IoCamera } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { MdKeyboardVoice } from "react-icons/md";
import { MdEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import { TiMessages } from "react-icons/ti";

import { ClipLoader } from "react-spinners";
import ChatForm from "./ChatForm";
// import soketMessages from "../Hooks/soketMessages";
// import sendPhoto from "../Hooks/sendPhoto";
import UseSendMessage from "../../Hooks/UseSendMessage";
import { useContextApi } from "../../context/UseContext";
import UseGetMessages from "../../Hooks/UseGetMessages";
import UseSocketMessage from "../../Hooks/UseSocketMessage";
import LastSeen from "../../Hooks/LastSeen";

export default function Chat({setShowUsers}) {

    const handleUserClick = () => {
      if (window.innerWidth < 769) {
        setShowUsers(false); 
      }
    };

  // soketMessages();
  UseSocketMessage();

  const [emoji, setEmoji] = useState(false);
  // const { sendPhotoMessages } = sendPhoto();
  const { sendMessagetoUser, messageInput, setMessageInput, isloading } = UseSendMessage();
  const { message, isLoading } = UseGetMessages();

  const { coversation, authUser, setConversation } = useContextApi();

  console.log(coversation)

  const [loading, setLoading] = useState(false);
  // send message and images
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMessageInput({ ...messageInput, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const sendMessage = async () => {
    await sendMessagetoUser();
  };

  // enable function with enter keyword
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // unmount the coversation after logout to reset the selected user
  useEffect(() => {
    return () => {
      setConversation(null);
    };
  }, [setConversation]);

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const hadleEmojies = (e) => {
    setMessageInput([messageInput, e.emoji].join(""));
  };
  const removeEmoji = () => {
    setEmoji(false);
  };

  const handleGalleryClick = () => {
    document.getElementById("photo").click();
  };

  return (
    <div className="chat">
      {!coversation ? (
        <div className="no_chat">
          <p>Welcome {authUser.name}👋</p>
          <p>Select a chat to start messaging</p>
          <TiMessages className="no_msg"  />
        </div>
      ) : (
        <div className="chat_body" onClick={handleUserClick}>
          <div className="top">
            <div className="user-name">
              <img src={coversation.profilepic} alt="" width={"50px"} />
              <div className="text">
                <h2>{coversation.username}</h2>
                {
                  <LastSeen userId={coversation._id}/>
                }
              </div>
            </div>
            <div className="address">
              <FaPhoneAlt />
              <FaVideo />
            </div>
          </div>
          {isLoading ? (
            <p className="updating">Updating....</p>
          ) : (
            <div className="middle" onClick={removeEmoji}>
              <ChatForm message={message} />
              <div ref={endRef}></div>
            </div>
          )}
          <div className="bottom">
            <div className="cameras">
              <IoCamera onClick={handleGalleryClick} />
              <IoMdPhotos />
              <MdKeyboardVoice />
            </div>
            <div className="middle-input">
              <input
                type="text"
                placeholder="write message"
                name=" message"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onClick={removeEmoji}
                onKeyDown={handleKeyPress}
              />
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
                id="photo"
              />
            </div>
            <div className="send">
              <span>
                <div className="main-emoji">
                  <MdEmojiEmotions onClick={() => setEmoji((prev) => !prev)} />
                </div>
                <div className="emoji-picker">
                  {emoji && <EmojiPicker onEmojiClick={hadleEmojies} />}
                </div>
              </span>
              <span>
                {isloading ? (
                  <ClipLoader size={14} color="yellow" />
                ) : (
                  <IoMdSend
                    onClick={
                      //   () => {
                      //   if (!isloading) sendMessage();
                      // }
                      sendMessage
                    }
                  />
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
