import React, {} from "react";
import { withRouter,Link } from "react-router-dom";
// import { Menu, Dropdown, Icon } from 'antd';
import logo from "./images/brillio-logo.png";
import usericon from "./images/user-icon.svg";
import back from "./images/arrow-right.svg"
import map from "./images/map.svg"
import router from "./images/router2.jpg"
import "./dashboard.scss";
// import { ReceiptTwoTone } from "@material-ui/icons";

// import { useUserDispatch, loginUser } from "../../context/UserContext";

    function Landingpage(props) {    
      return( 
        <div class="container-fluid padding0">
        <header>
              <span className="logo"><img className="logoImage" src={logo} alt="Brillio logo" width="125px"/></span>
            
              <div className="userBlock collapse navbar-collapse">
			  <Link to="/help">Help</Link>&nbsp;<span className="pipe">|</span>&nbsp;<img src={usericon} alt="user" />
          		</div>  
             
          </header>
		  <section class="">
			<div class="col-lg-6 col-md-6 content">
				<h3 class="section-header"><Link to="/dashboard"><img src={back} alt="back" class="back" /></Link>Trace Order</h3>
				<p>Current Order</p>
				
				<img src={map} alt="map"/>
				<div class="place-order">
					<div class="col-lg-6 col-md-6">
						<img src={router} alt="device" class="rect" width="100" height="100"/>
						<div class="network-device">
							
							<h6><p>Asus ROG Rapture GT-AC5300<br/><span>Network</span></p>
							<p>Item Quantity: <span>10000</span></p>
							<p>Order Status: <span>Order Placed</span></p></h6>
						</div>
					</div>
					<div class="col-lg-6 col-md-6">
						<div class="network-device">
						<h6><p>Billing Id: <span>813725866655</span></p>
							<p>Biller Name: <span>Michael B Smith</span></p>
							<p>Address: <span>Michael B Smith, Phone Number(706) 738-0746
							   2121 Cumming Rd, Augusta, GA, 30904</span></p></h6>
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-3 col-md-3 activity-log">
				<h2 class="section-header">Track Details</h2>
				<div class="timeline-wrapper">
					<div class="node finished">
					<h6>Order Initiated</h6>
					<p class="sub-title">25-11-2019 14:54:00 EST</p>
				  </div>
				  <div class="node progressing">
					<h6>Order Released</h6>
					<p class="sub-title">26-11-2019 14:54:00 EST</p>
				  </div>
				  <div class="node">
					<h6>Order Accepted</h6>
					<p class="sub-title">Status / Time</p>
				  </div>
				  <div class="node">
					<h6>Order Shipped</h6>
					<p class="sub-title">Status / Time</p>
				  </div>
				  <div class="node">
					<h6>Order Delivered</h6>
					<p class="sub-title">Status / Time</p>
				  </div>
				</div>
			</div>
		</section>
        </div>         
         
);
}


export default withRouter(Landingpage);
