import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Import translation hook
import "./CropProtection.css";
import Disease from "../../../assets/Images/disease.jpg";

const CropProtection = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="pest-control-container">
      {/* Image Section */}
      <div className="image-section">
        <img src={Disease} alt="Aphids" className="pest-image" />
      </div>

      {/* Text Content Section */}
      <div className="content-section">
        <h3 className="title">{t("pestControlTitle")}</h3>
        <div className={`description-box ${isExpanded ? "expanded" : ""}`}>
          <strong>{t("aphids")}</strong>
          <p>{t("aphidsDescription")}</p>
        </div>
        <button onClick={toggleExpand} className="toggle-button">
          {isExpanded ? t("showLess") : t("showMore")}
        </button>
      </div>
    </div>
  );
};

export default CropProtection;
