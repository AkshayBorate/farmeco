import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import axios from "axios";

function ViewRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8085/intake/get")
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching records:", error);
      });
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Company Records</h1>

      {records.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Farmer Name</th>
              <th>Place</th>
              <th>Collected By</th>
              <th>Pickup Date</th>
              <th>Weight (tons)</th>
              <th>Rate per Ton</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.wasteDetailsId?.farmer?.name || "N/A"}</td>
                <td>{record.wasteDetailsId?.address || "N/A"}</td>
                <td>{record.collectedBy}</td>
                <td>{record.wasteDetailsId?.pickupDate || "N/A"}</td>
                <td>{record.weight}</td>
                <td>{record.rate}</td>
                <td>{record.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center">No records found.</p>
      )}
    </Container>
  );
}

export default ViewRecords;
