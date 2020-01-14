import React, {} from "react";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import logo from "./images/brillio-logo.png";
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import usericon from "./images/user-icon.svg";
import rect from "./images/rect.svg"
import router from "./images/router.png"
import "./dashboard.scss";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import orderdetails from "./orderdetails";
import Landingpage from "../orderdetails/orderdetails";
import SimpleTable from './SimpleTable'
//import DataTable, { createTheme } from 'react-data-table-component';
import CenteredTabs from './Tabs/CenteredTabs'
//import DataTable, { createTheme } from 'react-data-table-component';
//import {DataTable} from 'primereact/datatable';
var orderid=[];
var image=localStorage.getItem('profile-picture');
var celldata=localStorage.getItem('completerecord')
var name=localStorage.getItem('name');
var o1 = localStorage.getItem('idss')
var roles = localStorage.getItem('role')
const request = require('request');
var https = require("https");
class OrderID extends React.Component{  
	constructor(props){
		super(props);
		this.toggle= this.toggle.bind(this);
		this.state = {
			dropdownOpen:false,
			disabled : false,
			orderdetailsdata: {orderid:'123',orderstatus:'accepted'},
			orderData:[],
			jsorderid:[],
			orderstatus:[],
			jsorderstatus:[]
			}; 
	}
	componentDidMount(){
		var request = https.get("https://82aru5m82k.execute-api.us-east-1.amazonaws.com/prod/entries1",
			(response)=>{
			if (response.statusCode !== 200)
			{
				console.log("Error while getting the data");
			} 			
			response.on('data',(data)=> {	
				var jsonData = JSON.parse(data);					
				var datas = jsonData.data.Items;		
				console.log('first data res',datas)
				const optimizedData = datas.map(data=>({orderid: data.OrderID.S,orderstatus: data.OrderStatus.S}));
				//distributor:data.Distributor.S,createdat:data.CreatedAt.S,orderdetails:data.OrderDetails.S}));
				console.log('optiminzed data',optimizedData);
				this.setState({orderData: optimizedData})
				console.log(this.state.orderData)
			});
		});	
	}
	

	toggle=()=>{
		this.setState((prevState)=>{
			return{dropdownOpen:!prevState.dropdownOpen};
		});
	}
	handleClick = (event) => {
		if (this.state.disabled) {
				return;
		}
		this.setState({disabled: true});
}		 
    render(){
			var display1, display2;
			if(roles=="serviceprovider"){
				display1=<Landingpage/>
			}
			else if(roles=="distributor" || roles=="manufacturer")
			{
			 display1=<SimpleTable rows={this.state.orderData}/>
		   display1=<CenteredTabs rows={this.state.orderData}/>
			}
			return(			
			<React.Fragment>	
			<div className="container-fluid padding0">		
      <header>
      <span className="logo"><img className="logoImage" src={logo} alt="Brillio logo" width="125px"/>
      </span>				
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
        <DropdownItem><GoogleLogout render={renderProps => (
				<Link to="/login">
				<button type="style"
				 className="btn btn-block btn-primary"
			   onClick={renderProps.onClick}>Logout</button></Link>)}/>
				</DropdownItem>
        </DropdownMenu>
    	</Dropdown>
			  </div>				
        </header>				
				<section class="content">
			{/* <CenteredTabs rows={this.state.orderData}/> */}
			{/* 
			<div class="col-lg-3 col-md-3" id="images">
			<img src={router} alt="device" class="rect" width="100" height="100"/>
			</div>
			 */}
				{display1}					
				</section>			
				<br/>
				</div>		
				</React.Fragment>		
			)
    }
} 

export default OrderID;
