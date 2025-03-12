import React, { useContext } from "react";
import { formatChatTime } from "../../utils/Time";
import user from "../../assets/images/user.jpg";
import { TiMessages } from "react-icons/ti";

import { useContextApi } from "../../context/UseContext";

function ChatForm({ message }) {
  const { authUser, coversation } = useContextApi()
  const messagesakes = message?.shakeMessage ? "shake" : "";

  return (
    <>
      {message?.length > 0 ? (
        message.map((messages, index) => (
          <div
            key={index}
            className={`send-message ${
              messages.sender === coversation._id ? `own` : `reciver`

            } ${messages.shakeMessage ? "shake" : ""}`}

          >
            
        
            <div className="text">
              <p>{messages.message}</p>
              <span>{formatChatTime(messages.timestamp)}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="start_message">
          <p>Send a message to start the conversation</p>
          <span>
            <TiMessages />
          </span>
        </div>
      )}
   
    </>
  );
}

export default ChatForm;
