import React from "react";
import { logo } from "../../assets/assets";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="content">


        <div className="footer-div1">
          <img className="footer-logo" src={logo} alt="SmartBook" />
          <p>
            Developed with love by Vivek. <br /> Explore more of my projects on GitHub
           <br /> and stay connected via LinkedIn. <br />Thanks for stopping by!
          </p>
          <p>
          &copy;2025 | vivek | SmartBook.com
          <br />
          <span>All Rights Reserved</span>
          </p>
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
            <li><a href="https://www.linkedin.com/in/vivek-patel2004/"><i className="ri-linkedin-fill footer-icon"></i></a> LinkedIn </li>
            <li><a href="https://github.com/vivek-patel-here"><i className="ri-github-fill footer-icon"></i></a> GitHub </li>
            <li><i className="ri-mail-line footer-icon"></i> vivek.patel.1057@gmail.com</li>
            <li><i className="ri-phone-line footer-icon"></i>+91-8595818416</li>
          </ul>
        </div>

        
      </div>
    </div>
  );
}

export default Footer;
