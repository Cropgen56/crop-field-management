import FarmDetails from "../components/myfields/farmdetails/FarmDetails";
import NavigationBar from "../components/home/navigationbar/NavigationBar";
import MyFieldsHeader from "../components/myfields/myfarmheader/MyFieldsHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFarmFields } from "../store/farmSlice";

import "../style/MyFields.css";
import Loading from "../components/common/Loading/Loading";

const MyFields = () => {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData")) || {};

  useEffect(() => {
    if (userData?._id) {
      dispatch(getFarmFields(userData?._id));
    }
  }, []);

  const farmState = useSelector((state) => state?.farm);
  const { fields = [], status, error } = farmState || {};

  // Handle loading and error states
  if (status === Loading) {
    return <Loading />;
  }

  return (
    <div className="my-fields-main-container">
      <MyFieldsHeader />
      <div className="farm-fields-container">
        {/* Map through fields and render FarmDetails for each */}
        {fields.length > 0 ? (
          fields?.map((field, index) => (
            <FarmDetails key={index} farmData={field} />
          ))
        ) : (
          <div>No farms available</div>
        )}
      </div>
      <NavigationBar />
    </div>
  );
};

export default MyFields;
