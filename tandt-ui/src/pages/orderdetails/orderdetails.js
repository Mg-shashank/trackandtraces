import React, {} from "react";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
// import { Menu, Dropdown, Icon } from 'antd';
import logo from "./images/brillio-logo.png";
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import usericon from "./images/user-icon.svg";
import rect from "./images/rect.svg"
import router from "./images/router.png"
import "./dashboard.scss";
// import { ReceiptTwoTone } from "@material-ui/icons";
// import { useUserDispatch, loginUser } from "../../context/UserContext";

    import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
var image=localStorage.getItem('profile-picture');
var name=localStorage.getItem('name');
//console.log(image);
    class Landingpage extends React.Component {
			constructor(props){
				super(props);
				this.toggle= this.toggle.bind(this);
				this.state = {
					dropdownOpen:false
				}; 
			}
			
			toggle=()=>{
				this.setState((prevState)=>{
					return{dropdownOpen:!prevState.dropdownOpen};
				});
			}
			render(){
      return(
        <div class="container-fluid padding0">
        <header>
          <span className="logo"><img className="logoImage" src={logo} alt="Brillio logo" width="125px"/>
          </span>
          <div className="userBlock collapse navbar-collapse">
			 <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
      <DropdownToggle caret>
			<span>
		Welcome &nbsp;
			<img src={image} className ="img-circle" alt={usericon} width="40" height="40"/>		
			</span>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Options</DropdownItem>
        <DropdownItem><Link to="/help"><button type="style" className="btn btn-block btn-primary">Help</button></Link></DropdownItem>
        {/*<DropdownItem divider />*/}
        <DropdownItem><GoogleLogout render={renderProps => (
				<Link to="/login"><button type="style" className="btn btn-block btn-primary" onClick={renderProps.onClick}>Logout</button></Link>)}
        /></DropdownItem>
        </DropdownMenu>
    </Dropdown>
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
        <div>
        <div class="col-sm-12 text-right">
          <button class="btn btn-danger">Reject Order</button>&nbsp;&nbsp;
    		  <button class="btn btn-primary">Accept Order</button>
        </div>
				<div class="col-md-4 text-left">
				  <Link to="/createorder"><button class="btn btn-small btn-cancel">Cancel</button></Link>&nbsp;&nbsp;
					<Link to="/trackorder"><button class="btn btn-primary">Track Order</button></Link>
				</div>
        </div>
      </div>
    </h6>
		</section>
  </div>
  );}
}
export default withRouter(Landingpage);
