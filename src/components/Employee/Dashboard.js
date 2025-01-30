import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js"; // Move this import to the top
import "./Dashboard.css"; // Import your CSS

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalWasteProcessed: 1500,
    totalWasteRemaining: 250,
    totalCyclesCompleted: 20,
    availableProducts: 600,
    wasteIntakeData: [
      { date: "2024-01-01", volume: 120 },
      { date: "2024-01-02", volume: 180 },
      { date: "2024-01-03", volume: 220 },
      { date: "2024-01-04", volume: 200 },
      { date: "2024-01-05", volume: 250 },
      { date: "2024-01-06", volume: 300 },
    ],
    recentCollections: [
      { location: "Green Valley Farms", wasteType: "Crop Residue", quantity: "5 tons" },
      { location: "Sunnydale Orchards", wasteType: "Fruit Waste", quantity: "3 tons" },
      { location: "Evergreen Plantation", wasteType: "Leaf Litter", quantity: "2 tons" },
    ],
    processingUpdates: [
      { facility: "Green Earth Processing Unit", status: "Composted 8 tons of waste" },
      { facility: "Eco Biogas Plant", status: "Converted 5 tons into biogas" },
      { facility: "AgriRecycle Center", status: "Recycled 2 tons into mulch" },
    ],
  });

  useEffect(() => {
    const fetchData = () => {
      setMetrics(prevMetrics => ({ ...prevMetrics }));
    };
    fetchData();
  }, []);

  const lineChartData = {
    labels: metrics.wasteIntakeData.map(item => item.date),
    datasets: [
      {
        label: "Waste Intake Over Time (tons)",
        data: metrics.wasteIntakeData.map(item => item.volume),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Waste Processing Dashboard</h1>
      <div className="dashboard-metrics">
        <div className="metric-card">
          <h2>Total Waste Processed</h2>
          <p>{metrics.totalWasteProcessed} tons</p>
        </div>
        <div className="metric-card">
          <h2>Total Waste Remaining</h2>
          <p>{metrics.totalWasteRemaining} tons</p>
        </div>
        <div className="metric-card">
          <h2>Completed Processing Cycles</h2>
          <p>{metrics.totalCyclesCompleted}</p>
        </div>
        <div className="metric-card">
          <h2>Available Products</h2>
          <p>{metrics.availableProducts}</p>
        </div>
      </div>
      <div className="charts-section">
        <h2>Waste Intake Over Time</h2>
        <Line data={lineChartData} />
      </div>
      <div className="collections-section">
        <h2>Recent Collections</h2>
        <ul>
          {metrics.recentCollections.map((collection, index) => (
            <li key={index}>
              {collection.location}: {collection.wasteType} - {collection.quantity}
            </li>
          ))}
        </ul>
      </div>
      <div className="processing-updates-section">
        <h2>Processing Updates</h2>
        <ul>
          {metrics.processingUpdates.map((update, index) => (
            <li key={index}>
              {update.facility}: {update.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
