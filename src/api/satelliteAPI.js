import axios from "axios";

// Utility function to handle errors
const handleApiError = (error, defaultMessage) => {
  console.error("API Error:", error.response?.data || error.message);
  throw error.response?.data || new Error(defaultMessage);
};

// Generate Advisory Payload
export const genrateAdvisory = async ({
  soilMoisture,
  farmDetails,
  npkData,
  weatherData,
}) => {
  const {
    cropName,
    sowingDate,
    variety,
    typeOfIrrigation: irrigation_type,
  } = farmDetails || {};

  if (!cropName || !sowingDate || !npkData) {
    throw new Error("Invalid data provided for generating advisory.");
  }

  const payload = {
    crop_name: cropName,
    sowing_date: sowingDate,
    bbch_stage: npkData?.Crop_Growth_Stage,
    variety,
    irrigation_type,
    humidity: Math.round(weatherData?.humidity),
    temp: Math.round(weatherData?.temp),
    rain: weatherData?.precipprob,
    soil_temp: Math.round(
      soilMoisture?.data?.Soil_Temperature?.Soil_Temperature_max || 0
    ),
    soil_moisture: Math.round(
      soilMoisture?.data?.Soil_Moisture?.Soil_Moisture_max || 0
    ),
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL_SATELLITE}/generate-advisory-crop`,
      payload
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to generate advisory data.");
  }
};
