import React, { useEffect, useState } from 'react';

export default function AllEmployee() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8085/api/employee/getall")
      .then((res) => res.json())
      .then((val) => {
        const employees = val.filter((item) => item.role === "EMPLOYEE");
        setData(employees);
        console.log(employees);
      })
      .catch((err) => console.log("Unable to fetch", err));
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A"; 
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB'); 
  };

  return (
    <>
      <h1 className='emph1'>Employee Data</h1>
      <div className='backsize'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Count</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Joining Date</th>
              <th scope="col">Salary</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 &&
              data.map((val, index) => {
                return (
                  <tr key={index}>
                    <td scope="row">{index + 1}</td>
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>{val.mobileNo}</td>
                    <td>{formatDate(val.joiningDate)}</td>
                    <td>{val.salary}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
