import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import CropAdvisoryCard from "../components/farmdetails/crop-advisory/CropAdvisoryCard";
import HealthIndicator from "../components/farmdetails/crop-health-indicator/CropHealthIndicator.jsx";
import CropHealth from "../components/farmdetails/crop-health/CropHealth";
import FarmDetailsHeader from "../components/farmdetails/farm-details-header/FarmDetailsHeader";
import FarmMap from "../components/farmdetails/farm-details-map/FarmMap";
import SoilHealthCard from "../components/farmdetails/soil-health/SoilHealthCard";
import NavigationBar from "../components/home/navigationbar/NavigationBar";
import FarmDetailsWeatherCard from "../components/farmdetails/weather-card/FarmDetailsWeatherCard";
import CropGrowth from "../components/farmdetails/crop-growth/CropGrowth";
import CropProtection from "../components/farmdetails/crop-protection/CropProtection";
import Loading from "../components/common/Loading/Loading";
import { fetcNpkData, fetchSoilMoisture } from "../api/satelliteAPI";
import "../style/FarmDetails.css";
import SoilMoistureTemperature from "../components/farmdetails/soil-health/soil-moisture-temperature/SoilMoistureTemperature.jsx";

const FarmDetails = () => {
  const location = useLocation();
  const farmDetails = location.state;
  const [soilMoisture, setSoilMoisture] = useState(null);
  const [npkData, setNpkData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch both NPK and Soil Moisture data concurrently
  const fetchData = useCallback(async () => {
    if (!farmDetails) return;

    setLoading(true);
    try {
      const [npkResult, soilMoistureResult] = await Promise.all([
        fetcNpkData({ farmDetails }),
        fetchSoilMoisture({ farmDetails }),
      ]);
      setNpkData(npkResult || {});
      setSoilMoisture(soilMoistureResult || {});
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [farmDetails]);

  // Fetch data on component mount or when farmDetails change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Early return for loading or missing farm details
  // if (loading) return <Loading />;

  return (
    <div className="farm-details">
      <div className="farm-details-header">
        <FarmDetailsHeader />
      </div>
      <div className="farm-details-body">
        <HealthIndicator />
        <FarmMap farmDetails={farmDetails} />
        <CropHealth farmDetails={farmDetails} />
        <div className="section-heading">Crop Advisory</div>
        <CropAdvisoryCard
          npkData={npkData}
          soilMoisture={soilMoisture}
          farmDetails={farmDetails}
        />
        <div className="section-heading">Soil Health</div>

        {!loading ? (
          <>
            <SoilHealthCard npkData={npkData} />
            <SoilMoistureTemperature soilMoisture={soilMoisture} />
          </>
        ) : (
          false
        )}
        <FarmDetailsWeatherCard farmDetails={farmDetails} />
        <div className="section-heading">Crop Growth</div>
        <CropGrowth farmDetails={farmDetails} npkData={npkData} />
        <div className="section-heading">Crop Protection</div>
        <CropProtection />
        <NavigationBar />
      </div>
    </div>
  );
};

export default FarmDetails;
