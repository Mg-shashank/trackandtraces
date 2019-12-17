import React, {} from "react";
import { withRouter } from "react-router-dom";
// import { Menu, Dropdown, Icon } from 'antd';
import logo from "./images/brillio-logo.png";
import usericon from "./images/user-icon.svg";
import back from "./images/arrow-right.svg";
import router from "./images/router.png"
import map from "./images/map.svg";
import "./dashboard.scss";
// import { ReceiptTwoTone } from "@material-ui/icons";

// import { useUserDispatch, loginUser } from "../../context/UserContext";

    function Landingpage(props) {    
      return( 
        <div class="container-fluid padding0">
        <header>
              <span className="logo"><img className="logoImage" src={logo} alt="Brillio logo" width="125px"/></span>
            
              <div className="userBlock collapse navbar-collapse">
                <a href="#">Help</a>&nbsp;<span className="pipe">|</span>&nbsp;<a href="#">Hi Michael B Smith <img src={usericon} alt="user" /></a>
          		</div>  
             
          </header>
		  <section class="">
			<div class="col-lg-8 col-md-8 content">
				<h3 class="section-header"><a href="place-order.html"><img src={back} alt="back" class="back" /></a>Track Order</h3>
				<p>Current Order</p>
				
				<img src={map} alt="map"/>
				<div class="place-order">
					<div class="col-lg-7 col-md-7">
						<img src={router} alt="device" class="rect" />
						<div class="network-device">
							<p>Linksys AC1200 Max WiFi Range Extender RE6500<br/><span>Network</span></p>
							<p>Item Quantity: <span>10000</span></p>
							<p>Order Status: <span>Order Placed</span></p>
						</div>
					</div>
					<div class="col-lg-6 col-md-6">
						<div class="network-device">
							<p>Billing Id: <span>813725866655</span></p>
							<p>Biller Name: <span>Ann N Johnson</span></p>
							<p>Address: <span>Ann N Johnson Phone Number(706) 738-0746
							   2121 Cumming Rd, Augusta, GA, 30904</span></p>
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-3 col-md-3 activity-log">
				<h2 class="section-header">Track Details</h2>
				<div class="timeline-wrapper">
					<div class="node finished">
					<h5>Order Initiated</h5>
					<p class="sub-title">25-11-2019 14:54:00 EST</p>
				  </div>
				  <div class="node progressing">
					<h5>Order Released</h5>
					<p class="sub-title">26-11-2019 14:54:00 EST</p>
				  </div>
				  <div class="node">
					<h5>Order Accepted</h5>
					<p class="sub-title">Status / Time</p>
				  </div>
				  <div class="node">
					<h5>Order Shipped</h5>
					<p class="sub-title">Status / Time</p>
				  </div>
				  <div class="node">
					<h5>Order Delivered</h5>
					<p class="sub-title">Status / Time</p>
				  </div>
				</div>
			</div>
		</section>
        </div>  
       
         
);
}


export default withRouter(Landingpage);
