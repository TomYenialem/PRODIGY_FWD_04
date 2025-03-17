import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useContextApi } from "./UseContext";

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

function UseSocketApi({ children }) {
  const [socketIo, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const { authUser } = useContextApi();
useEffect(() => {
  if (authUser && !socketIo) {
    const socket = io("https://prodigy-fwd-04.onrender.com", {
      query: { userId: authUser.id },
      withCredentials: true,
      transports: ["websocket"],
    });

    console.log("Socket initialized:", socket); // ✅ Log the actual socket instance
    setSocket(socket); // ✅ Update state

    socket.on("onlineuser", (users) => {
      setOnlineUser(users);
    });

    return () => {
      socket.disconnect();
      setSocket(null);
    };
  }
}, [authUser]);


  return (
    <SocketContext.Provider value={{ socketIo, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
}

export default UseSocketApi
