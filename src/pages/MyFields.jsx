import FarmDetails from "../components/addfield/farmdetails/FarmDetails";
import NavigationBar from "../components/home/navigationbar/NavigationBar";
import MyFieldsHeader from "../components/myfields/MyFieldsHeader";
import "../style/MyFields.css";
const MyFields = () => {
  const farmData = {
    farmName: "Ashesh B",
    crop: "Soybean",
    sowingDate: "24/10/2024",
    area: 15,
    location: "Nagpur, Maharashtra",
    imageUrl: "https://example.com/image.jpg",
  };

  return (
    <div className="my-fields-main-container">
      <MyFieldsHeader />
      <div className="farm-fields-container">
        <FarmDetails
          farmData={farmData}
          onEdit={() => console.log("Edit farm")}
        />
        <FarmDetails
          farmData={farmData}
          onEdit={() => console.log("Edit farm")}
        />{" "}
      </div>
      <NavigationBar />
    </div>
  );
};

export default MyFields;
