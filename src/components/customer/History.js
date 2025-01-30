import React from 'react';
import './History.css'; 
import ii1 from "./assets/image2.jpg";

function History() {
  // Example array of order details
  const orders = [
    { id: 1, date: '2024-12-15', description: 'Plastic - 50 kg',  totalWeight: '50 kg',Rate: '₹500',wasteType: 'Plastic',BuyerName: 'ABC Recyclers',  totalAmount:'₹6000'},
    { id: 2, date: '2024-12-14', description: 'Organic - 30 kg', totalWeight: '30 kg',Rate: '₹300',wasteType: 'Organic',BuyerName: 'Green Farms',     totalAmount:'₹10000' },
    { id: 3, date: '2024-12-13', description: 'Organic- 20 kg',   totalWeight: '20 kg',Rate: '₹200',wasteType: 'Organic',BuyerName: 'Nature Supplies',totalAmount:'₹3000' },
    // Add more orders as neededtotalAmount:'6000'
  ];

  return (
    <div className="order-history">
      <h2>Farmer Order History</h2>
      <div className="card-container">
        {orders.map(order => (
          <div className="order-card" key={order.id}> 
            <div className="d-flex justify-content-center align-items-center"><img src={ii1} height="150px" width="200px" /></div>
            <p><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
            <p><strong>Description:</strong> {order.description}</p>
            <p><strong>Total Weight:</strong> {order.totalWeight}</p>
            <p><strong>Rate:</strong> {order.Rate}</p>
            <p><strong>Waste Type:</strong> {order.wasteType}</p>
            <p><strong>Buyer Name:</strong> {order.BuyerName}</p>
            <p><strong>Total Amount:</strong> {order.totalAmount}</p>
            <button type="button" class="btn btn-danger">Invoice</button>

            


          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
