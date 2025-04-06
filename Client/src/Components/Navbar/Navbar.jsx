import React, { useState, useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import StoreContext from "../../Contexts/Store";
import { logo } from "../../assets/assets";

function Navbar({ setPopup, setPage }) {
  let { isLogin, setIsLogin, setCategory, setBooking } =
    useContext(StoreContext);
  let [boxstyle, setBoxStyle] = useState({
    top: "-400%",
  });

  const close = () => {
    setBoxStyle((prev) => {
      return { ...prev, top: "-400px" };
    });
  };
  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogin(false);
    setCategory("All");
    setBooking([]);
  };

  return (
    <div className="navbar">
      <nav className="nav">
        <Link to="/">
          <img src={logo} alt="SmartBook" className="nav-logo" />
        </Link>

        {isLogin && (
          <ul className="nav-links">
            <Link to="/home">Home</Link>
            <a href="#footer">Abouts</a>
            <Link to="/book">Appointments</Link>
            <a href="#footer">Contact</a>
          </ul>
        )}

        {isLogin && (
          <p className="nav-logout" onClick={Logout}>
            Logout
          </p>
        )}

        {!isLogin && (
          <p
            className="nav-start"
            onClick={() => {
              setPopup(true);
              setPage("Login");
            }}
          >
            Get Started
          </p>
        )}

        {/* menu bar sign */}
        {isLogin && (
          <label htmlFor="nav-responsive-active" className="nav-menu-response" aria-label="Open menu">
            <i className="ri-menu-2-fill nav-icon"></i>
          </label>
        )}

        {/* ***************Responsibe navbar ****************/}
      </nav>
      <input type="checkbox" id="nav-responsive-active" />
      {isLogin && (
        <ul className="nav-links-responsive">
          <label
            htmlFor="nav-responsive-active"
            className="nav-responsive-close"
          >
            <i className="ri-close-circle-line nav-icon"></i>
          </label>
          <Link to="/home" onClick={() => document.getElementById("nav-responsive-active").checked = false}>Home</Link>
          <a href="#footer" onClick={() => document.getElementById("nav-responsive-active").checked = false}>Abouts</a>
          <Link to="/book" onClick={() => document.getElementById("nav-responsive-active").checked = false}>Appointments</Link>
          <a href="#footer" onClick={() => document.getElementById("nav-responsive-active").checked = false}>Contact</a>
          <p className="nav-logout" onClick={() =>{ Logout(); document.getElementById("nav-responsive-active").checked = false}}>
            {" "}
            Logout
          </p>
        </ul>
      )}
    </div>
  );
}

export default Navbar;
