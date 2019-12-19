import React, {} from "react";
import { withRouter,Link } from "react-router-dom";
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
                <Link to="/help">Help</Link>&nbsp;<span className="pipe">|</span>&nbsp;<img src={usericon} alt="user" />
          		</div>  
             
          </header>
      <section class="content">
			<h3 class="section-header">Place Order</h3>
			<div class="col-lg-12 col-md-12 place-order">
				<div class="padding-bottom20">
					<img src={router} alt="device" class="rect" width="100" height="100"/>
				<h2>	<p class="network-device">Asus ROG Rapture GT-AC5300<br/><span>network</span></p></h2>
				</div>
				<div class="col-lg-7 col-md-7">
					<form class="form-horizontal">
						<legend>Company Details</legend>
						<div class="form-group col-md-6">
							<label class="form-label">Vendor Name</label>
							<select class="form-control">
							<option>Abbott Group Enterprise</option>
									<option default>Hirthe Group Enterprise</option>
									<option>Schuster Ltd Enterprise</option>
									</select>
							
						</div>
						<div class="form-group col-md-6">
							<label class="form-label">Quantity</label>
							<select class="form-control">
								<option default>10000</option>
								<option>20000</option>
								<option>30000</option>
								<option>40000</option>
							</select>
						</div>
						<div class="form-group col-md-12">
							<label class="form-label">Delivery Address</label>
							<textarea class="form-control"></textarea>
						</div>
	                                       <div class="form-group col-md-12">
							<label class="form-label">Upgrade device compatible to 5G</label>
							<textarea class="form-control">Yes</textarea>
						</div>
					</form>
				</div>
				<div class="col-lg-12 col-md-12 text-right">
				<Link to="/dashboard"><div class="btn btn-cancel">Cancel</div></Link>
				
					<Link to="/orderdetails"><div class="btn btn-prim">Place Order</div></Link>
				</div>
			</div>
		</section>
        </div>  
       
         
);
}


export default withRouter(Landingpage);
