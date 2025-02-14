import React, { useRef, useState } from "react";
import "../customer/Marketplace";

const MarketplaceSellWaste = () => {
  const formRefs = {
    name: useRef(null),
    email: useRef(null),
    mobileNo: useRef(null),
    address: useRef(null),
    wasteType: useRef(null),
    price: useRef(null),
    image:useRef(null),
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

    const farmerId = localStorage.getItem("userId");

    const formData = new FormData(); // Create FormData object

    formData.append("name", formRefs.name.current?.value || "");
    formData.append("email", formRefs.email.current?.value || "");
    formData.append("mobileNo", formRefs.mobileNo.current?.value || "");
    formData.append("address", formRefs.address.current?.value || "");
    formData.append("wasteType", formRefs.wasteType.current?.value || "Agricultural");
    formData.append("price", formRefs.price.current?.value || "0");
    formData.append("farmerid", farmerId);

    if (formRefs.image.current.files && formRefs.image.current.files.length > 0) {
      formData.append("file", formRefs.image.current.files[0]); // Append the file with the correct name "file"
    } else {
      formData.append("file", ""); // Handle the case where no file is selected
    }


    try {
      const response = await fetch("http://localhost:8085/marketplace/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error ${response.status}: ${errorText || response.statusText}`);
      }

      // Instead of parsing the response, just check for success
      if (response.status === 200) { // Or 201 if your API returns that on success
        alert("Data added successfully!"); // Show the alert
        e.target.reset(); // Reset the form
        setImagePreview(null);
        setMessage(""); // Clear any previous messages
      } else {
        // Handle unexpected success responses (e.g., non-200 status codes)
          const responseText = await response.text();
        setMessage(`Unexpected success response: ${response.status} - ${responseText}`);
      }


    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error("Fetch Error:", error);
    }
  };

  
  

  return (
    <div className="sell-waste-container sellwasteheader">
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

            <div className="form-group">
              <label>Name</label>
              <input ref={formRefs.name} type="text" placeholder="Your name" required />
              <br /><br />
              <label>Email</label>
              <input ref={formRefs.email} type="email" placeholder="Your email" required />
            </div>

            <div className="form-group">
              <label>Waste Type</label>
              <select ref={formRefs.wasteType} required>
                <option value="Agricultural">Agricultural Waste</option>
                <option value="Plastic">Plastic Waste</option>
                <option value="Organic">Organic Waste</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Mobile No</label>
              <input ref={formRefs.mobileNo} type="tel" placeholder="Your mobile number" required />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input ref={formRefs.address} type="text" placeholder="Your address" required />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input ref={formRefs.price} type="number" placeholder="Your Price" required />
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </div>
        </form>

        {message && <p className="form-message">{message}</p>}
      </div>
    </div>
  );
};

export default MarketplaceSellWaste;
