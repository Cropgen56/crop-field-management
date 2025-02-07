import React, { useId, useState } from "react";
import FarmImage from "../../../../assets/Images/farm-image.jpg";
import {
  DeleteIcon,
  MyFarmColorIcon,
  UpdateIcon,
} from "../../../../assets/Icons";
import { useDispatch } from "react-redux";
import { deleteFarmField, updateFarmField } from "../../../../store/farmSlice";
import { useNavigate } from "react-router-dom";
import * as turf from "@turf/turf";
import { getCurrentLocation } from "../../../../utils/getUserCurrectCoordinate";
import { getCityState } from "../../../../utils/getUserLocation";
import { useEffect } from "react";
import "./UpdateFarmDetails.css";
import { useTranslation } from "react-i18next";

const UpdateFarmDetails = ({
  isOpen,
  toggleForm,
  setIsSubmitting,
  farmDetails,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate("/my-farms");

  const { t } = useTranslation();
  // fetch the user location data
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // Calculate the centroid
  const centroid = farmDetails?.field?.reduce(
    (acc, point) => {
      acc.lat += point.lat;
      acc.lng += point.lng;
      return acc;
    },
    { lat: 0, lng: 0 }
  );

  centroid.lat /= farmDetails?.field?.length;
  centroid.lng /= farmDetails?.field?.length;

  useEffect(() => {
    if (centroid) {
      getCityState({
        lat: centroid.lat,
        lng: centroid.lng,
        setCity,
        setState,
      });
    }
  }, [centroid]);

  // Initialize state to hold field data
  const [field, setField] = useState({
    farmName: farmDetails?.fieldName,
    cropName: farmDetails?.cropName,
    sowingDate: farmDetails?.sowingDate,
    variety: farmDetails?.variety,
    irrigation: farmDetails?.typeOfIrrigation.replace(/ /g, "-").toLowerCase(),
    typeOfFarming: farmDetails?.typeOfFarming,
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
      setIsSubmitting(true);
      dispatch(
        updateFarmField({
          cropName: field.cropName,
          variety: field.variety,
          sowingDate: field.sowingDate,
          typeOfIrrigation: field.irrigation,
          fieldName: field.farmName,
          farmId: farmDetails?._id,
          typeOfFarming: field.typeOfFarming,
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

  const handelDelete = () => {
    dispatch(deleteFarmField({ farmId: farmDetails?._id })).then(() => {
      navigate("/");
    });
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
              <p>
                {city}, {state}
              </p>
            </div>
          </div>
          <button className="close-button">✕</button>
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
            <label htmlFor="farmName">{t("farm_name")}</label>
            <input
              type="text"
              id="farmName"
              name="farmName"
              value={field.farmName}
              onChange={handleInputChange}
            />
            {/* cropName */}
            <label htmlFor="cropName">{t("cropName")}</label>
            <select
              id="cropName"
              name="cropName"
              value={field.cropName}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                {t("select_crop")}
              </option>
              <option value="Barley">{t("barley")}</option>
              <option value="Wheat">{t("wheat")}</option>
              <option value="PearlMillet">{t("pearl_millet")}</option>
              <option value="Sorghum">{t("sorghum")}</option>
              <option value="FingerMillet">{t("finger_millet")}</option>
              <option value="Chickpea">{t("chickpea")}</option>
              <option value="RedGram">{t("red_gram")}</option>
              <option value="GreenGram">{t("green_gram")}</option>
              <option value="BlackGram">{t("black_gram")}</option>
              <option value="Lentil">{t("lentil")}</option>
              <option value="FieldPea">{t("field_pea")}</option>
              <option value="HorseGram">{t("horse_gram")}</option>
              <option value="Cowpea">{t("cowpea")}</option>
              <option value="Groundnut">{t("groundnut")}</option>
              <option value="Mustard">{t("mustard")}</option>
              <option value="Soybean">{t("soybean")}</option>
              <option value="Sunflower">{t("sunflower")}</option>
              <option value="Sesame">{t("sesame")}</option>
              <option value="Linseed">{t("linseed")}</option>
              <option value="Castor">{t("castor")}</option>
              <option value="Safflower">{t("safflower")}</option>
              <option value="Niger">{t("niger")}</option>
              <option value="Sugarcane">{t("sugarcane")}</option>
              <option value="Cotton">{t("cotton")}</option>
              <option value="Jute">{t("jute")}</option>
              <option value="Tobacco">{t("tobacco")}</option>
              <option value="Potato">{t("potato")}</option>
              <option value="Tomato">{t("tomato")}</option>
              <option value="Brinjal">{t("brinjal")}</option>
              <option value="Cabbage">{t("cabbage")}</option>
              <option value="Cauliflower">{t("cauliflower")}</option>
              <option value="Onion">{t("onion")}</option>
              <option value="Garlic">{t("garlic")}</option>
              <option value="Okra">{t("okra")}</option>
              <option value="Carrot">{t("carrot")}</option>
              <option value="Radish">{t("radish")}</option>
              <option value="Spinach">{t("spinach")}</option>
              <option value="Methi">{t("methi")}</option>
              <option value="GreenPeas">{t("green_peas")}</option>
              <option value="BitterGourd">{t("bitter_gourd")}</option>
              <option value="BottleGourd">{t("bottle_gourd")}</option>
              <option value="Pumpkin">{t("pumpkin")}</option>
              <option value="Cucumber">{t("cucumber")}</option>
              <option value="Beans">{t("beans")}</option>
              <option value="Mango">{t("mango")}</option>
              <option value="Banana">{t("banana")}</option>
              <option value="Guava">{t("guava")}</option>
              <option value="Apple">{t("apple")}</option>
              <option value="Papaya">{t("papaya")}</option>
              <option value="Orange">{t("orange")}</option>
              <option value="Lemon">{t("lemon")}</option>
              <option value="Pomegranate">{t("pomegranate")}</option>
              <option value="Grapes">{t("grapes")}</option>
              <option value="Pineapple">{t("pineapple")}</option>
              <option value="Watermelon">{t("watermelon")}</option>
              <option value="Muskmelon">{t("muskmelon")}</option>
              <option value="Turmeric">{t("turmeric")}</option>
              <option value="Ginger">{t("ginger")}</option>
              <option value="Coriander">{t("coriander")}</option>
              <option value="Cumin">{t("cumin")}</option>
              <option value="BlackPepper">{t("black_pepper")}</option>
              <option value="RedChilies">{t("red_chilies")}</option>
              <option value="Tea">{t("tea")}</option>
              <option value="Coffee">{t("coffee")}</option>
              <option value="Coconut">{t("coconut")}</option>
              <option value="Arecanut">{t("arecanut")}</option>
              <option value="Rubber">{t("rubber")}</option>
              <option value="DragonFruit">{t("dragon_fruit")}</option>
              <option value="SpongeGourd">{t("sponge_gourd")}</option>
              <option value="SnakeGourd">{t("snake_gourd")}</option>
              <option value="AshGourd">{t("ash_gourd")}</option>
              <option value="Drumstick">{t("drumstick")}</option>
              <option value="Chili">{t("chili")}</option>
              <option value="Chia">{t("chia")}</option>
              <option value="Rice">{t("rice")}</option>
              <option value="Kiwi">{t("kiwi")}</option>
              <option value="Amla">{t("amla")}</option>
              <option value="Capsicum">{t("capsicum")}</option>
              <option value="Carrot">{t("carrot")}</option>
              <option value="Other">{t("other")}</option>
            </select>
            {/* Sowing Date */}{" "}
            <label htmlFor="sowingDate">{t("sowing_date")}</label>
            <input
              type="date"
              id="sowingDate"
              name="sowingDate"
              value={field.sowingDate}
              onChange={handleInputChange}
            />
            {/* Variety */}
            <label htmlFor="variety">{t("variety")}</label>
            <input
              type="text"
              id="variety"
              name="variety"
              value={field.variety}
              onChange={handleInputChange}
            />
            {/* Type of Irrigation */}
            <label htmlFor="irrigation">{t("type_of_irrigation")}</label>
            <select
              id="irrigation"
              name="irrigation"
              value={field.irrigation}
              onChange={handleInputChange}
            >
              <option value="drip-irrigation">{t("drip_irrigation")}</option>
              <option value="sprinkler">{t("sprinkler")}</option>
              <option value="open-irrigation">{t("open_irrigation")}</option>
            </select>
            {/* Type of Farming */}
            <label htmlFor="farming">{t("type_of_farming")}</label>
            <select
              id="farming"
              name="typeOfFarming"
              value={field.typeOfFarming}
              onChange={handleInputChange}
            >
              {" "}
              <option value="" disabled>
                {t("select_farming")}
              </option>
              <option value="Inorganic">{t("inorganic")}</option>
              <option value="Integrated">{t("integrated")}</option>
              <option value="Organic">{t("organic")}</option>
            </select>
          </form>
        </div>
        {/* Save Button */}
        <div className="save-update-button">
          {" "}
          <button
            type="submit"
            className="delete-button"
            onClick={handelDelete}
          >
            <DeleteIcon />
            {t("delete_farm")}
          </button>
          <button
            type="submit"
            className="update-button"
            onClick={handleSubmit}
          >
            <UpdateIcon />
            {t("update_farm")}
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateFarmDetails;
