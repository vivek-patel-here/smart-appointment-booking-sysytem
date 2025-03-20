import React from "react";
import "./Shopcard.css";
import { useNavigate } from "react-router-dom";
function Shopcard({ shop }) {
  const date = new Date();
  let time = date.toTimeString();
  time = time.substring(0, 5);
  const navigate =useNavigate();
  return (
    <div className="shop-card">
      <div className="shop-img-container">
        <img src={shop.shopImg} alt="" className="shop-img" />
        <div className="gredient"></div>
        <h5 className="shop-title">{shop.shopName}</h5>
      </div>
      <div className="shop-content">
        <p className="shop-desc">{shop.description}</p>
        <p className="shop-categ">{shop.category}</p>
        <p className="shop-local">{shop.location}</p>

        <li
          className={
            Number.parseInt(shop.openingTime) <= Number.parseInt(time) &&
            Number.parseInt(time) <= Number.parseInt(shop.closingTime)
              ? "shop-status-open"
              : "shop-status-close"
          }
        >
          {Number.parseInt(shop.openingTime) <= Number.parseInt(time) &&
          Number.parseInt(time) <= Number.parseInt(shop.closingTime)
            ? "Open"
            : "close"} now
        </li>
        <button className="shop-booking-btn" onClick={()=>{navigate(`/shop/${shop.shopId}`)}}>Explore <i className="ri-arrow-right-s-fill"></i></button>
      </div>
    </div>
  );
}

export default Shopcard;
