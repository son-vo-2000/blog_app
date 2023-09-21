import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contextApi/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [isOpenDropDown, setisOpenDropDown] = useState(false);
  const navigate = useNavigate();

  const userLogout = () => {
    navigate("/");
    logout();
  };

  const toggleDropDown = () => {
    setisOpenDropDown(!isOpenDropDown);
  };

  const toUserPosts = () => {
    setisOpenDropDown(false);
    navigate("/user/posts");
  };
  return (
    <>
      <div className="navbar__user">
        {currentUser ? (
          <div className="user__loggedin">
            <div className="user">
              <div className="user__name" onClick={toggleDropDown}>
                <span>{currentUser?.username}</span>
                <i className="fa-solid fa-caret-down" />
              </div>
              <div
                className={`user__functions ${
                  isOpenDropDown ? "" : "hideDropDown"
                }`}
              >
                <div className="user__functions-wrapper" onClick={toUserPosts}>
                  <i className="fa-regular fa-folder" />
                  <span>My posts</span>
                </div>
                <div className="user__functions-wrapper" onClick={userLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket"/>
                  <span>Logout</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="user__loggedout">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
        <span className="navbar__user-write">
          <Link to="/write">Write New Blog</Link>
        </span>
      </div>
    </>
  );
};

export default Navbar;
