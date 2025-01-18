import React, { useEffect } from "react";
import "./MyFarm.css";
import { PlusIcon } from "../../../assets/Icons";
import FarmFieldCard from "../cropcard/FarmFieldCard.jsx";
import { useNavigate } from "react-router-dom";

const MyFarm = ({ fields }) => {
  const navigate = useNavigate();

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
              navigate("/add-field");
            }}
          >
            <div>
              <p>Crop Name</p>
              <small>**ha</small>
            </div>
            <div className="add-field-button">
              <PlusIcon />
            </div>
          </div>
        </div>
        {/* Crop Cards */}
        <div className="crop-list">
          {!fields.isEmpty
            ? fields?.map((field, index) => (
                <FarmFieldCard
                  key={index}
                  cropName={field?.cropName}
                  fieldSize={field?.fieldSize}
                  farmDetails={field}
                  acre={field?.acre}
                />
              ))
            : // <div>No farms available</div>
              false}
        </div>
      </div>
    </div>
  );
};

export default MyFarm;
