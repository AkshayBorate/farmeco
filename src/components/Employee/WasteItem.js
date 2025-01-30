import React from "react";
import { ListGroup } from "react-bootstrap";

function WasteItem({ intake }) {
  return (
    <ListGroup.Item>
      <h5>{intake.type}</h5>
      <p>Volume: {intake.volume} tons</p>
      <p>Source: {intake.source}</p>
      <p>Date: {new Date(intake.date).toLocaleDateString()}</p>
    </ListGroup.Item>
  );
}

export default WasteItem;
