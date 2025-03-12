import Api from "../utils/Api";

import { useNavigate } from "react-router-dom";

import React from "react";
import { useContextApi } from "../context/UseContext";

function UseLogout() {
  const{setAuthUser}=useContextApi()
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await Api.post("/logout", {
        withCredentials: true,
      });

      localStorage.removeItem("token");
      setAuthUser(null); 
      
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return {logout};
}

export default UseLogout;
