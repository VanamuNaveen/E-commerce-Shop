import React from 'react'
import './css/Banner.css'
import temp from '../images/temp.jpg'
const Banner = () => {
  return (
    <div className='banner-container'>
        <img className='banner-img' src={temp}/>
        <div className='banner-content'>
            <h1 className='banner-heading'>Welcome to the Book Club</h1>
            <p className='banner-description'>Join us to explore the world of books and connect with fellow book lovers.</p>
            <button className='banner-button'>Join Now</button>
        </div>
    </div>
  )
}

export default Banner
