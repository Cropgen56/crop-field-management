import CropAdvisoryCard from "../components/farmdetails/crop-advisory/CropAdvisoryCard";
import HealthIndicator from "../components/farmdetails/crop-health-indicator/CropHealthIndicator";
import CropHealth from "../components/farmdetails/crop-health/CropHealth";
import FarmDetailsHeader from "../components/farmdetails/farm-details-header/FarmDetailsHeader";
import FarmMap from "../components/farmdetails/farm-details-map/FarmMap";
import SoilHealthCard from "../components/farmdetails/soil-health/SoilHealthCard";
import NavigationBar from "../components/home/navigationbar/NavigationBar";
import { useLocation } from "react-router-dom";
import "../style/FarmDetails.css";

const FarmDetails = () => {
  const location = useLocation();
  const farmDetails = location.state;

  return (
    <div className="farm-details">
      <div className="farm-details-header">
        {" "}
        <FarmDetailsHeader />
      </div>
      <div className="farm-details-body">
        <HealthIndicator />
        <FarmMap farmDetails={farmDetails} />
        <CropHealth farmDetails={farmDetails} />
        <div className="crop-advisory-heading">Crop Advisory</div>
        <CropAdvisoryCard />
        <div className="soil-health-heading">Soil Health</div>
        <SoilHealthCard />
        <NavigationBar />
      </div>
    </div>
  );
};

export default FarmDetails;
