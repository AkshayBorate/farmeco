// import React, { useState, useEffect } from "react";
// import { Button, ListGroup, Form, Row, Col } from "react-bootstrap";
// import axios from "axios";
// import "./ProcessingStatus.css";

// function ProcessingStatus() {
//   const [requests, setRequests] = useState([]);
//   const [pickupDate, setPickupDate] = useState("");

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       const response = await axios.get("/api/waste-requests");
//       setRequests(response.data);
//     } catch (error) {
//       console.error("Error fetching requests:", error);
//     }
//   };

//   const handleConfirmRequest = async (requestId) => {
//     try {
//       await axios.put(`/api/confirm-request/${requestId}`, { status: "confirmed", pickupDate });
//       fetchRequests();
//     } catch (error) {
//       console.error("Error confirming request:", error);
//     }
//   };

//   const handleRejectRequest = async (requestId) => {
//     try {
//       await axios.put(`/api/reject-request/${requestId}`, { status: "rejected" });
//       fetchRequests();
//     } catch (error) {
//       console.error("Error rejecting request:", error);
//     }
//   };

//   return (
//     <div className="container">
//     <div className="processing-status-container">
//       <h1>Processing Status</h1>
//       <p>Track the status of ongoing waste processing.</p>

//       <h3>Waste Requests</h3>
//       <ListGroup>
//         {requests.length === 0 ? (
//           <ListGroup.Item>No requests available</ListGroup.Item>
//         ) : (
//           requests.map((request) => (
//             <ListGroup.Item key={request.id}>
//               <Row>
//                 <Col md={6}>
//                   <p>Type: {request.type}</p>
//                   <p>Volume: {request.volume} tons</p>
//                   <p>Source: {request.source}</p>
//                   <p>Date: {request.date}</p>
//                 </Col>
//                 <Col md={6}>
//                   {request.status !== "confirmed" && (
//                     <>
//                       <Button
//                         variant="success"
//                         onClick={() => handleConfirmRequest(request.id)}
//                       >
//                         Confirm
//                       </Button>
//                       <Button
//                         variant="danger"
//                         onClick={() => handleRejectRequest(request.id)}
//                       >
//                         Reject
//                       </Button>
//                     </>
//                   )}
//                   {request.status === "confirmed" && (
//                     <p>Pickup Scheduled for: {pickupDate}</p>
//                   )}
//                 </Col>
//               </Row>
//               {request.status === "confirmed" && (
//                 <Row className="mt-3">
//                   <Col md={12}>
//                     <Form.Control
//                       type="date"
//                       value={pickupDate}
//                       onChange={(e) => setPickupDate(e.target.value)}
//                       placeholder="Schedule Pickup Date"
//                     />
//                   </Col>
//                 </Row>
//               )}
//             </ListGroup.Item>
//           ))
//         )}
//       </ListGroup>
//     </div>
//     </div>
//   );
// }

// export default ProcessingStatus;




// import React, { useState, useEffect } from "react";
// import { Button, ListGroup, Form, Row, Col, Modal, Card } from "react-bootstrap";
// import axios from "axios";
// import "./ProcessingStatus.css";

// function ProcessingStatus() {
//   const [requests, setRequests] = useState([]);
//   const [pickupDate, setPickupDate] = useState("");
//   const [driverName, setDriverName] = useState("");
//   const [additionalInfo, setAdditionalInfo] = useState("");
//   const [showScheduleModal, setShowScheduleModal] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [rejectReason, setRejectReason] = useState("");
//   const [showRejectModal, setShowRejectModal] = useState(false);

//   useEffect(() => {
//     // Mocking API data for testing
//     const mockRequests = [
//       {
//         id: 1,
//         type: "Plastic",
//         volume: 5,
//         source: "Farmer A",
//         date: "2024-12-10",
//         status: "pending",
//       },
//       {
//         id: 2,
//         type: "Organic",
//         volume: 3,
//         source: "Farmer B",
//         date: "2024-12-12",
//         status: "pending",
//       },
//       {
//         id: 3,
//         type: "Glass",
//         volume: 2,
//         source: "Farmer C",
//         date: "2024-12-11",
//         status: "confirmed",
//       },
//     ];
//     setRequests(mockRequests);
//   }, []);

//   const handleConfirmRequest = async (requestId) => {
//     try {
//       setRequests((prevRequests) =>
//         prevRequests.map((request) =>
//           request.id === requestId
//             ? { ...request, status: "confirmed" }
//             : request
//         )
//       );
//     } catch (error) {
//       console.error("Error confirming request:", error);
//     }
//   };

