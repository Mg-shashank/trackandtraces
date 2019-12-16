import React, {} from "react";
import { withRouter } from "react-router-dom";
// import { Menu, Dropdown, Icon } from 'antd';
import logo from "./images/brillio-logo.png";
import usericon from "./images/user-icon.svg";
import dots from "./images/dots.svg"
import router from "./images/router.png"
import "./dashboard.scss";
// import { ReceiptTwoTone } from "@material-ui/icons";

// import { useUserDispatch, loginUser } from "../../context/UserContext";

    function Landingpage(props) {    
      return( 
        <div className="wrapper">
         <header>
              <span className="logo"><img className="logoImage" src={logo} alt="Brillio logo" width="125px"/></span>
            
              <div className="userBlock collapse navbar-collapse">
                <a href="#">Help</a>&nbsp;<span className="pipe">|</span>&nbsp;<a href="#">Hi Michael B Smith <img src={usericon} alt="user" /></a>
          		</div>  
             
          </header>
          <section>
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 padding0">
                  <div className="col-lg-9 col-md-9">
                    <div className="col-lg-12 col-md-12">
                      <h3 className="section-header">Track Orders</h3>
                    </div>
                    <div className="col-lg-12 col-md-12 padding0">
                      <div className="col-lg-4 col-md-4">
                        <div className="track-order">
                          <h3>Order Received</h3>
                          <p className="order-number">18605</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="track-order">
                          <h3>Order Accepted</h3>
                          <p className="order-number">15730</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="track-order">
                          <h3>Order Placed</h3>
                          <p className="order-number">15067</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <span className="section-header">Recommended Orders </span><a href="place-order.html" className="btn btn-prim pull-right">+ Create New Order</a>
                      </div>
                    </div>
                  </div>
                </div>
              
              <div className="row">
                <div className="col-lg-12 col-md-12 padding0">
                  <div className="col-lg-4 col-md-4">
                    <div className="device-card selected">
                      <div className="dropdown dots">
                        <button className="btn dropdown-toggle" type="button" data-toggle="dropdown">
                          <img src={dots} alt="dots" />
                        </button>
                        <ul className="dropdown-menu">
                        <li><a href="#">Device Model: AC5300 </a></li>
                        <li><a href="#">Device Type: Router</a></li>
                        <li><a href="#">Device Vendor: Asus</a></li>
                        </ul>
                      </div>
                      <img src={router} alt="s1" className="s1" />
                      <h3 className="title">Asus ROG Rapture GT-AC5300</h3>
                      <p className="sub-title">Router</p>
                      <p className="card-label"><label>Device category:</label> Network</p>
                      <p className="attribute">MAC Address: D4:05:15:35:4A:11</p>
                      <p className="attribute">Serial number: 12AC5600214</p>
                      <p className="attribute">Domain name: Telecom</p>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4">
                    <div className="device-card selected">
                      <div className="dropdown dots">
                        <button className="btn dropdown-toggle" type="button" data-toggle="dropdown">
                          <img src={dots} alt="dots" />
                        </button>
                        <ul className="dropdown-menu">
                        <li><a href="#">Device Model: AC5300 </a></li>
                        <li><a href="#">Device Type: Router</a></li>
                        <li><a href="#">Device Vendor: Asus</a></li>
                        </ul>
                      </div>
                      <img src={router} alt="s1" className="s1" />
                      <h3 className="title">Asus ROG Rapture GT-AC5300</h3>
                      <p className="sub-title">Router</p>
                      <p className="card-label"><label>Device category:</label> Network</p>
                      <p className="attribute">MAC Address: D4:05:15:35:4A:11</p>
                      <p className="attribute">Serial number: 12AC5600214</p>
                      <p className="attribute">Domain name: Telecom</p>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4">
                    <div className="device-card selected">
                      <div className="dropdown dots">
                        <button className="btn dropdown-toggle" type="button" data-toggle="dropdown">
                          <img src={dots} alt="dots" />
                        </button>
                        <ul className="dropdown-menu">
                          <li><a href="#">Device Model: AC5300 </a></li>
                          <li><a href="#">Device Type: Router</a></li>
                          <li><a href="#">Device Vendor: Asus</a></li>
                        </ul>
                      </div>
                      <img src={router} alt="s1" className="s1" />
                      <h3 className="title">Asus ROG Rapture GT-AC5300</h3>
                      <p className="sub-title">Router</p>
                      <p className="card-label"><label>Device category:</label> Network</p>
                      <p className="attribute">MAC Address: D4:05:15:35:4A:11</p>
                      <p className="attribute">Serial number: 12AC5600214</p>
                      <p className="attribute">Domain name: Telecom</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-3 recent-activities">
                <h3 className="section-header">Recent Activities</h3>
                <div className="activity-card">
                  <p className="act-head">New Order</p>
                  <p className="act-content">You have received a new order for Linksys AC1200 Max WiFi Range Extender RE6500 from Abbott Group Enterprise.</p>
                  <p className="text-right"><a className="view-more" href="./trace-order.html">View More</a></p>
                </div>
                <div className="activity-card">
                  <p className="act-head">Order Accepted</p>
                  <p className="act-content">Order accepted for for Netgear Nightwalk X10 AD7200 from Hirthe Group Enterprise.</p>
                  <p className="text-right"><a className="view-more" href="#">View More</a></p>
                </div>
                <div className="activity-card">
                  <p className="act-head">New Order</p>
                  <p className="act-content">You have received a new order for D-Link AC2600 (DIR-2680) from Schuster Ltd Enterprise.</p>
                  <p className="text-right"><a className="view-more" href="#">View More</a></p>
                </div>
                <div className="activity-card">
                  <p className="act-head">Order Accepted</p>
                  <p className="act-content">Order accepted for D-Link DWR-2010 5G Router from Schuster Ltd Enterprise.</p>
                  <p className="text-right"><a className="view-more" href="#">View More</a></p>
                </div>
              </div>
            </div>
            </div>
          </section>  
        </div>  
         
);
}


export default withRouter(Landingpage);
