import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './History.css';
import { Link } from 'lucide-react';

function History() {
  const [orders, setOrders] = useState([]);
  const [rejectedOrders, setRejectedOrders] = useState([]);
  const userId = localStorage.getItem('userId'); // Get the user ID from localStorage

  useEffect(() => {
    async function fetchData() {
      try {
        // Check if userId exists
        console.log("User ID: ", userId);
        if (!userId) {
          console.log("No User ID found in localStorage");
          return;
        }

        // Fetching intake data
        const intakeResponse = await axios.get('http://localhost:8085/intake/get');
        console.log("Intake Response: ", intakeResponse.data); // Log the intake response
        const fetchedOrders = intakeResponse.data;

        // Filter the orders to only include those where the farmer.id matches the userId
        const filteredOrders = fetchedOrders.filter(order => order.wasteDetailsId.farmer.id === parseInt(userId));

        // Set orders based on the filtered data
        setOrders(filteredOrders.filter(order => order.wasteDetailsId.status === "COLLECTED"));
        setRejectedOrders(filteredOrders.filter(order => order.wasteDetailsId.status === "REJECTED"));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const generateInvoice = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text('FarmEco Invoice', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Waste Selling Company', 105, 28, { align: 'center' });
    doc.line(10, 35, 200, 35);

    doc.setFontSize(10);
    doc.text('FarmEco Pvt Ltd.', 10, 45);
    doc.text('123 Greenfield Avenue, Pune, Maharashtra', 10, 50);
    doc.text('Contact: +91-1234567890 | Email: support@farmeco.com', 10, 55);

    const invoiceNumber = `FEC-${order.id.toString().padStart(6, '0')}-${order.wasteDetailsId.id}`;
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoiceNumber}`, 140, 45);
    doc.text(`Date: ${new Date(order.wasteDetailsId.pickupDate).toLocaleDateString()}`, 140, 50);

    doc.autoTable({
      startY: 70,
      head: [['Field', 'Value']],
      body: [
        ['Farmer Name:', order.wasteDetailsId.farmer.name],
        ['Place:', order.wasteDetailsId.address],
        ['Collected By:', order.collectedBy]
      ],
      theme: 'striped',
    });

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 15,
      head: [['Item Description', 'Weight (tons)', 'Rate', 'Total Price']],
      body: [['Agricultural Waste', `${order.weight}`, `${order.rate}`, `${order.totalPrice}`]],
      theme: 'grid',
    });

    doc.save(`Invoice_${invoiceNumber}.pdf`);
  };

  return (
    <div className="order-history">
      <h2>Farmer Order History</h2>
      <div className="combined-orders">
        <div className="card-container">
          {/* Displaying collected orders */}
          {orders.map(order => (
            <div className="order-card" key={order.id}>
              <img
                src={`http://localhost:8085/uploads/${order.wasteDetailsId.imagePath}`} // Full image path
                alt="Order Visual"
                height="150px"
                width="200px"
              />
              <p><strong>Order Date:</strong> {new Date(order.wasteDetailsId.pickupDate).toLocaleDateString()}</p>
              <p><strong>Place:</strong> {order.wasteDetailsId.address}</p>
              <p><strong>Weight:</strong> {order.weight} kg</p>
              <p><strong>Collected By:</strong> {order.collectedBy}</p>
              <p><strong>Farmer Name:</strong> {order.wasteDetailsId.farmer.name}</p>
              <p><strong>Rate:</strong> ₹{order.rate}</p>
              <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
              <button className="btn btn-danger" onClick={() => generateInvoice(order)}>Generate Invoice</button>  
              <a href='http://localhost:3000/custheader/feedback1'>Give Review</a>
            </div>
          ))}

          {/* Displaying rejected orders */}
          {rejectedOrders.map(order => (
            <div key={order.id} className="order-card rejected">
              <img
                src={`http://localhost:8085/uploads/${order.wasteDetailsId.imagePath}`} // Full image path
                height="150px"
                width="200px"
                alt={order.wasteDetailsId.wasteType || "Product"}
              />
              <h4>Order ID: ORD-{order.id}</h4>
              <strong>Waste Type: </strong>{order.wasteDetailsId.wasteType || "Not specified"}
              <br />
              <strong>Status:</strong> <span className="order-status-text">{order.wasteDetailsId.status}</span>
              <br />
              <strong>Message: </strong><span className="order-status-text">{order.wasteDetailsId.message}</span>
            </div>
            
          ))}
        
        </div>
      </div>
      
    </div>
  );
}

export default History;
