import HealthIndicator from "../components/farmdetails/crop-health-indicator/CropHealthIndicator";
import CropHealth from "../components/farmdetails/crop-health/CropHealth";
import FarmDetailsHeader from "../components/farmdetails/farm-details-header/FarmDetailsHeader";
import FarmMap from "../components/farmdetails/farm-details-map/FarmMap";
import NavigationBar from "../components/home/navigationbar/NavigationBar";
import "../style/FarmDetails.css";
const FarmDetails = () => {
  return (
    <div className="farm-details">
      <div className="farm-details-header">
        {" "}
        <FarmDetailsHeader />
      </div>
      <div className="farm-details-body">
        <HealthIndicator />
        <FarmMap />
        <CropHealth />
        <NavigationBar />
      </div>
    </div>
  );
};

export default FarmDetails;
