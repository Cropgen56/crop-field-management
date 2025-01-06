import React from "react";
import Header from "../components/home/header/Header";
import WeatherCard from "../components/home/weathercard/WeatherCard";
import NavigationBar from "../components/home/navigationbar/NavigationBar";
import CommunitySection from "../components/home/communitysection/CommunitySection";
import MyFarm from "../components/home/myfarm/MyFarm";
import "../style/Home.css";
const Home = () => {
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
