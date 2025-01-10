import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import cropImage from "../../../assets/Images/weat-crop-image.jpg";
import "./CropHealth.css";
import * as turf from "@turf/turf";

ChartJS.register(ArcElement, Tooltip, Legend);

const CropHealth = ({ farmDetails }) => {
  const data = {
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#34DB3E", "#7DE302"],
        borderWidth: 0,
      },
    ],
  };
  const corrdinatesPoint = farmDetails?.field;

  let totalArea;
  //  calcualte day from dates
  function calculateDaysFromDate(input) {
    // Parse the input date string into a Date object
    const targetDate = new Date(input);

    // Check if the input date is valid
    if (isNaN(targetDate)) {
      console.error("Invalid date input");
      return null;
    }

    // Get the current date
    const currentDate = new Date();

    // Set the time part of both dates to midnight for accurate comparison
    targetDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Calculate the difference in milliseconds
    const timeDifference = currentDate - targetDate;

    // Convert the difference to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  }

  // calculate area on the basis of coordinate
  const calculateArea = (corrdinatesPoint) => {
    // Transform backend data into Turf.js-compatible format
    const coordinates = farmDetails?.field?.map((point) => [
      point.lng,
      point.lat,
    ]);

    // Close the polygon by adding the first point at the end
    coordinates.push(coordinates[0]);

    // Create the polygon
    const polygon = turf.polygon([coordinates]);

    // Calculate area in square meters
    const area = turf.area(polygon);

    // Convert to hectares and acres
    const areaHectares = area / 10000;
    totalArea = area / 4046.86;
  };

  if (corrdinatesPoint) {
    calculateArea(corrdinatesPoint);
  }
  return (
    <div className="crop-health-container">
      <div className="crop-health-card">
        <h2>Crop Health</h2>
        <div className="crop-details-horizontal">
          {/* Crop Image */}
          <div className="crop-image">
            <img src={cropImage} alt="Wheat" width={100} height={100} />
          </div>
          {/* Crop Info */}
          <div className="crop-info">
            <table className="crop-info-table">
              <tbody>
                <tr>
                  <th>
                    <strong>Crop Name:</strong>
                  </th>
                  <td>{farmDetails?.cropName}</td>
                </tr>
                <tr>
                  <th>
                    <strong>Crop Age:</strong>
                  </th>
                  <td>{`${calculateDaysFromDate(
                    farmDetails?.sowingDate
                  )} days`}</td>
                </tr>
                <tr>
                  <th>
                    <strong>Standard Yield Data:</strong>
                  </th>
                  <td>{farmDetails?.sowingDate}</td>
                </tr>
                <tr>
                  <th>
                    <strong>Total Area:</strong>
                  </th>
                  <td>{totalArea?.toFixed(2) + " Acre"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Doughnut Chart */}
          <div className="chart-container">
            <Doughnut
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: "70%",
                plugins: {
                  tooltip: {
                    enabled: false,
                  },
                  legend: {
                    display: false,
                  },
                },
              }}
              width={100}
              height={100}
            />
            <div className="chart-percentage">
              <span>60%</span>
              <p>Normal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropHealth;
