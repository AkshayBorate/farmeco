import React, { useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import axios from "axios";
import "./Intake.css";

function WasteIntake() {
  const [newIntake, setNewIntake] = useState({
    wasteId: "",
    weight: "",
    rate: "",
    totalPrice: 0,
    collectedBy: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "weight" || name === "rate") {
      updatedValue = value === "" ? "" : parseFloat(value);
    }

    const updatedIntake = {
      ...newIntake,
      [name]: updatedValue,
    };

    if (updatedIntake.weight && updatedIntake.rate) {
      updatedIntake.totalPrice = updatedIntake.weight * updatedIntake.rate;
    }

    setNewIntake(updatedIntake);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      weight: newIntake.weight,
      rate: newIntake.rate,
      collectedBy: newIntake.collectedBy,
      totalPrice: newIntake.totalPrice,
      detailsDTO: {
        id: parseInt(newIntake.wasteId, 10),
      },
    };

    try {
      await axios.post("http://localhost:8085/intake/add", formattedData);
      alert("Data successfully added to company database!");
      setNewIntake({
        wasteId: "",
        weight: "",
        rate: "",
        totalPrice: 0,
        collectedBy: "",
      });
    } catch (error) {
      console.error("Error adding new intake:", error);
    }
  };

  return (
    <Container className="waste-container mt-5">
      <h1 className="page-title text-center">Company Database Record</h1>
      <p className="page-description text-center">
        Record data for company operations.
      </p>

      <div className="form-section mt-4">
        <h3 className="text-center">Add New Record</h3>
        <Form onSubmit={handleFormSubmit}>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Control
                type="text"
                name="wasteId"
                value={newIntake.wasteId}
                onChange={handleInputChange}
                placeholder="Waste ID"
                required
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                name="collectedBy"
                value={newIntake.collectedBy || ""}
                onChange={handleInputChange}
                placeholder="Collected By (Employee Name)"
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Control
                type="number"
                name="weight"
                value={newIntake.weight}
                onChange={handleInputChange}
                placeholder="Weight (tons)"
                required
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="number"
                name="rate"
                value={newIntake.rate}
                onChange={handleInputChange}
                placeholder="Rate per Ton"
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Control
                type="text"
                value={
                  newIntake.totalPrice
                    ? `Total Price: ${newIntake.totalPrice}`
                    : "Total Price: 0"
                }
                readOnly
              />
            </Col>
          </Row>

          <Button className="submit-button w-100 mt-3" type="submit">
            Add Record
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default WasteIntake;
