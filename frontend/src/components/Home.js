import React, { Component } from "react";
import bg1 from './../assets/img/1.jpg';
import logo from './../assets/img/brand/youFarm.png'
import { Link } from 'react-router-dom';

class Home extends Component {

  render() {
    return (
      <div>
        <header className="header-area">
          <div className="famie-main-menu">
            <div className="classy-nav-container breakpoint-off">
              <div className="container">
                <nav className="classy-navbar justify-content-between" id="famieNav">
                  <a href="/#" className="nav-brand"><img src={logo} alt="" /></a>
                  <div>
                    <span className="right"><Link to="/login" className="btn btn-success">LOGIN / REGISTER</Link></span>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </header>
        <div className="hero-area">
          <div className="welcome-slides">
            <div className="single-welcome-slides bg-img bg-overlay" style={{ backgroundImage: `url(${bg1})` }}>
              <div className="container h-100">
                <div className="row h-100 align-items-center">
                  <div className="col-12 col-lg-10">
                    <div className="welcome-content">
                      <h2>Solution for all local farmers</h2>
                      <p>This is a tech solution through increased collaboration from international corporations, towards developing rural infrastructure, agricultural research and practices-- With this, we can help enhance our communities agricultural productive capacity and overall we can help reduce hunger by 2030. </p>
                      <Link to="/login" className="btn btn-success">LOGIN / REGISTER</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="famie-benefits-area section-padding-100-0 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="benefits-thumbnail text-center mb-50">
                  <img src="img/bg-img/farm.jpg" alt="" />
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-12 col-sm-4 col-lg">
                <div className="single-benefits-area wow fadeInUp mb-50" data-wow-delay="300ms">
                  <img src="img/core-img/windmill.png" alt="" />
                  <h5>Farm Experiences</h5>
                </div>
              </div>
              <div className="col-12 col-sm-4 col-lg">
                <div className="single-benefits-area wow fadeInUp mb-50" data-wow-delay="500ms">
                  <img src="img/core-img/cereals.png" alt="" />
                  <h5>Farm Related Articles</h5>
                </div>
              </div>
              <div className="col-12 col-sm-4 col-lg">
                <div className="single-benefits-area wow fadeInUp mb-50" data-wow-delay="700ms">
                  <img src="img/core-img/tractor.png" alt="" c />
                  <h5>Farm Equipment/Tools</h5>
                </div>
              </div>

              <div className="col-12 col-sm-4 col-lg">
                <div className="single-benefits-area wow fadeInUp mb-50" data-wow-delay="900ms">
                  <img src="img/core-img/sunrise.png" alt="" />
                  <h5>Sales Farm Products</h5>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="about-us-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md-8">
                <div className="about-us-content mb-100">
                  <div className="section-heading">
                    <p>About us</p>
                    <h2><span>Let Us</span> Tell You Our Story</h2>
                    <img src="img/core-img/decor.png" alt="" />
                  </div>
                  <div className="section-heading">
                    <h2><span>youFarm</span></h2> was created by a team of six (6) in at #BuildforSDG Challenge 2020
                </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className=" mb-100">
                  <img src={logo} alt="" />
                </div>
              </div>

            </div>
          </div>
        </section>
        <section className="services-area d-flex flex-wrap">
          <div className="services-thumbnail bg-img jarallax" style={{ backgroundImage: `url(${bg1})` }}></div>
          <div className="services-content section-padding-100-50 px-5">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="section-heading">
                    <p>What this app offers</p>
                    <h2>What <span>Farmers</span> Will Enjoy:</h2>
                    <img src="img/core-img/decor.png" alt="" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 mb-50">
                  <p>This is a tech solution through increased collaboration from international corporations, towards developing rural infrastructure, agricultural research and practices-- With this, we can help enhance our communities agricultural productive capacity and overall we can help reduce hunger by 2030. </p>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="single-service-area mb-50 wow fadeInUp" data-wow-delay="100ms">
                    <div className="service-title mb-3 d-flex align-items-center">
                      <img src="img/core-img/s1.png" alt="" />
                      <h5>Articles Stritly on farming practices</h5>
                    </div>
                    <p>Continous publishing of articles that will help farmers improving their faming skills </p>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="single-service-area mb-50 wow fadeInUp" data-wow-delay="300ms">
                    <div className="service-title mb-3 d-flex align-items-center">
                      <img src="img/core-img/s2.png" alt="" />
                      <h5>Sales/Purchase of farming product</h5>
                    </div>
                    <p>Farmers which registered as a supplier can post his/her farming products or tools for purcahse by fellow farmers. </p>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="single-service-area mb-50 wow fadeInUp" data-wow-delay="500ms">
                    <div className="service-title mb-3 d-flex align-items-center">
                      <img src="img/core-img/s3.png" alt="" />
                      <h5>Easy registration</h5>
                    </div>
                    <p>Farmers can easily register and login to their dashboard without hassle. </p>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="single-service-area mb-50 wow fadeInUp" data-wow-delay="700ms">
                    <div className="service-title mb-3 d-flex align-items-center">
                      <img src="img/core-img/s4.png" alt="" />
                      <h5>24/7 Support</h5>
                    </div>
                    <p>Farmers are guarantee of swift response anytime they have issue or want to make enquiry. </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="footer-area">
          <div className="copywrite-area">
            <div className="container">
              <div className="copywrite-text">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <p>
                      Copyright &copy; 2020; youFarm. All rights reserved; by SDG 2020 - Team 233
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div >
    );
  }
}

export default Home;
