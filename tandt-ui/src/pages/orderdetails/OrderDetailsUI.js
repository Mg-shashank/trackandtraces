import React, {} from "react";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import logo from "./images/brillio-logo.png";
import usericon from "./images/user-icon.svg";
// import { withRouter, Link, Route } from "react-router-dom";
import rect from "./images/rect.svg"
import router from "./images/router.png"
import "./dashboard.scss";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import orderdetails from "./orderdetails";
import Landingpage from "../orderdetails/orderdetails";
import NewTable from './NewTable'
//import DataTable, { createTheme } from 'react-data-table-component';

import SimpleTable from './SimpleTable'

import trackorder from "../trackorder/trackorder";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Logout from '../login/Logout';
import ttConfig from '../../config.js'
//import DataTable, { createTheme } from 'react-data-table-component';
//import {DataTable} from 'primereact/datatable';
var orderid=[];
var orderDetails;
var datas=[];
var image=localStorage.getItem('profile-picture');
var roles = localStorage.getItem('role')
const request = require('request');
var https = require("https");
var name = localStorage.getItem('name')
var refreshs;
class OrderID extends React.Component{  
	constructor(props){
		super(props);
		// this.toggle= this.toggle.bind(this);
		// this.refresh=this.refresh.bind(this);
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
			disAcc:[],
			orderDataa:[],
			isLoading: true,
			ordPlaced:'',
			ordAccept:'',
			ordRec: '',
			recAct:'',
			e:'',		
			orders:[],
			inprogress:[],
			completedtables:[],
			Product:[]
		}; 
		// this.refresh=this.refresh.bind(this);
		// this.toggleHidden=this.toggleHidden.bind(this)
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
				// var jsonData = JSON.parse(data);					
				// var datas = jsonData.data.Items;	
				// // console.log(datas)	
				// console.log('first data res',datas)
				// const optimizedData = datas.map(data=>({orderid: data.OrderID.S,orderstatus: data.OrderStatus.S}));
				// 	//distributor:data.Distributor.S,createdat:data.CreatedAt.S,orderdetails:data.OrderDetails.S}));
				//  console.log('optiminzed data',optimizedData);
				// this.setState({orderData: optimizedData})
				//   console.log(this.state.orderData)
			});
		});	

/////////////////////TO GET ORDER-INITIATED DATA for service provider
		// var request = https.get("https://9fsnk4xvv6.execute-api.us-east-1.amazonaws.com/prod/fetchinit",
		// 	(response)=>{
		// 	if (response.statusCode !== 200)
		// 	{
		// 		// console.log("Error while getting the data");
		// 	} 			
		// 	response.on('data',(data)=> {	
		// 		// console.log(data)
		// 		 var jsonData = JSON.parse(data);					
		// 		 var datas = jsonData.Items;		
		// 		 const optimizedData = datas.map(data=>({orderid: data.OrderID.S,product:data.Product.S,orderstatus: data.OrderStatus.S,createdat: data.CreatedAt.S}));
		// 		this.setState({orderDatas: optimizedData})
		// 		console.log(this.state.orderDatas)
		// 	});
		// });

		fetch('https://82aru5m82k.execute-api.us-east-1.amazonaws.com/prod/entries1')
 	 		.then((resp) => resp.json()) // Transform the data into json
  	 		.then((data)=> {
				var jsonData = JSON.parse(JSON.stringify(data));					
				var datas = jsonData.data.Items;	
				const optimizedData = datas.map(data =>({orderid:data.OrderID.S,orderstatus:data.OrderStatus.S,product:data.Product.S,createdat:data.CreatedAt.S}));
			this.setState({orderData: optimizedData})
			console.log('this...',this.state.orderData)
    		})

