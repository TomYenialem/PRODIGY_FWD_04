import React, { useState } from "react";
import Api from "../utils/Api";
import toast from "react-hot-toast";
import welcomemessages from "../assets/sound/welcome.mp3";
import { useNavigate } from "react-router-dom";
import { useContextApi } from "../context/UseContext";
function UseLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {    setAuthUser}=useContextApi()

  const login = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await Api.post(
        "/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      toast.success("Logged in successfully!");

          setAuthUser(data.user)
           localStorage.setItem("token", JSON.stringify(data.user));
      const welcome = new Audio(welcomemessages);
      welcome.play();

      //   setAuthUser(data.user);
    } catch (error) {
      console.error("Error during sign-in:", error);
      if (error.response) {
        toast.error(error.response.data.msg || "An error occurred");
      } else {
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return {
    login,
    isLoading,
    password,
    setPassword,
    email,
    setEmail,
    setIsLoading,
  };
}

export default UseLogin;
