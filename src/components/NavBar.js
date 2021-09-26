import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import { UserContext } from "../contexts/UserContext";

const handleLogout = (e) => {
  localStorage.removeItem("token");
};

export const NavBar = () => {
  const { userData } = useContext(UserContext);
  if (localStorage.token) {
    return (
      <>
        <Link to="/recipes">Your recipes</Link>
        <a data-testid="logoutButton" onClick={handleLogout} href="/">
          Logout
        </a>
        <div className="userName">{userData.username}</div>
      </>
    );
  } else {
    return (
      <>
        <Link to="/login">Log In/Sign Up</Link>
      </>
    );
  }
};
