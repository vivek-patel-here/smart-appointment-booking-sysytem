import React, { useState,useContext } from "react";
import {Link} from "react-router-dom"
import "./Navbar.css";
import StoreContext from "../../Contexts/Store";

function Navbar({setPopup,setPage}) {
  let {isLogin,setIsLogin,setCategory} = useContext(StoreContext);
  let [boxstyle, setBoxStyle] = useState({
    top: "-400%",
  });

  const close =() => {
    setBoxStyle((prev) => {
      return { ...prev, top: "-400px" };
    });
  }
  const Logout =()=>{
    localStorage.removeItem("token");
    setIsLogin(false);
  }
  return (
    <div className="navbar">
      <nav className="nav">
        <Link to="/"><h1>Smart Book</h1></Link>
        <ul>
          {isLogin && <Link to="/home">Home</Link>}
          {isLogin && <Link to="/book">Bookings</Link>}
          {isLogin && <li onClick={()=>{Logout();setCategory("All")}}><i className="ri-logout-box-r-line"></i></li>}
          {!isLogin && (
            <button className="nav-login" onClick={()=>{setPopup(true);setPage('Login')}}>
              Login
            </button>
          )}
          {!isLogin && (
            <button className="nav-signup" onClick={()=>{setPopup(true);setPage('Signup')}}>
              Signup
            </button>
          )}
        </ul>
      </nav>

        {/* *****************************For mobile devices*************************** */}
      <nav className="nav-responsive">
        <i className="ri-menu-4-line nav-icon" ></i>
        <h1>Smart Book</h1>
        {isLogin&&<div></div>}
        { !isLogin &&<i
          className="ri-account-circle-line nav-icon"
          onClick={() => {
            setBoxStyle((prev) => {
              return { ...prev, top: "0px" };
            });
          }}
        ></i>}
        <div className="nav-resp-register" style={boxstyle}>
          <button className="nav-login" onClick={()=>{setPopup(true);close();setPage('Login')}}>Login</button>
          <button className="nav-signup" onClick={()=>{setPopup(true);close();setPage('Signup');}}>Signup</button>
          <i
            className="ri-close-large-line  nav-resp-resgister-close"
            onClick={close}
          ></i>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
