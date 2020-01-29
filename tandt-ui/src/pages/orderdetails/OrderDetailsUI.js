import React, {} from "react";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import logo from "./images/brillio-logo.png";
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
import NewTable from './NewTable'
//import DataTable, { createTheme } from 'react-data-table-component';
import CenteredTabs from './Tabs/CenteredTabs'
import trackorder from "../trackorder/trackorder";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
//import DataTable, { createTheme } from 'react-data-table-component';
//import {DataTable} from 'primereact/datatable';
var orderid=[];
var orderDetails;
var datas=[];
var image=localStorage.getItem('profile-picture');
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
			//orderdetailsdata: {orderid:'123',orderstatus:'accepted'},
			orderData:[],
			jsorderid:[],
			orderstatus:[],
			jsorderstatus:[],
			orderDatas:[],
			orderDatass:[],
			orderDatasss:[],
			orderDatassss:[],
			disAcc:[]
			}; 
	}
	componentDidMount(){
		// TO GET COMPLETE DATA
		var request = https.get("https://82aru5m82k.execute-api.us-east-1.amazonaws.com/prod/entries1",
			(response)=>{
			if (response.statusCode !== 200)
			{
				// console.log("Error while getting the data");
			} 			
			response.on('data',(data)=> {	
				var jsonData = JSON.parse(data);					
				var datas = jsonData.data.Items;		
				// console.log('first data res',datas)
				const optimizedData = datas.map(data=>({orderid: data.OrderID.S,orderstatus: data.OrderStatus.S}));
				//distributor:data.Distributor.S,createdat:data.CreatedAt.S,orderdetails:data.OrderDetails.S}));
				// console.log('optiminzed data',optimizedData);
				this.setState({orderData: optimizedData})
				// console.log(this.state.orderData)
			});
		});	

		//TO GET ORDER-INITIATED DATA
		var request = https.get("https://9fsnk4xvv6.execute-api.us-east-1.amazonaws.com/prod/fetchinit",
			(response)=>{
			if (response.statusCode !== 200)
			{
				// console.log("Error while getting the data");
			} 			
			response.on('data',(data)=> {	
				 var jsonData = JSON.parse(data);					
				 var datas = jsonData.Items;		
				//  console.log('second data res',datas)
				 const optimizedData = datas.map(data=>({orderid: data.OrderID.S,orderstatus: data.OrderStatus.S}));
				//distributor:data.Distributor.S,createdat:data.CreatedAt.S,orderdetails:data.OrderDetails.S}));
				// console.log('optiminzed data',optimizedData);
				this.setState({orderDatas: optimizedData})
				// console.log(this.state.orderDatas)
				var d=localStorage.setItem('initiated',JSON.stringify(this.state.orderDatas))
			});
		});

		// TO GET ORDER-ACCEPTED DATA
		var request = https.get("https://c6ppd96od0.execute-api.us-east-1.amazonaws.com/prod/orderstatus",
			(response) => {
			if (response.statusCode !== 200)
			{
				// console.log("Error while getting the data");
			} 			
			response.on('data',(data)=> {	
				 var jsonData = JSON.parse(data);					
				 var datas = jsonData.Items;		
				//  console.log('third data res',datas)
				 const optimizedData = datas.map(data=>({orderid: data.OrderID.S,orderstatus: data.OrderStatus.S}));
				// distributor:data.Distributor.S,createdat:data.CreatedAt.S,orderdetails:data.OrderDetails.S,
				// transactionid:data.TransactionID.S}));
				// console.log('optiminzed data',optimizedData);
				this.setState({orderDatass: optimizedData})
				// console.log(this.state.orderDatass)
			});
		});

		// TO GET ORDER_REJECTED DATA
		var request = https.get("https://5c8cb0fop0.execute-api.us-east-1.amazonaws.com/prod/entries1",
			(response)=>{
			if (response.statusCode !== 200)
			{
				// console.log("Error while getting the data");
			} 			
			response.on('data',(data)=> {	
				var jsonData = JSON.parse(data);					
				var datas = jsonData.Items;		
				// console.log('third data res',datas)
				const optimizedData = datas.map(data=>({orderid: data.OrderID.S,orderstatus: data.OrderStatus.S}));
				// console.log('optiminzed data',optimizedData);
				this.setState({orderDatasss: optimizedData})
				// console.log(this.state.orderDatasss)
			});
		});

		// TO GET ORDER ACCEPTED BY Distributor
		var request = https.get("https://l9v9o8wok5.execute-api.us-east-1.amazonaws.com/prod1/acceptedbydist",                
        (response) => {
            if(response.statusCode !==200)
            {
                // console.log("Error while getting the data");
            }
        response.on('data',(data) => {
          //  console.log(data)
            var jsonData = JSON.parse(data);
            var datas = jsonData.Items;
            // console.log('fourth data res', datas)
			const optimizedData = datas.map(data =>({orderid:data.OrderID.S,orderstatus:data.OrderStatus.S}));
            // console.log('optimized data', optimizedData);
            this.setState({disAcc: optimizedData})
            // console.log(this.state.disAcc)
          });
	  });
	  
	//   var request = https.get("https://njm54jxya2.execute-api.us-east-1.amazonaws.com/prod/entries?OrderID=order_181320665",
	// 		(response)=>{
	// 		if (response.statusCode !== 200)
	// 		{
	// 			console.log("Error while getting the data");
	// 		} 			
	// 		response.on('data',(data)=> {	
	// 			var jsonData = JSON.parse(data);	
	// 			console.log(jsonData)				
	// 			// var datas = jsonData.data.Items;		
	// 			// console.log('fifth data res',datas)
	// 			// const optimizedData = datas.map(data=>({orderid: data.OrderID.S,orderstatus: data.OrderStatus.S}));
	// 			// //distributor:data.Distributor.S,createdat:data.CreatedAt.S,orderdetails:data.OrderDetails.S}));
	// 			// console.log('optiminzed data',optimizedData);
	// 			// this.setState({orderData: optimizedData})
	// 			// console.log(this.state.orderData)
	// 		});
	// 	});	

	toast.success("Order is placed successfully!")
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
		// console.log(this.state.orderData)
		// 	console.log(this.state.details)
		// 	console.log('=-=-=-=-', this.props.location.state);
		// console.log('=-=-=-=-', this.props.location.state.TransactionID);
			let Orders= this.props.location.state;
			var display1, display2;
			if(roles==="serviceprovider"){
			display1=<Landingpage/>
			}
			else if(roles === "distributor"|| roles === "manufacturer")
			{
			display1=<CenteredTabs
				rows={this.state.orderDatas} 
				row={this.state.orderDatass} 
				rowss={this.state.orderDatasss}	
				rowsss={this.state.orderDatass}
				dis={this.state.disAcc}			
			/>
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
			{display1}
			<br/>	
			<br/>			
			</section>					
			<br/>
			</div>		
			</React.Fragment>		
		)
    }
} 

export default OrderID;
