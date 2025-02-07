import React, { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDatesData,
  fetchIndexData,
  removeIndexData,
  setSelectedIndex,
} from "../../../store/satelliteSlice";
import { useTranslation } from "react-i18next";
import "./CropDetailsTab.css";

const CropDetailsTab = ({ farmDetails }) => {
  const dispatch = useDispatch();
  const { field, sowingDate } = farmDetails || {};
  const { t } = useTranslation();
  const hasSetDefault = useRef(false);

  const { selectedIndex, datesData, loading } = useSelector(
    (state) => state?.satellite
  );

  // Convert farm details to coordinates
  const coordinates = field ? [field.map(({ lat, lng }) => [lng, lat])] : [];

  useEffect(() => {
    if (farmDetails && coordinates.length > 0) {
      dispatch(fetchDatesData(coordinates));
    }
  }, [farmDetails, dispatch]);

  // Set default NDVI index when dates data loads
  useEffect(() => {
    if (datesData?.length && !hasSetDefault.current) {
      hasSetDefault.current = true;
      handleIndexSelection("NDVI");
    }
  }, [datesData]);

  // Common function to handle index selection
  const handleIndexSelection = useCallback(
    (index) => {
      if (!datesData?.length) return;
      dispatch(removeIndexData());
      dispatch(setSelectedIndex(index));
      handleIndexDataFetch(datesData[0]?.date, index);
    },
    [datesData, dispatch]
  );

  // Fetch index data
  const handleIndexDataFetch = useCallback(
    (date, index) => {
      if (!sowingDate || !date || !index || coordinates.length === 0) return;
      dispatch(
        fetchIndexData({
          startDate: sowingDate,
          endDate: date,
          geometry: coordinates,
          index,
        })
      );
    },
    [dispatch, sowingDate, coordinates]
  );

  // Format date utility
  const formatDate = (date) => {
    if (!date) return "Invalid Date";
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="responsive-table">
      <div className="table-header-wrapper">
        <div className="table-header">
          {["NDVI", "SOC_VIS", "SAVI", "NDWI", "NDMI"].map((index) => (
            <React.Fragment key={index}>
              <span className="vertical-line">|</span>
              <span
                onClick={() => handleIndexSelection(index)}
                className={selectedIndex === index ? "selected-index" : ""}
              >
                {t(index)}
              </span>
            </React.Fragment>
          ))}
          <span className="vertical-line">|</span>
        </div>
      </div>

      {/* Display Dates Data */}
      {datesData ? (
        <div className="table-content visible">
          {datesData?.map(({ date, cloud_percentage }, index) => (
            <div
              key={index}
              className="date-item"
              onClick={() => {
                dispatch(removeIndexData());
                handleIndexDataFetch(date, selectedIndex);
              }}
            >
              <div>{formatDate(date)}</div>
              <div>
                {cloud_percentage.toFixed(1)}% {t("cloud")}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="loading-text">{t("loadingDates")}</div>
      )}
    </div>
  );
};

export default CropDetailsTab;
