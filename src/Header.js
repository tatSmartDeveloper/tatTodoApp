import React from "react";
import "./Header.css";
import logo from "./todoLogo.png";

function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <img src={logo} alt="Todo Logo" />
        <h1>Todo List</h1>
      </div>
    </div>
  );
}

export default Header;
