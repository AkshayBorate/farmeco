// import React, { useRef, useState } from "react";

// const SellWaste = () => {
//   const nameRef = useRef(null);
//   const phoneRef = useRef(null);
//   const placeRef = useRef(null);
//   const addressRef = useRef(null);
//   const emailRef = useRef(null);
//   const wasteTypeRef = useRef(null);
//   const weightRef = useRef(null);
//   const rateRef = useRef(null);
//   const imageRef = useRef(null);

//   const [message, setMessage] = useState("");

//   // Submit the form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Get the form values from useRef
//     const name = nameRef.current.value;
//     const phone = phoneRef.current.value;
//     const place = placeRef.current.value;
//     const address = addressRef.current.value;
//     const email = emailRef.current.value;
//     const wasteType = wasteTypeRef.current.value;
//     const weight = weightRef.current.value;
//     const rate = rateRef.current.value;
//     const image = imageRef.current.files[0];

//     const formData = new FormData();
//     formData.append("image", image);
//     formData.append("name", name);
//     formData.append("phone", phone);
//     formData.append("place", place);
//     formData.append("address", address);
//     formData.append("email", email);
//     formData.append("wasteType", wasteType);
//     formData.append("weight", weight);
//     formData.append("rate", rate);

//     try {
//       // Make the POST request to the backend API
//       const response = await fetch("http://localhost:9001/FarmerDetails", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const result = await response.json(); // Handling success response as JSON
//         setMessage(result.message); // Show success message
//       } else {
//         const errorResult = await response.json(); // Handling error response as JSON
//         setMessage(`Error: ${errorResult.message || "Unknown error"}`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setMessage(`Error: ${error.message || "Unknown error"}`);
//     }
//   };

//   return (
//     <div className="container">
//       <h1> Sell Waste Form</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="image">Image</label>
//         <input type="file" id="image" name="image" ref={imageRef} />

//         <label htmlFor="name">Name</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           placeholder="Enter name"
//           ref={nameRef}
//         />

//         <label htmlFor="phone">Phone</label>
//         <input
//           type="tel"
//           id="phone"
//           name="phone"
//           placeholder="Enter mobile no"
//           ref={phoneRef}
//         />

//         <label htmlFor="place">Place</label>
//         <input
//           type="text"
//           id="place"
//           name="place"
//           placeholder="Enter place"
//           ref={placeRef}
//         />

//         <label htmlFor="address">Address</label>
//         <input
//           type="text"
//           id="address"
//           name="address"
//           placeholder="Enter address"
//           ref={addressRef}
//         />

//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           placeholder="Enter email"
//           ref={emailRef}
//         />

//         <label htmlFor="wasteType">Waste Type</label>
//         <input
//           type="text"
//           id="wasteType"
//           name="wasteType"
//           placeholder="Enter waste type"
//           ref={wasteTypeRef}
//         />

//         <label htmlFor="weight">Weight</label>
//         <input
//           type="number"
//           id="weight"
//           name="weight"
//           placeholder="Enter weight"
//           ref={weightRef}
//         />

//         <label htmlFor="rate">Rate</label>
//         <input
//           type="number"
//           id="rate"
//           name="rate"
//           placeholder="Enter rate"
//           ref={rateRef}
//         />

//         <button type="submit">Submit</button>
//       </form>

//       {/* Display message */}
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default SellWaste;


import React, { useRef, useState } from "react";
import "./SellWaste.css";

const SellWaste = () => {
  const formRefs = {
    name: useRef(null),
    phone: useRef(null),
    place: useRef(null),
    address: useRef(null),
    email: useRef(null),
    wasteType: useRef(null),
    weight: useRef(null),
    rate: useRef(null),
    image: useRef(null),
  };

  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.keys(formRefs).forEach(key => {
      if (key === 'image') {
        formData.append(key, formRefs[key].current.files[0]);
      } else {
        formData.append(key, formRefs[key].current.value);
      }
    });

    try {
      const response = await fetch("http://localhost:9001/FarmerDetails", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setMessage(response.ok ? result.message : `Error: ${result.message || "Unknown error"}`);
    } catch (error) {
      setMessage(`Error: ${error.message || "Unknown error"}`);
    }
  };

  return (  
    <div className="sell-waste-container">
      <div className="form-card">
        <h1 className="form-title">Sell Your Waste</h1>
        <p className="form-subtitle">Turn your agricultural waste into profit</p>

        <form onSubmit={handleSubmit} className="waste-form">
          <div className="form-grid">
            <div className="form-group image-upload">
              <label className="custom-file-upload">
                <input 
                  type="file" 
                  ref={formRefs.image}
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                ) : (
                  <div className="upload-placeholder">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <span>Upload Waste Image</span>
                  </div>
                )}
              </label>
            </div>

            <div className="form-section">
              <div className="form-group">
                <label>Name</label>
                <input type="text" ref={formRefs.name} placeholder="Your full name" required />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input type="tel" ref={formRefs.phone} placeholder="Your contact number" required />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" ref={formRefs.email} placeholder="Your email address" required />
              </div>
            </div>

            <div className="form-section">
              <div className="form-group">
                <label>Place</label>
                <input type="text" ref={formRefs.place} placeholder="Your location" required />
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea ref={formRefs.address} placeholder="Your detailed address" required />
              </div>
            </div>

            <div className="form-section">
              <div className="form-group">
                <label>Waste Type</label>
                <select ref={formRefs.wasteType} required>
                  <option value="">Select waste type</option>
                  <option value="organic">Organic Waste</option>
                  <option value="crop">Crop Residue</option>
                  <option value="animal">Animal Waste</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label>Weight (kg)</label>
                  <input type="number" ref={formRefs.weight} placeholder="Weight" required />
                </div>

                <div className="form-group half">
                  <label>Rate (₹/kg)</label>
                  <input type="number" ref={formRefs.rate} placeholder="Rate" required />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Submit Request
          </button>
        </form>

        {message && <div className="message-toast">{message}</div>}
      </div>
    </div>
  );
};

export default SellWaste;
