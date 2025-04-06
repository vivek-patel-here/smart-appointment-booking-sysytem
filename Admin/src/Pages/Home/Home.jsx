import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import Appointment from "../../Components/Appointment/Appointment";
import Edit from "../../Components/Edit/Edit";
import Landing from "../../Components/Landing/Landing";
import StoreContext from "../../Contexts/Store.jsx";
function Home() {
  const { errMsg, url,setShop,setAppoint,auth ,shop ,setReviews} = useContext(StoreContext);
  
  // function to fetch shop details
  const fetchShopDetails = async () => {
    try {
      const response = await fetch(url + "/shop", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          token: localStorage.getItem("token"),
        },
      });

      const parsedData = await response.json();
      if (!parsedData.success) {
        return errMsg(parsedData.message);
      }
      setShop((prev)=>{
        return {...parsedData.record};
      })
    } catch (err) {
      return errMsg("Unable to fetch shop Details Yet!");
    }
  };

  // function to fetch appointment details
  const fetchAppointments =async()=>{
    try {
      const response = await fetch(url + "/shop/appointments", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          token: localStorage.getItem("token"),
        },
      });

      const parsedData = await response.json();
      if (!parsedData.success) {
        return errMsg(parsedData.message);
      }
      setAppoint((prev)=>{
        return [...parsedData.appointments];
      })
    } catch (err) {
      return errMsg("Unable to fetch Appointment Details Yet!");
    }
  }

  //function to fetch reviews
  const fetchReviews =async()=>{
    try{
        const response =await fetch(url+"/shop/review",{
          method:'GET',
          headers:{
            "Content-type":"application/json",
            "token" : `${localStorage.getItem("token")}`
          }
        })
        const parsedResponse =await response.json()
        if(!parsedResponse.success){
          return errMsg(parsedResponse.message);
        }
        setReviews(parsedResponse.reviews);
    }catch(err){
      return errMsg("Unable to fetch the reviews at this moment!");
    }
  }

  useEffect(()=>{
    fetchShopDetails();
    fetchAppointments();
    fetchReviews();
  },[auth])


  return (
    <div className="shop-home">
      <div className="sidebar">
        <div className="sidebar-box">
          <Link to="/home">
          <i className="ri-home-line sidebar-icon"></i>
            <div>Home</div>
          </Link>

          <Link to="/appointment">
          <i className="ri-hourglass-line sidebar-icon"></i>
            <div>Appointment</div>
          </Link>
          <Link to="/edit">
          <i className="ri-edit-box-line sidebar-icon"></i>
            <div>Edit details</div>
          </Link>
        </div>
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/appointment" element={<Appointment  fetchAppointments={fetchAppointments}/>} />
          <Route path="/edit" element={<Edit fetchShopDetails={fetchShopDetails} shop={shop}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
