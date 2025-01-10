import React, { useEffect } from "react";
import Header from "../components/home/header/Header";
import WeatherCard from "../components/home/weathercard/WeatherCard";
import NavigationBar from "../components/home/navigationbar/NavigationBar";
// import CommunitySection from "../components/home/communitysection/CommunitySection";
import MyFarm from "../components/home/myfarm/MyFarm";
import "../style/Home.css";
import { registerUser } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { decodeToken } from "../utils/tokenUtility";

const Home = () => {
  const dispatch = useDispatch();

  function getQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get("token");
  }

  const token = getQueryParams();
  if (token) localStorage.setItem("accessToken", token);

  const userData = decodeToken(localStorage.getItem("accessToken"));
  console.log(userData);
  useEffect(() => {
    if (userData) {
      dispatch(registerUser(userData));
    }
  }, [dispatch, userData]);

  return (
    <div className="home-page-main-container">
      <Header />
      <WeatherCard />
      <MyFarm />
      {/* <CommunitySection /> */}
      <NavigationBar />
    </div>
  );
};

export default Home;
