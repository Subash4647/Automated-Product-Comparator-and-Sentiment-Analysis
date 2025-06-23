import React from "react";
import Datareport from "../assets/Datareport.png";


const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-container">
        <div className="banner-wrapper">
          <div className="banner-text">
            <p className="banner-heading">
              <span>Shop Smarter</span>
              <span>Not Harder</span>
            </p>
            <p className="banner-description">
              "CleverCart" is a web application that allows users to compare
              prices and perform sentiment analysis for products from different
              e-commerce websites like Amazon and Flipkart. The primary use case
              for this project is to help users make informed purchasing
              decisions and gain insights into product reviews.
            </p>
          </div>
          <div className="banner-image">
            <img src={Datareport} alt="Data Report" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
