# SmartBook – Smart Appointment Booking System

SmartBook is a full-stack appointment booking platform built with the **MERN stack** (MongoDB, Express, React, Node.js). It allows service providers to register their businesses and manage appointments, while customers can browse listings and book appointments through a user-friendly interface.

- *Client-Panel [https://smart-appointment-booking-system-client-ke7j.onrender.com]* <br>
- *Service-Provider-Panel [https://smart-appointment-booking-system-service.onrender.com]* <Br>
- *Demo Ppt* [https://docs.google.com/presentation/d/1eflMefJ4azDCzi5GjkY9cpA05yh8aDIf/edit?usp=sharing&ouid=103220399703932400586&rtpof=true&sd=true]
---

## Features

### 🔐 Authentication
- Secure JWT-based login and signup for both users and service providers
- Passwords hashed with Bcrypt
- Cookies for session handling

### 👤 Client Panel
- Browse and search for listed service providers
- Book appointments with preferred time slots
- View and manage upcoming bookings

### 🧑‍💼 Service Provider Panel
- Register and list shops or services
- View appointment requests
- Approve or reschedule booking requests
- Manage time slots and availability

### Media Handling
- Image uploads handled via **Multer**
- Images stored on **Cloudinary**

### Tech Stack
- **Frontend**: React, Axios, React Router, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT, Bcrypt
- **File Upload**: Multer + Cloudinary

---

## 🛠️ Installation

```bash
# Clone the repo
git clone https://github.com/vivek-patel-here/smart-appointment-booking-sysytem.git
cd smartbook

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../Client
npm install

#Install admin panel dependencies
cd ../Admin
npm install

# .Env (server)
PORT=8080
DB_URL=your_mongo_connection_string
JWTSECRET=your_jwt_secret
CLOUD_NAME=your_cloud_name(cloudinary)
API_KEY=your_api_key (cloudinary)
API_SECRET=your_api_secret(cloudinary)
