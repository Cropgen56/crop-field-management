import React from "react";
import "./CropCard.css";

const CropCard = ({ cropName, fieldSize }) => {
  return (
    <div className="crop-card">
      <h3>{cropName}</h3>
      <p>{fieldSize}</p>
    </div>
  );
};

export default CropCard;
