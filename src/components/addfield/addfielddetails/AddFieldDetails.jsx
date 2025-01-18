import React, { useId, useState } from "react";
import "./AddFieldDetails.css";
import FarmImage from "../../../assets/Images/farm-image.jpg";
import { MyFarmColorIcon } from "../../../assets/Icons";
import { useDispatch } from "react-redux";
import { addFarmField } from "../../../store/farmSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../common/Loading/Loading";
import * as turf from "@turf/turf";

const AddFieldDetails = ({
  isOpen,
  toggleForm,
  fieldCoordinate,
  setIsSubmitting,
}) => {
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

  // calculate the farm in acer
  const calculateArea = (corrdinatesPoint) => {
    const coordinates = corrdinatesPoint.map((point) => [point.lng, point.lat]);
    coordinates.push(coordinates[0]);
    const polygon = turf.polygon([coordinates]);
    const area = turf.area(polygon);

    return area / 4046.86;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (validateForm()) {
      setIsSubmitting(true);
      dispatch(
        addFarmField({
          latlng: fieldCoordinate,
          userId: userData?._id,
          cropName: field.cropName,
          variety: field.variety,
          sowingDate: field.sowingDate,
          typeOfIrrigation: field.irrigation,
          farmName: field.farmName,
          acre: calculateArea(fieldCoordinate),
        })
      ).then((res) => {
        if (res?.payload?.success) {
          setIsSubmitting(false);
          alert("Farm added successfully");
          const farmDetails = res?.payload?.farmField;
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
              <option value="Barley">Barley</option>
              <option value="Wheat">Wheat</option>
              <option value="Pearl Millet">Pearl Millet (Bajra)</option>
              <option value="Sorghum">Sorghum (Jowar)</option>
              <option value="Finger Millet">Finger Millet (Ragi)</option>
              <option value="Chickpea">Chickpea (Bengal Gram)</option>
              <option value="Pigeon Pea">Pigeon Pea (Arhar/Tur)</option>
              <option value="Green Gram">Green Gram (Moong)</option>
              <option value="Black Gram">Black Gram (Urad)</option>
              <option value="Lentil">Lentil (Masoor)</option>
              <option value="Field Pea">Field Pea (Matar)</option>
              <option value="Horse Gram">Horse Gram (Kulthi)</option>
              <option value="Cowpea">Cowpea (Lobia)</option>
              <option value="Groundnut">Groundnut</option>
              <option value="Mustard">Mustard</option>
              <option value="Soybean">Soybean</option>
              <option value="Sunflower">Sunflower</option>
              <option value="Sesame">Sesame (Til)</option>
              <option value="Linseed">Linseed</option>
              <option value="Castor">Castor</option>
              <option value="Safflower">Safflower</option>
              <option value="Niger">Niger</option>
              <option value="Sugarcane">Sugarcane</option>
              <option value="Cotton">Cotton</option>
              <option value="Jute">Jute</option>
              <option value="Tobacco">Tobacco</option>
              <option value="Potato">Potato</option>
              <option value="Tomato">Tomato</option>
              <option value="Brinjal">Brinjal (Eggplant)</option>
              <option value="Cabbage">Cabbage</option>
              <option value="Cauliflower">Cauliflower</option>
              <option value="Onion">Onion</option>
              <option value="Garlic">Garlic</option>
              <option value="Okra">Okra (Lady Finger)</option>
              <option value="Carrot">Carrot</option>
              <option value="Radish">Radish</option>
              <option value="Spinach">Spinach</option>
              <option value="Fenugreek">Fenugreek (Methi)</option>
              <option value="Green Peas">Green Peas</option>
              <option value="Bitter Gourd">Bitter Gourd</option>
              <option value="Bottle Gourd">Bottle Gourd</option>
              <option value="Pumpkin">Pumpkin</option>
              <option value="Cucumber">Cucumber</option>
              <option value="Beans">Beans</option>
              <option value="Mango">Mango</option>
              <option value="Banana">Banana</option>
              <option value="Guava">Guava</option>
              <option value="Apple">Apple</option>
              <option value="Papaya">Papaya</option>
              <option value="Orange">Orange</option>
              <option value="Lemon">Lemon</option>
              <option value="Pomegranate">Pomegranate</option>
              <option value="Grapes">Grapes</option>
              <option value="Pineapple">Pineapple</option>
              <option value="Watermelon">Watermelon</option>
              <option value="Muskmelon">Muskmelon</option>
              <option value="Turmeric">Turmeric</option>
              <option value="Ginger">Ginger</option>
              <option value="Coriander">Coriander</option>
              <option value="Cumin">Cumin</option>
              <option value="Black Pepper">Black Pepper</option>
              <option value="Red Chilies">Red Chilies</option>
              <option value="Tea">Tea</option>
              <option value="Coffee">Coffee</option>
              <option value="Coconut">Coconut</option>
              <option value="Arecanut">Arecanut</option>
              <option value="Rubber">Rubber</option>
              <option value="Dragon Fruit">Dragon Fruit</option>
              <option value="Sponge Gourd">Sponge Gourd</option>
              <option value="Snake Gourd">Snake Gourd</option>
              <option value="Ash Gourd">Ash Gourd</option>
              <option value="Drumstick">Drumstick</option>
              <option value="Chili">Chili</option>
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
