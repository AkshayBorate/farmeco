import React from "react"
import Back from "../common/back/Back"
import BlogCard from "./BlogCard"
import "./blog.css"
import Footer from "../common/footer/Footer"

const Blog = () => {
  return (
    <>
      <Back title='Blog Posts' className=""/>
      <section className='blog padding bgg'>
        <div className='container grid2'>
          <BlogCard />
        </div>
      </section>
      <Footer/>
    </>
  )
}

export default Blog
