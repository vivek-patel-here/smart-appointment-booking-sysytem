import React, { useContext, useState } from "react";
import "./Edit.css";
import { uploadImage } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import StoreContext from "../../Contexts/Store.jsx";
function Edit({ fetchShopDetails, shop }) {
  const navigate = useNavigate();
  const { errMsg, url, successMsg } = useContext(StoreContext);
  const [shopImg, setShopImg] = useState(null);
  const [shopdetail, setShopdetail] = useState({
    shopName: shop ? shop.shopName : "",
    description: shop ? shop.description : "",
    category: shop ? shop.category : "",
    bussinessNumber: shop ? shop.bussinessNumber : "",
    location: "",
    State: "",
    Country: "",
    openingTime: shop ? shop.openingTime : "",
    closingTime: shop ? shop.closingTime : "",
  });

  const handleChange = (event) => {
    setShopdetail((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let newData = new FormData();
      newData.append("shopName", shopdetail.shopName);
      newData.append("description", shopdetail.description);
      newData.append("category", shopdetail.category);
      newData.append("bussinessNumber", shopdetail.bussinessNumber);
      newData.append(
        "location",
        `${shopdetail.location} , ${shopdetail.State} , ${shopdetail.Country}`
      );
      newData.append("openingTime", shopdetail.openingTime);
      newData.append("closingTime", shopdetail.closingTime);

      if (shopImg) newData.append("shopImg", shopImg);

      const response = await fetch(url + "/shop/", {
        method: "PATCH",
        headers: {
          token: localStorage.getItem("token"),
        },
        body: newData,
      });
      const parsedResponse = await response.json();
      console.log(parsedResponse);
      if (!parsedResponse.success) {
        return errMsg(parsedResponse.message);
      }
      setShopdetail({
        shopName: "",
        description: "",
        category: "",
        bussinessNumber: "",
        location: "",
        State: "",
        Country: "",
        openingTime: "",
        closingTime: "",
      });

      setShopImg(null);
      fetchShopDetails();
      navigate("/home");
      successMsg("Data updated successfully!");
    } catch (err) {
      console.log(err);
      return errMsg("Some server Error!");
    }
  };

  return (
    <div className="edit">
      <h1>Edit your Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="element">
          <span>Upload Image</span>
          <label htmlFor="shop-imag" className="shop-image-label">
            <img
              src={!shopImg ? uploadImage : URL.createObjectURL(shopImg)}
              alt="Upload your Image"
            />
          </label>
          <input
            type="file"
            name="shopImg"
            id="shop-imag"
            onChange={(event) => {
              setShopImg(event.target.files[0]);
            }}
          />
        </div>

        <div className="element">
          <span>Shop Name</span>
          <input
            type="text"
            name="shopName"
            placeholder="Enter Your Shop Name"
            value={shopdetail.shopName}
            onChange={handleChange}
          />
        </div>

        <div className="element">
          <span>Description</span>
          <input
            type="text"
            name="description"
            placeholder="Add Shop Description"
            value={shopdetail.description}
            onChange={handleChange}
          />
        </div>

        <div className="element">
          <span>Select Category of Your Service</span>
          <select
            name="category"
            id="category"
            value={shopdetail.category}
            onChange={handleChange}
          >
            <option>--Select Category--</option>
            <option value="Beauty & Wellness">Beauty & Wellness</option>
            <option value="Medical & Health Services">
              Medical & Health Services
            </option>
            <option value="Car Services">Car Services</option>
            <option value="Educational">Educational</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="element">
          <span>Bussiness Phone Number</span>
          <input
            type="Number"
            name="bussinessNumber"
            min={1000000000}
            placeholder="(+91) 98XXXXXXXX"
            value={shopdetail.bussinessNumber}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <div className="element">
            <span>Location</span>
            <input
              type="text"
              name="location"
              placeholder="Shop Location"
              value={shopdetail.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="element">
            <span>State</span>
            <input
              type="text"
              name="State"
              placeholder="State"
              value={shopdetail.State}
              onChange={handleChange}
              required
            />
          </div>

          <div className="element">
            <span>Country</span>
            <input
              type="text"
              name="Country"
              placeholder="Country"
              required
              value={shopdetail.Country}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="element">
            <span>Opening Time</span>
            <input
              type="time"
              name="openingTime"
              required
              onChange={handleChange}
              value={shopdetail.openingTime}
            />
          </div>

          <div className="element">
            <span>Closing Time</span>
            <input
              type="time"
              name="closingTime"
              value={shopdetail.closingTime}
              onChange={handleChange}
              required
            />
          </div>

         {!shop.ProvideService && <div className="element">
            <span className="btn-span">register</span>
            <button className="btn-edit">Register</button>
          </div>}

         {shop.ProvideService && <div className="element">
            <span className="btn-span">update</span>
            <button className="btn-edit">Update</button>
          </div>}

        </div>
      </form>
    </div>
  );
}

export default Edit;

// openingTime: String,
// closingTime: String,
// });
