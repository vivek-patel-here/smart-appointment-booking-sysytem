import React, { useContext, useEffect } from "react";
import "./Home.css";
import StoreContext from "../../Contexts/Store";
import Category from "../../Components/Category/Category";
import Landing from "../../Components/Landing/Landing";
import Listing from "../../Components/Listing/Listing";
import BottomInfo from "../../Components/Bottominfo/BottomInfo";


function Home() {
  const {isLogin,setIsLogin } = useContext(StoreContext);
  return (
    <div className="home">
      <Landing />
      {isLogin && <Category />}
      <Listing/>
      <BottomInfo/>
    </div>
  );
}

export default Home;
