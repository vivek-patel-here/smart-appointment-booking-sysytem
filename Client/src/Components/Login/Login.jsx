import React, { useState, useContext } from "react";
import "./Login.css";
import StoreContext from "../../Contexts/Store";
function Login({ setPopup,page,setPage }) {
  const { isLogin, setIsLogin ,url ,successMsg,errMsg } = useContext(StoreContext);
  const [credential, setCredential] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [visibilty,setVisibility] =useState(false);

  const PerformLogin =async()=>{
    const reqBody ={
      email:credential.email.toString(),
      password:credential.password.toString()
    }

    const response = await fetch(url+"/auth/login",{
      method:'POST',
      headers:{
        'content-type':"application/json"
      },
      body:JSON.stringify(reqBody)
    })
    const parsedResponse = await response.json();
    if(!parsedResponse.success){
      return errMsg(parsedResponse.message);
    }
    localStorage.setItem("token",parsedResponse.token);
    localStorage.setItem("user",parsedResponse.user);
    setIsLogin(true);
    return successMsg(parsedResponse.message);
  }

  const PerformSignup =async()=>{
    const reqBody ={
      username:credential.username.toString(),
      email:credential.email.toString(),
      password:credential.password.toString()
    }

    const response = await fetch(url+"/auth/signup",{
      method:'POST',
      headers:{
        'content-type':"application/json"
      },
      body:JSON.stringify(reqBody)
    })
    const parsedResponse = await response.json();
    if(!parsedResponse.success){
      return errMsg(parsedResponse.message);
    }
    localStorage.setItem("token",parsedResponse.token);
    localStorage.setItem("user",parsedResponse.user);
    setIsLogin(true);
    return successMsg(parsedResponse.message);
  }


  const handleSubmit=(event)=>{
    event.preventDefault();
    if(page==="Login") PerformLogin();
    if(page==="Signup") PerformSignup();
    setPopup(false);
  }

  const handleChange=(event)=>{
      setCredential((prev)=>{
          return {...prev , [event.target.name]:[event.target.value]};
      })
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <i
          className="ri-close-large-line"
          onClick={() => {
            setPopup(false);
          }}
        ></i>
        <h1>{page == "Login" ? "Login" : "Signup"}</h1>

        {page == "Signup" && (
          <input
            type="text"
            name="username"
            placeholder="Enter your Username"
            value={credential.username}
            required
            onChange={handleChange}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          onChange={handleChange}
          required
          value={credential.email}
        />

        <div id="Login-password-div"><input
          type={visibilty?"text":"password"}
          name="password"
          id="login-password"
          placeholder="Enter your Password"
          onChange={handleChange}
          required
          value={credential.password}
        /> {visibilty && <i className="ri-eye-line" onClick={()=>setVisibility(false)}></i>}
        {!visibilty && <i className="ri-eye-off-line" onClick={()=>setVisibility(true)}></i>}
         </div>

        {page == "Signup" && <button>Sign Up</button>}
        {page == "Login" && <button>Log In</button>}
        {page == "Login" && (
          <p>
            Don't have an account ? Try{" "}
            <span
              onClick={() => {
                setPage("Signup");
              }}
            >
              Signup
            </span>
            .
          </p>
        )}
        {page == "Signup" && (
          <p>
            Already have an account ? Try{" "}
            <span
              onClick={() => {
                setPage("Login");
              }}
            >
              Login
            </span>
            .
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
