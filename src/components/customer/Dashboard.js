// import React, { useState } from "react";
// import "../dashboard.css";
// import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';

// // Dummy Data for demonstration
// const farmerData = {
//   name: "Akshay",
//   place: "Green Valley Farm, Nashik",
//   email: "akshayb@email.com",
//   orderStatus: [
//     {
//       orderId: "ORD12345",
//       status: "Confirmed",
//       pickupDate: "2024-12-20",
//       deliveryDate: "2024-12-22",
//       trackingLink: "https://tracking.example.com/ORD12345",
//       currentLocation: "Nashik Hub",
//     },
//     {
//       orderId: "ORD12346",
//       status: "Pending",
//       pickupDate: "2024-12-25",
//       deliveryDate: "2024-12-27",
//       trackingLink: "https://tracking.example.com/ORD12346",
//       currentLocation: null,
//     },
//     {
//       orderId: "ORD12347",
//       status: "Cancelled",
//       pickupDate: null,
//       deliveryDate: null,
//       trackingLink: null,
//       currentLocation: null,
//     },
//   ],
// };

// const TrackOrder = ({ order }) => {
//   if (order.status === "Cancelled") {
//     return <p>This order was cancelled. No tracking information available.</p>;
//   }

//   return (
//     <div className="tracking-info">
//       <p>
//         Track Order:{" "}
//         <a href={order.trackingLink} target="_blank" rel="noopener noreferrer">
//           {order.trackingLink}
//         </a>
//       </p>
//       {order.currentLocation ? (
//         <p>Current Location: {order.currentLocation}</p>
//       ) : (
//         <p>Tracking information is not available yet.</p>
//       )}
//     </div>
//   );
// };

// const FarmerDashboard = () => {
//   const [farmer, setFarmer] = useState(farmerData);
//   const [selectedOrder, setSelectedOrder] = useState(null);



// const handleLogout = () => {
//   alert("Logged out successfully!");
//   window.location.href = '/'; 
//   // Redirect to the home page
//   // return <Redirect to="/" />;
// };

//   const openTrackOrder = (order) => {
//     setSelectedOrder(order);
//   };

//   return (
//     <div className="farmer-dashboard">
//       {/* Header */}
//       <header>
//         <div className="logo">Farm Dashboard</div>
//         <div className="profile">
//           <span>{farmer.name}</span>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       </header>

//       {/* Main Dashboard Area */}
//       <section className="main-dashboard">
//         <h2>Welcome back, {farmer.name}!</h2>
//         <div className="farmer-info">
//           <p>Name: {farmer.name}</p>
//           <p>Place: {farmer.place}</p>
//           <p>Email: {farmer.email}</p>
//         </div>
//       </section>

//       {/* Order Status */}
//       <section className="order-status">
//         <h3>Your Orders</h3>
//         <div className="card-container">
//           {farmer.orderStatus.map((order, index) => (
//             <div key={index} className="card">
//               <h4>Order ID: {order.orderId}</h4>
//               <p>Status: <strong>{order.status}</strong></p>
//               {order.pickupDate && (
//                 <p>Pickup Date: {new Date(order.pickupDate).toLocaleDateString()}</p>
//               )}
//               {order.deliveryDate && (
//                 <p>Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}</p>
//               )}
//               <button onClick={() => openTrackOrder(order)}>Track Order</button>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Track Order Modal */}
//       {selectedOrder && (
//         <section className="track-order-modal">
//           <div className="modal-content">
//             <h3>Tracking Order ID: {selectedOrder.orderId}</h3>
//             <TrackOrder order={selectedOrder} />
//             <button onClick={() => setSelectedOrder(null)}>Close</button>
//           </div>
//         </section>
//       )}

//       {/* Action Buttons */}
//       <section className="action-buttons">
//        {/* <button>Create New Sale</button> */}



//     <Link to="/sellwaste">
//       <button>Create New Sell</button>
//     </Link>
//     <Link to="/history">
//       <button>View All Sell</button>
//     </Link>




//       </section>
//     </div>
//   );
// };

// export default FarmerDashboard;









import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css"; // Updated CSS file
import { Redirect } from "react-router-dom";
import i1 from "./assets/Image1.jpg"


