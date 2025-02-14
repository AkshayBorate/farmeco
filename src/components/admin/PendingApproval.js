import React, { useEffect, useState } from 'react';

export default function PendingApproval() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8085/waste-details/orders")
      .then((res) => res.json())
      .then((val) => {
        const filteredRecords = val.filter(
          (record) => record.status === "PENDING" || 
                      record.status === "ACCEPTED" || 
                      !record.status // Handle "null" or undefined statuses
        );
        setData(filteredRecords);
        console.log(filteredRecords);
      })
      .catch((err) => console.log("Unable to fetch", err));
  }, []);

  return (
    <>
      <h1 className='emph1'>Pending Approvals</h1>
      <div className='backsize'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Farmer Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile No</th>
              <th scope="col">Waste Type</th>
              <th scope="col">Address</th>
              <th scope="col">Status</th>
              <th scope="col">Date Of Pickup</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((val, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{val.farmer?.name || "N/A"}</td> {/* Accessing name from nested 'farmer' */}
                  <td>{val.farmer?.email || "N/A"}</td> {/* Accessing email from nested 'farmer' */}
                  <td>{val.farmer?.mobileNo || "N/A"}</td> {/* Accessing mobileNo from nested 'farmer' */}
                  <td>{val.wasteType || "N/A"}</td>
                  <td>{val.address || "N/A"}</td>
                  <td>{val.status || "Pending"}</td> {/* Show "Pending" if status is null */}
                  <td>
                    {val.pickupDate
                      ? new Date(val.pickupDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No pending approvals found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
