import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
const StoreContext = createContext();

function StoreProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [category, setCategory] = useState("All");
  const url = "https://smart-appointment-booking-sysytem.onrender.com";
  const successMsg = (msg) => {
    return toast.success(msg, { position: "top-right", autoClose: 3000 });
  };
  const errMsg = (msg) => {
    return toast.error(msg, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const [shops,setShops] = useState([]);

  useEffect(()=>{
    if(localStorage.getItem("token")){
      setIsLogin(true)
    }
  })

  return (
    <StoreContext.Provider
      value={{
        isLogin,
        setIsLogin,
        shops,
        setShops,
        category,
        setCategory,
        url,
        successMsg,
        errMsg
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export { StoreProvider };
export default StoreContext;
