import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CropAdvisoryCard from "../components/farmdetails/crop-advisory/CropAdvisoryCard";
import HealthIndicator from "../components/farmdetails/crop-health-indicator/CropHealthIndicator";
import CropHealth from "../components/farmdetails/crop-health/CropHealth";
import FarmDetailsHeader from "../components/farmdetails/farm-details-header/FarmDetailsHeader";
import FarmMap from "../components/farmdetails/farm-details-map/FarmMap";
import SoilHealthCard from "../components/farmdetails/soil-health/SoilHealthCard";
import NavigationBar from "../components/home/navigationbar/NavigationBar";
import FarmDetailsWeatherCard from "../components/farmdetails/weather-card/FarmDetailsWeatherCard";
import CropGrowth from "../components/farmdetails/crop-growth/CropGrowth";
import CropProtection from "../components/farmdetails/crop-protection/CropProtection";
import SoilMoistureTemperature from "../components/farmdetails/soil-health/soil-moisture-temperature/SoilMoistureTemperature";
import { useTranslation } from "react-i18next";
import { resetState } from "../store/satelliteSlice";
import {
  calculateAiYield,
  fetchCropHealth,
  fetchSoilMoisture,
  fetcNpkData,
  genrateAdvisory,
} from "../store/satelliteSlice";
import "../style/FarmDetails.css";

const FarmDetails = () => {
  const WeatherData = JSON.parse(localStorage.getItem("weatherData"));
  const location = useLocation();
  const farmDetails = location.state;
  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(resetState());
    dispatch(fetcNpkData(farmDetails));
    dispatch(fetchSoilMoisture(farmDetails));
    dispatch(fetchCropHealth(farmDetails));
    dispatch(calculateAiYield(farmDetails));
  }, [dispatch, farmDetails]);

  const { NpkData, SoilMoisture } = useSelector((state) => state?.satellite);

  return (
    <div className="farm-details">
      <FarmDetailsHeader />
      <div className="farm-details-body">
        <HealthIndicator />
        <FarmMap farmDetails={farmDetails} />
        <CropHealth farmDetails={farmDetails} />

        <section>
          <h2 className="section-heading">{t("cropAdvisory")}</h2>
          <CropAdvisoryCard
            npkData={NpkData}
            soilMoisture={SoilMoisture}
            farmDetails={farmDetails}
          />
        </section>

        <section>
          <h2 className="section-heading">{t("soilHealth")}</h2>
          {NpkData ? <SoilHealthCard NpkData={NpkData} /> : null}
          <SoilMoistureTemperature SoilMoisture={SoilMoisture} />
        </section>

        <FarmDetailsWeatherCard farmDetails={farmDetails} />

        <section>
          <h2 className="section-heading">{t("cropGrowth")}</h2>
          <CropGrowth farmDetails={farmDetails} npkData={NpkData} />
        </section>

        <section>
          <h2 className="section-heading">{t("cropProtection")}</h2>
          <CropProtection />
        </section>

        <NavigationBar />
      </div>
    </div>
  );
};

export default FarmDetails;
