import React, { useState, useEffect } from "react";
import { Logo } from "../../../assets/Icons";
import { genrateAdvisory } from "../../../api/satelliteAPI";
import "./CropAdvisoryCard.css";
import { useTranslation } from "react-i18next";

const CropAdvisoryCard = ({ soilMoisture, farmDetails, npkData }) => {
  const { t } = useTranslation(); // Initialize translation hook
  const [advisory, setAdvisory] = useState(null);

  const weatherData = JSON.parse(
    localStorage.getItem("weatherData")
  )?.currentConditions;

  function cleanSentence(sentence) {
    // Define a regular expression to match unwanted symbols
    const unwantedSymbolsRegex = /[^\w\s,.!?']/g;

    // Clean the sentence by removing unwanted symbols and trimming spaces
    const cleanedSentence = sentence
      .replace(unwantedSymbolsRegex, "")
      .replace(/\s+/g, " ")
      .trim();

    // Split the cleaned sentence into two parts: before and after the first dot
    const firstDotIndex = cleanedSentence.indexOf(".");
    if (firstDotIndex === -1) {
      return {
        beforeDot: cleanedSentence,
        afterDot: "",
      };
    }

    // Extract the parts
    const beforeDot = cleanedSentence.slice(0, firstDotIndex).trim();
    const afterDot = cleanedSentence.slice(firstDotIndex + 1).trim();

    return beforeDot;
  }

  // Fetch advisory data only when NPK data is fetched
  useEffect(() => {
    const fetchAdvisory = async () => {
      try {
        const advisoryData = await genrateAdvisory({
          soilMoisture,
          farmDetails,
          npkData,
          weatherData,
        });

        setAdvisory(advisoryData?.Advisory || {});
      } catch (error) {
        console.error("Error generating advisory:", error);
      }
    };

    fetchAdvisory();
  }, [soilMoisture, farmDetails, npkData]);

  const [currentDay, setCurrentDay] = useState(1);

  // Check if the advisory object exists and contains data for the current day
  const dayData = advisory?.[`Day ${currentDay}`] || null;

  // Handlers for navigation buttons
  const handleNext = () => {
    if (currentDay < 4) setCurrentDay((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentDay > 1) setCurrentDay((prev) => prev - 1);
  };

  // Early return if advisory data is empty or invalid
  if (!advisory || Object.keys(advisory).length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <div className="loading-content">
            <Logo />
            <h5 className="loading-text">{t("generating_advisory")}</h5>{" "}
            {/* Translation key */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <p>
          <strong className="day">
            {t("day")}
            {currentDay}:
          </strong>
        </p>
      </div>

      {dayData ? (
        <>
          <div className="card-section">
            <p>
              <strong>{t("disease_pest_control")}:</strong>{" "}
              {/* Translation key */}
              {dayData["Disease/Pest Control"] || t("not_available")}
            </p>
          </div>
          <div className="card-section">
            <p>
              <strong>{t("fertigation")}:</strong> {/* Translation key */}
              {dayData["Fertigation"] || t("not_available")}
            </p>
          </div>
          <div className="card-section">
            <p>
              <strong>{t("watering")}:</strong> {/* Translation key */}
              {dayData["Watering"] || t("not_available")}
            </p>
          </div>
          <div className="card-section">
            <p>
              <strong>{t("monitoring")}:</strong> {/* Translation key */}
              {cleanSentence(dayData["Monitoring"]) || t("not_available")}
            </p>
          </div>
        </>
      ) : (
        <div className="card-section">
          <p>
            {t("no_data_available")} {t("day")}
            {currentDay}
          </p>{" "}
          {/* Translation key */}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="arrow-buttons">
        <button
          className="prev-button"
          onClick={handlePrevious}
          disabled={currentDay === 1}
        >
          ← {t("previous")} {/* Translation key */}
        </button>
        <button
          className="next-button"
          onClick={handleNext}
          disabled={currentDay === 4}
        >
          {t("next")} → {/* Translation key */}
        </button>
      </div>
    </div>
  );
};

export default CropAdvisoryCard;
