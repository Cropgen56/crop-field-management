import React from "react";
import "./Header.css";
import { ProfileIcon } from "../../../assets/Icons";
import bannerimage from "../../../assets/Images/backgroundbanner.png";
import farmerimage from "../../../assets/Images/farmerimage.png";
import { useTranslation } from "react-i18next";

const Header = () => {
  const userDetails = JSON.parse(localStorage.getItem("userData")) || {};

  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "mr" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div className="header">
      {/* Toggle Button for Language */}

      {/* Banner and Profile Section */}
      <img src={bannerimage} alt="banner image" className="banner-image" />
      <div className="profile-icon">
        <button onClick={toggleLanguage} className="language-swith-button">
          {i18n.language === "en" ? "मराठी" : "English"}
        </button>
        {/* <ProfileIcon /> */}
      </div>
      <div className="header-data">
        {/* Greeting Section */}
        <div className="header-greet">
          {/* <h1>{t("welcomeBack")}</h1> */}
          <h1 style={{ marginTop: "0.9rem" }}>
            <span>{t("welcomeBack")}</span>{" "}
            {userDetails?.firstName || t("defaultFarmer")}
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
