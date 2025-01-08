import { useNavigate } from "react-router-dom";
import { LeftArrowIcon } from "../../../assets/Icons";
import "./MyFieldsHeader.css";

const MyFieldsHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="my-fields-header-container">
      <div className="back-button" onClick={() => navigate(-1)}>
        <LeftArrowIcon />
      </div>
      <div className="heading">My Farm</div>
    </div>
  );
};

export default MyFieldsHeader;
