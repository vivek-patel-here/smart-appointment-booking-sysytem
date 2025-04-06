import React, { useContext } from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import StoreContext from "../../Contexts/Store";
import "@smastrom/react-rating/style.css";
import { Rating } from '@smastrom/react-rating';
function Landing() {
  const { shop, reviews } = useContext(StoreContext);
  return (
    <div className="landing">
      {!shop.ProvideService && (
        <div className="landing-content">
          <h1>No shop Registered!</h1>
          <Link to="/edit">
            {" "}
            <button>Register Your Service &rarr;</button>
          </Link>
        </div>
      )}

      {shop.ProvideService && (
        <>
          <div className="card">
            <div className="card-inner">
              <img src={shop.shopImg} />
              <div className="card-row">
                <h2>{shop.shopName}</h2>
                <Rating style={{ maxWidth: 80 }} value={shop.rating}/>
              </div>
              <p>{shop.category}</p>
              <p>{shop.description}</p>
              <p><span>Address : </span>{shop.location}</p>
              <p><span>Opening Time :</span>{shop.openingTime}</p>
              <p><span>Closing Time :</span>{shop.closingTime}</p>
              <p><span>Contact :</span>+91-{shop.bussinessNumber}</p>
            </div>
          </div>

          <div className="bottom">
            <h1>Discover What Your Customers Are Saying About You</h1>
            
            {
              <div className="review-container">
                {reviews.length === 0 && <div> No Reviews Yet!</div>}
                {reviews.length !== 0 &&
                  reviews.map((R) => {
                    return (
                      <div className="review-box" key={R._id}>
                        <div className="box-head">
                          <p className="username">{R.from}</p>{" "}
                          <p>{R.rating} <i className="ri-star-s-fill"></i></p>
                        </div>
                        <p className="box-body">{R.review}</p>
                      </div>
                    );
                  })}
              </div>
            }
          </div>
        </>
      )}
    </div>
  );
}

export default Landing;
