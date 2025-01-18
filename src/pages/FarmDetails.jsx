import CropAdvisoryCard from "../components/farmdetails/crop-advisory/CropAdvisoryCard";
import HealthIndicator from "../components/farmdetails/crop-health-indicator/CropHealthIndicator";
import CropHealth from "../components/farmdetails/crop-health/CropHealth";
import FarmDetailsHeader from "../components/farmdetails/farm-details-header/FarmDetailsHeader";
import FarmMap from "../components/farmdetails/farm-details-map/FarmMap";
import SoilHealthCard from "../components/farmdetails/soil-health/SoilHealthCard";
import NavigationBar from "../components/home/navigationbar/NavigationBar";
import { useLocation } from "react-router-dom";
import "../style/FarmDetails.css";
import FarmDetailsWeatherCard from "../components/farmdetails/weather-card/FarmDetailsWeatherCard";
import CropGrowth from "../components/farmdetails/crop-growth/CropGrowth";
import CropProtection from "../components/farmdetails/crop-protection/CropProtection";
import Loading from "../components/common/Loading/Loading";
const FarmDetails = () => {
  const location = useLocation();
  const farmDetails = location.state;

  if (!farmDetails?.field || farmDetails.field.length === 0) {
    return <Loading />;
  }

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
        <FarmDetailsWeatherCard farmDetails={farmDetails} />
        <div className="soil-health-heading">Crop Growth</div>
        <CropGrowth />
        <div className="soil-health-heading">Crop Protection</div>
        <CropProtection />
        <NavigationBar />
      </div>
    </div>
  );
};

export default FarmDetails;
