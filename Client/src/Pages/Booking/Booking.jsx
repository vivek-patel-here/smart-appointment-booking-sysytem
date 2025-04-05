import React, { useContext, useState, useEffect } from "react";
import "./Booking.css";
import StoreContext from "../../Contexts/Store";
import { useNavigate } from "react-router-dom";
function Booking() {
  const navigate = useNavigate();
  const { url, isLogin, errMsg ,successMsg } = useContext(StoreContext);
  const [booking, setBooking] = useState([]);

  const fetchBooking = async () => {
    let response = await fetch(url + "/book/booking", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    if (!data.success) {
      return console.log(data.message);
    }
    return setBooking((prev) => {
      return [...data["appointments"]];
    });
  };

  const cancelAppointment =async(_id)=>{
    try{
      const response =await fetch(url+"/book/status",{
        method:'PUT',
        headers:{
          "content-type":"application/json",
          "token":`${localStorage.getItem("token")}`
        },
        body:JSON.stringify({_id})
      })
      const parsedResponse =await response.json();
      if(!parsedResponse.success){
        return errMsg(parsedResponse.message);
      }
      fetchBooking();
      return successMsg("Appointment Cancel")
    }catch(err){
      errMsg("Some Error occurred!")
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/home");
      errMsg("You are not logged-in!");
    }
    fetchBooking();
  }, [isLogin]);

  return (
    <div className="booking">
      <div className="booking-content">
        <h1>My Appointments!</h1>
        {booking.length == 0 && <p className="Nobooking">Not Orders Yet !</p>}
        {booking.length != 0 && (
          <ul>
            <li className="book-item">
              <p></p> {/*logo*/}
              <p>Shop</p>
              <p>Customer Details</p>
              <p>Status</p>
              <button onClick={fetchBooking}>Track current Status</button>

            </li>
            {booking.map((elem) => {
              return (
                <li key={elem._id} className="book-item">
                  <i className="ri-calendar-schedule-fill"></i>
                  <p>
                   {elem.shopName}
                  </p>
                  {/*shop name here*/}
                  <div className="book-user">
                    <p>{elem.fullname}</p>
                    <p>Ph.No.:+91 {elem.mobile}</p>
                    <p>Address : {elem.address}</p>
                  </div>
                  <p>{elem.status}</p>
                {!elem.notactive &&  <button onClick={()=>{cancelAppointment(elem._id)}}>Cancel Appointment!</button>}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Booking;
