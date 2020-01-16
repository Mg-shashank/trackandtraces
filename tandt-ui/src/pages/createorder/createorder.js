import React, {useState, Component }  from "react";
import { withRouter,Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "./images/brillio-logo.png";
import usericon from "./images/user-icon.svg";
import router from "./images/router.png";
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import "./dashboard.scss";
import $ from 'jquery';
var image=localStorage.getItem('profile-picture');
var name=localStorage.getItem('name');
var routers=localStorage.getItem('router');
class Landingpage extends React.Component {
	constructor(props){
	  super(props);
	  this.state = {
		
		address: '',
        manufacture:'',
        address1:'',
        quantity:'',
	  };
  
	  this._handleSubmit = this._handleSubmit.bind(this);
	  this._handleChange = this._handleChange.bind(this);
      this._handleChangeMsg = this._handleChangeMsg.bind(this);
      this._handleChangename = this._handleChangename.bind(this);
      this._handleChangeq = this._handleChangeq.bind(this);
	}
  
	// Change state of input field so text is updated while typing
	_handleChange(e) {
		this.setState({
		  address1: e.target.value,
		});
	  }
	  _handleChangeq(e) {
		  this.setState({
			quantity: e.target.value,
		  });
		}
	  _handleChangename(e) {
		  this.setState({
			manufacture: e.target.value,
		  });
		}
	  _handleChangeMsg(e) {
		this.setState({
		  address: e.target.value,
		  
		
		});
	  }
  
	_handleSubmit(e) {
	  e.preventDefault();
	  this.setState({
	
		address: this.state.address,
		manufacture:this.state.manufacture,
    address1:this.state.address1,
    quantity:this.state.quantity,
	  });
	  
  
	  $.ajax({
		url:"http://trackandt-Blockcha-OKH6MW7VYGQP-166143064.us-east-1.elb.amazonaws.com/batch",
		type: 'POST',
		data: {
			"Product":routers,
			"Category":"Network",
			Quantity: this.state.quantity,
			Manufacturer: this.state.manufacture,
			"Address": this.state.address1,
	 	   'Upgrade device compatiblity to 5G': $("#upgrade").val(),
		   'Delivery Address': this.state.address
		},
		cache: false,
		success: function(data) {

		  // Success..
		  var id=JSON.stringify(data);
		  console.log('success', data);
		  var name=localStorage.getItem('name');
		  console.log(localStorage.getItem('name'));
			//var assign=localStorage.getItem('name');
		  $.ajax({
			url:"https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/createorder",
			type: 'POST',
			mode :'no-cors',
			data: JSON.stringify({
				
				OrderDetails: [JSON.stringify({"Product":routers,"Category":"Network","Manufacturer":this.state.manufacture,"Address": this.state.address1,"Quantity": this.state.quantity,"Upgradeto5G":$("#upgrade").val(),"DeliveryAddress":this.state.address})],ServiceProvider:name,Manufacturer:this.state.manufacture,TransactionID:id
			}),
			cache: false,
			success: function(data) {
			  // Success..
			 
			 
			  console.log('success', data);
			 var o=data;
			
			
				var c=JSON.parse(o.OrderDetails.S);
			// console.log('success', c.Product);
			 
			 localStorage.setItem('orderid',data.OrderID.S);
			 localStorage.setItem('createdat',data.CreatedAt.S);
			 localStorage.setItem('orderstatus',data.OrderStatus.S);
			 localStorage.setItem('transactionid',data.TransactionID.S);
			 localStorage.setItem('manufacturer',data.Manufacturer.S);
			 localStorage.setItem('manuafctureraddress', c.Address);
			 localStorage.setItem('product', c.Product);
			 localStorage.setItem('category', c.Category);
			 localStorage.setItem('quantity', c.Quantity);
			 localStorage.setItem('deliveryaddress', c.DeliveryAddress);
			 localStorage.setItem('upgrade', c.Upgradeto5G);
		      
			 toast.success("Order is placed successfully!");
		
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
                <Link to="/help">Help</Link>&nbsp;<span className="pipe">|</span>&nbsp;<img src={usericon} alt="user" />
	      	<span className="pipe">&nbsp;|&nbsp;</span>
                <span>
                {/*<GoogleLogouts/>*/}
                <GoogleLogout render={renderProps => (
                <Link to="/login"><span className="glyphicon glyphicon-log-out" onClick={renderProps.onClick}> Log Out </span>
                </Link>)}
                />
                </span>
          	</div>               
          </header>
		  <section class="content">
			<h3 class="section-header">Place Order</h3>
			<div class="col-lg-12 col-md-12 place-order">
			<div class="padding-bottom20">
				
				<h2>&nbsp;&nbsp;<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{routers}<br/></p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Network</span></h2>
				</div>
	
			<form class="form-horizontal" onSubmit={this._handleSubmit} id="formContact">
			<div class="col-lg-7 col-md-7">
			
				
				<div class="form-group col-md-6">
					<label class="form-label"><b>Manufacturer: </b></label>
					<input type="text" rows="8" cols="40" value={this.state.manufacture} onChange={this._handleChangename} required/>				
				</div>
               
				<div class="form-group col-md-6">
					<label class="form-label"><b>Address :</b></label>
					<input type="text" rows="8" cols="40" value={this.state.address1} onChange={this._handleChange} required/>					
				</div>
			
                <div class="form-group col-md-6">
					<label class="form-label"><b>Quantity :</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" rows="8" cols="40" value={this.state.quantity} onChange={this._handleChangeq} required/>					
				</div>
				<br/><br/><br/><br/><br/><br/>
			  
				<div class="form-group col-md-6">
            		<label class="form-label"><b>Upgrade device compatiblity to 5G :</b></label>
					<select class="form-control" id="upgrade">
						<option default>Yes</option>
						<option>No</option>
					</select>
				</div>
				<br />
			 
                <div class="form-group col-md-12">
                    <label class="form-label"><b>Delivery Address :</b></label><br/>
                    <textarea id="formMsg" name="formMsg" rows="8" cols="40" value={this.state.address} onChange={this._handleChangeMsg} required></textarea>
                 </div>


			  <div class="col-lg-12 col-md-12 text-right">
				<Link to="/dashboard"><div class="btn btn-cancel">Cancel</div></Link>&nbsp;&nbsp;&nbsp;
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
