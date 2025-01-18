// Import necessary libraries
import React, { useState } from "react";
import "./CropProtection.css";
import Disease from "../../../assets/Images/disease.jpg";

const CropProtection = () => {
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
        <h3 className="title">Pest and their control</h3>
        <div className={`description-box ${isExpanded ? "expanded" : ""}`}>
          <strong>Aphids</strong>
          <p>
            Aphids can be problematic pests in wheat. There are several species
            of aphids in wheat fields. These include the English grain aphid and
            the bird-cherry oat aphid. Different species have different life
            cycles. Aphids do little direct damage to wheat.
          </p>
        </div>
        <button onClick={toggleExpand} className="toggle-button">
          {isExpanded ? "Show Less ▲" : "Show More ▼"}
        </button>
      </div>
    </div>
  );
};

export default CropProtection;
