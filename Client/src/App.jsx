import { useContext, useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import StoreContext from "./Contexts/Store.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Home from "./Pages/Home/Home.jsx";
import Appointment from "./Pages/Appointment/Appointment.jsx";
import Login from "./Components/Login/Login.jsx";
import Shop from "./Pages/Shop/Shop.jsx";
import Booking from "./Pages/Booking/Booking.jsx";
import Footer from "./Components/Footer/Footer.jsx";

function App() {
  const {url,errMsg, isLogin,shops,setShops } = useContext(StoreContext);
  const [popup, setPopup] = useState(false);
  const [page, setPage] = useState("Login");
  const fetchListings=async()=>{
    try{
      const response =await fetch(url+"/shop/services",{
        method:'GET',
        headers:{
          "content-type":"application/json"
        }
      })

      const parsedData =await response.json();
      if(!parsedData.success){
        return errMsg(parsedData.message);
      }
      setShops(parsedData.shops);
    }catch(err){
      console.log(err)
      return errMsg("Unable to fetch service listings")
    }
  }

  useEffect(()=>{
    fetchListings();
  },[])

  return (
    <>
      {!isLogin && popup && <Login setPopup={setPopup} page={page} setPage={setPage} />}
      <div className="app">
        <Navbar setPopup={setPopup} page={page} setPage={setPage}/>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop/:shopId" element={<Shop />} />
          <Route path="/appoint/:shopId" element={<Appointment/>}/>
          <Route path="/book" element={<Booking/>}/>
        </Routes>
      </div>
      <Footer/>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable
          pauseOnHover
          theme="light"
        />
    </>
  );
}

export default App;
