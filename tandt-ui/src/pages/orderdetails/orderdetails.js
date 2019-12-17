import React, {} from "react";
import { withRouter } from "react-router-dom";
// import { Menu, Dropdown, Icon } from 'antd';
import logo from "./images/brillio-logo.png";
import usericon from "./images/user-icon.svg";
import rect from "./images/rect.svg"
import router from "./images/router.png"
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
		  <section class="content">
			<h3 class="section-header">Order Details</h3>
			<div class="col-lg-12 col-md-12 place-order">
				<div class="col-lg-3 col-md-3">
					<img src={router} alt="device" class="rect" />
					<p class="network-device">Linksys AC1200 Max WiFi Range Extender RE6500<br/><span>Network</span></p>
				</div>
				<div class="col-lg-2 col-md-2">
					<p class="network-device">Item Quantity<br/><span>1000</span></p>
				</div>
				<div class="col-lg-2 col-md-2">
					<p class="network-device">Billing Id<br/><span>813725866655</span></p>
				</div>
				<div class="col-lg-2 col-md-2">
					<p class="network-device">Biller Name<br/><span>Ann N Johnson</span></p>
				</div>
				<div class="col-lg-12 col-md-12 padding0">
					<div class="col-lg-3 col-md-3">
						<label class="form-label">First Name</label>
						<p>Michael</p>
					</div>
					<div class="col-lg-3 col-md-3">
						<label class="form-label">Last Name</label>
						<p>B Smith</p>
					</div>
				</div>
				<div class="col-lg-12 col-md-12 padding0">
					<div class="col-lg-3 col-md-3">
						<label class="form-label">Quantity</label>
						<p>10000</p>
					</div>
					<div class="col-lg-3 col-md-3">
						<label class="form-label">Address</label>
						<p>Los Angeles, USA</p>
					</div>
				</div>
				<div class="col-lg-12 col-md-12">
					<label class="form-label">Comments</label>
					<p>Condition:Refurbished Status: Working</p>
				</div>
				<div class="col-lg-12 col-md-12 text-right">
					<a href="#" class="btn btn-cancel">Cancel</a>
					<a href="track-order.html" class="btn btn-prim">Track Order</a>
				</div>
			</div>
		</section>
 
        </div>  
       
         
);
}


export default withRouter(Landingpage);
