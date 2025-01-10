import React, { useId, useState } from "react";
import "./AddFieldDetails.css";
import FarmImage from "../../../assets/Images/farm-image.jpg";
import { MyFarmColorIcon } from "../../../assets/Icons";
import { useDispatch } from "react-redux";
import { addFarmField } from "../../../store/farmSlice";
import { useNavigate } from "react-router-dom";

const AddFieldDetails = ({ isOpen, toggleForm, fieldCoordinate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate("/my-farms");

  const userData = JSON.parse(localStorage.getItem("userData"));

  // Initialize state to hold field data
  const [field, setField] = useState({
    farmName: "",
    cropName: "",
    sowingDate: "",
    variety: "",
    irrigation: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setField({ ...field, [name]: value });
  };

  // Validate form fields and check data types
  const validateForm = () => {
    let valid = true;

    if (
      !field.farmName ||
      typeof field.farmName !== "string" ||
      field.farmName.trim() === ""
    ) {
      valid = false;
      alert("Farm Name is required and must be a string.");
    }

    if (!field.cropName) {
      valid = false;
      alert("Please select a crop.");
    }

    if (!field.sowingDate || isNaN(Date.parse(field.sowingDate))) {
      valid = false;
      alert("Sowing Date is required.");
    }

    if (
      !field.variety ||
      typeof field.variety !== "string" ||
      field.variety.trim() === ""
    ) {
      valid = false;
      alert("Variety is required .");
    }

    if (!field.irrigation) {
      valid = false;
      alert("Please select an irrigation type.");
    } else if (
      !["open-irrigation", "drip-irrigation", "sprinkler"].includes(
        field.irrigation
      )
    ) {
      valid = false;
      alert("Invalid irrigation type selected.");
    }

    return valid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (validateForm()) {
      dispatch(
        addFarmField({
          latlng: fieldCoordinate,
          userId: userData?._id,
          cropName: field.cropName,
          variety: field.variety,
          sowingDate: field.sowingDate,
          typeOfIrrigation: field.irrigation,
          farmName: field.farmName,
        })
      ).then((res) => {
        if (res?.payload?.success) {
          alert("Farm added successfully");
          const farmDetails = res?.payload?.farmField;
          console.log(farmDetails);
          navigate("/farm-details", { state: farmDetails });
        }
      });
    } else {
      console.log("Form validation failed");
    }
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

            {/* cropName */}
            <label htmlFor="cropName">cropName</label>
            <select
              id="cropName"
              name="cropName"
              value={field.cropName}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select crop
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

            {/* Variety */}
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
                Select irrigation type
              </option>
              <option value="open-irrigation">Open Irrigation</option>
              <option value="drip-irrigation">Drip Irrigation</option>
              <option value="sprinkler">Sprinkler</option>
            </select>
          </form>
        </div>
        {/* Save Button */}
        <button type="submit" className="save-button" onClick={handleSubmit}>
          Save Farm
        </button>
      </div>
    </>
  );
};

export default AddFieldDetails;
