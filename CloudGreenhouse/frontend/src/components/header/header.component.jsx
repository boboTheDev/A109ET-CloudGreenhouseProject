import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/LOGO.png";

import "./header.styles.scss";

const Header = () => (
  <div className="header">
    <Link className="logo-container" to="/">
      <img src={Logo} className="logo" alt="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        ABOUT
      </Link>
      <Link className="option" to="/shop">
        STATS
      </Link>
      <Link className="option" to="/shop">
        HEALTH
      </Link>
      <Link className="option" to="/shop">
        LOGS
      </Link>
    </div>
  </div>
);

export default Header;
