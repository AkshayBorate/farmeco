// // import React from "react"
// // import { awrapper } from "../../dummydata"

// // const Awrapper = () => {
// //   return (
// //     <>
// //       <section className='awrapper'>
// //         <div className='container grid'>
          
// //           {awrapper.map((val) => {
// //             return (
             
              
// //               <div className='box flex'>
// //                 <div className='img'>
// //                   <img src={val.cover} alt='' />
// //                 </div>
// //                 <div className='text'>
// //                   <h1>{val.data}</h1>
// //                   <h3>{val.title}</h3>
// //                 </div>
// //               </div>
              
// //             )
          
// //           })}
// //         </div>
        
// //       </section>

      
// //     </>
// //   )
// // }

// // export default Awrapper


// import React from "react";
// import Heading from "../common/heading/Heading";
// import { awrapper } from "../../dummydata";
// import "./awrapper.css"; // Assuming you might have styles for this section

// const Awrapper = () => {
//   return (
//     <>
//       <section className="awrapper">
//         <div className="container grid">
//           {awrapper.map((val) => (
//             <div className="box flex" key={val.title}>
//               <div className="img">
//                 <img src={val.cover} alt={val.title} />
//               </div>
//               <div className="text">
//                 <h1>{val.data}</h1>
//                 <h3>{val.title}</h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Static Content Section */}
//       <section className="about-content">
//         <Heading subtitle="About FarmEco" />
//         <p>
//           FarmEco is a forward-thinking agricultural company dedicated to transforming waste into health. Through innovative agricultural waste recycling techniques, we are helping to reduce environmental impact while contributing to the sustainable growth of the farming industry.
//         </p>
//         <Heading subtitle="Our Mission" />
//         <p>
//           To reduce the harmful environmental impact of agricultural waste and promote a circular economy within the farming sector. By recycling and reusing agricultural waste, we not only minimize pollution but also create valuable resources that can enhance soil health, improve crop yields, and reduce dependence on chemical fertilizers.
//         </p>
//         <Heading subtitle="Our Vision" />
//         <p>
//           We envision a world where farmers have access to sustainable and eco-friendly solutions that improve crop health, increase productivity, and reduce waste. By leveraging cutting-edge technology and promoting organic, sustainable farming practices, FarmEco aims to be at the forefront of agricultural innovation.
//         </p>
//         <Heading subtitle="What We Do" />
//         <p>
//           Agri Waste Recycling: We specialize in turning agricultural waste into valuable resources like compost, fertilizers, and biogas.
//           Soil Health Improvement: By using organic solutions, we help farmers restore soil health and promote sustainable farming practices.
//           Eco-Friendly Solutions: From biodegradable packaging to renewable energy, we offer solutions that minimize environmental impact and enhance sustainability.
//           Farmer Empowerment: We provide farmers with the tools, knowledge, and support they need to improve their livelihoods and contribute to a greener, more sustainable world.
//         </p>
//         <Heading subtitle="Our Values" />
//         <p>
//           Sustainability: We prioritize environmental protection by transforming waste into resources, reducing pollution, and promoting circular economy practices.
//           Innovation: We constantly explore new technologies to improve our products and services.
//           Empathy: We understand the challenges that farmers face, and our solutions are designed to improve their efficiency, productivity, and profitability.
//         </p>
//         <Heading subtitle="Why Choose Us?" />
//         <p>
//           Environmentally Friendly: Our solutions are designed to reduce waste and pollution, contributing to a cleaner and healthier environment.
//           Support for Farmers: We provide cost-effective, sustainable alternatives to traditional farming inputs, ensuring better yields and healthier crops.
//           Quality Products: From organic compost to biogas, we ensure our products meet the highest standards of quality and safety.
//         </p>
//       </section>
//     </>
//   );
// };

// export default Awrapper;


import React from "react";
import Heading from "../common/heading/Heading";
import { awrapper } from "../../dummydata";
import "./awrapper.css";

