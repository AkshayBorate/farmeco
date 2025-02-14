import React, { useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import axios from "axios";
import "./Intake.css";

function AddStock() {
  const wasteTypeOptions = [
    "Crop Residues",
    "Animal Manure",
    "Food Processing Waste",
    "Wood & Plant Waste",
    "Husks & Shells",
    "Expired Produce",
    "Fertilizer & Pesticide Waste",
    "Other Organic Waste",
  ];
  

  const [stock, setStock] = useState({
    wasteType: "",
    weight: "",
  });

  const [reduceStock, setReduceStock] = useState({
    wasteType: "",
    weight: "",
  });

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "add") {
      setStock({ ...stock, [name]: value });
    } else {
      setReduceStock({ ...reduceStock, [name]: value });
    }
  };

  const handleAddStock = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8085/stock/add", stock, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Stock added successfully!");
      setStock({ wasteType: "", weight: "" });
    } catch (error) {
      console.error("Error adding stock:", error);
      alert("Failed to add stock.");
    }
  };

  const handleReduceStock = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8085/stock/reduce", reduceStock, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Stock reduced successfully!");
      setReduceStock({ wasteType: "", weight: "" });
    } catch (error) {
      console.error("Error reducing stock:", error);
      alert("Error reducing stock. Please check stock availability.");
    }
  };

  return (
    <Container className="stock-container mt-5">
      <h1 className="page-title text-center">Stock Management</h1>
      <p className="page-description text-center">
        Manage stock efficiently by adding or reducing stock levels.
      </p>

      {/* Form for Adding Stock */}
      <div className="form-section mt-4">
        <h3 className="text-center">Add New Stock</h3>
        <Form onSubmit={handleAddStock}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Select
                name="wasteType"
                value={stock.wasteType}
                onChange={(e) => handleInputChange(e, "add")}
                required
              >
                <option value="">Select Waste Type</option>
                {wasteTypeOptions.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Control
                type="number"
                name="weight"
                value={stock.weight}
                onChange={(e) => handleInputChange(e, "add")}
                placeholder="Weight (tons)"
                required
              />
            </Col>
          </Row>
          <Button className="submit-button w-100 mt-3" type="submit">
            Add Stock
          </Button>
        </Form>
      </div>

      {/* Form for Reducing Stock */}
      <div className="form-section mt-5">
        <h3 className="text-center">Reduce Stock</h3>
        <Form onSubmit={handleReduceStock}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Select
                name="wasteType"
                value={reduceStock.wasteType}
                onChange={(e) => handleInputChange(e, "reduce")}
                required
              >
                <option value="">Select Waste Type</option>
                {wasteTypeOptions.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Control
                type="number"
                name="weight"
                value={reduceStock.weight}
                onChange={(e) => handleInputChange(e, "reduce")}
                placeholder="Weight to Reduce (tons)"
                required
              />
            </Col>
          </Row>
          <Button className="delete-button w-100" type="submit">
            Reduce Stock
          </Button>
          <br/>
          <br/>
        </Form>
      </div>
    </Container>
  );
}

export default AddStock;


