import React, { useState, useContext } from "react";
import "./Navbar.css";
import StoreContext from "../../Contexts/Store";

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
          <h1>Smart Book - Service</h1>
        </a>
        <p onClick={PerformLogout} style={{cursor:"pointer"}}>Logout</p>
      </nav>
    </div>
  );
}

export default Navbar;
