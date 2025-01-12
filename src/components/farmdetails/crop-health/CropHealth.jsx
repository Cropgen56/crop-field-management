import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import cropImage from "../../../assets/Images/weat-crop-image.jpg";
import "./CropHealth.css";
import * as turf from "@turf/turf";
import { ShareButtonIcon } from "../../../assets/Icons";

ChartJS.register(ArcElement, Tooltip, Legend);

const CropHealth = ({ farmDetails }) => {
  const data = {
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#34DB3E", "#F5D835"],
        borderWidth: 0,
      },
    ],
  };
  const corrdinatesPoint = farmDetails?.field;

  let totalArea;
  //  Calculate days from dates
  function calculateDaysFromDate(input) {
    const targetDate = new Date(input);
    if (isNaN(targetDate)) {
      console.error("Invalid date input");
      return null;
    }
    const currentDate = new Date();
    targetDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    const timeDifference = currentDate - targetDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  }

  // Calculate area based on coordinates
  const calculateArea = (corrdinatesPoint) => {
    const coordinates = farmDetails?.field?.map((point) => [
      point.lng,
      point.lat,
    ]);
    coordinates.push(coordinates[0]);
    const polygon = turf.polygon([coordinates]);
    const area = turf.area(polygon);
    totalArea = area / 4046.86; // Convert to acres
  };

  if (corrdinatesPoint) {
    calculateArea(corrdinatesPoint);
  }

  return (
    <div className="crop-health-container">
      <div className="crop-health-card">
        <div className="header">
          <h2>Crop Health</h2>
          <ShareButtonIcon />
        </div>
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
                    <strong>Crop Name</strong>
                  </th>
                  <td>:- {farmDetails?.cropName}</td>
                </tr>
                <tr>
                  <th>
                    <strong>Crop Age</strong>
                  </th>
                  <td>
                    :-{" "}
                    {`${calculateDaysFromDate(farmDetails?.sowingDate)} days`}
                  </td>
                </tr>
                <tr>
                  <th>
                    <strong>Standard Yield Data</strong>
                  </th>
                  <td>:- 460.00 kg/acre</td>
                </tr>
                <tr>
                  <th>
                    <strong>Total Area</strong>
                  </th>
                  <td>:- {totalArea?.toFixed(2) + " Acre"}</td>
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
              width={50}
              height={50}
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
