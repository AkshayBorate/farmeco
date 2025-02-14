import React, { useEffect, useState } from 'react'

export default function Reviews() {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetch("http://localhost:8085/reviews/get")
        .then((res) => res.json())
        .then((val) => {
          setData(val);
          console.log(val);
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
      <h1 className='emph1'>Review Data</h1>
      <div className='backsize ' >
        <table className="table">
          <thead>
            <tr>
             <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Rating</th>
              <th scope="col">Message</th>
              <th scope="col">Date Of Given</th>
              
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 &&
              data.map((val, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index+1}</th> 
                    <td>{val.farmer.name}</td>
                    <td>{val.farmer.email}</td>
                    <td>{val.rating}</td>
                    <td>{val.reviewText}</td>
                    <td>{formatDate(val.createdAt)}</td>                   
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
