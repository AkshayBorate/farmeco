import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Stock() {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get("http://localhost:8085/stock/get");
        setStock(response.data);
      } catch (err) {
        setError("Failed to fetch stock data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, []);

  return (
    <div className="products-container">
      <hr />
      <h1 className="products-header text-center">Available Stock</h1>
      {loading && <p className="loading-message text-center">Loading stock...</p>}
      {error && <p className="error-message text-center">{error}</p>}

      <div className="products-grid">
        {stock.length > 0 ? (
          stock.map((item) => (
            <div className="product-card-wrapper" key={item.id}>
              <div className="product-card">
                <div className="product-details">
                  <p className="product-info">
                    {/* <b>Stock ID:</b> {item.id} <br /> */}
                    <b>Waste Type:</b> {item.wasteType || "N/A"} <br />
                    <b>Weight:</b> {item.weight} ton
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <p className="no-products-message text-center">
              No stock available.
            </p>
          )
        )}
      </div>
    </div>
  );
};






  