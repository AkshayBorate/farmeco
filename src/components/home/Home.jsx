import React from "react"
import AboutCard from "../about/AboutCard"
import Hblog from "./Hblog"
import HAbout from "./HAbout"
import Hero from "./hero/Hero"
import Hprice from "./Hprice"
import Services from "../../components/common/footer/Services"


const Home = () => {
  return (
    <>
      <Hero />
      <AboutCard />
      <HAbout />
      <Hblog />
      <Hprice />
      <Services/>
    </>
  )
}

export default Home
