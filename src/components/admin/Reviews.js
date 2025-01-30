import React, { useEffect, useState } from 'react'

export default function Reviews() {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetch("")
        .then((res) => res.json())
        .then((val) => {
          setData(val);
          console.log(val);
        })
        .catch((err) => console.log("Unable to fetch", err));
    }, []); 
  
    return (
      <>
      <h1 className='emph1'>Review Data</h1>
      <div className='backsize ' >
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile No</th>
              <th scope="col">Rating</th>
              <th scope="col">Message</th>
              
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 &&
              data.map((val, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{val.id}</th> 
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>{val.mobileno}</td>
                    <td>{val.birthdate}</td>
                    
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
      </>
    )
}