const Awrapper = () => {
  return (
    <>
      <section className="awrapper">
        <div className="container grid">
          {awrapper.map((val) => (
            <div className="box flex" key={val.title}>
              <div className="img">
                <img src={val.cover} alt={val.title} />
              </div>
              <div className="text">
                <h1>{val.data}</h1>
                <h3>{val.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Static Content Section in Card Format */}
      <div className="container">
      <div className="row about-content-card">
  <div className="col-md-4 mb-4">
    <div className="card p-4 h-100 shadow rounded-3 border-0 bg-dark text-white">
      <Heading subtitle="About FarmEco" />
      <p>
        FarmEco is a forward-thinking agricultural company dedicated to transforming waste into health. Through innovative agricultural waste recycling techniques, we are helping to reduce environmental impact while contributing to the sustainable growth of the farming industry.
      </p>
    </div>
  </div>

  <div className="col-md-4 mb-4">
    <div className="card p-4 h-100 shadow rounded-3 border-0 bg-dark text-white">
      <Heading subtitle="Our Mission" />
      <p>
        To reduce the harmful environmental impact of agricultural waste and promote a circular economy within the farming sector. By recycling and reusing agricultural waste, we not only minimize pollution but also create valuable resources that can enhance soil health, improve crop yields, and reduce dependence on chemical fertilizers.
      </p>
    </div>
  </div>

  <div className="col-md-4 mb-4">
    <div className="card p-4 h-100 shadow rounded-3 border-0 bg-dark text-white">
      <Heading subtitle="Our Vision" />
      <p>
        We envision a world where farmers have access to sustainable and eco-friendly solutions that improve crop health, increase productivity, and reduce waste. By leveraging cutting-edge technology and promoting organic, sustainable farming practices, FarmEco aims to be at the forefront of agricultural innovation.
      </p>
    </div>
  </div>

  <div className="col-md-4 mb-4">
    <div className="card p-4 h-100 shadow rounded-3 border-0 bg-dark text-white">
      <Heading subtitle="What We Do" />
      <p>
        <strong>Agri Waste Recycling:</strong> We specialize in turning agricultural waste into valuable resources like compost, fertilizers, and biogas.<br />
        <strong>Soil Health Improvement:</strong> By using organic solutions, we help farmers restore soil health and promote sustainable farming practices.<br />
        <strong>Eco-Friendly Solutions:</strong> From biodegradable packaging to renewable energy, we offer solutions that minimize environmental impact and enhance sustainability.<br />
        <strong>Farmer Empowerment:</strong> We provide farmers with the tools, knowledge, and support they need to improve their livelihoods and contribute to a greener, more sustainable world.
      </p>
    </div>
  </div>

  <div className="col-md-4 mb-4">
    <div className="card p-4 h-100 shadow rounded-3 border-0 bg-dark text-white">
      <Heading subtitle="Our Values" />
      <p>
        <strong>Sustainability:</strong> We prioritize environmental protection by transforming waste into resources, reducing pollution, and promoting circular economy practices.<br />
        <strong>Innovation:</strong> We constantly explore new technologies to improve our products and services.<br />
        <strong>Empathy:</strong> We understand the challenges that farmers face, and our solutions are designed to improve their efficiency, productivity, and profitability.
      </p>
    </div>
  </div>

  <div className="col-md-4 mb-4">
    <div className="card p-4 h-100 shadow rounded-3 border-0 bg-dark text-white">
      <Heading subtitle="Why Choose Us?" />
      <p>
        <strong>Environmentally Friendly:</strong> Our solutions are designed to reduce waste and pollution, contributing to a cleaner and healthier environment.<br />
        <strong>Support for Farmers:</strong> We provide cost-effective, sustainable alternatives to traditional farming inputs, ensuring better yields and healthier crops.<br />
        <strong>Quality Products:</strong> From organic compost to biogas, we ensure our products meet the highest standards of quality and safety.
      </p>
    </div>
  </div>
</div>
</div>
    </>
  );
};

export default Awrapper;
