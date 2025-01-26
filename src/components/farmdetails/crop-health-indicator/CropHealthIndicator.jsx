import React from "react";
import { useTranslation } from "react-i18next";
import "./CropHealthIndicator.css";

const HealthIndicator = () => {
  const { t } = useTranslation();

  return (
    <div className="health-indicator-container">
      <div className="indicator-bar">
        <div className="healthy"></div>
        <div className="moderate"></div>
        <div className="low"></div>
        <div className="cloud"></div>
      </div>
      <div className="indicator-labels">
        <span>{t("healthy")}</span>
        <span className="moderate-label">{t("moderate")}</span>
        <span className="low-label">{t("low")}</span>
        <span className="cloud-label">{t("cloud")}</span>
      </div>
    </div>
  );
};

export default HealthIndicator;
