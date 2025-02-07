import React from "react";
import { useTranslation } from "react-i18next";
import "./TotalFarm.css";

const TotalFarm = ({ fields }) => {
  const { t } = useTranslation();

  const userFarms = fields;

  // If no farms exist, return null
  if (!userFarms || userFarms.length === 0) {
    return null;
  }

  // Calculate total acres and limit to 2 decimal places
  const totalAcre = userFarms
    .reduce((total, farm) => total + (farm.acre || 0), 0)
    .toFixed(2);

  return (
    <div className="total-farm-main-container">
      <table className="farm-table">
        <thead>
          <tr>
            <th>{t("farmDetails")}</th>
            <th>{t("value")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t("totalFarms")}</td>
            <td>{userFarms.length}</td>
          </tr>
          <tr>
            <td>{t("totalArea")}</td>
            <td>
              {totalAcre} {t("acre")}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TotalFarm;
