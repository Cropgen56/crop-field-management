import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css"; // Make sure this is included

const SearchField = ({ onLocationSelect }) => {
  const map = useMap();

  useEffect(() => {
    // Create GeoSearch provider
    const provider = new OpenStreetMapProvider();

    // Create GeoSearchControl with custom options
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar", // 'bar' style gives the search box style
      showMarker: true,
      retainZoomLevel: false,
      autoComplete: true, // Enable autocomplete for the search
    });

    // Add search control to the map
    map.addControl(searchControl);

    // Wait until the control is fully rendered to access the container
    const checkContainer = setInterval(() => {
      const container = searchControl._container;
      if (container) {
        clearInterval(checkContainer);
        // Apply custom styles directly to the search control container
        container.style.position = "absolute";
        container.style.top = "100vh"; // Adjust position (distance from top of the screen)
        container.style.left = "50%"; // Center the search box horizontally
        container.style.transform = "translateX(-50%)"; // Ensure it's perfectly centered
        container.style.zIndex = 1000; // Make sure it's on top of other elements
        container.style.width = "80%"; // Adjust width
        container.style.borderRadius = "30px"; // Rounded corners for the box
        container.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)"; // Add shadow for better visibility
      }
    }, 100); // Check every 100ms until the container is available

    // Handle location selection from the search box
    map.on("geosearch/showlocation", (result) => {
      const { x, y, label } = result.location;
      onLocationSelect({ lat: y, lng: x, name: label });
      map.setView([y, x], 18);
    });

    // Clean up search control when the component is unmounted
    return () => {
      map.removeControl(searchControl);
      clearInterval(checkContainer); // Clear the interval when the component is unmounted
    };
  }, [map, onLocationSelect]);

  return null;
};

export default SearchField;
