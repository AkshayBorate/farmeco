import React, { useRef, useState } from "react";
import "./SellWaste.css";

const SellWaste = () => {
  const formRefs = {
    name: useRef(null),
    email: useRef(null),
    mobileNo: useRef(null),
    address: useRef(null),
    wasteType: useRef(null),
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

    const farmerId = localStorage.getItem("userId");
    if (!farmerId) {
      setMessage("Error: Farmer ID not found. Please log in again.");
      return;
    }

    // Validate form fields before submission
    if (!formRefs.address.current.value || !formRefs.wasteType.current.value || !formRefs.image.current.files[0]) {
      setMessage("Please fill all the required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("address", formRefs.address.current.value);
    formData.append("wasteType", formRefs.wasteType.current.value);
    formData.append("file", formRefs.image.current.files[0]);
    formData.append("farmerId", farmerId);
    formData.append("farmerName", formRefs.name.current ? formRefs.name.current.value : "Unknown");

    try {
      const response = await fetch("http://localhost:8085/waste-details/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Failed to submit data"}`);
        return;
      }

      const result = await response.json();
      setMessage(result.message || "Details successfully saved");

      // Reset form after successful submission
      formRefs.address.current.value = "";
      formRefs.wasteType.current.value = "Agricultural";
      formRefs.image.current.value = ""; // Clear image input
      setImagePreview(null);
      window.alert("Data added successfully!!")
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
            {/* Image Upload */}
            <div className="form-group image-upload">
              <label className="custom-file-upload">
                <input
                  type="file"
                  ref={formRefs.image}
                  onChange={handleImageChange}
                  accept="image/*"
                  required
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

            {/* Address */}
            <div className="form-group">
              <label>Address</label>
              <input ref={formRefs.address} type="text" placeholder="Your address" required />
              
              <div >
                <p>

                  
                </p>
              <div className="form-group">
              <label>Waste Type</label>
              <select ref={formRefs.wasteType} required >
                <option value="Agricultural">Agricultural Waste</option>
                <option value="Plastic">Plastic Waste</option>
                <option value="Organic">Organic Waste</option>
                <option value="Other">Other</option>
              </select>
            </div>
              </div>
            </div>
            </div>
            {/* Waste Type */}
           

            {/* Submit Button */}
            <button type="submit" className="submit-btn mt-5" >
              Submit
            </button>
          
        </form>
        </div>
     
        {/* {message && <p className="form-message">{message}</p>} */}
     
    </div>
  );
};

export default SellWaste;
