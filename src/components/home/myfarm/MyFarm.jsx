import React from "react";
import "./MyFarm.css";
import { PlusIcon } from "../../../assets/Icons";
import FarmFieldCard from "../cropcard/FarmFieldCard.jsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MyFarm = ({ fields }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="my-farm">
      <p className="heading">{t("myFarm")}</p>
      <div className="crop-list-container">
        {/* Add Field Button */}
        <div className="crop-add-card-button">
          <div className="add-field-placeholder">{t("addField")}</div>
          <div
            className="crop-add-card-content"
            onClick={() => {
              navigate("/add-field");
            }}
          >
            <div>
              <p>{t("cropName")}</p>
              <small>{t("fieldSize")}</small>
            </div>
            <div className="add-field-button">
              <PlusIcon />
            </div>
          </div>
        </div>
        {/* Crop Cards */}
        <div className="crop-list">
          {fields && fields.length > 0 ? (
            fields?.map((field, index) => (
              <FarmFieldCard
                key={index}
                cropName={field?.cropName}
                fieldSize={field?.fieldSize}
                farmDetails={field}
                acre={field?.acre}
              />
            ))
          ) : (
            <div>{t("noFarmsAvailable")}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyFarm;
