import React, { useEffect, useState } from "react";
import axios from "axios";

const MarketplaceBuyWaste = () => {
    const [loadingOrderId, setLoadingOrderId] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchOrders();
        loadRazorpay();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8085/marketplace/orders');
            if (response.data && response.data.message === "No orders found") {
                setMessage("No orders found");
                setOrders([]);
            } else {
                setOrders(response.data);
            }
        } catch (err) {
            setError(err);
            console.error("Error fetching orders:", err);
        }
    };

    const loadRazorpay = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    };

    const updateOrderStatus = async (orderId) => {
        try {
            await axios.put(`http://localhost:8085/marketplace/update/${orderId}`, { isSold: true });
            alert("Order status updated successfully!");
            fetchOrders();
        } catch (error) {
            console.error("Error updating order status:", error);
            alert("Failed to update order status");
        }
    };

    const handleBuyClick = async (order) => {
        setLoadingOrderId(order.id);
        try {
            const { data } = await axios.post("http://localhost:8085/api/payment/create-order", { amount: order.price,
                orderId: order.id 

             });

            if (!data.orderId) {
                alert("Failed to create order. Order ID missing.");
                setLoadingOrderId(null);
                return;
            }

            const options = {
                key: "rzp_test_nos2BlazNsLY8Y",
                amount: order.price * 100,
                currency: "INR",
                name: "Your Company",
                description: `Payment for ₹${order.price}`,
                order_id: data.orderId,
                
                handler: async function (response) {
                    try {
                        const verificationData = {
                            orderId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                            amount: order.price,
                            sellWasteId: order.id 
                        };

                        const verificationResponse = await axios.post("http://localhost:8085/api/payment/verify-payment", verificationData);

                        if (verificationResponse.data.status === "success") {
                            alert("Payment Successful!");
                            setPaymentSuccess(true);
                            await updateOrderStatus(order.id);
                        } else {
                            alert("Payment verification failed.");
                        }
                    } catch (verificationError) {
                        console.error("Payment verification error:", verificationError);
                        alert("Payment verification failed.");
                    } finally {
                        setLoadingOrderId(null);
                    }
                },
                prefill: {
                    name: "Akshay Borate",
                    email: "akshayb@gmail.com",
                    contact: "9112959661",
                },
                theme: { color: "#3399cc" },
            };

            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();
        } catch (error) {
            console.error("Payment failed:", error);
            alert("Payment initiation failed");
            setLoadingOrderId(null);
        }
    };

    return (
        <div>
            <div className="order-history">
                <h2>Waste Market Place</h2>
                <div className="card-container">
                    {orders.map(order => (
                        <div className="order-card" key={order.id}>
                            <div className="d-flex justify-content-center align-items-center">
                                {order.imagePath ? (
                                    <img src={`http://localhost:8085/uploads/${order.imagePath}`} alt="Waste" height="150px" width="200px" />
                                ) : (
                                    <div>No Image Available</div>
                                )}
                            </div>
                            <p><strong>Name:</strong> {order.name}</p>
                            <p><strong>Email:</strong> {order.email}</p>
                            <p><strong>Waste Type:</strong> {order.wasteType}</p>
                            <p><strong>Mobile No:</strong> {order.mobileNo}</p>
                            <p><strong>Address:</strong> {order.address}</p>
                            <p><strong>Price:</strong> {order.price}</p>
                            {order.isSold ? (
                                <p style={{ color: "green" }}>Sold</p>
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleBuyClick(order)}
                                    disabled={loadingOrderId === order.id}
                                >
                                    {loadingOrderId === order.id ? "Processing..." : "Buy"}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            
        </div>
    );
};

export default MarketplaceBuyWaste;
