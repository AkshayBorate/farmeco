import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import i1 from "./assets/Image1.jpg"; 

const TrackOrder = ({ order }) => {
  return (
    <div className="tracking-info">
      <h4>Pickup Date: {order.pickupDate ? new Date(order.pickupDate).toLocaleDateString() : "Not Scheduled"}</h4>
      {order.trackingLink ? (
        <p>
          Track Order: {" "}
          <a href={order.trackingLink} target="_blank" rel="noopener noreferrer">
            {order.trackingLink}
          </a>
        </p>
      ) : (
        <p>Message: {order.message || "No message available"}</p>
      )}
    </div>
  );
};

const FarmerDashboard = () => {
  const [farmer, setFarmer] = useState(null);
  const [orderStatus, setOrderStatus] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      fetch(`http://localhost:8085/api/farmers/get/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setFarmer(data);
        })
        .catch((error) => {
          console.error("Error fetching farmer data:", error);
        });

      fetch(`http://localhost:8085/waste-details/orders`)
        .then((response) => response.json())
        .then((data) => {
          const filteredOrders = data.filter(order => order.farmer.id.toString() === userId);
          setOrderStatus(filteredOrders);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching order data:", error);
          setLoading(false);
        });
    } else {
      console.error("No user ID found in localStorage");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    alert("Logged out successfully!");
    window.location.href = "/logins";
  };

  const openTrackOrder = (order) => {
    setSelectedOrder(order);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!farmer) {
    return <div>Unable to load farmer data. Please try again later.</div>;
  }

  return (
    <div className="farmer-dashboard">
      <header className="dashboard-header">
        <div className="logo">Farm Dashboard</div>
        <div className="profile">
          <span className="p-3">{farmer.name}</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="main-dashboard">
        <div className="row">
          <div className="col-xl-10">
            <h2>Welcome, {farmer.name}!</h2>
          </div>
          <div className="col-xl-2 align-content-right">
            <Link to="/custheader/editprofile">
              <button type="button" className="btn btn-secondary">
                Edit Profile
              </button>
            </Link>
          </div>
          <div className="farmer-info">
            <p><strong>Id:</strong> F19050{farmer.id}</p>
            <p><strong>Name:</strong> {farmer.name}</p>
            <p><strong>Address:</strong> {farmer.address}</p>
            <p><strong>Email:</strong> {farmer.email}</p>
          </div>
        </div>
      </section>

      <section className="order-status">
        <h3>Your Orders</h3>
        <div className="card-container">
          {orderStatus.length > 0 ? (
            orderStatus.map((order) => (
              <div key={order.id} className={`card ${order.status ? order.status.toLowerCase() : "pending"}`}>
                <h4>Order ID: ORD-{order.id}</h4>
                <div className="d-flex justify-content-center align-items-center my-2">
                  <img
                    src={order.imagePath}
                    height="150px"
                    width="200px"
                    alt={order.wasteType || "Product"}
                    onError={(e) => {
                      console.error("Image not found:", order.imagePath);
                      e.target.src = i1;
                    }}
                  />
                </div>
                <p>Waste Type: {order.wasteType || "Not specified"}</p>
                <p>Status: <span className="order-status-text">{order.status || "Pending"}</span></p>
                <button className="track-button" onClick={() => openTrackOrder(order)}>
                  Track Order
                </button>
              </div>
            ))
          ) : (
            <p>No orders available.</p>
          )}
        </div>
      </section>

      {selectedOrder && (
        <div className="track-order-modal">
          <div className="modal-content">
            <h3>Tracking Order ID: {selectedOrder.id}</h3>
            <TrackOrder order={selectedOrder} />
            <button className="close-button" onClick={() => setSelectedOrder(null)} aria-label="Close tracking modal">
              Close
            </button>
          </div>
        </div>
      )}

      <section className="action-buttons">
        <Link to="/custheader/sellwaste">
          <button className="action-button">Sell new Waste</button>
        </Link>
        <Link to="/custheader/history">
          <button className="action-button">Previous Orders</button>
        </Link>
      </section>
    </div>
  );
};

export default FarmerDashboard;
