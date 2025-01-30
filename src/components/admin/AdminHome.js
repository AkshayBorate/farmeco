import React from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import "./AdminHome.css";

const wasteCollectionData = [
  { month: "Jan", waste: 100 },
  { month: "Feb", waste: 200 },
  { month: "Mar", waste: 300 },
  { month: "Apr", waste: 400 },
  { month: "May", waste: 500 },
  { month: "Jun", waste: 600 },
];

const wasteDistributionData = [
  { name: "Organic", value: 40 },
  { name: "Bio", value: 30 },
  { name: "Farm", value: 20 },
  { name: "Others", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const satisfactionRatings = [
  { name: "Farmers", rating: 85 },
  { name: "Providers", rating: 78 },
];

export default function AdminHome() {
  return (
     <div className="contain">
  
    <div className="admin-home">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h1>Welcome, Admin!</h1>
        <p>Your hub for managing agricultural waste efficiently and sustainably.</p>
        <div className="quick-links">
        
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="key-metrics">
        <h2>Platform Statistics</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <h3>Waste Collected</h3>
            <p>1,200 Tons</p>
          </div>
          <div className="metric-card">
            <h3>Waste Processed</h3>
            <p>900 Tons</p>
          </div>
          <div className="metric-card">
            <h3>Carbon Savings</h3>
            <p>4,500 kg CO2</p>
          </div>
          <div className="metric-card">
            <h3>Active Users</h3>
            <p>Farmers: 120 | Providers: 30</p>
          </div>
        </div>
      </div>

      

      {/* Analytics Overview */}
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
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="rating" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>

      {/* Pending Actions */}
      <div className="pending-actions">
        <h2>Pending Actions</h2>
        <ul>
          <li>3 farmer profile approval requests.</li>
          <li>2 unresolved service disputes.</li>
          <li>5 unmoderated marketplace listings.</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Support: admin-support@example.com | Phone: +1234567890</p>
        <p>Privacy Policy | Terms & Conditions</p>
        <p>“Together, let’s build a sustainable future.”</p>
      </footer>
    </div>
 
     </div>
  );
}
