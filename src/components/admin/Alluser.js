import React, { useEffect, useState } from 'react';

export default function Alluser() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8085/api/farmers/getall")
      .then((res) => res.json())
      .then((val) => {
        setData(val);
        console.log(val);
      })
      .catch((err) => console.log("Unable to fetch", err));
  }, []);

  const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length !== 3) return "N/A";
    const [year, month, day] = dateArray;
    const date = new Date(year, month - 1, day); 
    return date.toLocaleDateString('en-GB'); 
  };

  return (
    <>
      <h1 className='emph1'>Users Data</h1>
      <div className='backsize'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Count</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Birth Date</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 &&
              data.map((val, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    {/* <th scope="row">{val.id}</th> */}
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>{val.mobileNo}</td>
                    <td>{formatDate(val.birthdate)}</td>
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
