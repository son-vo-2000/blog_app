import React from "react";
import "../styles/header.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import blogger from "../../public/blogger.png";

const Header = () => {
  return (
    <header>
      <div className="navbar">
        <Link to="/" className="navbar__logo">
          <img src={blogger} />
        </Link>

        <Navbar />
      </div>
    </header>
  );
};

export default Header;