///////////////////////// TO GET ORDER-ACCEPTED DATA for distributor
	var request = https.get("https://c6ppd96od0.execute-api.us-east-1.amazonaws.com/prod/orderstatus",
	(response) => {
	if (response.statusCode !== 200)
	{
		// console.log("Error while getting the data");
	} 			
	response.on('data',(data)=> {	
		var jsonData = JSON.parse(data);					
		var datas = jsonData.Items;	
		let orders= datas;
		//this.props.history.push({pathname:'/createbatch',state:orders})	
		console.log('third data res',datas)
		const optimizedData = datas.map(data=>({batchid: data.BatchID.S,orderstatus: data.OrderStatus.S,orderid: data.OrderID.S,batchquantity: data.BatchQuantity.S,product: data.Product.S,createdat:data.CreatedAt.S}));
		//distributor:data.Distributor.S,createdat:data.CreatedAt.S,transactionid:data.TransactionId.S}));
		console.log('optiminzed data',optimizedData);
		this.setState({orderDatass: optimizedData})
		console.log(this.state.orderDatass)
	});
});
			

/////////////////////////////////////////////////////////////////////////////////////////////////
		// TO GET ORDER_REJECTED DATA
		var request = https.get("https://uoa7pzzm4b.execute-api.us-east-1.amazonaws.com/prod/rejectbymanufacturer",
			(response)=>{
			if (response.statusCode !== 200)
			{
				// console.log("Error while getting the data");
			} 			
			response.on('data',(data)=> {	
				var jsonData = JSON.parse(data);					
				var datas = jsonData.Items;		
				// console.log('third data res',datas)
				const optimizedData = datas.map(data=>({orderid: data.OrderID.S,orderstatus: data.OrderStatus.S,product:data.Product.S,batchcreatedat:data.BatchCreatedOn.S}));
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
			// const optimizedData = datas.map(data =>({OrderStatus:data.OrderStatus.S,OrderID:data.OrderID.S,BatchID:data.BatchID.S,BatchStatus:data.BatchStatus.S,Distributor:data.Distributor.S,Manufacturer:data.Manufacturer,Product:data.Product,Category:data.Category,Quantity:data.Quantity,Upgradeto5G:data.Upgradeto5G,TransactionID1:data.TransactionID1,CreatedAt:data.CreatedAt}));
			const optimizedData = datas.map(data =>({OrderStatus:data.OrderStatus.S,OrderID:data.OrderID.S,BatchID:data.BatchID.S,BatchStatus:data.BatchStatus.S,Distributor:data.Distributor.S,Manufacturer:data.Manufacturer.S,Product:data.Product.S,Category:data.Category.S,Quantity:data.Quantity.S,Upgradeto5G:data.Upgradeto5G.S,TransactionID1:data.TransactionID1.S,CreatedAt:data.CreatedAt.S,Manufacturer1:data.Manufacturer,Product1:data.Product,Category1:data.Category,Quantity1:data.Quantity,Upgradeto5G1:data.Upgradeto5G,TransactionIDD:data.TransactionID1,CreatedAt1:data.CreatedAt}));
            // console.log('optimized data', optimizedData);
			this.setState({disAcc: optimizedData})
			console.log(this.state.disAcc)
            // console.log(this.state.disAcc)
          });
	  });

	  // TO GET ORDER Rejected By Distributor
	  var request = https.get("https://k1ha90rw8c.execute-api.us-east-1.amazonaws.com/prod/rejectorderdist",
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
                this.setState({orderDatassss: optimizedData})
                // console.log(this.state.orderDatasss)
            });
		})
		
		//Completed Table
		var request = https.get("https://rvpkp45prc.execute-api.us-east-1.amazonaws.com/prod/completedtable",                
		(response) => {
			if(response.statusCode !==200)
			{
				// console.log("Error while getting the data");
			}
		response.on('data',(data) => {
		 	var jsonData = JSON.parse(data);
			var datas = jsonData.Items;
		  	const optimizedData = datas.map(data =>({OrderStatus:data.OrderStatus.S,OrderID:data.OrderID.S,BatchID:data.BatchID.S,BatchStatus:data.BatchStatus.S,Distributor:data.Distributor.S,Manufacturer:data.Manufacturer.S,Product:data.Product.S,Category:data.Category.S,Quantity:data.Quantity.S,Upgradeto5G:data.Upgradeto5G.S,TransactionID1:data.TransactionID1.S,CreatedAt:data.CreatedAt.S,Manufacturer1:data.Manufacturer,Product1:data.Product,Category1:data.Category,Quantity1:data.Quantity,Upgradeto5G1:data.Upgradeto5G,TransactionIDD:data.TransactionID1,CreatedAt1:data.CreatedAt,OrderStatuses:data.OrderStatuses}));
			this.setState({completedtable: optimizedData})
			console.log(this.state.completedtable)
		  });
	  });
	  //Inprogress
	  var request = https.get("https://uzruordqzd.execute-api.us-east-1.amazonaws.com/prod/inprogress",                
		(response) => {
			if(response.statusCode !==200)
			{
				// console.log("Error while getting the data");
			}
		response.on('data',(data) => {
			var jsonData = JSON.parse(data);
			var datas = jsonData.Items;
		  	const optimizedData = datas.map(data =>({BatchQuantity:data.BatchQuantity.S,BatchCreatedOn:data.BatchCreatedOn.S,BatchOrderStatus:data.OrderStatus.S,OrderID:data.OrderID.S,BatchID:data.BatchID.S,BatchStatus:data.BatchStatus.S,Distributor:data.Distributor.S,Manufacturer:data.Manufacturer.S,Product:data.Product.S,Category:data.Category.S,Quantity:data.Quantity.S,Upgradeto5G:data.Upgradeto5G.S,TransactionID1:data.TransactionID1.S,CreatedAt:data.CreatedAt.S}));
			this.setState({inprogresstable: optimizedData})
			console.log(this.state.inprogresstable)
		  });
	  });
	  // Order Placed Tile
	  fetch('https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/fetchordercount', {
		method:'GET',
		headers: {
		'Content-Type':'application/json',
						},
					})
		
			  .then((response) =>response.json())
					 .then((data) => {
			//console.log(data);
				this.setState({
				ordPlaced:data,
				isLoading:false,
				});
			 })
			  .catch((error) => {
			console.error('Error:', error);
			  });
		
			// Order Accepted
			fetch('https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/fetchcountaccept', {
			method:'GET',
			headers: {
			'Content-Type':'application/json',
							},
						})			
			.then((response) =>response.json())
			.then((data) => {
			//console.log(data);
			this.setState({
			ordAccept: data,
			isLoading:false,
			});
						 })
			.catch((error) => {
			console.error('Error:', error);
				  });

			// Order Recieved
			fetch('https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/fetchcountrec', {
			method:'GET',
			headers: {
			'Content-Type':'application/json',
							},
						})			
			.then((response) =>response.json())
			.then((data) => {
			//console.log(data);
			this.setState({
			ordRec: data,
			isLoading:false,
			});
			console.log('FETCHCOUNTREC',this.state.ordRec)
						 })
				  .catch((error) => {
			console.error('Error:', error);
				  });	  

	  		fetch('https://82aru5m82k.execute-api.us-east-1.amazonaws.com/prod/entries1')
 	 		.then((resp) => resp.json()) // Transform the data into json
  	 		.then('Data',function(data) {
			console.log(data)
			var datas = data.Items;
			console.log(datas)
			const optimizedData = datas.map(data =>({orderid:data.OrderID.S,orderstatus:data.OrderStatus.S}));
			console.log(optimizedData)
			this.setState({orderDataa: optimizedData})
			console.log(this.state.orderDataa)
    		})
    //    toast.success("Order is placed successfully!")		  
  	}
	
		 
    render(){
			let Orders= this.props.location.state;
			var display1, display2;
			console.log(localStorage.getItem('role'))
			if(localStorage.getItem('role') === ttConfig.roleassign.serv.role ){
			display1=<Landingpage/>
			}
			else if(localStorage.getItem('role') === ttConfig.roleassign.dist.role)
			{
			
			display1=<NewTable				
			rowsss={this.state.orderDatass}				
			/>	
		}
		else if( localStorage.getItem('role') === ttConfig.roleassign.manu.role ){
			
			display1=<SimpleTable
			rows={this.state.orderData} 				
			/>	
		}
			return(			
			<React.Fragment>	
			<div className="container-fluid padding0">		
      		<Logout/>				
			<section class="content">
			<div className="container">		
  	  		</div>
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

export default withRouter(OrderID);
