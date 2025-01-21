import React from "react";
import "./Header.css";
import { ProfileIcon } from "../../../assets/Icons";
import bannerimage from "../../../assets/Images/backgroundbanner.png";
import farmerimage from "../../../assets/Images/farmerimage.png";

const Header = () => {
  const userDetails = JSON.parse(localStorage.getItem("userData")) || {};

  return (
    <div className="header">
      <img src={bannerimage} alt="banner image" className="banner-image" />
      <div className="profile-icon">
        <ProfileIcon />
      </div>{" "}
      <div className="header-data">
        <div className="header-greet">
          <h1>Welcome Back </h1>
          <h1 style={{ marginTop: "0.9rem" }}>
            {userDetails?.firstName || "Farmer"}
          </h1>
        </div>
        <div className="farmer-image">
          <img src={farmerimage} alt="farmer-image" />
        </div>
      </div>
    </div>
  );
};

export default Header;
