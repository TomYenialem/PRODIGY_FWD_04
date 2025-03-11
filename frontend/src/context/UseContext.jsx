import React, { useState, useEffect, createContext, useContext } from "react";
import Api from "../utils/Api";
import { useNavigate } from "react-router-dom";

const contextApi = createContext();
export const useContextApi = () => useContext(contextApi);

function UseContext({ children }) {
  const navigate = useNavigate();
  const[authUser,setAuthUser]=useState()

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Check if the token is not null and not malformed
    if (token && typeof token === "string") {
      try {
        // Only parse if it's a valid JSON string (if your token is a JSON object)
        setAuthUser(JSON.parse(token));
      } catch (e) {
       
        console.error("Error parsing token:", e);
        setAuthUser(null);
      }
    }
  }, []); 
  console.log(authUser);

  return (
    <contextApi.Provider
      value={{
        authUser
       
      }}
    >
      {children}
    </contextApi.Provider>
  );
}

export default UseContext;
