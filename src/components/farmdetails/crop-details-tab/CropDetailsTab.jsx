import React from "react";
import "./CropDetailsTab.css";

const CropDetailsTab = () => {
  const year = 2025;

  // Function to generate all dates of the year
  const generateYearDates = (year) => {
    const dates = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    const currentDate = new Date();

    // Loop through the year dates
    for (
      let date = startDate;
      date < currentDate && date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      dates.push(new Date(date));
    }

    return dates;
  };

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const yearDates = generateYearDates(year);

  // Get today's date for comparison
  const today = new Date();
  const todayFormatted = formatDate(today);

  return (
    <div className="responsive-table">
      <div className="table-header-wrapper">
        <div className="table-header">
          <span>Crop Health Check</span>{" "}
          <span className="vertical-line">|</span>
          <span>Soil Organic Carbon</span>
          <span className="vertical-line">|</span>
          <span>Moisture Stress Check</span>
          <span className="vertical-line">|</span>
          <span>Water Stress Check</span>
          <span className="vertical-line">|</span>
          <span>Naitrogne Check</span>
          <span className="vertical-line">|</span>
          <span>Live Image </span>
        </div>
      </div>
      <div className="table-content">
        {yearDates.map((date, index) => {
          const formattedDate = formatDate(date);
          const isToday = formattedDate === todayFormatted;

          return (
            <div key={index} className={`date-item ${isToday ? "today" : ""}`}>
              {formattedDate}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CropDetailsTab;
