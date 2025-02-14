import React, { useEffect, useState } from "react";
import "./EditProfile.css";

function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    address: "",
  });
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      alert("User ID not found.");
      return;
    }

    fetch(`http://localhost:8085/api/farmers/get/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch profile data.");
        }
        return response.json();
      })
      .then((data) => {
        setFormData({
          name: data.name || "",
          email: data.email || "",
          mobileNo: data.mobileNo || "",
          address: data.address || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID not found.");
      return;
    }

    fetch(`http://localhost:8085/api/farmers/update/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Profile updated successfully!");
        } else {
          alert("Failed to update profile. Please try again.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Updated Profile Data:", data);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="edit-profil mt-5 mb-5">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="mobileNo">Mobile Number</label>
          <input
            type="tel"
            id="mobileNo"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;