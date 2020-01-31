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
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Logout from '../login/Logout';
var image = localStorage.getItem('profile-picture');
var name = localStorage.getItem('name');
var routers = localStorage.getItem('router');
class BatchDetails extends React.Component {
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
        console.log('=-=-=-=-', this.props.location.state.Distributor.S);
        console.log('=-=-=-=-', this.props.location.state);
		let OrderStatus = this.props.location.state.OrderStatus.S;
        let BatchId = this.props.location.state.BatchID.S;
		let Updatedon = this.props.location.state.BatchCreatedOn.S;
		let Transactionid = this.props.location.state.TransactionId.S;
		let Distributor = this.props.location.state.Distributor.S;				
        let BatchQuantity = this.props.location.state.BatchQuantity.S;
        let OrderID = this.props.location.state.OrderID.S;
		

		return (
			<div class="container-fluid padding0">
			<Logout/>
				<section class="content">

					<h3 class="section-header">Batch Details</h3>
					<div class="col-lg-12 col-md-12 place-order">
						<div class="padding-bottom20">
						<Table striped bordered hover>
						<tbody>
							{/* <tr>
							<td><b>Order ID</b></td>
							<td>{OrderID}</td>
							</tr> */}
							<tr>
							<td><b>Order Status</b></td>
							<td>{OrderStatus}</td>
							</tr>
                            <tr>
							<td><b>BatchId</b></td>
							<td>{BatchId}</td>
							</tr>
							<tr>
							<td><b>Batch Created on</b></td>
							<td>{Updatedon}</td>
							</tr>
							<tr>
							<td><b>Transaction ID</b></td>
							<td>{Transactionid}</td>
							</tr>
							<tr>
							<td><b>Distributor</b></td>
							<td>{Distributor}</td>
							</tr>
							{/* <tr>
							<td><b>Product</b></td>
							<td>{Product}</td>
							</tr>							 */}
							<tr>
							<td><b> Batch Quantity</b></td>
							<td>{BatchQuantity}</td>
							</tr>					
						</tbody>
						</Table>
						</div>
                    </div>
					<div class="col-lg-12 col-md-12 text-right"><ToastContainer/>
				<Link to="/orderdetails"><div class="btn btn-prim">OrderDetails</div></Link>
				</div>
			</section>
		</div>
		)
	}
}

export default withRouter(BatchDetails);
