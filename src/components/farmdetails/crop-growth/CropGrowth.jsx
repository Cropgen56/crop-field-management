import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./CropGrowth.css";
import { useTranslation } from "react-i18next";

const CropGrowth = ({ farmDetails, npkData }) => {
  const { t } = useTranslation();
  const data = [
    { week: "Week 1", height: 1 },
    { week: "Week 2", height: 2 },
    { week: "Week 3", height: 1.5 },
    { week: "Week 4", height: 2.5 },
    { week: "Week 5", height: 2 },
    { week: "Week 6", height: 3 },
    { week: "Week 7", height: 2.5 },
    { week: "Week 8", height: 4.6 },
    { week: "Week 9", height: 5 },
    { week: "Week 10", height: 5.3 },
    { week: "Week 11", height: 6 },
  ];

  const [activeIndex, setActiveIndex] = useState(4);

  function calculateWeeksFromStartDate(startDate) {
    const start = new Date(startDate);
    const end = new Date();

    const diffInMs = end - start;

    const weeks = diffInMs / (1000 * 60 * 60 * 24 * 7);

    return Math.floor(weeks);
  }

  // Inline Custom Tooltip
  const renderCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const weeks = calculateWeeksFromStartDate(farmDetails?.sowingDate);

      return (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #4B970F",
            borderRadius: "8px",
            padding: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#4B970F",
              padding: "5px 10px",
              borderRadius: "5px 5px 0 0",
            }}
          >
            {t("week")} {weeks}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              color: "#333",
              padding: "5px",
            }}
          >
            {t("stage")}:{" "}
            <span style={{ fontWeight: "bold" }}>
              {npkData?.Crop_Growth_Stage}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div body className="plant-growth-card shadow">
      <div className="header-container">
        <div className="heading-container">
          <div className="subheader-text">{farmDetails?.cropName}</div>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorHeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4B970F" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4B970F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#ccc" vertical={false} />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              style={{
                fontSize: "10px",
                fill: "#000000",
                fontWeight: 600,
              }}
              tickMargin={5}
            />
            <Tooltip
              content={renderCustomTooltip}
              active={true}
              payload={[data[activeIndex]]}
            />
            <Area
              type="monotone"
              dataKey="height"
              stroke="#4B970F"
              fillOpacity={1}
              fill="url(#colorHeight)"
              name={npkData?.Crop_Growth_Stage}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CropGrowth;
