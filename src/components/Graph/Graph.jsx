import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Graph = ({ customSongAmount, regularSongAmounts, chargeCustomers }) => {
  const chartData = {
    labels: ["Custom", "Category 1", "Category 2", "Category 3", "Category 4"],
    datasets: [
      {
        label: "Regular Song Request Amounts",
        backgroundColor: "#F0C3F1",
        borderColor: "#F0C3F1",
        borderWidth: 0.1,
        hoverBackgroundColor: "#F0C3F1",
        hoverBorderColor: "#F0C3F1",
        data: [customSongAmount, ...regularSongAmounts],
        barThickness: 30,
      },
    ],
  };

  return chargeCustomers ? (
    <div className="graph-container">
      <Bar data={chartData} style={{ borderLeft: "1px solid white", borderBottom: "1px solid white",marginTop:"25px" }} />
    </div>
  ) : null;
};

export default Graph;
