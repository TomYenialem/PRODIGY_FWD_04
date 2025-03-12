import React, { useContext } from "react";
import usersImg from "../../assets/images/user.jpg";
// import { authContext } from "../Context/ContextApi";
// import { soketContext } from "../Context/SoketApi";
import { useContextApi } from "../../context/UseContext";

function UserForm({ user }) {
//   const { onlineUser } = useContext(soketContext);

  const { coversation, setConversation } =useContextApi()
  const isSelected = coversation?._id === user._id;
//   const isOnline = onlineUser.includes(user._id);
//   console.log(user._id);
//   console.log(isOnline);

  return (
    <div>
      <div
        className={`items ${isSelected ? "bg-item" : ""}`}
        key={user.id}
        onClick={() => setConversation(user)}
      >
        <img src={user?.profilepic || usersImg} alt="" />
        <div>
          <h1 style={{ color: "red" }}></h1>
        </div>
        <div className="text">
          <span>{user.username}</span>
          {/* <p className="latest-msg">selma nw</p> */}
        </div>
      </div>
    </div>
  );
}

export default UserForm;
