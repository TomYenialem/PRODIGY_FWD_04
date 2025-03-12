import React, { useState } from "react";
import toast from "react-hot-toast";
import Api from "../utils/Api.js";
import { useNavigate } from "react-router-dom";

function UseSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserNames] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();
  const signIn = async () => {
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!password || password.length < 8) {
      toast.error("Password should be at least 8 characters long");
      return;
    }
    if (!username || !password || !email || !confirmPass) {
      toast.error("Please enter all required fields");
      return;
    }
    if (password !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }

    // Attempt to sign in
    try {
      setIsLoading(true);
      const { data } = await Api.post("/signin", {
        username: username,
        password: password,
        email: email,
        confirmPass: confirmPass,
      });
      toast.success("Signed In Successfully");
      navigate("/");
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
    signIn,
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUserNames,
    confirmPass,
    setConfirmPass,
    showPassword,
    setShowPassword,
    isLoading,
  };
}

export default UseSignIn;
