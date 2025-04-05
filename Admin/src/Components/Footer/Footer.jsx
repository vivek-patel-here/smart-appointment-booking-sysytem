import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="content">
        <div className="footer-div1">
          <h1>Smart Book</h1>
          <p>
            Hello-This is vivek . Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Nulla magnam unde placeat. Ea sunt velit nihil
            repellendus, pariatur, ipsam sequi consequuntur .
          </p>
          <div className="icon-container">
            <i className="ri-facebook-circle-fill footer-icon"></i>
            <i className="ri-twitter-x-fill footer-icon"></i>
            <i className="ri-linkedin-box-fill footer-icon"></i>
          </div>
        </div>
        <div className="footer-div2">
          <h1>COMPANY</h1>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Appointments</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-div3">
          <h1>GET IN TOUCH</h1>
          <ul>
            <li>+91-45646-46549</li>
            <li>Contact@SmartBook.com</li>
          </ul>
        </div>
      </div>
      <p className="rights">
        Copyright 2025 &copy; SmartBook.com - All Right Reserved.
      </p>
    </div>
  );
}

export default Footer;
