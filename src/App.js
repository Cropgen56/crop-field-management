import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import About from "./pages/About";
import NotFound from "./pages/PageNotFound";
import AddField from "./pages/AddField";
import MyFields from "./pages/MyFields";
import FarmDetails from "./pages/FarmDetails";
import Map from "./pages/Map";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-field" element={<AddField />} />
        <Route path="/my-farms" element={<MyFields />} />
        <Route path="/farm-details" element={<FarmDetails />} />
        <Route path="/map" element={<Map />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
