import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./History.css";

function MyOrders() {
  const [payments, setPayments] = useState([]);
  const userId = localStorage.getItem("userId"); // Get the user ID from localStorage

  useEffect(() => {
    async function fetchPayments() {
      try {
        console.log("Stored User ID:", userId);
        if (!userId) {
          console.warn("No User ID found in localStorage.");
          return;
        }

        const response = await axios.get("http://localhost:8085/api/payment/getall");
        console.log("Payment Response:", response.data);

        // Filter payments where `farmerid` matches `userId`
        const filteredPayments = response.data.filter(payment => {
          if (!payment.sellWaste) {
            console.warn(`Payment ID ${payment.id} has no sellWaste data.`);
            return false;
          }
          return payment.sellWaste.farmerid === parseInt(userId);
        });

        setPayments(filteredPayments);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    }

    if (userId) {
      fetchPayments();
    }
  }, [userId]);

  const generateInvoice = (payment) => {
    const doc = new jsPDF();
  
    // Header
    doc.setFontSize(22);
    doc.text("FarmEco Invoice", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text("Waste Selling Company", 105, 28, { align: "center" });
    doc.line(10, 35, 200, 35);
  
    // Company Info
    doc.setFontSize(10);
    doc.text("FarmEco Pvt Ltd.", 10, 45);
    doc.text("123 Greenfield Avenue, Pune, Maharashtra", 10, 50);
    doc.text("Contact: +91-1234567890 | Email: support@farmeco.com", 10, 55);
  
    // Invoice Details
    const invoiceNumber = `FEC-${payment.id.toString().padStart(6, "0")}`;
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoiceNumber}`, 140, 45);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 50);
    doc.text(`Order ID: ${payment.orderId}`, 140, 55);
    doc.text(`Payment ID: ${payment.paymentId}`, 140, 60);
  
    // Farmer & Waste Details
    doc.autoTable({
      startY: 70,
      head: [["Field", "Value"]],
      body: [
        ["Farmer Name:", payment.sellWaste.name],
        ["Waste Type:", payment.sellWaste.wasteType],
        ["Address:", payment.sellWaste.address],
        ["Mobile No:", payment.sellWaste.mobileNo],
      ],
      theme: "striped",
    });
  
    // Payment Details
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 15,
      head: [["Item Description", "Rate", "Total Price"]],
      body: [["Agricultural Waste", `${payment.sellWaste.price}`, `${payment.amount}`]],
      theme: "grid",
    });
  
    // Save PDF
    doc.save(`Invoice_${invoiceNumber}.pdf`);
  };
  

  return (
    <div className="order-history">
      <h2>My Orders</h2>
      <div className="card-container">
        {payments.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          payments.map((payment) => (
            <div className="order-card" key={payment.id}>
              <img
                src={`http://localhost:8085/uploads/${payment.sellWaste.imagePath}`}
                alt="Waste"
                height="150px"
                width="200px"
              />
              <p><strong>Farmer Name:</strong> {payment.sellWaste.name}</p>
              <p><strong>Waste Type:</strong> {payment.sellWaste.wasteType}</p>
              {/* <p><strong>Order ID:</strong> {payment.orderId}</p>
              <p><strong>Payment ID:</strong> {payment.paymentId}</p> */}
              <p><strong>Amount Paid:</strong> ₹{payment.amount}</p>
              <p><strong>Status:</strong> {payment.status}</p>
              <button className="btn btn-primary" onClick={() => generateInvoice(payment)}>
                Generate Invoice
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyOrders;
