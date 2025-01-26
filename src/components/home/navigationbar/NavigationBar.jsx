import React from "react";
import "./NavigationBar.css";
import {
  Community,
  CropGenBot,
  HomeIcon,
  MyFarmIcon,
  Logo,
} from "../../../assets/Icons";
import bottomImage from "../../../assets/Images/bottomnavigation.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavigationBar = () => {
  const { t } = useTranslation(); // Translation hook
  const navigate = useNavigate();

  return (
    <div className="bottom-navigation-container">
      <div className="bottom-navigation">
        <img src={bottomImage} alt="navigation bottom image " />
        <div className="nav-item">
          <div className="icon">
            <span
              role="img"
              aria-label="home"
              onClick={() => {
                navigate("/");
              }}
            >
              <HomeIcon />
            </span>
          </div>
          <p>{t("home")}</p>
        </div>
        <div className="nav-item">
          <div className="icon">
            <span role="img" aria-label="community">
              <Community />
            </span>
          </div>
          <p>{t("community")}</p>
        </div>
        <div className="nav-item central-button">
          <div className="circle">
            <span role="img" aria-label="scan">
              <Logo />
            </span>
          </div>
        </div>
        <div className="nav-item">
          <div className="icon">
            <span
              role="img"
              aria-label="my farm"
              onClick={() => {
                navigate("/my-farms");
              }}
            >
              <MyFarmIcon />
            </span>
          </div>
          <p>{t("myFarm")}</p>
        </div>
        <div className="nav-item">
          <div className="icon">
            <span role="img" aria-label="bot">
              <CropGenBot />
            </span>
          </div>
          <p>{t("cropGenBot")}</p>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
