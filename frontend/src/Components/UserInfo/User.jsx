import React, { useContext, useState } from "react";
import "./User.css";

import { IoVideocam } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";

import UserForm from "./UserForm";
import { GiHamburgerMenu } from "react-icons/gi";
import UseAllUsers from "../../Hooks/UseAllUsers";
import { useContextApi } from "../../context/UseContext";

export default function User() {
  const [add, setAdd] = useState(false);
  const { allUserData, isloding } = UseAllUsers()
  const { authUser } = useContextApi()
  const [menu, setMenu] = useState(true);
  const [search, setSearch] = useState("");

  const searchUser =allUserData.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="user">
      {menu && <GiHamburgerMenu />}
      <div className="user-search">
        <div className="search-bar">
          <FaSearch className="sr" />
          <input
            type="text"
            placeholder="search"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>
        <div className="add">
          <h1 onClick={() => setAdd((prev) => !prev)}>{!add ? "+" : "-"}</h1>
        </div>
      </div>
      {allUserData.length > 0 ? (
        <div className="item-group">
          {isloding ? (
            <ClipLoader />
          ) : (
            <>
              {searchUser.map((user, index) => {
                return <UserForm user={user} key={index} />;
              })}
            </>
          )}
        </div>
      ) : (
        <h3 className="no_user">No User Yet!!</h3>
      )}
    </div>
  );
}
