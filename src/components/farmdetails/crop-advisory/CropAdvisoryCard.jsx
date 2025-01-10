import React from "react";
import "./CropAdvisoryCard.css";

const CropAdvisoryCard = () => {
  return (
    <div className="card">
      <div className="card-section">
        <p>
          <strong className="day">Day 1:</strong>
        </p>
      </div>
      <div className="card-section">
        <p>
          <strong>Spray:</strong> Imidacloprid 17.8% SL (0.3ml/L) +
          Micronutrient Mix (2g/L).
        </p>
      </div>
      <div className="card-section">
        <p>
          <strong>Fertigation:</strong> NPK 19:19:19 (2kg/acre).
        </p>
      </div>
      <div className="card-section">
        <p>
          <strong>Disease:</strong> Monitor for Downy Mildew.
        </p>
        <p>
          <strong>Pest:</strong> Check for Aphids and Whiteflies.
        </p>
      </div>
      <div className="card-section">
        <p>
          <strong>Weather Preparation:</strong> Heavy Rain/Flooding
        </p>
        <ul>
          <li>Create proper drainage channels to prevent waterlogging.</li>
          <li>Elevate seedlings and sensitive crops in raised beds.</li>
        </ul>
      </div>
      {/* <div className="arrow-button">
        <button>➔</button>
      </div> */}
    </div>
  );
};

export default CropAdvisoryCard;
