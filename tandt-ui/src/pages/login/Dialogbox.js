import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import {Button, MenuItem, Menu} from "@material-ui/core";
import ReactModal from 'react-modal';
import pm from './pm.png';
import tt from './tt.png';
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Logout from '../login/Logout';
import logo from "./images/brillio-logo.png";
import usericon from "./images/user-icon.svg";
import LandingPage from '../dashboard/dashboard'
var image = localStorage.getItem('profile-picture');
var role = localStorage.getItem('role')
var display;
export default class Options extends Component {
    constructor(props){
		super(props);
		this.toggle= this.toggle.bind(this);
		this.state = {
			dropdownOpen:false,
		}; 
	}
    toggle=()=>{
		this.setState((prevState)=>{
			return{dropdownOpen:!prevState.dropdownOpen};
		});
	}
    render () {
		if(role === "serviceprovider" ) 
		{  display = "/dashboard" } 
		else if(role === "distributor"||role === "manufacturer")
		{  display = "/orderdetails" }
      return (
      <React.Fragment>
      <div className="container-fluid padding0">
	  <div>
      <Logout/>
			<div className="card">
			   <div className="img-container p-4">
				<h2 className="text-center">Select Your Tool</h2>
                <p className="text-center" style={{fontSize:'20px'}}>
				Select the tool that you want to proceed with</p>
				<br/>
				<div className="row text-center"> 	
					<div className="col-md-6">
					<Link to="">
					<img src={pm} width="300" height="350" alt="predictive maintenence" />
                    </Link>
					<p style={{fontSize:'25px'}} className="text-center">Predictive Maintenence</p>						
					</div>
					<div class="col-md-6">
                    <Link to={display}>
					<img src={tt} width="300" height="350" alt="track and trace"/>
                    </Link>
					<p style={{fontSize:'25px'}} className="text-center">Track and Trace</p>						
				 </div>
				</div>
			 </div>
			</div>
		</div>
	</div>
   </React.Fragment>
    );
  }
}
  
 