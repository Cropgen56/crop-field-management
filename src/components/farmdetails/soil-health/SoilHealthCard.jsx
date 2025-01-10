import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./SoilHealthCard.css";
import soilTemperatureImage from "../../../assets/Images/soil-temperature.png";

const data = [
  { nutrient: "N", current: 23.4, lastYear: 15.6, label: "Nitrogen" },
  { nutrient: "P", current: 28.1, lastYear: 12.5, label: "Phosphorous" },
  { nutrient: "K", current: 20.4, lastYear: 8.1, label: "Potassium" },
];

const SoilHealthCard = () => {
  return (
    <div className="soil-health-card-main-container">
      {" "}
      <div className="soil-analysis-chart-container">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 30, bottom: 5, left: -5 }}
          >
            {/* Hide Cartesian Gridlines */}
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="nutrient"
              axisLine={false}
              tickLine={false}
              tick={(props) => {
                const { x, y, payload } = props;
                const nutrient = data.find((d) => d.nutrient === payload.value);
                return (
                  <foreignObject x={x - 50} y={y - 20} width={40} height={40}>
                    <div className="y-axis-label">
                      <span>{payload.value}</span>
                    </div>
                  </foreignObject>
                );
              }}
            />
            <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
            {/* <Legend align="right" verticalAlign="top" iconType="line" /> */}
            <Bar
              dataKey="current"
              fill="#36A534"
              barSize={4}
              name="Current"
              radius={[10, 10, 10, 10]}
              label={{
                position: "right",
                fill: "#000",
                formatter: (value) => `${value}`,
                style: {
                  fontSize: "12px",
                  fontWeight: "700",
                },
              }}
            />
            <Bar
              dataKey="lastYear"
              fill="#C4E930"
              barSize={4}
              name="Required"
              radius={[10, 10, 10, 10]}
              label={{
                position: "right",
                fill: "#A2A2A2",
                formatter: (value) => `${value}`,
                style: {
                  fontSize: "7px",
                  fontWeight: "bold",
                },
              }}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="nutrient-names">
          {data.map((item, index) => (
            <div
              key={index}
              className={`nutrient-name nutrient-${item.nutrient}`}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <div className="soil-info">
        <div className="soil-stat">
          <div className="icon-container">
            <img src={soilTemperatureImage} alt="" />
          </div>
          <div className="data-container">
            <p>Soil Moisture</p>
            <strong>40%</strong>
          </div>
        </div>
        <div className="soil-stat">
          <div className="icon-container">
            <img src={soilTemperatureImage} alt="" />
          </div>
          <div className="data-container">
            {" "}
            <p>Soil Temperature</p>
            <strong>24°C</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilHealthCard;
