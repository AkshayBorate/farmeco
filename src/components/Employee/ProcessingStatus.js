import React, { useState, useEffect } from "react";
import { Button, Row, Col, Modal, Card, Form } from "react-bootstrap";
import "./ProcessingStatus.css";

function ProcessingStatus() {
  const [requests, setRequests] = useState([]);
  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");
  const [rejectionMessage, setRejectionMessage] = useState("");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filter, setFilter] = useState("NEW");

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8085/waste-details/orders"
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setRequests(data);
        } else {
          console.error("Invalid data received from API");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Open Schedule Modal for Confirm Request
  const handleConfirmRequest = (requestId) => {
    setSelectedRequest(requestId);
    setShowScheduleModal(true);
  };

  // Handle Schedule Pickup
  const handleSchedulePickup = async () => {
    const updatedData = {
      status: "ACCEPTED",
      pickupDate,
      message,
    };

    try {
      const response = await fetch(
        `http://localhost:8085/waste-details/update/${selectedRequest}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === selectedRequest
              ? { ...request, ...updatedData }
              : request
          )
        );
        setShowScheduleModal(false);
      } else {
        console.error("Error updating request");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Handle Collect Request with Confirmation Alert
  const handleCollectRequest = async (requestId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to mark this request as collected?"
    );
    if (!isConfirmed) return;

    const updatedData = {
      status: "COLLECTED",
    };

    try {
      const response = await fetch(
        `http://localhost:8085/waste-details/update/${requestId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === requestId ? { ...request, ...updatedData } : request
          )
        );
        alert("Request successfully marked as collected!");
      } else {
        console.error("Error updating request to collected");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Open Rejection Modal
  const handleRejectRequest = (requestId) => {
    setSelectedRequest(requestId);
    setShowRejectionModal(true);
  };

  // Handle Reject with Message
  const handleConfirmRejection = async () => {
    const updatedData = {
      status: "REJECTED",
      message: rejectionMessage,
    };

    try {
      const response = await fetch(
        `http://localhost:8085/waste-details/update/${selectedRequest}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === selectedRequest
              ? { ...request, ...updatedData }
              : request
          )
        );
        setShowRejectionModal(false);
      } else {
        console.error("Error rejecting request");
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  // Filter Requests
  const filteredRequests = requests.filter((request) => {
    if (filter === "ALL") return true;
    if (filter === "NEW")
      return !request.status || request.status === "PENDING";
    if (filter === "SCHEDULED") return request.status === "ACCEPTED";
    if (filter === "REJECTED") return request.status === "REJECTED";
    if (filter === "COLLECTED") return request.status === "COLLECTED";
    return true;
  });

  return (
    <div className="container">
      <div className="processing-status-container">
        <h1>Processing Status</h1>
        <p>Track the status of ongoing waste processing.</p>

        <div className="filter-buttons mb-3">
          {/* <Button variant="secondary" onClick={() => setFilter("ALL")}>All</Button> */}
          <Button
            variant="info"
            onClick={() => setFilter("NEW")}
            className="ms-2"
          >
            New Requests
          </Button>
          <Button
            variant="success"
            onClick={() => setFilter("SCHEDULED")}
            className="ms-2"
          >
            Scheduled
          </Button>
          <Button
            variant="danger"
            onClick={() => setFilter("REJECTED")}
            className="ms-2"
          >
            Rejected
          </Button>
          <Button
            variant="primary"
            onClick={() => setFilter("COLLECTED")}
            className="ms-2"
          >
            Collected
          </Button>
        </div>

        <h3>Waste Status</h3>
        <div className="requests-list">
          {filteredRequests.length === 0 ? (
            <p>No requests available</p>
          ) : (
            filteredRequests.map((request) => (
              <Card key={request.id} className="request-card mb-3">
                <Card.Img
                  variant="top"
                  src={request.imagePath}
                  alt={`${request.wasteType} image`}
                  className="card-image p-2 rounded-4"
                />
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <p>
                        <strong>Name:</strong> {request.farmer.name}
                      </p>
                      <p>
                        <strong>Waste Type:</strong> {request.wasteType}
                      </p>
                      <p>
                        <strong>Address:</strong> {request.address}
                      </p>
                      <p>
                        <strong>Date Created:</strong>{" "}
                        {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Date Pickup:</strong>{request.pickupDate}
                      </p>
                    </Col>
                    <Col md={6}>
                      {request.status === "COLLECTED" && (
                        <>
                          <p>
                            <strong>Waste ID:</strong> {request.id}
                          </p>{" "}
                          {/* Display Farmer ID */}
                          <p>
                            <strong>Status:</strong> {request.status}
                          </p>
                        </>
                      )}
                      {request.status === "ACCEPTED" && (
                        <>
                          <p><strong>Waste ID:</strong> {request.id}</p> 
                            <strong>Status:</strong> {request.status}<br />
                            {/* <strong>Pickup Date:</strong> {request.pickupDate}<br /> */}
                            <strong>Message:</strong> {request.message}
                          <Button
                            variant="primary"
                            onClick={async () => {
                              const updatedData = {
                                status: "COLLECTED",
                              };

                              try {
                                const response = await fetch(
                                  `http://localhost:8085/waste-details/updateOnly/${request.id}`,
                                  {
                                    method: "PUT",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(updatedData),
                                  }
                                );

                                if (response.ok) {
                                  setRequests((prevRequests) =>
                                    prevRequests.map((req) =>
                                      req.id === request.id
                                        ? { ...req, status: "COLLECTED" }
                                        : req
                                    )
                                  );
                                  alert(
                                    "Request successfully marked as collected!"
                                  );
                                } else {
                                  console.error(
                                    "Error updating request to collected"
                                  );
                                }
                              } catch (error) {
                                console.error("Error updating status:", error);
                              }
                            }}
                            className="mt-2"
                          >
                            Mark as Collected
                          </Button>
                        </>
                      )}
                      {request.status === "REJECTED" && (
                        <p>
                          <strong>Waste ID:</strong> {request.id}
                          <br />
                          <br />
                          <strong>Status:</strong> {request.status} -{" "}
                          {request.message}
                        </p>
                      )}
                      {request.status !== "ACCEPTED" &&
                        request.status !== "REJECTED" &&
                        request.status !== "COLLECTED" && (
                          <>
                            <Button
                              variant="success"
                              onClick={() => handleConfirmRequest(request.id)}
                              className="mt-2"
                            >
                              Confirm
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => handleRejectRequest(request.id)}
                              className="mt-2 ms-2"
                            >
                              Reject
                            </Button>
                          </>
                        )}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Schedule Pickup Modal */}
      <Modal
        show={showScheduleModal}
        onHide={() => setShowScheduleModal(false)}
      >
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
            <Form.Label>Additional Message:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter any additional message"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowScheduleModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSchedulePickup}>
            Schedule Pickup
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Rejection Modal */}
      <Modal
        show={showRejectionModal}
        onHide={() => setShowRejectionModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Rejection Reason</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Rejection Message:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={rejectionMessage}
              onChange={(e) => setRejectionMessage(e.target.value)}
              placeholder="Enter rejection reason"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowRejectionModal(false)}
          >
            Close
          </Button>
          <Button variant="danger" onClick={handleConfirmRejection}>
            Reject
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProcessingStatus;




