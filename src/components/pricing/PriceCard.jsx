import React from "react";
import { useNavigate } from "react-router-dom";
import { price } from "../../dummydata";

const PriceCard = () => {
  const navigate = useNavigate();

  const handlePayClick = (amount) => {
    navigate("/payment", { state: { amount } });
  };

  return (
    <>
      {price.map((val) => (
        <div key={val.name} className="items shadow">
          <h4>{val.name}</h4>
          <h1>
            <span>₹</span>
            {val.price}
          </h1>
          <p>{val.desc}</p>
          <button
            className="outline-btn"
            onClick={() => handlePayClick(val.price)}
          >
            Pay ₹{val.price}
          </button>
        </div>
      ))}
    </>
  );
};

export default PriceCard;
