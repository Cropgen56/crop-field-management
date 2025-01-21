import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/PageNotFound";
import AddField from "./pages/AddField";
import MyFields from "./pages/MyFields";
import FarmDetails from "./pages/FarmDetails";
import Map from "./pages/Map";
import { useLocation } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <RoutesWrapper />
    </Router>
  );
};

const RoutesWrapper = () => {
  const location = useLocation();

  // Clear local storage every time the route changes
  useEffect(() => {
    if (location.pathname !== "/farm-details") {
      localStorage.removeItem("socData");
      localStorage.removeItem("ndviData");
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-field" element={<AddField />} />
      <Route path="/my-farms" element={<MyFields />} />
      <Route path="/farm-details" element={<FarmDetails />} />
      <Route path="/map" element={<Map />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
