import React from "react"
import AboutCard from "../about/AboutCard"
import Hblog from "./Hblog"
import HAbout from "./HAbout"
import Hero from "./hero/Hero"
import Hprice from "./Hprice"
import Services from "../../components/common/footer/Services"
import Footer from "../common/footer/Footer"


const Home = () => {
  return (
    <>
      <Hero />
      <AboutCard />
      <HAbout />
      <Hblog />
      {/* <Hprice /> */}
      {/* <Services/> */}
      <Footer/>
    </>
  )
}

export default Home
