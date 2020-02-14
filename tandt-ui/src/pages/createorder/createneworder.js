import React, {useState, Component }  from "react";
import { withRouter,Link ,Route} from "react-router-dom";
import { Redirect } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "./images/brillio-logo.png";
import usericon from "./images/user-icon.svg";
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import "./dashboard.scss";
import Logout from '../login/Logout';
import $ from "jquery";
var image=localStorage.getItem('profile-picture');
var name=localStorage.getItem('name');

class Landingpage extends React.Component {
	
	constructor(props){
		
	  super(props);
	  this.state = {
		quantity:'',
		details: {},
		loading:false,
		isPlacingOrder: false,
	
	  };
	
	  this._handleSubmit = this._handleSubmit.bind(this);
	  this._handleChangeq = this._handleChangeq.bind(this);
	  this._handleChangea = this._handleChangea.bind(this);
	  this._handleChangep = this._handleChangep.bind(this);
	}

	// Change state of input field so text is updated while typing
	  _handleChangeq(e1) {
		  this.setState({
			quantity: e1.target.value,
		  });
		}
		_handleChangea(e2) {
			this.setState({
			  address: e2.target.value,
			});
		  }
		  _handleChangep(e3) {
			this.setState({
			  pname: e3.target.value,
			});
		  }
		  

	_handleSubmit(e) {
		var router=this.props.location.state;
	  e.preventDefault();
	  this.setState({
		quantity:this.state.quantity,
		address:this.state.address,
		pname:this.state.pname,
		loading:true,
		isPlacingOrder: true,
	
	  });
	  var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"});
	  usaTime = new Date(usaTime);
	  var time=usaTime.toLocaleString()
	var orderid="order_"+Math.random().toString().slice(2,11); 
	const data = { 	
	  "Order ID":orderid,
      "Product":this.state.pname,
	  "Category":"Network",
	  "Quantity": this.state.quantity,
	  "Date":time,
	  "Delivery Address":this.state.address,
	  "Manufacturer": $("#manufacture").val(),
	  'Upgrade device compatiblity to 5G': $("#upgrade").val(),
	  
	};

	  fetch('http://trackandt-Blockcha-10MS595TSQEZ6-1475584145.us-east-1.elb.amazonaws.com/batch', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	  })
	  .then((response) => response.json())
	  .then((data) => {
			
			console.log('Success:', data.transactionId);
		
			var id=data.transactionId;
			var name=localStorage.getItem('name');
			//var day=dateFormat(new Date(), "yyyy-mm-dd");
			var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"});
			usaTime = new Date(usaTime);
			var time=usaTime.toLocaleString()
			const data2={
				
				OrderID:orderid,Product:this.state.pname,Category:"Network",Quantity: this.state.quantity,Upgradeto5G:$("#upgrade").val(),CreatedAt:time,ServiceProvider:name,DeliveryAddress:this.state.address,Manufacturer:$("#manufacture").val(),TransactionID1:id,OrderStatus:"Order Initiated"
								
			  };

			fetch('https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/createorder', {
					method: 'POST',
					headers: {
		 			 'Content-Type': 'application/json',
						},
					body: JSON.stringify(data2),
					})
	 		 .then((response) => response.json())
	 		 .then((data2) => {
			console.log('Success:', data2);
			let details = data2;
			this.props.history.push({pathname:'/orderdetails',state:details})
	 		 })
	 		 .catch((error) => {
			console.error('Error:', error);
	 		 });

	  })
	  .catch((error) => {
		console.error('Error:', error);
	  });

	}
	
	render() { 
		var router=this.props.location.state;
		const { isPlacingOrder } = this.state;
	  return (
		<div class="container-fluid padding0">
        <Logout/>
		  <section class="content">
		
			<h3 class="section-header">Place Order</h3>
			<div class="col-lg-12 col-md-12 place-order">
			<div class="padding-bottom20">
			<div><h2><b>{router}</b></h2><br/></div>
			</div>
			
			<form class="form-horizontal" onSubmit={this._handleSubmit} id="formContact">
			<div class="col-lg-7 col-md-7">
			<div class="form-group col-md-8" >
			<div class="padding-bottom20">
			<label class="form-label"><b>Product Name: </b></label>
				<input type="text" class="form-control" value={this.state.pname} onChange={this._handleChangep} required/>					
			
				<label class="form-label"><b>Manufacturer : </b></label>
				<select class="form-control" id="manufacture">
					<option>Abbott Group Enterprise, Oklahoma, USA</option>
					<option default>Hirthe Group Enterprise, Washington, USA</option>
					<option>Schuster Ltd Enterprise, Alabama, USA</option>
				</select>
			</div>
			
			<div class="form-group col-md-8" >
				<label class="form-label"><b>Product Quantity : </b></label>
				<input type="number"  min="1" max="99999" maxLength="5" class="form-control" value={this.state.quantity} onChange={this._handleChangeq} required/>					
			
            	<label class="form-label"><b>Upgrade device compatiblity to 5G :</b></label>
				<select class="form-control" id="upgrade">
					<option default>Yes</option>
					<option>No</option>
				</select>
				
		
				<label class="form-label"><b>Delivery Address: </b></label>
				<input type="text"  class="form-control" value={this.state.address} onChange={this._handleChangea} required/>	
				</div>
			
			</div>
		
			
		    <div class="col-lg-12 col-md-12 text-right">
				<Link to="/dashboard"><div class="btn btn-cancel">Cancel</div></Link>&nbsp;&nbsp;&nbsp;
				<button class="btn btn-prim" type="Submit" id="btn-submit" disabled={this.state.loading}>{isPlacingOrder ? "Placing Order...": "Submit"}</button> 
			</div>
			</div>
			</form>
		  </div>
		  </section>
		</div>
	  )
	}
  }
  
  export default Landingpage;

  
