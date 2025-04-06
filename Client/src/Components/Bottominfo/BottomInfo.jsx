import React from 'react'
import "./BottomInfo.css"

function BottomInfo() {
  return (
    <div className='bottom-info'>
        <div className="bottom-info-container">
            <div className="bottom-info-box">
            <i className="ri-hourglass-fill bottom-icon"></i>
                <p className='title'>Saves Time </p>
                <div className="text">SmartBook eliminates waiting lines and phone calls—users can instantly book appointments, and businesses manage schedules effortlessly.</div>
            </div>
            <div className="bottom-info-box">
            <i className="ri-mobile-download-fill bottom-icon"></i>
            <p className='title'> Accessible Anytime, Anywhere</p>
            <div className="text">Being fully web-based, it works 24/7 on any device, offering ultimate convenience for users and providers alike.</div>
            </div>
            <div className="bottom-info-box">
            <i className="ri-shake-hands-line bottom-icon"></i>
            <p className='title'>Boosts Business Visibility & Trust</p>
            <div className="text">Local businesses gain an online presence with ratings, reviews, and service listings—helping them reach more customers and build credibility.</div>
            </div>
        </div>
    </div>
  )
}

export default BottomInfo