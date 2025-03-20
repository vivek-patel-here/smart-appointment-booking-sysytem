import React, { useContext } from "react";
import "./Listing.css";
import Shopcard from "../Shopcard/Shopcard";
import StoreContext from "../../Contexts/Store";

function Listing() {
  const { shops, category } = useContext(StoreContext);
  return (
    <div className="listing">
      {category !== "All" &&
        shops.map((shop) => {
          if (category === shop.category) {
            return <Shopcard key={shop.shopId} shop={shop} />;
          }
        })}
      {category === "All" &&
        shops.map((shop) => {
          return <Shopcard key={shop.shopId} shop={shop} />;
        })}
    </div>
  );
}

export default Listing;
