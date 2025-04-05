import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
const StoreContext = createContext();

function StoreProvider({ children }) {
  const url = "http://localhost:5000";

  const [auth, setAuth] = useState(false);
  //Error toast message
  const errMsg = (msg) => {
    return toast.error(msg);
  };
  // Success toast message
  const successMsg = (msg) => {
    return toast.success(msg);
  };
  //current Login shop detail
  const [shop, setShop] = useState({
    ProvideService: false,
  });

  //current login shop appointment
  const [appoint, setAppoint] = useState([]);

  //current login shop reviews
  const [reviews,setReviews] =useState([]);

  return (
    <StoreContext.Provider
      value={{
        auth,
        setAuth,
        errMsg,
        successMsg,
        url,
        shop,
        setShop,
        appoint,
        setAppoint,
        reviews,
        setReviews
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export { StoreProvider };
export default StoreContext;