//   const handleRejectRequest = (requestId) => {
//     setSelectedRequest(requestId);
//     setShowRejectModal(true);
//   };

//   const handleRejectSubmit = async () => {
//     try {
//       setRequests((prevRequests) =>
//         prevRequests.map((request) =>
//           request.id === selectedRequest
//             ? { ...request, status: "rejected", rejectReason }
//             : request
//         )
//       );
//       setShowRejectModal(false);
//       setRejectReason("");
//     } catch (error) {
//       console.error("Error rejecting request:", error);
//     }
//   };

//   const handleSchedulePickup = (requestId) => {
//     setSelectedRequest(requestId);
//     setShowScheduleModal(true);
//   };

//   const handleScheduleSubmit = async () => {
//     try {
//       setRequests((prevRequests) =>
//         prevRequests.map((request) =>
//           request.id === selectedRequest
//             ? {
//                 ...request,
//                 status: "pickupScheduled",
//                 pickupDate,
//                 driverName,
//                 additionalInfo,
//               }
//             : request
//         )
//       );
//       setShowScheduleModal(false);
//       setPickupDate("");
//       setDriverName("");
//       setAdditionalInfo("");
//     } catch (error) {
//       console.error("Error scheduling pickup:", error);
//     }
//   };

//   return (
//     <div className="container">
//     <div className="processing-status-container">
//       <h1>Processing Status</h1>
//       <p>Track the status of ongoing waste processing.</p>

//       <h3>Waste Requests</h3>
//       <div className="requests-list">
//         {requests.length === 0 ? (
//           <p>No requests available</p>
//         ) : (
//           requests.map((request) => (
//             <Card key={request.id} className="request-card mb-3">
//               <Card.Body>
//                 <Row>
//                   <Col md={6}>
//                     <p><strong>Type:</strong> {request.type}</p>
//                     <p><strong>Volume:</strong> {request.volume} tons</p>
//                     <p><strong>Source:</strong> {request.source}</p>
//                     <p><strong>Date:</strong> {request.date}</p>
//                   </Col>
//                   <Col md={6}>
//                     {request.status === "pending" && (
//                       <>
//                         <Button
//                           variant="success"
//                           onClick={() => handleConfirmRequest(request.id)}
//                           className="mr-2"
//                         >
//                           Confirm
//                         </Button>
//                         <Button
//                           variant="danger"
//                           onClick={() => handleRejectRequest(request.id)}
//                         >
//                           Reject
//                         </Button>
//                       </>
//                     )}
//                     {request.status === "confirmed" && (
//                       <>
//                         <p>Pickup Scheduled for: {request.pickupDate}</p>
//                         <Button
//                           variant="primary"
//                           onClick={() => handleSchedulePickup(request.id)}
//                           className="mt-2"
//                         >
//                           Schedule Pickup
//                         </Button>
//                       </>
//                     )}
//                     {request.status === "pickupScheduled" && (
//                       <p>
//                         Pickup scheduled for: {request.pickupDate}<br />
//                         <strong>Driver Name:</strong> {request.driverName}<br />
//                         <strong>Additional Info:</strong> {request.additionalInfo}
//                       </p>
//                     )}
//                     {request.status === "rejected" && (
//                       <p><strong>Reason for Rejection:</strong> {request.rejectReason}</p>
//                     )}
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//           ))
//         )}
//       </div>
//       </div>

      
//       <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Reject Reason</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group>
//             <Form.Label>Provide a reason for rejection:</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={rejectReason}
//               onChange={(e) => setRejectReason(e.target.value)}
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
//             Close
//           </Button>
//           <Button variant="danger" onClick={handleRejectSubmit}>
//             Submit Rejection
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Schedule Pickup Modal */}
//       <Modal show={showScheduleModal} onHide={() => setShowScheduleModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Schedule Pickup</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group>
//             <Form.Label>Pickup Date:</Form.Label>
//             <Form.Control
//               type="date"
//               value={pickupDate}
//               onChange={(e) => setPickupDate(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Driver Name:</Form.Label>
//             <Form.Control
//               type="text"
//               value={driverName}
//               onChange={(e) => setDriverName(e.target.value)}
//               placeholder="Enter driver's name"
//             />
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Additional Information:</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={additionalInfo}
//               onChange={(e) => setAdditionalInfo(e.target.value)}
//               placeholder="Enter any additional info"
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowScheduleModal(false)}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleScheduleSubmit}>
//             Schedule Pickup
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default ProcessingStatus;



