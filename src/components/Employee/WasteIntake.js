import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, InputGroup, ListGroup } from "react-bootstrap";
import WasteItem from "./WasteItem"; 
import axios from "axios"; 
import "./Intake.css";

function WasteIntake() {
  const [intakes, setIntakes] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [newIntake, setNewIntake] = useState({ type: "", volume: "", source: "", date: "" });

  useEffect(() => {
    fetchIntakes();
  }, []);

  const fetchIntakes = async () => {
    try {
      const response = await axios.get("/api/intakes");
      setIntakes(response.data);
    } catch (error) {
      console.error("Error fetching intakes:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIntake({ ...newIntake, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/intakes", newIntake);
      fetchIntakes();
      setNewIntake({ type: "", volume: "", source: "", date: "" });
    } catch (error) {
      console.error("Error adding new intake:", error);
    }
  };

  const filteredIntakes = intakes.filter((intake) => {
    return (
      (typeFilter ? intake.type.toLowerCase().includes(typeFilter.toLowerCase()) : true) &&
      (dateFilter ? intake.date.includes(dateFilter) : true)
    );
  });

  return (
    <div className="container">
    <div className="waste-container">
      <h1 className="page-title">Waste Intake Management</h1>
      <p className="page-description">Track and manage the incoming waste.</p>

      <Row className="filter-section mb-4">
        <Col md={4}>
          <InputGroup className="input-group-custom">
            <InputGroup.Text>Search by Type</InputGroup.Text>
            <Form.Control
              type="text"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              placeholder="Waste type"
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <InputGroup className="input-group-custom">
            <InputGroup.Text>Search by Date</InputGroup.Text>
            <Form.Control
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <div className="form-section">
        <h3>Add New Intake</h3>
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col md={3}>
              <Form.Control
                type="text"
                name="type"
                value={newIntake.type}
                onChange={handleInputChange}
                placeholder="Waste Type"
                required
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="number"
                name="volume"
                value={newIntake.volume}
                onChange={handleInputChange}
                placeholder="Volume (tons)"
                required
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                name="source"
                value={newIntake.source}
                onChange={handleInputChange}
                placeholder="Source"
                required
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="date"
                name="date"
                value={newIntake.date}
                onChange={handleInputChange}
                required
              />
            </Col>
          </Row>
          <Button className="submit-button mt-3" type="submit">Add Intake</Button>
        </Form>
      </div>

      <div className="waste-list">
        <h3 className="mt-4">Waste Intake List</h3>
        <ListGroup>
          {filteredIntakes.length === 0 ? (
            <ListGroup.Item className="no-records">No waste intake records found</ListGroup.Item>
          ) : (
            filteredIntakes.map((intake) => <WasteItem key={intake.id} intake={intake} />)
          )}
        </ListGroup>
      </div>
    </div>
    </div>
  );
}

export default WasteIntake;
