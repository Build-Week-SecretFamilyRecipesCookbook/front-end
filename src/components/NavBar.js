import React from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const handleLogout = (e) => {
  localStorage.removeItem("token");
  // axiosWithAuth()
  //   .post("/logout")
  //   .then((response) => {
  //     console.log(response);
  //     localStorage.removeItem("token");
  //   });
};

export const NavBar = () => {
  if (localStorage.token) {
    return (
      <>
        <Link to="/recipes">Your Recipes</Link>
        <a data-testid="logoutButton" onClick={handleLogout} href="/">
          Logout
        </a>
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
