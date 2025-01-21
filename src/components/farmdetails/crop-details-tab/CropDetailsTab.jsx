import React, { useEffect, useState } from "react";
import { ndviAPI, socAPI } from "../../../api/satelliteAPI";
import "./CropDetailsTab.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedIndex } from "../../../store/satelliteSlice";

const CropDetailsTab = ({ farmDetails, setLoading }) => {
  const dispatch = useDispatch();
  const selectedIndex = useSelector((state) => state.satellite.selectedIndex);

  const [socData, setSocData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("socData")) || null;
    } catch {
      return null;
    }
  });

  const [ndviData, setNdviData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ndviData")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!farmDetails) return;

    const fetchData = async () => {
      try {
        const [socResponse, ndviResponse] = await Promise.all([
          socAPI({ farmDetails }),
          ndviAPI({ farmDetails, selectedDate: null }),
        ]);

        if (socResponse) {
          setSocData(socResponse);
          localStorage.setItem("socData", JSON.stringify(socResponse));
        }

        if (ndviResponse) {
          setNdviData(ndviResponse);
          localStorage.setItem("ndviData", JSON.stringify(ndviResponse));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const changeIndex = (index) => dispatch(setSelectedIndex(index));

  const handleDateClick = async (date) => {
    try {
      const response = await ndviAPI({ farmDetails, selectedDate: date });
      if (response) {
        setNdviData(response);
        localStorage.setItem("ndviData", JSON.stringify(response));
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching NDVI data for date:", error);
    }
  };

  const todayFormatted = formatDate(new Date());

  return (
    <div className="responsive-table">
      <div className="table-header-wrapper">
        <div className="table-header">
          <span
            onClick={() => {
              changeIndex("ndvi");
            }}
          >
            Crop Health Check
          </span>
          <span className="vertical-line">|</span>
          <span onClick={() => changeIndex("soc")}>Soil Organic Carbon</span>
          <span className="vertical-line">|</span>
          <span>Moisture Stress Check</span>
          <span className="vertical-line">|</span>
          <span>Water Stress Check</span>
          <span className="vertical-line">|</span>
          <span>Nitrogen Check</span>
          <span className="vertical-line">|</span>
          <span>Live Image</span>
        </div>
      </div>

      {selectedIndex === "ndvi" && ndviData ? (
        <div className="table-content visible">
          {ndviData.all_dates_with_cloud_percentage
            ?.slice()
            .reverse()
            .map((item, index) => {
              const formattedDate = formatDate(new Date(item.date));
              const isToday = formattedDate === todayFormatted;

              return (
                <div
                  key={index}
                  className={`date-item ${isToday ? "today" : ""}`}
                  onClick={() => {
                    setLoading(true);
                    handleDateClick(item.date);
                  }}
                >
                  <div>{formattedDate}</div>
                  <div>Cloud Percentage: {item.cloud_percentage}%</div>
                </div>
              );
            })}
        </div>
      ) : null}
    </div>
  );
};

export default CropDetailsTab;
