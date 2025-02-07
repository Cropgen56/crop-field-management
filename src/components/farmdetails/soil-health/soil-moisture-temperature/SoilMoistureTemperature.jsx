import React from "react";
import "./SoilMoistureTemperature.css";
import soilTemperatureImage from "../../../../assets/Images/soil-temperature.png";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const SoilMoistureTemperature = () => {
  const { t } = useTranslation();
  const { SoilMoisture } = useSelector((state) => state.satellite);

  // Destructure data from soilMoisture
  const { Soil_Moisture, Soil_Temperature } = SoilMoisture?.data || {};

  // Format the data or provide default values if unavailable
  const soilMoistureValue = Soil_Moisture?.Soil_Moisture_mean?.toFixed(1);
  const soilTemperatureValue =
    Soil_Temperature?.Soil_Temperature_mean?.toFixed(1);

  return (
    <div className="soil-info">
      {/* Soil Moisture Section */}
      <div className="soil-stat">
        <div className="icon-container">
          <img src={soilTemperatureImage} alt={t("soilMoisture")} />
        </div>
        <div className="data-container">
          <p>{t("soilMoisture")}</p>
          <strong>
            {soilMoistureValue ? soilTemperatureValue + "%" : " "}
          </strong>
        </div>
      </div>

      {/* Soil Temperature Section */}
      <div className="soil-stat">
        <div className="icon-container">
          <img src={soilTemperatureImage} alt={t("soilTemperature")} />
        </div>
        <div className="data-container">
          <p>{t("soilTemperature")}</p>
          <strong>
            {soilTemperatureValue ? soilTemperatureValue + "°C" : " "}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default SoilMoistureTemperature;
