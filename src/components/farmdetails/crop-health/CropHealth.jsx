import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import cropImage from "../../../assets/Images/weat-crop-image.jpg";
import "./CropHealth.css";
import * as turf from "@turf/turf";
import { ShareButtonIcon } from "../../../assets/Icons";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

ChartJS.register(ArcElement, Tooltip, Legend);

const CropHealth = ({ farmDetails }) => {
  const { t, i18n } = useTranslation();
  const data = {
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#34DB3E", "#F5D835"],
        borderWidth: 0,
      },
    ],
  };

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

  const { cropYield, cropHealth } = useSelector((state) => state.satellite);

  return (
    <div className="crop-health-container">
      <div className="crop-health-card">
        <div className="header">
          <h2>{t("cropHealth")}</h2> {/* Translation for 'Crop Health' */}
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
                    <strong>{t("cropName")}</strong>
                  </th>
                  <td>:- {farmDetails?.cropName}</td>
                </tr>
                <tr>
                  <th>
                    <strong>{t("cropAge")}</strong>
                  </th>
                  <td>
                    :-{" "}
                    {`${calculateDaysFromDate(farmDetails?.sowingDate)} ${t(
                      "days"
                    )}`}
                  </td>
                </tr>
                {cropYield ? (
                  <tr>
                    <th>
                      <strong>{t("standardYield")}</strong>
                    </th>
                    <td>:- {cropYield?.Standard_Yield_units}</td>
                  </tr>
                ) : (
                  false
                )}

                <tr>
                  <th>
                    <strong>{t("totalArea")}</strong>
                  </th>
                  <td>:- {farmDetails?.acre?.toFixed(2) + " Acre"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Doughnut Chart */}
          <div className="doughtnut-chart-container">
            <Doughnut
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: "60%",
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
              {cropHealth ? (
                <>
                  {" "}
                  <span>{cropHealth?.Health_Percentage}%</span>
                  <p>{cropHealth?.Crop_Health}</p>
                </>
              ) : (
                false
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropHealth;
