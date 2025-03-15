import { useEffect } from "react";
import { useContextApi } from "../context/UseContext";
import { useSocket } from "../context/UseSocketApi";

function UseSocketMessage() {
  const { soketIo } = useSocket();
  const { message, setMessage } = useContextApi();

  useEffect(() => {
    if (!soketIo) {
      console.log("No socket connection");
      return;
    }

    const handleNewMessage = (newMessage) => {
      console.log("Received new message:", newMessage);
      setMessage((prevMessages) => [...prevMessages, newMessage]);
    };

    soketIo.on("receiveMessage", handleNewMessage);

    return () => {
      soketIo.off("receiveMessage", handleNewMessage);
    };
  }, [soketIo]); // ✅ `setMessage` is already a stable function, so no need to include it
}

export default UseSocketMessage;
