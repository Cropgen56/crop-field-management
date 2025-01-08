import { useNavigate } from "react-router-dom";
import { LeftArrowIcon } from "../../../assets/Icons";
import "./FarmDetailsHeader.css";

const FarmDetailsHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="farm-details-header-container">
      {" "}
      <div className="back-button" onClick={() => navigate(-1)}>
        <LeftArrowIcon />
      </div>
      <div className="heading">My Farm</div>
    </div>
  );
};

export default FarmDetailsHeader;
