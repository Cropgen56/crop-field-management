import React from "react";
import "./FarmDetails.css";
import FarmImage from "../../../assets/Images/farm-image.jpg";
import {
  EditButton,
  MyFarmColorIcon,
  ShareButtonIcon,
} from "../../../assets/Icons";
import { useNavigate } from "react-router-dom";
import * as turf from "@turf/turf";
import { useState } from "react";
import { getCurrentLocation } from "../../../utils/getUserCurrectCoordinate";
import { getCityState } from "../../../utils/getUserLocation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const FarmDetails = ({ farmData, onEdit }) => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const { t } = useTranslation();

  // Calculate the centroid
  const centroid = farmData?.field?.reduce(
    (acc, point) => {
      acc.lat += point.lat;
      acc.lng += point.lng;
      return acc;
    },
    { lat: 0, lng: 0 }
  );

  centroid.lat /= farmData?.field?.length;
  centroid.lng /= farmData?.field?.length;

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

  const corrdinatesPoint = farmData?.field;
  let totalArea;
  // calculate area on the basis of coordinate
  const calculateArea = (corrdinatesPoint) => {
    const coordinates = farmData?.field?.map((point) => [point.lng, point.lat]);
    coordinates.push(coordinates[0]);
    const polygon = turf.polygon([coordinates]);
    const area = turf.area(polygon);
    const areaHectares = area / 10000;
    totalArea = area / 4046.86;
  };

  if (corrdinatesPoint) {
    calculateArea(corrdinatesPoint);
  }

  return (
    <div className="farm-details-container">
      {/* Farm Header */}
      <div className="farm-header">
        <div className="heading">
          <div className="icon">
            <MyFarmColorIcon />
          </div>
          <div>
            <h3>{t("myFarm")}</h3>
            <p>
              {city || "City"}, {state || "State"}
            </p>
          </div>
        </div>
        <div
          className="edit-farm"
          onClick={() => {
            navigate("/add-field", { state: farmData });
          }}
        >
          <span>{t("edit_farm")}</span>
          <EditButton />
        </div>
      </div>

      {/* Content Section */}
      <div className="content">
        {/* Farm Image */}
        <div className="image-container">
          <img src={FarmImage} alt="Farm" />
        </div>

        {/* Farm Details Table */}
        <div className="details">
          <table className="farm-details-table">
            <tbody>
              <tr>
                <th>{t("farm_name")} :</th>
                <td>{farmData?.fieldName || "N/A"}</td>
              </tr>
              <tr>
                <th>{t("crop")} :</th>
                <td>{farmData?.cropName || "N/A"}</td>
              </tr>
              <tr>
                <th>{t("sowing_date")} :</th>
                <td>{farmData?.sowingDate || "N/A"}</td>
              </tr>
              <tr>
                <th>{t("acre")} :</th>
                <td>{totalArea?.toFixed(2) + " " + t("acre") || "N/A"} </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Button */}
      <div className="edit-farm-button">
        <button
          className="edit-button"
          onClick={() => {
            navigate("/farm-details", { state: farmData });
          }}
        >
          {t("visit_farm")}
        </button>
      </div>
    </div>
  );
};

export default FarmDetails;
