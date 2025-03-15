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
     // ✅ Only create a new socket if it doesn't exist
     const socket = io("http://localhost:5000", {
       query: { userId: authUser.id },
       withCredentials: true,
       transports: ["websocket"],
     });

     setSocket(socket);

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
