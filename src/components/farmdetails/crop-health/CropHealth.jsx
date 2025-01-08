import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import cropImage from "../../../assets/Images/weat-crop-image.jpg";
import "./CropHealth.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const CropHealth = () => {
  const data = {
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#34DB3E", "#7DE302"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="crop-health-container">
      <div className="crop-health-card">
        <h2>Crop Health</h2>
        <div className="crop-details-horizontal">
          {/* Crop Image */}
          <div className="crop-image">
            <img src={cropImage} alt="Wheat" width={80} height={80} />
          </div>
          {/* Crop Info */}
          <div className="crop-info">
            <table className="crop-info-table">
              <tbody>
                <tr>
                  <th>
                    <strong>Crop Name:</strong>
                  </th>
                  <td>Wheat</td>
                </tr>
                <tr>
                  <th>
                    <strong>Crop Age:</strong>
                  </th>
                  <td>15 days</td>
                </tr>
                <tr>
                  <th>
                    <strong>Standard Yield Data:</strong>
                  </th>
                  <td>460.00 kg/acre</td>
                </tr>
                <tr>
                  <th>
                    <strong>Total Area:</strong>
                  </th>
                  <td>1.5 Acre</td>
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
