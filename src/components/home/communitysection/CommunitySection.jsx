import React from "react";
import "./CommunitySection.css";

const CommunitySection = () => {
  return (
    <div className="community-section">
      <h2>Community</h2>
      <div className="community-options">
        <div className="community-card">
          <p>Farmer Community</p>
          <button>Join Now</button>
        </div>
        <div className="community-card">
          <p>Precision Farming</p>
          <button>Join Now</button>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
