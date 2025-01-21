import axios from "axios";

// Utility function to handle errors
const handleApiError = (error, defaultMessage) => {
  console.error("API Error:", error.response?.data || error.message);
  throw error.response?.data || new Error(defaultMessage);
};

// Utility function to convert coordinates
const convertToCoordinates = (fields) => {
  return fields.map(({ lat, lng }) => [lng, lat]);
};

// Fetch NPK Data
export const fetcNpkData = async ({ farmDetails }) => {
  const { field, cropName, sowingDate } = farmDetails || {};
  if (!field || !cropName || !sowingDate) {
    throw new Error("Invalid farm details provided for fetching NPK data.");
  }

  const coordinates = convertToCoordinates(field);
  const payload = {
    crop_name: cropName,
    sowing_date: sowingDate,
    geometry: {
      type: "Polygon",
      coordinates,
    },
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SATELLITE_API}/calculate-npk`,
      payload
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch NPK data.");
  }
};

// Generate Advisory Payload
export const genrateAdvisory = async ({
  soilMoisture,
  farmDetails,
  npkData,
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
    humidity: 65, // Example static values; replace if dynamic
    temp: 22,
    rain: 10,
    soil_temp: Math.round(
      soilMoisture?.data?.Soil_Temperature?.Soil_Temperature_max || 0
    ),
    soil_moisture: Math.round(
      soilMoisture?.data?.Soil_Moisture?.Soil_Moisture_max || 0
    ),
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SATELLITE_API}/generate-advisory`,
      payload
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to generate advisory data.");
  }
};

// Fetch Soil Moisture Data
export const fetchSoilMoisture = async ({ farmDetails }) => {
  const { field } = farmDetails || {};
  if (!field) {
    throw new Error(
      "Invalid farm details provided for fetching soil moisture."
    );
  }

  const coordinates = [field.map(({ lat, lng }) => [lat, lng])];
  const payload = { coordinates };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SATELLITE_API}/soil-moisture`,
      payload
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch soil moisture data.");
  }
};

export const socAPI = async ({ farmDetails }) => {
  const { sowingDate, field } = farmDetails || {};

  // Get the current date as the end date
  const endDate = new Date().toISOString().split("T")[0];

  // Calculate the date six months before the current date
  const startDateObj = new Date();
  startDateObj.setMonth(startDateObj.getMonth() - 6);
  const startDate = startDateObj.toISOString().split("T")[0];

  const coordinates = [field.map(({ lat, lng }) => [lat, lng])];

  const payload = {
    start_date: startDate,
    end_date: endDate,
    geometry: coordinates,
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SATELLITE_API}/soc`,
      payload
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    localStorage.setItem("socData", error?.response?.data?.detail);
  }
};

export const ndviAPI = async ({ farmDetails, selectedDate }) => {
  const { field } = farmDetails || {};
  // Get the current date as the end date
  const endDate = new Date().toISOString().split("T")[0];

  // Calculate the date six months before the current date
  const startDateObj = new Date();
  startDateObj.setMonth(startDateObj.getMonth() - 6);
  const startDate = startDateObj.toISOString().split("T")[0];

  const coordinates = [field.map(({ lat, lng }) => [lng, lat])];

  const payload = {
    start_date: startDate,
    end_date: selectedDate ? selectedDate : endDate,
    geometry: coordinates,
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SATELLITE_API}/ndvi`,
      payload
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    localStorage.setItem("socData", error?.response?.data?.detail);
  }
};