import React, { useState, useEffect } from "react";
import { Button, Row, Col, Modal, Card, Form } from "react-bootstrap";
import img1 from './img1.jpg'; 
import img2 from './img2.jpg'; 
import "./ProcessingStatus.css";

function ProcessingStatus() {
  const [requests, setRequests] = useState([]);
  const [pickupDate, setPickupDate] = useState("");
  const [driverName, setDriverName] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    const mockRequests = [
      {
        id: 1,
        type: "Plastic",
        volume: 5,
        source: "Green Valley Farms",
        date: "2024-12-10",
        status: "pending",
        image: img1, // Imported image
      },
      {
        id: 2,
        type: "Organic",
        volume: 3,
        source: "Sunnydale Orchards",
        date: "2024-12-12",
        status: "pending",
        image: img1, // Imported image
      },
      {
        id: 3,
        type: "Glass",
        volume: 2,
        source: "Evergreen Plantation",
        date: "2024-12-11",
        status: "confirmed",
        image: img2, // Imported image
      },
    ];
    setRequests(mockRequests);
  }, []);

  const handleConfirmRequest = async (requestId) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId
          ? { ...request, status: "confirmed" }
          : request
      )
    );
  };

  const handleRejectRequest = (requestId) => {
    setSelectedRequest(requestId);
    setShowRejectModal(true);
  };

  const handleRejectSubmit = async () => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === selectedRequest
          ? { ...request, status: "rejected", rejectReason }
          : request
      )
    );
    setShowRejectModal(false);
    setRejectReason("");
  };

  const handleSchedulePickup = (requestId) => {
    setSelectedRequest(requestId);
    setShowScheduleModal(true);
  };

  const handleScheduleSubmit = async () => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === selectedRequest
          ? {
              ...request,
              status: "pickupScheduled",
              pickupDate,
              driverName,
              additionalInfo,
            }
          : request
      )
    );
    setShowScheduleModal(false);
    setPickupDate("");
    setDriverName("");
    setAdditionalInfo("");
  };

  return (
    <div className="container">
      <div className="processing-status-container">
        <h1>Processing Status</h1>
        <p>Track the status of ongoing waste processing.</p>

        <h3>Waste Requests</h3>
        <div className="requests-list">
          {requests.length === 0 ? (
            <p>No requests available</p>
          ) : (
            requests.map((request) => (
              <Card key={request.id} className="request-card mb-3">
                <Card.Img
                  variant="top"
                  src={request.image}
                  alt={`${request.type} image`}
                  className="card-image p-2 rounded-4"
                />
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <p><strong>Type:</strong> {request.type}</p>
                      <p><strong>Volume:</strong> {request.volume} tons</p>
                      <p><strong>Source:</strong> {request.source}</p>
                      <p><strong>Date:</strong> {request.date}</p>
                    </Col>
                    <Col md={6}>
                      {request.status === "pending" && (
                        <>
                          <Button
                            variant="success"
                            onClick={() => handleConfirmRequest(request.id)}
                            className="mr-2"
                          >
                            Confirm
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleRejectRequest(request.id)}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {request.status === "confirmed" && (
                        <>
                          <p>Pickup Scheduled for: {request.pickupDate}</p>
                          <Button
                            variant="primary"
                            onClick={() => handleSchedulePickup(request.id)}
                            className="mt-2"
                          >
                            Schedule Pickup
                          </Button>
                        </>
                      )}
                      {request.status === "pickupScheduled" && (
                        <p>
                          Pickup scheduled for: {request.pickupDate}<br />
                          <strong>Driver Name:</strong> {request.driverName}<br />
                          <strong>Additional Info:</strong> {request.additionalInfo}
                        </p>
                      )}
                      {request.status === "rejected" && (
                        <p><strong>Reason for Rejection:</strong> {request.rejectReason}</p>
                      )}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Reject Reason Modal */}
      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Reason</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Provide a reason for rejection:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleRejectSubmit}>
            Submit Rejection
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Schedule Pickup Modal */}
      <Modal show={showScheduleModal} onHide={() => setShowScheduleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Pickup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Pickup Date:</Form.Label>
            <Form.Control
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Driver Name:</Form.Label>
            <Form.Control
              type="text"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              placeholder="Enter driver's name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Additional Information:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Enter any additional info"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowScheduleModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleScheduleSubmit}>
            Schedule Pickup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProcessingStatus;
