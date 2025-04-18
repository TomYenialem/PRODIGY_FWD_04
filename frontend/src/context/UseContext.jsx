import React, { useState, useEffect, createContext, useContext } from "react";
import Api from "../utils/Api";
import { useNavigate } from "react-router-dom";

const contextApi = createContext();
export const useContextApi = () => useContext(contextApi);

function UseContext({ children }) {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState();
  const [tokenValue, setTokenValue] = useState();
  const [message, setMessage] = useState([]);
  const [coversation, setConversation] = useState(null);
 

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

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await Api.get("/gettoken", {
          withCredentials: true,
        });

        setTokenValue(res.data);
      } catch (error) {
        navigate("/");
      }
    };
    authCheck();
  }, []);

  return (
    <contextApi.Provider
      value={{
        authUser,
        setAuthUser,
        message,
        setMessage,
        coversation,
        setConversation,
        tokenValue,
        setTokenValue,
       
      }}
    >
      {children}
    </contextApi.Provider>
  );
}

export default UseContext;
