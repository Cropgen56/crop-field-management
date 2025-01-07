import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import About from "./pages/About";
import NotFound from "./pages/PageNotFound";
import AddField from "./pages/AddField";
import MyFields from "./pages/MyFields";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-field" element={<AddField />} />
        <Route path="/my-fields" element={<MyFields />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
