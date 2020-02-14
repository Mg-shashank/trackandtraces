import React, { useState, Component } from "react";
import { withRouter, Link, Route } from "react-router-dom";
import { Redirect } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "./images/brillio-logo.png";
import usericon from "./images/user-icon.svg";
import router from "./images/router.png";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import "./dashboard.scss";
import order from "../trackorder/trackorder";
import $ from 'jquery';
import Table from 'react-bootstrap/Table';
var image = localStorage.getItem('profile-picture');
var name = localStorage.getItem('name');
var routers = localStorage.getItem('router');

class LandingPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			    orders: {},
			};
			this.track = this.track.bind(this);
	
	}
track(e){
	let orders= this.props.location.state;
	this.props.history.push({pathname:'/trackorder',state:orders})
}
componentDidMount(){
	 toast.success("Your Order is placed successfully")
}
	render() {
		let Orderid = this.props.location.state.OrderID;
		let OrderStatus = this.props.location.state.OrderStatus;
		let Createdat = this.props.location.state.CreatedAt;
		let TransactionID1 = this.props.location.state.TransactionID1;
		let Manufacturer = this.props.location.state.Manufacturer;
		let Product = this.props.location.state.Product;
		let Category = this.props.location.state.Category;
		let Quantity = this.props.location.state.Quantity;
		let Upgrade = this.props.location.state.Upgradeto5G;

		return (
			<div class="container-fluid padding0">			
			<section class="content">
			<h3 class="section-header">Order Details</h3>
					   

<div class="padding-bottom20">
<Table striped bordered hover>
<tbody>
<tr>
<th><b>Order ID</b></th>
<td>{Orderid}</td>
</tr>
<tr>
<th><b>Order Status</b></th>
<td>{OrderStatus}</td>
</tr>
<tr>
<th><b>Order placed on</b></th>
<td>{Createdat}</td>
</tr>
<tr>
<th><b>Transaction ID</b></th>
<td>{TransactionID1}</td>
</tr>
<tr>
<th><b>Manufacturer</b></th>
<td>{Manufacturer}</td>
</tr>
<tr>
<th><b>Product</b></th>
<td>{Product}</td>
</tr>
<tr>
<th><b>Product Category</b></th>
<td>{Category}</td>
</tr>
<tr>
<th><b>Quantity</b></th>
<td>{Quantity}</td>
</tr>
<tr>
<th><b>Upgrade Product to 5G</b></th>
<td>{Upgrade}</td>
</tr>
</tbody>
</Table>
</div>
				<div class="col-lg-12 col-md-12 text-right"><ToastContainer/>
				<Link to="/dashboard"><div class="btn btn-cancel">Go to Dashboard</div></Link>
				<button class="btn btn-prim" onClick={this.track}>Track Order</button></div>
				</section>
			</div>
		)
	}
}

export default withRouter(LandingPage);
