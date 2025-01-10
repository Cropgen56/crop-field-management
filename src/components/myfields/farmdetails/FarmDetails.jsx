import React from "react";
import "./FarmDetails.css";
import FarmImage from "../../../assets/Images/farm-image.jpg";
import { MyFarmColorIcon, ShareButtonIcon } from "../../../assets/Icons";
import { useNavigate } from "react-router-dom";
import * as turf from "@turf/turf";

const FarmDetails = ({ farmData, onEdit }) => {
  const navigate = useNavigate();

  const corrdinatesPoint = farmData?.field;
  let totalArea;
  // calculate area on the basis of coordinate
  const calculateArea = (corrdinatesPoint) => {
    // Transform backend data into Turf.js-compatible format
    const coordinates = farmData?.field?.map((point) => [point.lng, point.lat]);

    // Close the polygon by adding the first point at the end
    coordinates.push(coordinates[0]);

    // Create the polygon
    const polygon = turf.polygon([coordinates]);

    // Calculate area in square meters
    const area = turf.area(polygon);

    // Convert to hectares and acres
    const areaHectares = area / 10000;
    totalArea = area / 4046.86;
  };

  if (corrdinatesPoint) {
    calculateArea(corrdinatesPoint);
  }

  return (
    <div
      className="farm-details-container"
      onClick={() => {
        navigate("/farm-details", { state: farmData });
      }}
    >
      {/* Farm Header */}
      <div className="farm-header">
        <div className="heading">
          <div className="icon">
            <MyFarmColorIcon />
          </div>
          <div>
            <h3>My Farm</h3>
            <p>{farmData?.location || "Nagpur, Maharashtra"}</p>
          </div>
        </div>
        <div>
          <ShareButtonIcon />
        </div>
      </div>

      {/* Content Section */}
      <div className="content">
        {/* Farm Image */}
        <div className="image-container">
          <img src={FarmImage} alt="Farm" />
        </div>

        {/* Farm Details Table */}
        <div className="details">
          <table className="farm-details-table">
            <tbody>
              <tr>
                <th>Farm Name:</th>
                <td>{farmData?.fieldName || "N/A"}</td>
              </tr>
              <tr>
                <th>Crop:</th>
                <td>{farmData?.cropName || "N/A"}</td>
              </tr>
              <tr>
                <th>Sowing Date:</th>
                <td>{farmData?.sowingDate || "N/A"}</td>
              </tr>
              <tr>
                <th>Area:</th>
                <td>{totalArea?.toFixed(2) + " Acre" || "N/A"} Acre</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Button */}
      <div className="edit-farm-button">
        <button className="edit-button" onClick={onEdit}>
          Edit Farm
        </button>
      </div>
    </div>
  );
};

export default FarmDetails;
