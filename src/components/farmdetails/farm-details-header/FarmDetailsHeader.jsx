import { useNavigate } from "react-router-dom";
import { LeftArrowIcon } from "../../../assets/Icons";
import "./FarmDetailsHeader.css";
import { useTranslation } from "react-i18next";

const FarmDetailsHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="farm-details-header-container">
      {" "}
      <div className="back-button" onClick={() => navigate(-1)}>
        <LeftArrowIcon />
      </div>
      <div className="heading">{t("myFarm")}</div>
    </div>
  );
};

export default FarmDetailsHeader;
