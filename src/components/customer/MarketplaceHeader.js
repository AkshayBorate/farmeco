import React from 'react'
import "./MarketplaceHeader.css"
import { Link } from "react-router-dom";

export default function MarketplaceHeader() {
  return (
    <>
    <div className="row marketplaceheader ">
       
    <div className="login-card admin-card">
          <h2>Sell Waste</h2>
          <p>Sell Your waste in open Market</p>
          <button className="login-btn">
            <Link to="/custheader/sell">Sell</Link>
          </button>
        </div>
        <div className="login-card admin-card">
          <h2>My orders</h2>
          <button className="login-btn">
            <Link to="/custheader/orders">Purchased Orders</Link>
          </button><br/><br/>
          <button className="login-btn">
            <Link to="/custheader/myorders">My Orders</Link>
          </button>
        </div>
        <div className="login-card admin-card">
          <h2>Buy Waste</h2>
          <p>Buy waste from open Market.</p>
          <button className="login-btn">
            <Link to="/custheader/buy">Buy</Link>
          </button>
        </div>
    </div>

    </>
    
  )
}
