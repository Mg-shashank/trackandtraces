import React, { useState, Component } from "react";
import { withRouter, Link, Route } from "react-router-dom";
import logo from "./images/brillio-logo.png";
import usericon from "./images/user-icon.svg";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import "./dashboard.scss";
import queryString from 'query-string';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
class Orders extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
            isLoading: true,
		};
	}
	componentDidMount(){
        console.log(this.props.location.search)
        const values = queryString.parse(this.props.location.search)
        console.log(values.ordid)
        var orderid = values.ordid;
        // const {a} = this.props;
        // console.log(a)
        // console.log(" ORDERS PAGE ")
        // console.log(this.props)
        // console.log(this.props.match.params.orderid)
		// console.log(this.props.location.query.orderid)
        // const data1={OrderID:this.props.location.query.orderid}
        //const data1 = {OrderID:this.props.match.query.orderid}
        console.log(orderid)
        const data1 = {OrderID:orderid}
        // const data1="order_118402402"
        console.log(data1)
        console.log(JSON.stringify(data1))
        // fetch('https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/createorder', 
        // fetch('https://ao1463ho2h.execute-api.us-east-1.amazonaws.com/prod/entries1',
        fetch('https://t6kpja3x80.execute-api.us-east-1.amazonaws.com/prod/singleorderdetails',
        {
            method: 'POST',
            mode: 'no-cors',
			headers: {
			  'Content-Type': 'application/json',
				},
                  body: JSON.stringify(data1)
                // body:data1
			})
	  .then((response) => response.json())
	 		 .then((data) => {
				console.log(data);
				this.setState({
				  posts: data,
				  isLoading: false,
				});
	 		 })
	  .catch((error) => {
	console.error('Error:', error);
	  });
	}
	render() {
		const { isLoading, posts } = this.state;
		return (
			<div class="container-fluid padding0">
				<header>
      		<span className="logo"><img className="logoImage" src={logo} alt="Brillio logo" width="125px"/>
      		</span>				
      		<div className="userBlock collapse navbar-collapse">	
	  		<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
      		<DropdownToggle caret>
				<span>
				Welcome &nbsp;
				<img src={localStorage.getItem('profile-picture')} className ="img-circle" alt={usericon} width="40" height="40"/>		
				</span>
      		</DropdownToggle>
      			<DropdownMenu>
        		<DropdownItem header>Options</DropdownItem>
        		<DropdownItem><Link to="/help">
				<button type="style" className="btn btn-block btn-primary">Help</button></Link></DropdownItem>
        		<DropdownItem><GoogleLogout render={renderProps => (
			<Link to="/login">
			<button type="style"
			className="btn btn-block btn-primary"
			onClick={()=>{renderProps.onClick(); localStorage.removeItem('role')}}>Logout</button></Link>)}/>
			</DropdownItem>
       		</DropdownMenu>
       		</Dropdown>
			</div>				
        	</header>
				<section class="content">
					<h3 class="section-header">Place Order</h3>
					<div class="col-lg-12 col-md-12 place-order">
						<div class="padding-bottom20">
						</div>
								<div class="form-group col-md-6">
									{!isLoading ? (
									<ul>
									<ul>
									{Object.entries(posts).map(([key, value])=>{
									return <li key={key}>{key}: {value}</li>
									})}
								</ul> 
								</ul> 
									) : (
										<p>Loading...</p>
									)}
								</div></div></section></div>
								)}}
export default withRouter(Orders);