import React from "react";
import "./FarmDetails.css";
import FarmImage from "../../../assets/Images/farm-image.jpg";
import { MyFarmColorIcon, ShareButtonIcon } from "../../../assets/Icons";

const FarmDetails = ({ farmData, onEdit }) => {
  return (
    <div className="farm-details-container">
      {/* Farm Header */}
      <div className="farm-header">
        <div className="heading">
          <div className="icon">
            <MyFarmColorIcon />
          </div>
          <div>
            <h3>My Farm</h3>
            <p>{farmData.location || "Nagpur, Maharashtra"}</p>
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
                <td>{farmData.farmName || "N/A"}</td>
              </tr>
              <tr>
                <th>Crop:</th>
                <td>{farmData.crop || "N/A"}</td>
              </tr>
              <tr>
                <th>Sowing Date:</th>
                <td>{farmData.sowingDate || "N/A"}</td>
              </tr>
              <tr>
                <th>Area:</th>
                <td>{farmData.area || "N/A"} Acre</td>
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
