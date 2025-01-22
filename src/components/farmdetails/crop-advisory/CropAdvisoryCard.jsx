import React, { useState } from "react";
import { Logo } from "../../../assets/Icons";
import { genrateAdvisory } from "../../../api/satelliteAPI";
import "./CropAdvisoryCard.css";
import { useEffect } from "react";

const CropAdvisoryCard = ({ soilMoisture, farmDetails, npkData }) => {
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

  // Check if the advisory objectc exists and contains data for the current day
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
            <h5 className="loading-text">Generating Advisroy...</h5>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <p>
          <strong className="day">Day {currentDay}:</strong>
        </p>
      </div>

      {dayData ? (
        <>
          <div className="card-section">
            <p>
              <strong>Disease/Pest Control:</strong>{" "}
              {dayData["Disease/Pest Control"] || "Not Available"}
            </p>
          </div>
          <div className="card-section">
            <p>
              <strong>Fertigation:</strong>{" "}
              {dayData["Fertigation"] || "Not Available"}
            </p>
          </div>
          <div className="card-section">
            <p>
              <strong>Watering:</strong>{" "}
              {dayData["Watering"] || "Not Available"}
            </p>
          </div>
          <div className="card-section">
            <p>
              <strong>Monitoring:</strong>{" "}
              {cleanSentence(dayData["Monitoring"]) || "Not Available"}
            </p>
          </div>
        </>
      ) : (
        <div className="card-section">
          <p>No Data Available for Day {currentDay}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="arrow-buttons">
        <button
          className="prev-button"
          onClick={handlePrevious}
          disabled={currentDay === 1}
        >
          ← Previous
        </button>
        <button
          className="next-button"
          onClick={handleNext}
          disabled={currentDay === 4}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default CropAdvisoryCard;
