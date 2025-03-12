import React from "react";
import {useState} from 'react'
import Api from "../utils/Api";
import { useContextApi } from "../context/UseContext";
import toast from "react-hot-toast";

function UseSendMessage() {
  const [isloading, setIsloading] = useState(false);
  const { message, setMessage, coversation } = useContextApi();

  const [messageInput, setMessageInput] = useState("");
  const sendMessagetoUser = async () => {
    if (messageInput === "") {
      toast.error("Please enter a message");
      return;
    }
    try {
      setIsloading(true);
      const response = await Api.post(
        `/sentmesaage/${coversation._id}`,
        { message: messageInput },

        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setMessage([...message, response.data]);
      setMessageInput("");

      // toast.success("Sent mesaage");
    } catch (error) {
      console.error("Error during sign-in:", error);
      if (error.response) {
        toast.error(error.response.data.msg || "An error occurred");
      } else {
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setIsloading(false);
    }
  };
  return {
    sendMessagetoUser,
    messageInput,
    setMessageInput,
    isloading,
  }
}

export default UseSendMessage;
