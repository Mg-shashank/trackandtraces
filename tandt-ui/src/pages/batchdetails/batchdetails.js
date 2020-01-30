import React, { useState, Component } from "react";
import { withRouter, Link, Route } from "react-router-dom";
import { Redirect } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "./images/brillio-logo.png";
import usericon from "./images/user-icon.svg";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import "./dashboard.scss";
import Table from 'react-bootstrap/Table';
import $ from 'jquery';
import { Update } from "@material-ui/icons";
var image = localStorage.getItem('profile-picture');
var name = localStorage.getItem('name');
var routers = localStorage.getItem('router');
class Landingpage extends React.Component {
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
	
	toast.success("Batch is created successfully!");
}
	render() {

		// let { details } = this.props;
		console.log('=-=-=-=-', this.props.location.state);
		// let Orders= this.props.location.state;
        let Orderid = this.props.location.state.OrderID;
        let Product = this.props.location.state.Product;
        let OrderStatus = this.props.location.state.OrderStatus;
        let BatchId = this.props.location.state.BatchId;
		let Updatedon = this.props.location.state.Updatedon;
		let Transactionid = this.props.location.state.TransactionID;
		let Distributor = this.props.location.state.Distributor;				
		let BatchQuantity = this.props.location.state.BatchQuantity;
		

		return (
			<div class="container-fluid padding0">
				<header>
					<span className="logo"><img className="logoImage" src={logo} alt="Brillio logo" width="125px" /></span>

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

					<h3 class="section-header">Batch Details</h3>
					<div class="col-lg-12 col-md-12 place-order">
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
							<th><b>BatchId</b></th>
							<td>{BatchId}</td>
							</tr>
							<tr>
							<th><b>Batch Created on</b></th>
							<td>{Updatedon}</td>
							</tr>
							<tr>
							<th><b>Transaction ID</b></th>
							<td>{Transactionid}</td>
							</tr>
							<tr>
							<th><b>Distributor</b></th>
							<td>{Distributor}</td>
							</tr>
							<tr>
							<th><b>Product</b></th>
							<td>{Product}</td>
							</tr>							
							<tr>
							<th><b> Batch Quantity</b></th>
							<td>{BatchQuantity}</td>
							</tr>
							
						</tbody>
						</Table>
						</div>
                    </div>

						<div class="col-lg-12 col-md-12 text-right"><ToastContainer/>
				<Link to="/dashboard"><div class="btn btn-cancel">Go to Dashboard</div></Link>
				<button class="btn btn-prim" onClick={this.track}>Track Order</button></div>
					</section>
			</div>
		)
	}
}

export default withRouter(Landingpage);