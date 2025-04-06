import React, { useState, useContext } from "react";
import "./Navbar.css";
import StoreContext from "../../Contexts/Store";
import { logo } from "../../assets/assets";

function Navbar() {

  const {auth,setAuth,successMsg} =useContext(StoreContext)
  const PerformLogout=()=>{
    localStorage.removeItem("token");
    setAuth(false);
    return successMsg("Logout Successful!")
  }

  return (
    <div className="navbar">
      <nav className="nav">
        <a href="/">
          <img src={logo} alt="" />
        </a>
        <p onClick={PerformLogout} className="logout-btn">Logout</p>
      </nav>
    </div>
  );
}

export default Navbar;
