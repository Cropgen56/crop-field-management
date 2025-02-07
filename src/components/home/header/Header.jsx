import React, { useEffect, useState } from "react";
import "./Header.css";
import bannerimage from "../../../assets/Images/backgroundbanner.png";
import farmerimage from "../../../assets/Images/farmerimage.png";
import { useTranslation } from "react-i18next";

const Header = () => {
  const userDetails = JSON.parse(localStorage.getItem("userData")) || {};
  const { t, i18n } = useTranslation();

  // Get the saved language or default to Marathi
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "mr"
  );

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "mr" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div className="header">
      {/* Banner and Profile Section */}
      <img src={bannerimage} alt="banner image" className="banner-image" />
      <div className="profile-icon">
        <button onClick={toggleLanguage} className="language-switch-button">
          {language === "mr" ? "English" : "मराठी"}
        </button>
      </div>
      <div className="header-data">
        {/* Greeting Section */}
        <div className="header-greet">
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
