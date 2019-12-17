import React from "react";
import { withRouter, Link } from "react-router-dom";
import {Button, MenuItem, Menu} from "@material-ui/core";
// import { Menu, Dropdown, Icon } from 'antd';
import logo from "./images/brillio-logo.png";

import usericon from "./images/user-icon.svg";
import dots from "./images/dots.svg"
import router from "./images/router.png"
import "./dashboard.scss";


    function Landingpage(props) { 
      
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
   
      return( 
        <div className="wrapper">
         <header>
              <span className="logo"><img className="logoImage" src={logo} alt="Brillio logo" width="125px"/></span>
            
              <div className="userBlock collapse navbar-collapse">
              <Link to="/help">Help</Link>&nbsp;<span className="pipe">|</span>&nbsp;<a href="#"> <img src={usericon} alt="user" /></a>
          		</div>  
             
              </header>
          <section>    
            <div className="container">

            <div className="col-lg-9 col-md-9 padding0">
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
        <span className="section-header">Recommended Orders </span><Link to="/createorder"><div className="btn btn-prim pull-right">+ Create New Order</div></Link>
      </div>
    </div>
  </div>
</div>
            

                      <div className="col-lg-3 col-mt-3  float-right  recent-activities">
              <div className="col-lg-12 col-mt-12 col-mt-5 padding0">
                <h3 className="section-header">Recent Activities</h3>
                <div className="activity-card">
                  <p className="act-head">New Order</p>
                  <p className="act-content">You have received a new order for Linksys AC1200 Max WiFi Range Extender RE6500 from Abbott Group Enterprise.</p>
                  <p className="text-right"><Link to="/traceorder"><div className="view-more">View more</div></Link></p>
                </div>
                <div className="activity-card">
                  <p className="act-head">Order Accepted</p>
                  <p className="act-content">Order accepted for for Netgear Nightwalk X10 AD7200 from Hirthe Group Enterprise.</p>
                  <p className="text-right"><Link to="/traceorder"><div className="view-more">View more</div></Link></p>
                </div>
                <div className="activity-card">
                  <p className="act-head">New Order</p>
                  <p className="act-content">You have received a new order for D-Link AC2600 (DIR-2680) from Schuster Ltd Enterprise.</p>
                  <p className="text-right"><Link to="/traceorder"><div className="view-more">View more</div></Link></p>
                </div>
                <div className="activity-card">
                  <p className="act-head">Order Received</p>
                  <p className="act-content">Order received for D-Link DWR-2010 5G Router from Schuster Ltd Enterprise.</p>
                  <p className="text-right"><Link to="/traceorder"><div className="view-more">View more</div></Link></p>
                </div>
              </div>
            </div>
             
                  <div className="col-lg-9 col-md-9 padding0">
                    <div className="col-lg-4 col-md-4">
                      <div className="device-card selected">
                        <div className="dropdown dots">
                          
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                              <b>...</b>
                            </Button>
                            <Menu
                              id="simple-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                            >
                              <MenuItem onClick={handleClose}>Device Model: AC5300</MenuItem>
                              <MenuItem onClick={handleClose}>Device Type: Router</MenuItem>
                              <MenuItem onClick={handleClose}>Device Vendor: Asus</MenuItem>
                            </Menu>
                         
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
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            <b>...</b>
                            </Button>
                            <Menu
                              id="simple-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                            >
                              <MenuItem onClick={handleClose}>Device Model: AC5300</MenuItem>
                              <MenuItem onClick={handleClose}>evice Type: Router</MenuItem>
                              <MenuItem onClick={handleClose}>Device Vendor: Asus</MenuItem>
                            </Menu>                             
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
                          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                          <b>...</b>
                            </Button>
                            <Menu
                              id="simple-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                            >
                              <MenuItem onClick={handleClose}>Device Model: AC5300</MenuItem>
                              <MenuItem onClick={handleClose}>Device Type: Router</MenuItem>
                              <MenuItem onClick={handleClose}>Device Vendor: Asus</MenuItem>
                            </Menu>
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
          </section>  
        </div>  
         
);
      }
export default (Landingpage);
                    
