import React, { useEffect } from "react";
import "./MyFarm.css";
import { AddFieldIcon } from "../../../assets/Icons";
import FarmFieldCard from "../cropcard/FarmFieldCard.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFarmFields } from "../../../store/farmSlice.js";
import Loading from "../../common/Loading/Loading.jsx";

const MyFarm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData")) || {};

  useEffect(() => {
    if (userData?._id) {
      dispatch(getFarmFields(userData?._id));
    }
  }, []);

  const farmState = useSelector((state) => state?.farm);
  const { fields = [], status, error } = farmState || {};

  // Handle loading and error states
  if (status === "loading") {
    return <Loading />;
  }

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
              <AddFieldIcon />
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
