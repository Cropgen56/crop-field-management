import React, { useEffect } from "react";
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
import { useSelector } from "react-redux";

const SoilHealthCard = () => {
  const { NpkData } = useSelector((state) => state.satellite);

  const data = [
    {
      nutrient: "N",
      current: NpkData?.NPK_Available_kg?.N,
      require: NpkData?.NPK_Required_at_Stage_kg?.N,
      label: "Nitrogen",
    },
    {
      nutrient: "P",
      current: NpkData?.NPK_Available_kg?.P,
      require: NpkData?.NPK_Required_at_Stage_kg?.P,
      label: "Phosphorous",
    },
    {
      nutrient: "K",
      current: NpkData?.NPK_Available_kg?.K,
      require: NpkData?.NPK_Required_at_Stage_kg?.K,
      label: "Potassium",
    },
  ];

  // Prevent rendering of bars with negative values by default
  const formattedData = data.map((item) => ({
    ...item,
    current: item.current < 0 ? null : item.current,
    require: item.require < 0 ? null : item.require,
  }));

  return (
    <div className="soil-health-card-main-container">
      <div className="soil-analysis-chart-container">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart
            data={formattedData}
            layout="vertical"
            margin={{ top: 0, right: 30, bottom: 5, left: -5 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="nutrient"
              axisLine={false}
              tickLine={false}
              tick={(props) => {
                const { x, y, payload } = props;
                const nutrient = formattedData.find(
                  (d) => d.nutrient === payload.value
                );
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
                  fontSize: "10px",
                  fontWeight: "700",
                },
              }}
            />
            <Bar
              dataKey="require"
              fill="#C4E930"
              barSize={4}
              name="Required"
              radius={[10, 10, 10, 10]}
              label={{
                position: "right",
                fill: "#A2A2A2",
                formatter: (value) => `${value}`,
                style: {
                  fontSize: "9px",
                  fontWeight: "bold",
                },
              }}
            />

            {/* Add the Legend here */}
            <Legend
              layout="horizontal"
              align="right"
              verticalAlign="top"
              wrapperStyle={{
                paddingTop: "0px",
                paddingRight: "0px",
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SoilHealthCard;
