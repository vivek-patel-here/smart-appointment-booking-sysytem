import React, { useState, useContext } from "react";
import "./Login.css";
import StoreContext from "../../Contexts/Store";
function Login() {
  //Page State :  true -> login and false -> signup
  const [page, setPage] = useState(true);

  //Login Logic
  const { auth, setAuth ,errMsg,successMsg,url} = useContext(StoreContext);

  //loginsignup toggle
  const togglePageState = () => {
    setPage((prev) => !prev);
  };

  //credentials State
  const [credential, setCredential] = useState({
    owner: "",
    RegisteredEmail: "",
    password: "",
  });

  //onChange handler
  const handleChange=(event)=>{
    setCredential((prev)=>{
      return {...prev ,[event.target.name]:[event.target.value]}
    })
  }
  //Shop Login 
  const PerformLogin=async()=>{
    try{
      const response  =await fetch(`${url}/shop/login`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          registeredEmail:credential.RegisteredEmail.toString(),
          password:credential.password.toString()
        })
      })

      const parsedResponse = await response.json();
      if(!parsedResponse.success){
        return errMsg(parsedResponse.message);
      }
      localStorage.setItem("token",parsedResponse.token);
      setAuth(true);

    }catch(err){
      return errMsg("Unable to process your request at this moment!");
    }
  }

  //Shop Signup
  const PerformSignup=async()=>{
    try{
      const response  =await fetch(`${url}/shop/signup`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          registeredEmail:credential.RegisteredEmail.toString(),
          owner:credential.owner.toString(),
          password:credential.password.toString()
        })
      })

      const parsedResponse = await response.json();
      if(!parsedResponse.success){
        return errMsg(parsedResponse.message);
      }
      localStorage.setItem("token",parsedResponse.token);
      setAuth(true);
    }catch(err){
      return errMsg("Unable to process your request at this moment!");
    }
  }

  //onSubmit Handler
  const handleSubmit=(event)=>{
    event.preventDefault();
    if(page){
      PerformLogin();
    }else{
      PerformSignup()
    }
  }

  return (
    <div className="shop-login">
      <div className="left">
        <div>
          <h1>SmartBook Services</h1>
          <p>Appointments , the smart way</p>
        </div>
      </div>
      <div className="right">
        <form onSubmit={handleSubmit}>
          {page && <h1>LOGIN</h1>}
          {!page && <h1>SIGN UP</h1>}
          {!page && (
            <input
              type="text"
              required
              placeholder="Enter Your username"
              className="username"
              name="owner"
              value={credential.owner}
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            required
            placeholder="Enter Your Email"
            className="email"
            name="RegisteredEmail"
            value={credential.RegisteredEmail}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            className="password"
            required
            name="password"
            value={credential.password}
            onChange={handleChange}
          />
          <button>
           {page?"Login":"Signup"}
          </button>
          {page && (
            <p>
              Don't have an account ? Try{" "}
              <span onClick={togglePageState} className="toggle">
                Signup
              </span>
            </p>
          )}
          {!page && (
            <p>
              Already have an account ? Try{" "}
              <span onClick={togglePageState} className="toggle">
                Login
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
