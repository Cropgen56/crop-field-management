export const getCurrentLocation = ({ setLocation, setError }) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
      }
    );
  } else {
    setError("Geolocation is not supported by this browser.");
  }
};
