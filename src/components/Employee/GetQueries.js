import React, { useEffect, useState } from 'react'

export default function GetQueries() {
  const [data, setData] = useState([]);
 
   useEffect(() => {
     fetch("http://localhost:8085/contact/get")
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
       <h1 className='emph1'>Query Of Farmers</h1>
       <div className='backsize'>
         <table className="table">
           <thead>
             <tr>
               <th scope="col">Id</th>
               <th scope="col">Name</th>
               <th scope="col">Email</th>
               <th scope="col">Subject</th>
               <th scope="col">Query</th>
               <th scope="col">Date Of Raised</th>
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
                     <td>{val.subject}</td>
                     <td>{val.message}</td>
                     <td>{formatDate(val.createdAt)}</td>
                     
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
 
