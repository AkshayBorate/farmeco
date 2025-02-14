import React, { useEffect, useState } from "react";
import axios from "axios";
import "./History.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId"); // Get the user ID from localStorage

  useEffect(() => {
    async function fetchOrders() {
      try {
        console.log("Stored User ID:", userId);
        if (!userId) {
          console.warn("No User ID found in localStorage.");
          return;
        }

        const response = await axios.get("http://localhost:8085/marketplace/getall");
        console.log("Orders Response:", response.data);

        // Filter orders where `farmerid` matches `userId` and show all orders regardless of status
        const filteredOrders = response.data.filter(order => order.farmerid === parseInt(userId));
        setOrders(filteredOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return (
    <div className="order-history">
      <h2>My Orders</h2>
      <div className="card-container">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order.id}>
              <img
                src={`http://localhost:8085/uploads/${order.imagePath}`}
                alt="Waste"
                height="150px"
                width="200px"
              />
              <p><strong>Farmer Name:</strong> {order.name}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Waste Type:</strong> {order.wasteType}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Mobile No:</strong> {order.mobileNo}</p>
              <p><strong>Price:</strong> ₹{order.price}</p>
              <p><strong>Sold Status:</strong> {order.isSold ? "Sold" : "Available"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyOrders;
