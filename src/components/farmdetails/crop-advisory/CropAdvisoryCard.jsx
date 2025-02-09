import React, { useState, useEffect } from "react";
import { Logo } from "../../../assets/Icons";
import { genrateAdvisory } from "../../../api/satelliteAPI";
import "./CropAdvisoryCard.css";
import { useTranslation } from "react-i18next";

const CropAdvisoryCard = ({ soilMoisture, farmDetails, npkData }) => {
  const { t } = useTranslation();
  const [advisory, setAdvisory] = useState(null);

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "mr"
  );

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
          language,
        });

        setAdvisory(advisoryData?.Advisory || {});
      } catch (error) {
        console.error("Error generating advisory:", error);
      }
    };

    if (soilMoisture && farmDetails && npkData) {
      fetchAdvisory();
    }
  }, [soilMoisture, farmDetails, npkData]);

  console.log("test 1 " + advisory);

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
            {t("day")} {currentDay}:
          </strong>
        </p>
      </div>

      {dayData ? (
        <>
          <div className="card-section">
            <p>
              <strong>{t("disease_pest_control")}:</strong>{" "}
              {dayData["Disease/Pest Control"] || t("not_available")}
            </p>
          </div>
          <div className="card-section">
            <p>
              <strong>{t("fertigation")}:</strong>
              {dayData["Fertigation"] || t("not_available")}
            </p>
          </div>
          <div className="card-section">
            <p>
              <strong>{t("watering")}:</strong>
              {dayData["Water Management"] || t("not_available")}
            </p>
          </div>
          <div className="card-section">
            <p>
              <strong>{t("monitoring")}:</strong>
              {dayData["Monitoring"] || t("not_available")}
            </p>
          </div>
        </>
      ) : (
        <div className="card-section">
          <p>
            {t("no_data_available")} {t("day")}
            {currentDay}
          </p>{" "}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="arrow-buttons">
        <button
          className="prev-button"
          onClick={handlePrevious}
          disabled={currentDay === 1}
        >
          ← {t("previous")}
        </button>
        <button
          className="next-button"
          onClick={handleNext}
          disabled={currentDay === 4}
        >
          {t("next")} →
        </button>
      </div>
    </div>
  );
};

export default CropAdvisoryCard;
