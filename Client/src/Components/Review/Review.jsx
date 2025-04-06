import React, { useContext, useEffect, useState } from "react";
import storeContext from "../../Contexts/Store.jsx";
import "./Review.css";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

function Review({ shopId ,shopName }) {
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const { url, errMsg } = useContext(storeContext);
  const [rating, setRating] = useState(3);

  const handleChange = (event) => {
    setReview(event.target.value);
  };

  const postReview = async () => {
    const newReview = {
      rating,
      review: review.toString(),
      shopId,
    };
    try {
      const response = await fetch(url + "/review", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(newReview),
      });

      const parsedResponse = await response.json();
      if (parsedResponse.success == false) {
        return errMsg(parsedResponse.message);
      }
      fetchReview();
    } catch (err) {
      return errMsg(
        "Unable to post your review at this moment! Try Again later"
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postReview();
    setReview("");
  };

  const fetchReview = async () => {
    try {
      const response = await fetch(url + `/review/${shopId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      const parsedResponse = await response.json();
      if (parsedResponse.success == false) {
        return errMsg(parsedResponse.message);
      }
      setReviews(() => {
        return [...parsedResponse.reviews];
      });
    } catch (err) {
      return errMsg("Unable to fetch the reviews at this moment!");
    }
  };

  useEffect(() => {
    fetchReview();
  }, [reviews]);

  return (
    <div className="review">
      <div className="review-heading">
      <span>We hope you enjoyed your experience with <span className="review-purple">{shopName}</span></span>
      <h1>Would you like to rate and give feedback?</h1>
      </div>
      <form className="post-review" onSubmit={handleSubmit}>
        <textarea
          type="text"
          required
          className="review-input"
          placeholder="Give your feedback Here!"
          name="review"
          value={review}
          onChange={handleChange}
        ></textarea>
      <div className="rate-star"> Rate  <Rating isRequired  value={rating} onChange={setRating} style={{ maxWidth: 100 }} /></div>

        <button>Post</button>
      </form>
      <h2>What people are saying</h2>
      <div className="review-container">
        {reviews.map((R) => {
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
    </div>
  );
}

export default Review;
