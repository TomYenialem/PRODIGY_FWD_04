import React, { useEffect, useState } from "react";
import Api from '../utils/Api';

function UseAllUsers() {
  const [allUserData, setAllUsers] = useState([]);
  const [isloding, setIsLoading] = useState(false);
  useEffect(() => {
    const allUsers = async () => {
      setIsLoading(true);
      try {
        const response = await Api.get("/getusers", {
          withCredentials: true,
        });
        setAllUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    allUsers();
  }, []);
  return {
    allUserData,
    isloding,
  };
}

export default UseAllUsers;
