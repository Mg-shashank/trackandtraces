import React, {useState, Component }  from "react";
import { withRouter,Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import logo from "./images/brillio-logo.png";
import usericon from "./images/user-icon.svg";
import router from "./images/router.png";
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import "./dashboard.scss";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import $ from 'jquery';
var image=localStorage.getItem('profile-picture');
var name=localStorage.getItem('name');
class Landingpage extends React.Component {
	constructor(props){
	  super(props);
		this.toggle= this.toggle.bind(this);
	  this.state = {		
		addresss: '',
		  dropdownOpen:false
	  };
  
	  this._handleSubmit = this._handleSubmit.bind(this);
	  this._handleChange = this._handleChange.bind(this);
	  this._handleChangeMsg = this._handleChangeMsg.bind(this);
	}
  
	// Change state of input field so text is updated while typing
	toggle=()=>{
		this.setState((prevState)=>{
			return{dropdownOpen:!prevState.dropdownOpen};
		});
	}
	_handleChange(e) {
	  this.setState({
		contactEmail: e.target.value,
	  });
	}
	// Change state of input field so text is updated while typing
	_handleChangeMsg(e) {
	  this.setState({
		addresss: e.target.value
	  });
	}
  
	_handleSubmit(e) {
	  e.preventDefault();
	  this.setState({
	
		addresss: ''
	  });
  
	  $.ajax({
		url:"http://trackandt-Blockcha-OKH6MW7VYGQP-166143064.us-east-1.elb.amazonaws.com/batch",
		type: 'POST',
		data: {
			Quantity: $("#quantity").val(),
			Distributor: $("#distributor").val(),
	 	   'Upgrade device compatiblity to 5G': $("#upgrade").val(),
		   'Delivery Address': this.state.addresss
		},
		cache: false,
		success: function(data) {

		  // Success..
		  var id=JSON.stringify(data);
		  console.log('success', data);

		  $.ajax({
			url:"https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/createorder",
			type: 'POST',
			mode :'no-cors',
			data: JSON.stringify({
				
				orderDetails: [JSON.stringify({"Product":"name","Category":"","Distributor": $("#distributor").val(),"Quantity :": $("#quantity").val(),"Upgrade to 5G":$("#upgrade").val(),"Delivery Address":this.state.address})],serviceProvider:"b",Distributor: $("#distributor").val(),transactionID:id
			}),
			cache: false,
			success: function(data) {
			  // Success..
			 
			  toast.success("Order is placed successfully!");
			  console.log('success', data);
		
			}.bind(this),
			// Fail..
			error: function(xhr, status, err,data) {
			  console.log(xhr, status);
			  console.log(err);
			  console.log(data);
			  this.setState({
			
				address: '<h1>Order could not be placed</h1><p>Try again later</p>'
			  });
			  console.log(this.state.address+ 'fail');
			}.bind(this)
		  });

		  window.location="/#/orderdetails";
		  toast.success("Order is placed successfully!");
		  window.alert("Order is placed successfully!");
		}.bind(this),
		// Fail..
		error: function(xhr, status, err) {
		  console.log(xhr, status);
		  console.log(err);
		  this.setState({
		
			addresss: '<h1>Order could not be placed</h1><p>Try again later</p>'
		  });
		  console.log(this.state.addresss + 'fail');
		}.bind(this)
	  });
	}
  
	render() {
	  return (
		<div class="container-fluid padding0">
<header>
              <span className="logo"><img className="logoImage" src={logo} alt="Brillio logo" width="125px"/></span>
            
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
			<h3 class="section-header">Place Order</h3>
			<div class="col-lg-12 col-md-12 place-order">
				<div class="padding-bottom20">
					<img src={router} alt="device" class="rect" width="100" height="100"/>
				<h2>	<p class="network-device">Asus ROG Rapture GT-AC5300<br/><span>network</span></p></h2>
				</div>
	
			<form class="form-horizontal" onSubmit={this._handleSubmit} id="formContact">
			<div class="col-lg-7 col-md-7">
			<legend>Company Details</legend>
				
				<div class="form-group col-md-6">
					<label class="form-label">Vendor Name</label>
					<select class="form-control" id="distributor">
					<option>Abbott Group Enterprise</option>
							<option default>Hirthe Group Enterprise</option>
							<option>Schuster Ltd Enterprise</option>
							</select>
					
				</div>
				<div class="form-group col-md-6">
					<label class="form-label">Quantity</label>
					<select class="form-control"  id="quantity">
						<option default>1000</option>
						<option>2000</option>
						<option>3000</option>
						<option>4000</option>
					</select>
				</div>
				<br />
			  
				<div class="form-group col-md-6">
					<label class="form-label">Upgrade device compatiblity to 5G :</label>
					<select class="form-control" id="upgrade">
						<option default>Yes</option>
						<option>No</option>
					</select>
				</div>
				<br />
			 
						<div class="form-group col-md-12">
							<label class="form-label">Delivery Address :</label><br/>
							<textarea id="formMsg" name="formMsg" rows="8" cols="40" value={this.state.addresss} onChange={this._handleChangeMsg} required></textarea>
						</div>


			  <div class="col-lg-12 col-md-12 text-right">
				<Link to="/dashboard"><div class="btn btn-cancel">Cancel</div></Link>
				<input type="submit" value="Submit" className="btn btn-cancel" id="btn-submit" />
				<ToastContainer />
				</div></div>
			</form>
		  </div></section>
		</div>
	  )
	}
  }
  
  export default Landingpage;
