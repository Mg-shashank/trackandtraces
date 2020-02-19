import React, { useState, Component } from "react";
import { withRouter, Link, Route } from "react-router-dom";
import logo from "./images/brillio-logo.png";
import usericon from "./images/user-icon.svg";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import "./dashboard.scss";
import queryString from 'query-string';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Table from 'react-bootstrap/Table';
import LoadingOverlay from 'react-loading-overlay';
import Logout from '../login/Logout';
const request = require('request');
var https = require("https");
var orderid;
var quantity;
// var active=true;
var role = localStorage.getItem('role')
class Orders extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive:true,
			posts: {},
            isLoading: true,
			orderdetails:[],
			Orderid:{},
			Quantity:{}
		};
	}
	componentDidMount(){
		console.log('debug search value',this.props.location.search.split('=')[1])
		orderid = this.props.location.search.split('=')[1];   	
			
        fetch('https://t6kpja3x80.execute-api.us-east-1.amazonaws.com/prod/singleorderdetails',{
            method:'POST',
            body: JSON.stringify({OrderID:orderid, Quantity:quantity }),
            headers:{
                'Content-Type': 'application/json'
            }
            }).then((response)=>{
                return response.json();
            }).then((jsonRes)=>{
                this.setState({
                    isLoading: false,
                    posts: {...jsonRes}
				})
				document.getElementsByClassName('_loading_overlay_wrapper--active')[0].style.display = 'none';
            }).catch((error)=>{
                console.log('order error',error);
            })    
		}
		
		componentWillUnmount(){
			if (this.timerHandle) {
			  clearTimeout(this.timerHandle);
			  this.timerHandle = 0;
			}
		  }

		gotoCreateBatch=()=>{
			var data2= this.state.posts;	
		 this.props.history.push({pathname:'/createbatch', state:data2})
			//console.log(this.state.posts.OrderID)
			//var oid=this.
		}

	render() {
		
		var button1,button2;
		if(role==="manufacturer"){
			 var status=JSON.stringify(this.state.posts.OrderStatus)
		//	console.log(JSON.stringify(this.state.posts.OrderStatus))
			console.log(status)
			if(status==="\"Order Rejected by Manufacturer\""){
			}
			if(status==="\"Order Initiated\""){

				button1=<button className="btn btn-primary" align="left" onClick={this.gotoCreateBatch}>Accept Order and Create Batch</button>
				}
				if(status==="\"Order Accepted by Manufacturer\""){

					button1=<button className="btn btn-primary" align="left" onClick={this.gotoCreateBatch}>Create Batch</button>
					}
		}
		else if(role==="distributor"){
			button2=<h6></h6>
		}
		const { isLoading, posts } = this.state;
	 
        return (
			<div class="container-fluid padding0">
			<Logout/>			
				<section class="content">
					<h3 class="section-header">Product Details</h3>					
					<div class="col-lg-12 col-md-12 place-order">
					
			<LoadingOverlay
				active={true}
				spinner
				text='Loading the content...' 
				styles={{
					spinner: (base) => ({
					  ...base,
					  width: '50px',
					  '& svg circle': {
						stroke: 'rgba(255, 0, 0, 0.5)'
					  }
					})
				  }}
				>				
				<p>Loading...</p>
	 		</LoadingOverlay>		

		{/* <div>
        <BallBeat
          color={'#000000'}
          loading={this.state.loading}
        />
      	</div> */}
			 	
						<div class="padding-bottom20">
						<Table striped bordered hover>
						<tbody>
						<tr>
						<th><b>Order ID</b></th>
						<td>{posts.OrderID}</td>
						</tr>
						<tr>
						<th><b>Order Status</b></th>
						<td>{posts.OrderStatus}</td>
						</tr>
						<tr>
						<th><b>Order placed on</b></th>
						<td>{posts.CreatedAt}</td>
						</tr>
						<tr>
						<th><b>Transaction ID</b></th>
						<td>{posts.TransactionID1}</td>
						</tr>
						<tr>
						<th><b>Service Provider</b></th>
						<td>{posts.ServiceProvider}</td>
						</tr>
						<tr>
						<th><b>Product</b></th>
						<td>{posts.Product}</td>
						</tr>
						<tr>
						<th><b>Product Category</b></th>
						<td>{posts.Category}</td>
						</tr>
						<tr>
						<th><b>Quantity</b></th>
						<td>{posts.Quantity}</td>
						</tr>
						<tr>
						<th><b>Upgrade Product to 5G</b></th>
						<td>{posts.Upgradeto5G}</td>
						</tr>
						</tbody>
						</Table>
						</div>
						<div class="form-group col-md-20">
							{!isLoading ? (
						    <div style={{float: "right"}}>  
							{button1}    {button2}
							< Link to="/orderdetails">
														
								<button  className="btn btn-primary"> Go Back to Orders List</button>
								{/* <div style="display:flex; justify-content:flex-end; width:100%; padding:0;">Go Back to Orders List</div> */}
						</Link>                        
                             </div> 
                             ) : (
							<p>Loading...</p>
							)}
							</div>
																			
							</div>							
							</section>													
							</div>
					)}
		}
export default withRouter(Orders);
