import React from "react";
import "./FarmFieldCard.css";
import { ArrowIcon } from "../../../assets/Icons";
import { useNavigate } from "react-router-dom";
import farmImage from "../../../assets/Images/farm-field.png";

const FarmFieldCard = ({ cropName, farmDetails, acre }) => {
  const navigate = useNavigate();
  return (
    <div
      className="farm-field-card"
      onClick={() => {
        navigate("/farm-details", { state: farmDetails });
      }}
    >
      <img src={farmImage} alt="farm-field-image" />
      <div className="farm-field-card-content">
        <div>
          <p>{cropName}</p>
          <small>acre : {acre?.toFixed(2)}</small>
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
