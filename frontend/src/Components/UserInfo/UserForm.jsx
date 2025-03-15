import React from "react";
import usersImg from "../../assets/images/user.jpg";
import { useContextApi } from "../../context/UseContext";
import { useSocket } from "../../context/UseSocketApi";

function UserForm({ user,setShowUsers}) {
  const { coversation, setConversation } = useContextApi();
  const { onlineUser } = useSocket();

   const handleUserClick = () => {
     if (window.innerWidth < 769) {
       setShowUsers(false); 
     }
   };

  // Ensure user is defined
  if (!user) {
    return null;
  }

  const isSelected = coversation?._id === user?._id;
  const isOnline = onlineUser.includes(user._id); 
  const handleUsers=()=>{
 setConversation(user)
 handleUserClick()
  }

  return (
    <div>
      <div
        className={`items ${isSelected ? "bg-item" : ""}`}
        key={user._id}
        onClick={handleUsers}
        style={{ position: "relative" }} // Ensure relative positioning
      >
        <img
          src={user?.profilepic || usersImg}
          alt=""
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />

        {/* ✅ Green dot for online users */}
        {isOnline && (
          <span
            style={{
              position: "absolute",
              top: "56%",
              right: "70%",
              width: "10px",
              height: "10px",
              backgroundColor: "red",
              borderRadius: "50%",
            }}
          ></span>
        )}

        <div className="text">
          <span>{user.username}</span>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
