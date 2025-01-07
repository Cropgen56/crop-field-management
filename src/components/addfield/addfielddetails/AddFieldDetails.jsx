import React, { useState } from "react";
import "./AddFieldDetails.css";
import FarmImage from "../../../assets/Images/farm-image.jpg";
import { MyFarmColorIcon } from "../../../assets/Icons";

const AddFieldDetails = ({ isOpen, toggleForm }) => {
  // Initialize state to hold field data
  const [field, setField] = useState({
    farmName: "",
    crops: "",
    sowingDate: "",
    variety: "",
    irrigation: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setField({ ...field, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Farm Details:", field);
    // Additional actions like API calls or state updates can go here
  };

  return (
    <>
      {/* Sliding Form */}
      <div className={`add-field-details-container ${isOpen ? "open" : ""}`}>
        {/* Header Section */}
        <div className="form-header">
          <div className="heading">
            <div className="icon">
              <MyFarmColorIcon />
            </div>
            <div>
              <h3>My Farm</h3>
              <p>Nagpur, Maharashtra</p>
            </div>
          </div>
          <button className="close-button" onClick={toggleForm}>
            ✕
          </button>
        </div>

        {/* Content Section */}
        <div className="form-content">
          {/* Left Image Section */}
          <div className="image-container">
            <img src={FarmImage} alt="Farm" />
          </div>

          {/* Right Form Section */}
          <form className="form-details" onSubmit={handleSubmit}>
            {/* Farm Name */}
            <label htmlFor="farmName">Farm Name</label>
            <input
              type="text"
              id="farmName"
              name="farmName"
              value={field.farmName}
              onChange={handleInputChange}
            />

            {/* Crops */}
            <label htmlFor="crops">Crops</label>
            <select
              id="crops"
              name="crops"
              value={field.crops}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                {/* Select crop */}
              </option>
              <option value="soybean">Soybean</option>
              <option value="wheat">Wheat</option>
              <option value="corn">Corn</option>
            </select>

            {/* Sowing Date */}
            <label htmlFor="sowingDate">Sowing Date</label>
            <input
              type="date"
              id="sowingDate"
              name="sowingDate"
              value={field.sowingDate}
              onChange={handleInputChange}
            />

            {/* Varity */}
            <label htmlFor="variety">Variety</label>
            <input
              type="text"
              id="variety"
              name="variety"
              value={field.variety}
              onChange={handleInputChange}
            />
            {/* Type of Irrigation */}
            <label htmlFor="irrigation">Type of Irrigation</label>
            <select
              id="irrigation"
              name="irrigation"
              value={field.irrigation}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                {/* Select irrigation type */}
              </option>
              <option value="open-irrigation">Open Irrigation</option>
              <option value="drip-irrigation">Drip Irrigation</option>
              <option value="sprinkler">Sprinkler</option>
            </select>
          </form>
        </div>
        {/* Save Button */}
        <button type="submit" className="save-button">
          Save Farm
        </button>
      </div>
    </>
  );
};

export default AddFieldDetails;
