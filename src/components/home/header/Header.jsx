import React from "react";
import "./Header.css";
import { ProfileIcon } from "../../../assets/Icons";
import bannerimage from "../../../assets/Images/backgroundbanner.png";
import farmerimage from "../../../assets/Images/farmerimage.png";

const Header = () => {
  return (
    <div className="header">
      <img src={bannerimage} alt="banner image" className="banner-image" />
      <div className="profile-icon">
        <ProfileIcon />
      </div>{" "}
      <div className="header-data">
        <div className="header-greet">
          <h1>Welcome Back Mahesh</h1>
        </div>
        <div className="farmer-image">
          <img src={farmerimage} alt="farmer-image" />
        </div>
      </div>
    </div>
  );
};

export default Header;
