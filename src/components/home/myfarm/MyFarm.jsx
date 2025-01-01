import React from "react";
import CropCard from "../cropcard/CropCard";
import "./MyFarm.css";

const MyFarm = () => {
  return (
    <div className="my-farm">
      <h2>My Farm</h2>
      <button className="add-field-btn">Add Field</button>
      <div className="crop-list">
        <CropCard cropName="Tomato Field" fieldSize="1.2 ha" />
        <CropCard cropName="Wheat Field" fieldSize="2.5 ha" />
        <CropCard cropName="Wheat Field" fieldSize="2.5 ha" />
      </div>
    </div>
  );
};

export default MyFarm;
