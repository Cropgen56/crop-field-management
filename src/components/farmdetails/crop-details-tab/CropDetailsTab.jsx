import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDatesData,
  fetchIndexData,
  setSelectedIndex,
} from "../../../store/satelliteSlice";
import "./CropDetailsTab.css";

const CropDetailsTab = ({ farmDetails, setLoading }) => {
  const dispatch = useDispatch();
  const { field } = farmDetails;
  const coordinates = [field.map(({ lat, lng }) => [lng, lat])];

  const {
    selectedIndex,
    datesData,
    loading: isLoading,
    error,
  } = useSelector((state) => state?.satellite);

  // Fetch dates data on component mount or when farmDetails change
  useEffect(() => {
    if (!farmDetails) return;
    dispatch(fetchDatesData(coordinates));
  }, [farmDetails, dispatch]);

  // fetch index for the farm
  const handleIndexDataFetch = async (date) => {
    setLoading(true);
    const sowingDate = farmDetails?.sowingDate;

    try {
      await dispatch(
        fetchIndexData({
          startDate: sowingDate,
          endDate: date,
          geometry: coordinates,
          index: selectedIndex,
        })
      ).unwrap();
    } catch (error) {
      console.error("Error fetching index data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleIndexDataFetch("2025-01-10");
  }, []);

  // format dates
  const formatDate = (date) => {
    if (!date || isNaN(new Date(date))) {
      console.error("Invalid date value:", date);
      return "Invalid Date";
    }
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };

  return (
    <div className="responsive-table">
      <div className="table-header-wrapper">
        <div className="table-header">
          <span
            onClick={() => dispatch(setSelectedIndex("NDVI"))}
            className={`${selectedIndex === "NDVI" ? "selected-index" : ""}`}
          >
            Crop Health Check
          </span>
          <span className="vertical-line">|</span>
          <span
            onClick={() => dispatch(setSelectedIndex("SOC_VIS"))}
            className={`${selectedIndex === "SOC_VIS" ? "selected-index" : ""}`}
          >
            Soil Fertility Indicator
          </span>
          <span className="vertical-line">|</span>

          <span
            onClick={() => dispatch(setSelectedIndex("SAVI"))}
            className={`${selectedIndex === "SAVI" ? "selected-index" : ""}`}
          >
            Plant-Soil Balance
          </span>
          <span className="vertical-line">|</span>

          <span
            onClick={() => dispatch(setSelectedIndex("NDWI"))}
            className={`${selectedIndex === "NDWI" ? "selected-index" : ""}`}
          >
            Water Availability Index
          </span>
          <span className="vertical-line">|</span>
          <span
            onClick={() => dispatch(setSelectedIndex("NDMI"))}
            className={`${selectedIndex === "NDMI" ? "selected-index" : ""}`}
          >
            Crop Moisture Level
          </span>
          <span className="vertical-line">|</span>
          <span
            onClick={() => dispatch(setSelectedIndex("EVI"))}
            className={`${selectedIndex === "EVI" ? "selected-index" : ""}`}
          >
            Enhanced Growth Index
          </span>
        </div>
      </div>

      {/* Display Dates Data */}
      {datesData ? (
        <div className="table-content visible">
          {datesData.map((data, index) => (
            <div
              key={index}
              className="date-item"
              onClick={() => handleIndexDataFetch(data.date)}
            >
              <div>{formatDate(data.date)}</div>
              <div>{data.cloud_percentage.toFixed(1)} cloud</div>
            </div>
          ))}
        </div>
      ) : isLoading ? (
        <div>Loading dates...</div>
      ) : (
        <div>No dates available</div>
      )}
    </div>
  );
};

export default CropDetailsTab;