const farmerData = {
  name: "Akshay",
  place: "Green Valley Farm, Nashik",
  email: "akshayb@email.com",
  orderStatus: [
    {
      orderId: "ORD12345",
      status: "Confirmed",
      pickupDate: "2024-12-20",
      deliveryDate: "2024-12-22",
      trackingLink: "https://tracking.example.com/ORD12345",
      currentLocation: "Nashik Hub",
      driverName: "Chandu"
    },
    {
      orderId: "ORD12346",
      status: "Pending",
      pickupDate: "2024-12-25",
      deliveryDate: "2024-12-27",
      trackingLink: "https://tracking.example.com/ORD12346",
      currentLocation: null,
      driverName: "Not Assigned"
    },
    {
      orderId: "ORD12347",
      status: "Cancelled",
      pickupDate: null,
      deliveryDate: null,
      trackingLink: null,
      currentLocation: null,
      driverName: "Dagdu"
    },
  ],
};

const TrackOrder = ({ order }) => {
  if (order.status === "Cancelled") {
    return <p>This order was cancelled. No tracking information available.</p>;
  }

  return (
    <div className="tracking-info">
      <p>
        Track Order:{" "}
        <a href={order.trackingLink} target="_blank" rel="noopener noreferrer">
          {order.trackingLink}
        </a>
      </p>
      {order.currentLocation ? (
        <p>Current Location: {order.currentLocation}</p>
      ) : (
        <p>Tracking information is not available yet.</p>
      )}
    </div>
  );
};

const FarmerDashboard = () => {
  const [farmer, setFarmer] = useState(farmerData);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleLogout = () => {
    alert("Logged out successfully!");
    window.location.href = "/";
  };

  const openTrackOrder = (order) => {
    setSelectedOrder(order);
  };

  return (
    <>
      <div className="farmer-dashboard">
        {/* Header */}
        <header className="dashboard-header">
          <div className="logo">Farm Dashboard</div>
          <div className="profile">
            <span className="p-3">{farmer.name}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {/* Main Dashboard */}
        <section className="main-dashboard">
          <div className="row">
            <div className="col-xl-10">
              <h2>Welcome back, {farmer.name}!</h2>
            </div>
            <div className="col-xl-2 align-content-right">
              <Link to="/custheader/editprofile"><button type="button" class="btn btn-secondary">Edit Profile</button></Link>
            </div>
            <div className="farmer-info">
              <p><strong>Name:</strong> {farmer.name}</p>
              <p><strong>Place:</strong> {farmer.place}</p>
              <p><strong>Email:</strong> {farmer.email}</p>
            </div>
          </div>
        </section>

        {/* Order Section */}
        <section className="order-status">
          <h3>Your Orders</h3>
          <div className="card-container">
            {farmer.orderStatus.map((order, index) => (
              <div key={index} className={`card ${order.status.toLowerCase()}`}>
                <h4>Order ID: {order.orderId}</h4>
                <div className="d-flex justify-content-center align-items-center my-2">
                <img src={i1} height="150px" width="200px" />
              </div>
                <p>
                  Status: <span className="order-status-text">{order.status}</span>
                </p>
                {order.pickupDate && <p>Pickup: {order.pickupDate}</p>}
                {order.deliveryDate && <p>Driver Name: {order.driverName}</p>}
                <button className="track-button" onClick={() => openTrackOrder(order)}>
                  Track Order
                </button>


              </div>
            ))}
          </div>
        </section>

        {/* Modal for Tracking */}
        {selectedOrder && (
          <div className="track-order-modal">
            <div className="modal-content">
              <h3>Tracking Order ID: {selectedOrder.orderId}</h3>
              <TrackOrder order={selectedOrder} />
              <button className="close-button" onClick={() => setSelectedOrder(null)}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <section className="action-buttons">
          <Link to="/custheader/sellwaste">
            <button className="action-button">Sell new Waste</button>
          </Link>
          <Link to="/custheader/history">
            <button className="action-button">Previous Orders</button>
          </Link>
        </section>
      </div>
    </>
  );
};

export default FarmerDashboard;
