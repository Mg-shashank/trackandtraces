import React, {} from "react";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
// import { Menu, Dropdown, Icon } from 'antd';
import logo from "./images/brillio-logo.png";
import usericon from "./images/user-icon.svg";
import rect from "./images/rect.svg"
import router from "./images/router.jpg"
import "./dashboard.scss";
// import { ReceiptTwoTone } from "@material-ui/icons";

// import { useUserDispatch, loginUser } from "../../context/UserContext";

    function Landingpage(props) {    
      return( 
        <div class="container-fluid padding0">
        <header>
              <span className="logo"><img className="logoImage" src={logo} alt="Brillio logo" width="125px"/></span>
            
              <div className="userBlock collapse navbar-collapse">
			  <Link to="/help">Help</Link>&nbsp;<span className="pipe">|</span>&nbsp;<a href="#"> <img src={usericon} alt="user" /></a>
          		</div>  
             
          </header>
		  <section class="content">
			<h3 class="section-header">Order Details</h3>
			<h6><div class="col-lg-12 col-md-12 place-order">
				<div class="col-lg-3 col-md-3">
					<img src={router} alt="device" class="rect" width="100" height="100"/>
					<p class="network-device">Asus ROG Rapture GT-AC5300<br/><span>network</span></p>
				</div>
				<div class="col-lg-2 col-md-2">
					<p class="network-device">Item Quantity<br/><span>10000</span></p>
				</div>
				<div class="col-lg-2 col-md-2">
					<p class="network-device">Billing Id<br/><span>813725866655</span></p>
				</div>
				<div class="col-lg-2 col-md-2">
					<p class="network-device">Biller Name<br/><span>Michael B Smith</span></p>
				</div>
				<div class="col-lg-12 col-md-12 padding0">
					<div class="col-lg-3 col-md-3">
						<label class="form-label">Vendor Name</label>
						<p>Abbott Group Enterprise</p>
					</div>
				
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
					<label class="form-label">Addition Requests</label>
					<p>Condition:Refurbished Status: Working</p>
                    <p>Upgrade device compatible to 5G.</p>
				</div>
				
				<div class="col-lg-12 col-md-12 text-right">
				<Link to="/createorder"><div class="btn btn-cancel">Cancel</div></Link>
					<Link to="/trackorder"><div class="btn btn-prim">Track Order</div></Link>

			
					
				</div>
			</div></h6>
		</section>
 
        </div>  
       
         
);
}


export default withRouter(Landingpage);
