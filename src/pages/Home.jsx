import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/home/header/Header";
import WeatherCard from "../components/home/weathercard/WeatherCard";
import NavigationBar from "../components/home/navigationbar/NavigationBar";
import { getCurrentLocation } from "../utils/getUserCurrectCoordinate";
import MyFarm from "../components/home/myfarm/MyFarm";
import "../style/Home.css";
import { registerUser } from "../store/authSlice";
import { decodeToken } from "../utils/tokenUtility";
import Loading from "../components/common/Loading/Loading";
import { getFarmFields } from "../store/farmSlice";
import TotalFarm from "../components/home/totalfarm/TotalFarm";

const Home = () => {
  const dispatch = useDispatch();

  // Extract token and register user
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("accessToken", token);
      const userData = decodeToken(token);
      if (userData && Object.keys(userData)?.length > 0) {
        dispatch(registerUser(userData));
      }
    }
  }, [dispatch]);

  // Fetch user details from Redux store
  const authState = useSelector((state) => state?.auth);
  const { user: registeredUser } = authState;

  // Fetch farms using stored user data
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userData")) || {};

    if (userDetails?._id) {
      dispatch(getFarmFields(userDetails?._id));
    }
  }, [dispatch]);

  // Retrieve farm data from Redux store
  const farmState = useSelector((state) => state?.farm);
  const { fields = [], status } = farmState || {};

  // Handle loading state
  // if (status === "loading") {
  //   return <Loading />;
  // }

  return (
    <div className="home-page-main-container">
      <div>
        <Header userDetails={registeredUser || {}} />
        <WeatherCard />
        <MyFarm fields={fields} />
        <TotalFarm fields={fields} />
        <NavigationBar />
      </div>
    </div>
  );
};

export default Home;
