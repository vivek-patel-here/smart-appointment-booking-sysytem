import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Appointment.css";
import StoreContext from "../../Contexts/Store";
function Appointment() {
  const navigate = useNavigate();
  const { shops, isLogin, errMsg ,url ,successMsg} = useContext(StoreContext);
  const shopId = useParams().shopId;
  const desiredShop = shops.filter((shop) => shop.shopId == shopId)[0];
  let now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  now = now.toISOString().slice(0, 16);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/home");
      errMsg("You are not logged-in!");
    }
  }, [isLogin]);

  const [info, setInfo] = useState({
    fullname: "",
    mobile: "",
    address: "",
    appointmentDateTime: "",
    remark: "",
  });

  const handleSubmit = async(event) => {
    event.preventDefault();
    const response =await fetch(url+"/book",{
      method:'POST',
      headers:{
        "Content-Type" :"application/json",
        "token":localStorage.getItem("token")
      },
      body:JSON.stringify({
        shopId,
        fullname:info.fullname.toString(),
        mobile:info.mobile.toString(),
        address:info.address.toString(),
        appointmentDateTime:info.appointmentDateTime.toString(),
        remark:info.remark.toString(),
      })
    })

    const parsedData = await response.json();
    if(!parsedData.success){
      return errMsg(parsedData.message);
    }
    setTimeout(()=>{
      navigate("/home");
    },2000)
    return successMsg(parsedData.message);

  };

  const handleChange = (event) => {
    setInfo((prev)=>{
      return {...prev,[event.target.name]:[event.target.value]}
    })
  };
  return (
    <div className="appointment">
      <div className="appoint-container">
        <div>
          <h1>Online Appointment Form</h1>
          <p>Please Submit true and Complete details</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-head">
            <h1>Personal Information</h1>
            <span className="red-span">*All fields are required</span>
          </div>

          <div className="form-div-container">
            <div className="form-div">
              <span>Full Name</span>
              <input
                type="text"
                name="fullname"
                required
                placeholder="Enter Your Full Name"
                value={info.fullname}
                onChange={handleChange}
              />
            </div>

            <div className="form-div">
              <span>Mobile Number</span>
              <div className="form-phone">
                <span>+91</span>
                <input
                  type="number"
                  inputMode="numeric"
                  required
                  name="mobile"
                  placeholder="for e.g: +91 98XXXXXXXX"
                  value={info.mobile}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-div">
            <span>Home Address</span>
            <input
              type="text"
              className="address"
              required
              name="address"
              placeholder="Enter Your Address"
              value={info.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-div">
            <span>Appointment Date & Timing</span>
            <input
              type="datetime-local"
              name="appointmentDateTime"
              min={now}
              required
              max={"3000-01-01T" + desiredShop.closingTime}
              value={info.appointmentDateTime}
                onChange={handleChange}
            />
          </div>

          <div className="form-div">
            <span>Query Remark</span>
            <textarea type="text" name="remark" className="remark" placeholder="Remark here!  (Optional*)"  value={info.remark}
                onChange={handleChange}/>
          </div>
          <button type="submit" className="form-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Appointment;
