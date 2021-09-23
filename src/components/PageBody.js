import React from "react";
import { Link } from "react-router-dom";

export const PageBody = () => {
  if (localStorage.token) {
    return <></>;
  } else {
    return (
      <div className="main-content">
        <div className="card">
          <h2>Easily store all of your favorite recipes!</h2>
          <p>
            Upload images, ingredients, and much more to your account and create
            your own personal cookbook!
          </p>
          <p>Get inspirations from other user's recipes!</p>
          <p>Share your own recipes!</p>
        </div>
      </div>
    );
  }
};
