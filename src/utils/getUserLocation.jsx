import axios from "axios";

export const getCityState = async ({ lat, lng }) => {
  // Validate input
  if (typeof lat !== "number" || typeof lng !== "number") {
    console.error("Invalid latitude or longitude provided.");
    return { city: null, state: null };
  }

  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

  try {
    const response = await axios.get(url);

    // Check if address is available
    const address = response?.data?.address;
    if (!address) {
      console.error("Address not found in response.");
      return { city: null, state: null };
    }

    // Extract city and state
    const city =
      address.city ||
      address.town ||
      address.village ||
      address.hamlet ||
      address.locality ||
      address.suburb;
    const state = address.state;

    console.log("City:", city, "State:", state);

    return { city, state };
  } catch (error) {
    console.error("Error fetching location data:", error.message);
    return { city: null, state: null }; // Return null values on error
  }
};
