import React, { useContext } from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import StoreContext from "../../Contexts/Store";
function Landing() {
  const { shop, reviews } = useContext(StoreContext);
  return (
    <div className="landing">
      {!shop.ProvideService && (
        <div className="landing-content">
          <h1>No shop Registered!</h1>
          <Link to="/edit">
            {" "}
            <button>Register Your Service!</button>
          </Link>
        </div>
      )}
      {shop.ProvideService && (
        <div>
          <img src={shop.shopImg} alt="" height="300px" />
          <h2>{shop.shopName}</h2>
          <p>{shop.description}</p>
          <p>{shop.rating} Star</p>
          <p>{shop.category}</p>
          <p>{shop.location}</p>
          <p>Opening Time :{shop.openingTime}</p>
          <p>Closing Time :{shop.closingTime}</p>
          <p>Mo. : {shop.bussinessNumber}</p>
        </div>
      )}
      <div className="bottom">
        <h1>Discover What Your Customers Are Saying About You</h1>
        {
          <div className="review-section">
            {reviews.length === 0 && <div> No Reviews Yet!</div>}
            {reviews.length !== 0 &&
              reviews.map((r) => {
                return (
                  <div className="review-card">
                    <div className="card-row">
                      <p>{r.from}</p>
                      <p>{r.rating} Star</p>
                    </div>
                    <p>{r.review}</p>
                  </div>
                );
              })}
          </div>
        }
      </div>
    </div>
  );
}

export default Landing;
