import React from "react";
import "./Landing.css";
function Landing() {
  return (
    <div className="landing">
      <div className="landing-container">
        <div className="home-left">
          <h1>Appointments,</h1>
          <h1>the Smart </h1>
          <h1>Way.</h1>
        </div>
        <div className="home-right">
          <p>
          SmartBook is a modern appointment booking platform designed for ease and efficiency.
           Whether you're a business or a client, schedule and manage appointments seamlessly
          in just a few clicks.
          </p>
          <div className="btn-grp">
          <a href="http://localhost:5174/home" target="_blank"><button>Provide Service</button></a>
          <button>Learn More <i className="ri-arrow-right-up-long-line landing-icon"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
