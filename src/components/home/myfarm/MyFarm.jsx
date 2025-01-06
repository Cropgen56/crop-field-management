import React from "react";
import "./MyFarm.css";
import { AddFieldIcon } from "../../../assets/Icons";
import FarmFieldCard from "../cropcard/FarmFieldCard.jsx";
import { useNavigate } from "react-router-dom";

const MyFarm = () => {
  const naviage = useNavigate();
  return (
    <div className="my-farm">
      <p className="heading">My Farm</p>
      <div className="crop-list-container">
        {/* Add Field Button */}
        <div className="crop-add-card-button">
          <div className="add-field-placeholder">Add Field</div>
          <div
            className="crop-add-card-content"
            onClick={() => {
              naviage("/add-field");
            }}
          >
            <div>
              <p>Crop Name</p>
              <small>**ha</small>
            </div>
            <div className="add-field-button">
              {" "}
              <AddFieldIcon />
            </div>
          </div>
        </div>
        {/* Crop Cards */}
        <div className="crop-list">
          <FarmFieldCard cropName={"tomato field"} fieldSize={1.2} />
          <FarmFieldCard cropName={"tomato field"} fieldSize={1.2} />
          <FarmFieldCard cropName={"tomato field"} fieldSize={1.2} />
          <FarmFieldCard cropName={"tomato field"} fieldSize={1.2} />
        </div>
      </div>
    </div>
  );
};

export default MyFarm;
