import React from "react";
import "./FarmFieldCard.css";
import { ArrowIcon } from "../../../assets/Icons";
import farmImage from "../../../assets/Images/farm-field.png";

const FarmFieldCard = ({ cropName, fieldSize }) => {
  return (
    <div className="farm-field-card">
      <img src={farmImage} alt="farm-field-image" />
      <div className="farm-field-card-content">
        <div>
          <p>{cropName}</p>
          <small>**{fieldSize}</small>
        </div>
        <div className="add-field-button">
          {" "}
          <ArrowIcon />
        </div>
      </div>
    </div>
  );
};

export default FarmFieldCard;
