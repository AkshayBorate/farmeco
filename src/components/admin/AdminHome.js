import React, { useEffect, useState } from "react";
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "./AdminHome.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AdminHome() {
  const [providerCount, setProviderCount] = useState(0);
  const [farmerCount, setFarmerCount] = useState(0);
  const [satisfactionRatings, setSatisfactionRatings] = useState([
    { name: "Farmers", rating: 0 },
  ]);
  const [wasteCollectionData, setWasteCollectionData] = useState([]);
  const [wasteDistributionData, setWasteDistributionData] = useState([]);
  const [totalWasteCollected, setTotalWasteCollected] = useState(0);
  const [processedWaste, setProcessedWaste] = useState(0);
  const [carbonSavings, setCarbonSavings] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8085/api/employee/count")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch provider count");
        }
        return response.text();
      })
      .then((count) => setProviderCount(parseInt(count, 10)))
      .catch((error) => console.error("Error fetching provider count:", error));

    fetch("http://localhost:8085/api/farmers/count")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch farmer count");
        }
        return response.text();
      })
      .then((count) => setFarmerCount(parseInt(count, 10)))
      .catch((error) => console.error("Error fetching farmer count:", error));


    fetch("http://localhost:8085/reviews/average")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch satisfaction ratings");
        }
        return response.json();
      })
      .then((rating) => {
        const percentageRating = (rating / 5) * 100;
        setSatisfactionRatings([{ name: "Farmers", rating: percentageRating }]);
      })
      .catch((error) => console.error("Error fetching satisfaction ratings:", error));


    fetch("http://localhost:8085/waste-details/orders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch waste details");
        }
        return response.json();
      })
      .then((data) => {
        const collectionData = data.map((item) => ({
          month: new Date(item.createdAt).toLocaleString("default", { month: "short" }),
          waste: item.status === "COLLECTED" ? 1 : 0,
        }));

        const distributionData = data.reduce((acc, item) => {
          const wasteType = item.wasteType;
          const existingEntry = acc.find((entry) => entry.name === wasteType);
          if (existingEntry) {
            existingEntry.value += 1;
          } else {
            acc.push({ name: wasteType, value: 1 });
          }
          return acc;
        }, []);

        setWasteCollectionData(collectionData);
        setWasteDistributionData(distributionData);
      })
      .catch((error) => console.error("Error fetching waste details:", error));


    fetch("http://localhost:8085/intake/get")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch total waste collected");
        }
        return response.json();
      })
      .then((data) => {
        const totalWeight = data.reduce((sum, item) => sum + item.weight, 0);
        setTotalWasteCollected(totalWeight / 1000); 


        const calculatedCarbonSavings = (totalWeight / 1000) * 3.75;
        setCarbonSavings(calculatedCarbonSavings);
      })
      .catch((error) => console.error("Error fetching total waste collected:", error));


    fetch("http://localhost:8085/intake/get")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch processed waste");
        }
        return response.json();
      })
      .then((data) => {
        const totalProcessedWeight = data.reduce((sum, item) => sum + item.weight, 0);
        setProcessedWaste(totalProcessedWeight / 1000); 
      })
      .catch((error) => console.error("Error fetching processed waste:", error));
  }, []);

  return (
    <div className="contain">
      <div className="admin-home">
        <div className="welcome-banner">
          <h1>Welcome, Admin!</h1>
          <p>Your hub for managing agricultural waste efficiently and sustainably.</p>
        </div>

        <div className="key-metrics">
          <h2>Platform Statistics</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <h3>Waste Collected</h3>
              <p>{totalWasteCollected.toFixed(2)} Tons</p>
            </div>
            <div className="metric-card">
              <h3>Waste Processed</h3>
              <p>{processedWaste.toFixed(2)} Tons</p>
            </div>
            <div className="metric-card">
              <h3>Carbon Savings</h3>
              <p>{carbonSavings.toFixed(2)} kg CO2</p>
            </div>
            <div className="metric-card">
              <h3>Active Users</h3>
              <p>Farmers: {farmerCount} | Providers: {providerCount}</p>
            </div>
          </div>
        </div>

        <div className="analytics-overview">
          <h2>Analytics Overview</h2>
          <div className="analytics-grid">
            <div className="chart-container">
              <h4>Waste Collection Trend</h4>
              <LineChart width={300} height={300} data={wasteCollectionData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="waste" stroke="#8884d8" />
              </LineChart>
            </div>
            <div className="chart-container">
              <h4>Waste Distribution</h4>
              <PieChart width={300} height={300}>
                <Pie
                  data={wasteDistributionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                >
                  {wasteDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
            <div className="chart-container">
              <h4>Farmer Satisfaction Ratings</h4>
              <BarChart width={300} height={300} data={satisfactionRatings}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="rating" fill="#82ca9d" />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}