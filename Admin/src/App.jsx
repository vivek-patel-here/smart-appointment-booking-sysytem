import { useContext, useEffect } from "react";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import StoreContext from "./Contexts/Store";
import { ToastContainer } from "react-toastify";

function App() {
  const { auth, setAuth } = useContext(StoreContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth(true);
    }
  }, [auth]);
  return (
    <>
      {!auth && <Login />}
      {auth && (
        <div className="app">
          <Navbar />
          <Home />
          <Footer />
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
