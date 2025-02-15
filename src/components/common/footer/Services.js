import React from 'react';
// import { blog } from "../src/dummydata";
import { blog } from "../../../dummydata"
import Back from "../back/Back"
import { Link } from 'react-router-dom';


export default function Services() {
  return (
    <div>
      {/* <section className='newletter'>
        <div className='container flexSB'>
          <div className='left row'>
            <h1>GrowAgro - Stay Connected and Transform Waste into Wealth</h1>
            <span>Discover innovative ways to manage agricultural waste and build a sustainable future for farming.</span>
          </div>
          <div className='right row'>
            <input type='text' placeholder='Enter email address' />
            <i className='fa fa-paper-plane'></i>
          </div>
        </div>
      </section> */}
      {/* <Back title='' /> */}
      <footer className='ft'>
        <div className='container padding'>
          <div className='box logo'>
            <h1>FarmEco</h1>
            <span>Agri waste & Management Platform</span>
            <p>Transforming Waste into Wealth, Empowering Sustainable Agriculture.</p>
            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-instagram icon'></i>
          </div>
          <div className='box link'>
            <h3>Explore</h3>
            <ul>
            <li><Link to="/about">About</Link></li>
            
            <li><Link to="/journal">Blogs</Link></li>
            
            </ul>
          </div>
          <div className='box link'>
            <h3>Quick Links</h3>
            <ul>
            <li><Link to="/contact">Contcts</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/termsandconditions">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy & Policy</Link></li>
              <li><Link to="/feedback">FeedBack</Link></li>
            </ul>
          </div>
          <div className='box'>
            <h3>Recent Post</h3>
            {blog.slice(0, 3).map((val, index) => (
              <div key={index} className='items flexSB'>
                <div className='img'>
                  <img src={val.cover} alt='' />
                </div>
                <div className='text'>
                  <span>
                    <i className='fa fa-calendar-alt'></i>
                    <label htmlFor=''>{val.date}</label>
                  </span>
                  <span>
                    <i className='fa fa-user'></i>
                    <label htmlFor=''>{val.type}</label>
                  </span>
                  <h4>{val.title.slice(0, 40)}...</h4>
                </div>
              </div>
            ))}
          </div>
          <div className='box last'>
            <h3>Have a Questions?</h3>
            <ul>
              <li>
                <i className='fa fa-map'></i>
                A/p Nhavi , Indapur Dist-Pune , 413132
              </li>
              <li>
                <i className='fa fa-phone-alt'></i>
                +91 9112959661
              </li>
              <li>
                <i className='fa fa-paper-plane'></i>
                akshayb1905@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>
          Copyright ©2024 All rights reserved to FarmEco Services 
        </p>
      </div>
    </div>
  );
}
