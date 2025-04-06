import React, { useContext, useEffect } from 'react'
import "./Shop.css"
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import StoreContext from '../../Contexts/Store';
import Review from '../../Components/Review/Review.jsx';
function Shop() {
    const shopId = useParams().shopId;
    const navigate =useNavigate();
    const {shops,isLogin,errMsg} = useContext(StoreContext);
    
    const desiredShop = shops.filter((shop)=>{
        if(shop.shopId==shopId) return shop;
    })[0];

    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/");
            errMsg("You are not logged-In!")
        }    },[isLogin])
  return (
    <>
    <div className='shop-page'>
        <div className='shop-page-container'>
            <img src={desiredShop.shopImg} alt="" />
        </div>
        <div className='shop-page-content'>
            <div className='shop-page-time'>
            <h1 className='shop-page-title'>{desiredShop.shopName}</h1>
            <h3>{desiredShop.rating} <i className="ri-star-s-fill"></i></h3>
            </div>
            <p>{desiredShop.description}</p>
            <p>{desiredShop.category}</p>
            <p>Owner : {desiredShop.owner}</p>
            <p>Location : {desiredShop.location}</p>
            <div className='shop-page-time'>
           <p >Opens At : {desiredShop.openingTime} </p>
           <p>Closes At : {desiredShop.closingTime}</p>
           </div>
            <button className='shop-page-btn' onClick={()=>{
                navigate(`/appoint/${shopId}`)
            }}>Book appointment
            </button>
        </div>
    </div>
    <Review shopId={shopId} shopName={desiredShop.shopName}/>
    </>
  )
}

export default Shop