// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./ProductListing.css"; // Assuming you renamed the CSS file to ProductStyles.css

// const ProductListing = () => {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProductsFromWasteIntake = async () => {
//       try {
//         const response = await axios.get("/api/waste-products");
//         setProducts(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch products derived from waste intake. Please try again.");
//         setLoading(false);
//         console.error(err);
//       }
//     };

//     fetchProductsFromWasteIntake();
//   }, []);

//   return (
//     <div className="product-container">
//       <div className="product-grid">
//         <div className="product-listing-section">
//           <h1 className="product-heading">Products Derived from Waste Intake</h1>

//           {loading && <p className="loading-text">Loading products...</p>}
//           {error && <p className="error-message">{error}</p>}

//           <div className="product-cards">
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <div key={product.id} className="product-item">
//                   <h3 className="product-name">{product.name}</h3>
//                   <p className="product-type">Type: {product.type}</p>
//                   <p className="product-quantity">Quantity: {product.quantity}</p>
//                   <p className="product-price">Price: ${product.price}</p>
//                   <p className="product-waste-source">Derived From Waste: {product.wasteSource}</p>
//                 </div>
//               ))
//             ) : (
//               !loading && <p className="no-products-message">No products derived from waste intake are available.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductListing;



import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductListing.css"; 
import { wastefarmerdetails } from "../../dummydata.js";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetching products from the API or using dummy data
  useEffect(() => {
    const fetchProductsFromWasteIntake = async () => {
      // try {
      //   const response = await axios.get("/api/waste-products");
      //   setProducts(response.data);
      //   setLoading(false);
      // } catch (err) {
      //   setError("Failed to fetch products derived from waste intake. Please try again.");
      //   setLoading(false);
      //   console.error(err);
      // }
    };

    fetchProductsFromWasteIntake();
  }, []);

  return (
    <div className="container">
      <hr />

      <h1 className="text-center">Products Derived from Waste Intake</h1>
      {loading && <p className="loading-text text-center">Loading products...</p>}
      {error && <p className="error-message text-center">{error}</p>}

      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-xl-4 mb-4" key={product.id}>
              <div className="card" style={{ padding: "5px" }}>
                <img src={product.img} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    <b>Type:</b> {product.type} <br />
                    <b>Quantity:</b> {product.quantity} <br />
                    <b>Price:</b> ${product.price} <br />
                    <b>Derived From Waste:</b> {product.wasteSource}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="no-products-message text-center">No products derived from waste intake are available.</p>
        )}
      </div>

      {/* <h2 className="text-center mt-5">Waste Farmers</h2> */}
      <div className="row">
        {wastefarmerdetails.map((farmer) => (
          <div className="col-xl-4 mb-4" key={farmer.id}>
            <div className="card" style={{ padding: "5px" }}>
              <img src={farmer.img} className="card-img-top" alt="farmer" />
              <div className="card-body">
                <h5 className="card-title">{farmer.name}</h5>
                <p className="card-text">
                  <b>Phone:</b> {farmer.phone} <br />
                  <b>Waste Type:</b> {farmer.wasteType} <br />
                  <b>Collected Date:</b> {farmer.CollectedDate}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
