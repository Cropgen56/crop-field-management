import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/home/header/Header";
import WeatherCard from "../components/home/weathercard/WeatherCard";
import NavigationBar from "../components/home/navigationbar/NavigationBar";
import { getCurrentLocation } from "../utils/getUserCurrectCoordinate";
import { getWeatherData } from "../utils/getWeatherData";
// import CommunitySection from "../components/home/communitysection/CommunitySection";
import MyFarm from "../components/home/myfarm/MyFarm";
import "../style/Home.css";
import { registerUser } from "../store/authSlice";
import { decodeToken } from "../utils/tokenUtility";
import Loading from "../components/common/Loading/Loading";
import { getFarmFields } from "../store/farmSlice";

const Home = () => {
  const dispatch = useDispatch();

  // Get the token from the URL
  function getQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get("token");
  }

  const token = getQueryParams();
  if (token) localStorage.setItem("accessToken", token);

  const userData = decodeToken(localStorage.getItem("accessToken")) || {};
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);

  // Register or log in the user
  useEffect(() => {
    if (userData) {
      dispatch(registerUser(userData));
    }
  }, [dispatch, userData]);

  // Get the current location of the user
  useEffect(() => {
    getCurrentLocation({ setLocation, setError });
  }, []);

  // Get the weather data from the OpenWeather API
  useEffect(() => {
    if (location.latitude && location.longitude) {
      getWeatherData({ location })
        .then((res) => {
          setWeather(res);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [location]);

  const userDataJon = JSON.parse(localStorage.getItem("userData")) || {};

  // Get user's farms
  useEffect(() => {
    if (userDataJon?._id) {
      dispatch(getFarmFields(userDataJon._id));
    }
  }, []);

  const farmState = useSelector((state) => state?.farm);
  const { fields = [], status } = farmState || {};

  // Handle loading and error states
  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="home-page-main-container">
      <div>
        <Header />
        <WeatherCard weather={weather} />
        <MyFarm fields={fields} />
        {/* <CommunitySection /> */}
        <NavigationBar />
      </div>
    </div>
  );
};

export default Home;
