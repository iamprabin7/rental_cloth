import React from 'react';
import { SliderData } from './SliderData';
import ImageSlider from './ImageSlider';
import './slider.css'
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
     
    <>
    <ImageSlider slides={SliderData} 
    />
    <div className="slider-text">

            <h1>POSHAK SEWA</h1>
            <h6>Rent clothes for all occasions</h6>
            <Link to="/register" className="get-started-button">Get started →</Link>
            {/* <button className=>Get started →</button> */}
          </div>
          
    <Footer />
    </>
    );

}
     
export default Home;
