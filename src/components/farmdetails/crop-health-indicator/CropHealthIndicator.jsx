import React from "react";
import "./CropHealthIndicator.css";

const HealthIndicator = () => {
  return (
    <div className="health-indicator-container">
      <div className="indicator-bar">
        <div className="healthy"></div>
        <div className="moderate"></div>
        <div className="low"></div>
        <div className="cloud"></div>
      </div>
      <div className="indicator-labels">
        <span>Healthy</span>
        <span className="moderate-label">Moderate</span>
        <span className="low-label">Low</span>
        <span className="cloud-label">Cloud</span>
      </div>
    </div>
  );
};

export default HealthIndicator;
