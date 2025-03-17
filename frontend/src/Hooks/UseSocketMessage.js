import { useEffect } from "react";
import notification from "../assets/sound/notification.mp3";
import { useContextApi } from "../context/UseContext";
import { useSocket } from "../context/UseSocketApi";

function UseSocketMessage() {
  const { socketIo } = useSocket();
  const { message, setMessage } = useContextApi();

useEffect(() => {
  if (!socketIo) {
    return;
  }


  const handleNewMessage = (newMessage) => {
    setMessage((prevMessages) => [...prevMessages, newMessage]);
      const audio = new Audio(notification);
      audio.play();
  };

  socketIo.on("receiveMessage", handleNewMessage);

  return () => {
    socketIo.off("receiveMessage", handleNewMessage);
  };
}, [socketIo]);
 // ✅ `setMessage` is already a stable function, so no need to include it
}

export default UseSocketMessage;
