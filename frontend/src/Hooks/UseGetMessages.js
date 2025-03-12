import React, { useState ,useEffect} from 'react'
import { useContextApi } from '../context/UseContext';
import toast from 'react-hot-toast';
import Api from '../utils/Api'

function UseGetMessages() {
    const {message, setMessage,coversation}=useContextApi()
      const [isLoading, setIsLoading] = useState(false);
   
   useEffect(() => {
     const allMessages = async () => {
            if (!coversation?._id) return; 

         setIsLoading(true);
       try {
         const { data } = await Api.get(`/getmesaage/${coversation?._id}`, {
           withCredentials: true,
         });
         setMessage(data?.message || []);
         // console.log(data.message || []);
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

     allMessages();
   }, [coversation?._id]);
   return {
    message,
    isLoading,
   }
}

export default UseGetMessages