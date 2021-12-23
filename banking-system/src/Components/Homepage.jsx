import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../Styles/homepage.css";
import bannerImage from "../images/transfer.svg";
import { Link } from "react-router-dom";
const Homepage = () => {
  return (
    <div className="homepage">
      <div className="page_header">
        <Header />
        <div className="banner">
          <div className="banner_items">
            <div className="banner_child_one">
              <div className="banner_child_one_text">
                <div>All in one solution for</div>
                <div>money transfer</div>
              </div>
              <div className="banner_child_one_action">
                <button className="banner_child_one_button">
                  <Link to="/Customers" className="banner_child_one_link">
                    Get started
                  </Link>
                </button>
              </div>
            </div>
            <div className="banner_child_two">
              <img className="banner_image" src={bannerImage} alt="" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
