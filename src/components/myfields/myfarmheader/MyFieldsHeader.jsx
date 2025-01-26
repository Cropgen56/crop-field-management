import { useNavigate } from "react-router-dom";
import { LeftArrowIcon } from "../../../assets/Icons";
import "./MyFieldsHeader.css";
import { useTranslation } from "react-i18next";

const MyFieldsHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="my-fields-header-container">
      <div className="back-button" onClick={() => navigate(-1)}>
        <LeftArrowIcon />
      </div>
      <div className="heading">{t("myFarm")}</div>
    </div>
  );
};

export default MyFieldsHeader;
