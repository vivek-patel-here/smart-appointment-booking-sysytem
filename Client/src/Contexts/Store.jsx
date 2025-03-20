import React, { createContext, useEffect, useState } from "react";
import { randomImg } from "../assets/assets";
import { toast } from "react-toastify";
const StoreContext = createContext();

function StoreProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [category, setCategory] = useState("All");
  const url = "http://localhost:5000";
  const successMsg = (msg) => {
    return toast.success(msg, { position: "top-right", autoClose: 3000 });
  };
  const errMsg = (msg) => {
    return toast.error(msg, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const shops = [
    {
      shopId: "0x11",
      rating:5,
      shopImg: randomImg,
      owner :"deepak babu",
      shopName: "Elite Spa & Wellness",
      description: "A premium spa offering relaxation and rejuvenation.",
      category: "Beauty & Wellness",
      location: "Mumbai, India",
      openingTime: "9:00",
      closingTime: "22:00",
    },
    {
      shopId: "0x12",
      rating:5,
      shopImg: randomImg,
      shopName: "Sunshine Clinic",
      description: "Your health is our priority with expert doctors available.",
      category: "Medical & Health Services",
      location: "Pune, India",
      openingTime: "10:00",
      closingTime: "20:00",
    },
    {
      shopId: "0x13",
      rating:5,
      shopImg: randomImg,
      shopName: "AutoCare Hub",
      description: "Complete car servicing and repairs at affordable rates.",
      category: "Car Services",
      location: "Bangalore, India",
      openingTime: "8:00",
      closingTime: "21:00",
    },
    {
      shopId: "0x14",
      rating:5,
      shopImg: randomImg,
      shopName: "Smart Tutoring Academy",
      description: "Expert tutoring services for school and college students.",
      category: "Educational",
      location: "Hyderabad, India",
      openingTime: "7:00",
      closingTime: "19:00",
    },
    {
      shopId: "0x15",
      rating:5,
      shopImg: randomImg,
      shopName: "Tasty Bites Cafe",
      description: "Delicious meals and snacks, freshly prepared.",
      category: "Restaurant",
      location: "Kolkata, India",
      openingTime: "11:00",
      closingTime: "23:00",
    },
    {
      shopId: "0x16",
      rating:5,
      shopImg: randomImg,
      shopName: "QuickFix Garage",
      description: "Reliable car repair and maintenance services.",
      category: "Car Services",
      location: "Chennai, India",
      openingTime: "9:00",
      closingTime: "20:00",
    },
    {
      shopId: "0x17",
      rating:5,
      shopImg: randomImg,
      shopName: "SkinGlow Beauty Studio",
      description: "Professional beauty and skincare treatments.",
      category: "Beauty & Wellness",
      location: "Jaipur, India",
      openingTime: "10:00",
      closingTime: "21:00",
    },
    {
      shopId: "0x18",
      rating:5,
      shopImg: randomImg,
      shopName: "Healthy Life Pharmacy",
      description: "Quality medicines and health consultations.",
      category: "Medical & Health Services",
      location: "Lucknow, India",
      openingTime: "8:00",
      closingTime: "22:00",
    },
    {
      shopId: "0x19",
      rating:5,
      shopImg: randomImg,
      shopName: "Speedy Auto Solutions",
      description: "Efficient and cost-effective car repairs.",
      category: "Car Services",
      location: "Ahmedabad, India",
      openingTime: "9:00",
      closingTime: "20:00",
    },
    {
      shopId: "0x1A",
      rating:5,
      shopImg: randomImg,
      shopName: "Mind Sharp Coaching",
      description: "Specialized coaching for competitive exams.",
      category: "Educational",
      location: "Bhopal, India",
      openingTime: "6:30",
      closingTime: "18:00",
    },
    {
      shopId: "0x1B",
      rating:5,
      shopImg: randomImg,
      shopName: "Spicy Treat Restaurant",
      description: "Authentic Indian cuisine made with love.",
      category: "Restaurant",
      location: "Indore, India",
      openingTime: "12:00",
      closingTime: "23:30",
    },
    {
      shopId: "0x1C",
      rating:5,
      shopImg: randomImg,
      shopName: "AutoFix Experts",
      description: "Full-service auto repair and diagnostics.",
      category: "Car Services",
      location: "Goa, India",
      openingTime: "8:00",
      closingTime: "19:30",
    },
    {
      shopId: "0x1D",
      rating:5,
      shopImg: randomImg,
      shopName: "Glow & Shine Salon",
      description: "Top-rated beauty treatments and styling services.",
      category: "Beauty & Wellness",
      location: "Nagpur, India",
      openingTime: "10:00",
      closingTime: "20:30",
    },
    {
      shopId: "0x1E",
      rating:5,
      shopImg: randomImg,
      shopName: "MediCare Health Hub",
      description: "24/7 medical assistance and emergency care.",
      category: "Medical & Health Services",
      location: "Dehradun, India",
      openingTime: "24/7",
      closingTime: "24/7",
    },
    {
      shopId: "0x1F",
      rating:5,
      shopImg: randomImg,
      shopName: "Wheels Auto Garage",
      description: "Affordable car repair and maintenance.",
      category: "Car Services",
      location: "Raipur, India",
      openingTime: "9:00",
      closingTime: "19:00",
    },
    {
      shopId: "0x20",
      rating:5,
      shopImg: randomImg,
      shopName: "Bright Minds Academy",
      description: "Helping students achieve academic excellence.",
      category: "Educational",
      location: "Patna, India",
      openingTime: "7:00",
      closingTime: "18:30",
    },
    {
      shopId: "0x21",
      rating:5,
      shopImg: randomImg,
      shopName: "Flavors of India",
      description: "Taste the best Indian delicacies in town.",
      category: "Restaurant",
      location: "Shimla, India",
      openingTime: "13:00",
      closingTime: "22:30",
    },
    {
      shopId: "0x22",
      rating:5,
      shopImg: randomImg,
      shopName: "Serene Spa",
      description: "Relax and rejuvenate with our spa services.",
      category: "Beauty & Wellness",
      location: "Varanasi, India",
      openingTime: "9:30",
      closingTime: "20:00",
    },
    {
      shopId: "0x24",
      rating:5,
      shopImg: randomImg,
      shopName: "Print & Go",
      description: "Fast and reliable printing and photocopy services.",
      category: "Others",
      location: "Mumbai, India",
      openingTime: "9:00",
      closingTime: "21:00",
    },
    {
      shopId: "0x25",
      rating:5,
      shopImg: randomImg,
      shopName: "Pack n Move",
      description: "Affordable and secure packing and moving services.",
      category: "Others",
      location: "Delhi, India",
      openingTime: "8:00",
      closingTime: "20:00",
    },
    {
      shopId: "0x26",
      rating:5,
      shopImg: randomImg,
      shopName: "FixIt Electronics",
      description: "Repairing gadgets, mobiles, and home appliances.",
      category: "Others",
      location: "Bangalore, India",
      openingTime: "10:00",
      closingTime: "22:00",
    },
    {
      shopId: "0x27",
      rating:5,
      shopImg: randomImg,
      shopName: "Pet Haven",
      description: "A cozy pet grooming and boarding service.",
      category: "Others",
      location: "Kolkata, India",
      openingTime: "7:00",
      closingTime: "19:00",
    },
    {
      shopId: "0x28",
      rating:5,
      shopImg: randomImg,
      shopName: "Hobby Corner",
      description: "A store for art supplies, crafts, and hobby kits.",
      category: "Others",
      location: "Hyderabad, India",
      openingTime: "10:00",
      closingTime: "20:30",
    },
    {
      shopId: "0x23",
      rating:5,
      shopImg: randomImg,
      shopName: "Green Leaf Restaurant",
      description: "Healthy, organic, and delicious meals.",
      category: "Restaurant",
      location: "Chandigarh, India",
      openingTime: "11:00",
      closingTime: "23:00",
    },
  ];
  useEffect(()=>{
    if(localStorage.getItem("token")){
      setIsLogin(true)
    }
  })

  return (
    <StoreContext.Provider
      value={{
        isLogin,
        setIsLogin,
        shops,
        category,
        setCategory,
        url,
        successMsg,
        errMsg,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export { StoreProvider };
export default StoreContext;
