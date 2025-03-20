import { useContext, useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import StoreContext from "./Contexts/Store.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Home from "./Pages/Home/Home.jsx";
import Appointment from "./Pages/Appointment/Appointment.jsx";
import Login from "./Components/Login/Login.jsx";
import Shop from "./Pages/Shop/Shop.jsx";

function App() {
  const { isLogin } = useContext(StoreContext);
  const [popup, setPopup] = useState(false);
  const [page, setPage] = useState("Login");
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
        </Routes>
      </div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
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
