import React from 'react'


const Homecust = () => {
  return (
    <>
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://media.istockphoto.com/id/1346470845/photo/composting-organic-waste-for-soil-enrichment.j
          pg?s=612x612&w=0&k=20&c=QbvwZKD283SuqK5ojUy1Cpn_7IUovVUgwp9xiv4VbSc=" className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src="https://agriplasticscommunity.com/wp-content/uploads/agricultural-waste.jpg"
              className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src="https://www.biopelletmachine.com/wp-content/uploads/2018/11/agriculture-waste-pellet.jpg"
              className="d-block w-100" alt="Slide 3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};



export default Homecust;


