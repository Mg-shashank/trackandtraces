import React, { useState, Component } from "react";
import { withRouter, Link, Route } from "react-router-dom";
import logo from "./images/brillio-logo.png";
import usericon from "./images/user-icon.svg";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import "./dashboard.scss";
import queryString from 'query-string';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Table from 'react-bootstrap/Table';
import Logout from '../login/Logout';
const request = require('request');
var https = require("https");
var orderid;
var quantity;
var role = localStorage.getItem('role')
class Orders extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
            }).catch((error)=>{
                console.log('order error',error);
            })    
		}

		gotoCreateBatch=()=>{
			var data2= this.state.posts;	
			this.props.history.push({pathname:'/createbatch', state:data2})
			console.log(this.state.posts)

		}

	render() {
		var button1,button2;
		if(role==="manufacturer"){
			button1=<button className="btn btn-primary" align="left" onClick={this.gotoCreateBatch}>Create Batch</button>
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
						    <div >   									
							    {/* {Object.entries(posts).map(([key, value])=>{
						          return <SingleOrders key={key} value={value}/>
                                })} */}
                                {/* {Object.entries(posts).map(([key, value])=>{
						            return <p style={{backgroundColor: 'white',fontWeight:'bold'}}> {key}  : {value}</p>
                                })}   */}
							{/* <Link to="/createbatch"> */}
								{/* <button className="btn btn-primary" onClick={this.gotoCreateBatch}>Create Batch</button> */}
							{/* </Link>	 */}
							{button1}    {button2}
							  
							< Link to="/orderdetails">
								
							
								<button align="right" float="right"  className="btn btn-primary"> Go Back to Orders List</button>
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

