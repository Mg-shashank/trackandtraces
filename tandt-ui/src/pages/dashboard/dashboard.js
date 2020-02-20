/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import {Button, MenuItem, Menu} from "@material-ui/core";
// import { Menu, Dropdown, Icon } from 'antd';
import logo from "./images/brillio-logo.png";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import usericon from "./images/user-icon.svg";
import router from "./images/router.png";
import router2 from "./images/router2.jpg";
import router3 from "./images/router3.jpg"
import "./dashboard.scss"; 
import Logout from '../login/Logout';
var https = require("https");
var image = localStorage.getItem('profile-picture');
var name = localStorage.getItem('name');
const mappeddata = {

	DeviceSerialNo: '', 	
	warranty:'',	
	NetworkDevicesStatus:'',
	IPv6Compatible:'',
	FrequencyBand:'',
	DataTransferRate:'',
	chipset:'',
	EthernetPort:'',
	WirelessSpecification:''
}

class Landingpage extends React.Component {
constructor(props){
	
		super(props);
		this.toggle= this.toggle.bind(this);
		this.state = {
		dropdownOpen:false,
		anchorEl:null,
		isLoading: true,
		ordPlaced:'',
		ordAccept:'',
		ordRec: '',
		recAct:'',
		selectedProduct: '',
		createOrder:'',
		completedtable:[]
		}; 
	}
	
		componentDidMount() {
			
		fetch('https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/fetchordercount', {
	method:'GET',
		headers: {
		'Content-Type':'application/json',
						},
					})
		
			  .then((response) =>response.json())
					 .then((data) => {
		console.log(data);
		this.setState({
		ordPlaced:data,
		isLoading:false,
		});
					 })
			  .catch((error) => {
		console.error('Error:', error);
			  });
		
		
			fetch('https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/fetchcountaccept', {
			method:'GET',
			headers: {
			'Content-Type':'application/json',
							},
						})
			
				  .then((response) =>response.json())
						 .then((data) => {
			console.log(data);
			this.setState({
			ordAccept: data,
			isLoading:false,
			});
						 })
				  .catch((error) => {
			console.error('Error:', error);
				  });


			fetch('https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/fetchcountrec', {
			method:'GET',
			headers: {
			'Content-Type':'application/json',
							},
						})
			
				  .then((response) =>response.json())
						 .then((data) => {
			console.log(data);
			this.setState({
			ordRec: data,
			isLoading:false,
			});
						 })
				  .catch((error) => {
			console.error('Error:', error);
				  });
		
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
   console.log(optimizedData)
    this.setState({completedtable: optimizedData})
    console.log(this.state.completedtable)
  });
});


		fetch('https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/recentact', {
			method:'GET',
			headers: {
			'Content-Type':'application/json',
							},
						})
			
				  .then((response) =>response.json())
						 .then((data) => {
			console.log(data);
			this.setState({
			recAct: data,
			isLoading:false,
			});
						 })
				  .catch((error) => {
			console.error('Error:', error);
				  });
		
				 
			fetch('https://av7avhrl4e.execute-api.us-east-1.amazonaws.com/prod/iontojsondevicedata', {
				method:'GET',
				headers: {
				'Content-Type':'application/json',
				},
				})			
				.then((response) =>response.json()).then((mappeddata) => {						
					var Result=mappeddata;	
					console.log("data2",Result);
					Result.forEach(element => {
					// console.log(element);
					});	
														
					// let details = mappeddata;
					// this.state=  {state:details} 
					// console.log(mappeddata);
						
						//  var operation=(Result.toString());	
						//  console.log(typeof(operation));	
						// console.log('Displaying!!!!', operation)	
						// 
				
						//  var op = (productData.body)					
						// var a = (data.body)
						// console.log(a);
						// var Result = JSON.parse(productData.body)
						//  	console.log(Result)
						//  Result.forEach(element => {
						// 	console.log(element);											
						//  	});	
					 })
					
			// 		 const tableData = filteredServiceData.map((item, index)=>{
			// 			return {...item, ...filteredQldbData[index]}
			// 		})
			// 		console.log('!!!!!',tableData);
			// 		 let dataSource = tableData;

			// 		 //
			// 		 const renderContent = (value, row, index) => {
			// 		   const obj = {
			// 			 children:value ,
			// 			 props: {},
			// 		   };
			// 		   //console.log(row);
			// 		   obj.props.style={background:'#88ff4d'}
					 
					 
			// 		   return obj;
					  
			// 		 };
					   
			// 		 let  columns = [
			// 		   {
			// 			 title: 'Device_Serial_No',
			// 			 dataIndex: 'DeviceSerialNo',
			// 			 render: renderContent,
			// 		   },
			// 		   {
			// 			   title: 'Network_Device_Condition',
			// 			   dataIndex: 'NetworkDeviceCondition',
						   
			// 			 },
			// 			 {
			// 			   title: 'Maintenance_Schedule',
			// 			   dataIndex: 'MaintenanceSchedule',
						   
			// 			 },
			// 			 {
			// 			   title: 'Warranty',
			// 			   dataIndex: 'warranty',
						   
			// 			 },
			// 			 {
			// 			   title: 'Deman_Flag',
			// 			   dataIndex: 'DemandFlag',
						   
			// 			 },
			// 			 {
			// 			   title: 'Network_Devices_Status',
			// 			   dataIndex: 'NetworkDevicesStatus',
						   
			// 			 },
			// 			 {
			// 			   title: 'Service_Start_Date',
			// 			   dataIndex: 'CreatedDate',
						   
			// 			 },
			// 			 {
			// 			   title: 'Last_Modified_Date',
			// 			   dataIndex: 'LastModifiedDate',
						   
			// 			 },
			// 			 {
			// 			   title: 'IPv6_Compatible',
			// 			   dataIndex: 'IPv6Compatible',
			// 			   //render: renderContent,  
			// 			 },
			// 			 {
			// 			   title: 'Frequency_Band',
			// 			   dataIndex: 'FrequencyBand',
			// 			   //render: renderContent,
			// 			 },
			// 			 {
			// 			   title: 'Data_Transfer_Rate',
			// 			   dataIndex: 'DataTransferRate',
			// 			   //render: renderContent,
			// 			 },
			// 			 {
			// 			   title: 'Chipset',
			// 			   dataIndex: 'chipset',
			// 			   //render: renderContent,
			// 			 },
			// 			 {
			// 			   title: 'Ethernet_Port',
			// 			   dataIndex: 'EthernetPort',
						   
			// 			 },
			// 			 {
			// 			   title: 'Wireless_Specification',
			// 			   dataIndex: 'WirelessSpecification',
						   
			// 			 },
			 
			// 		 ];
			 
			// 		 this.setState({
			// 			 dataSource,columns
			// 		 })
			//  

	}
 	
	toggle=()=>{
	this.setState((prevState)=>{
	return{dropdownOpen:!prevState.dropdownOpen};
	});
	} 
	handleClick = e => {
	this.setState({anchorEl:e.target.value})
	};

	handleClose = () => {
	this.setState({anchorEl:null});
	};
	selectProductTile (e) {
		var i;
		let el = e.target;
	
		if(el.classList.contains("selected")) {
			el.classList.remove('selected');
		
		} else {
			var tiles = document.getElementsByClassName("selected")
			for (i = 0; i < tiles.length; i++) {
				tiles[i].classList.remove('selected');
			}
			el.classList.add('selected');
			var selectedProduct = document.getElementsByClassName("selected");
			var details = selectedProduct[0].getAttribute('data-name')
			this.props.history.push({pathname:'/createorder',state:details});
		}
	 };

	// createOrder(e) {
		
	// 	var selectedProduct = document.getElementsByClassName("selected");
	// 	var details = selectedProduct[0].getAttribute('data-name')
	// 	this.props.history.push({pathname:'/createorder',state:details});
	//  };

	gotoOrderPlace = () => {
			this.props.history.push("/OrderPlaced");	
	 		}

	gotoOrderAcc= () => {		
		this.props.history.push("/OrderAccepted");
	}		 
	
	gotoOrderReceived = () => {
		var Order = this.state.completedtable;
		console.log(Order)
		this.props.history.push("/OrderRec");
	}

	gotoRecAct =() => {
		this.props.history.push("/dashboard");
	}

  	render(){	
		const { isLoading,ordPlaced,ordAccept,ordRec,recAct} = this.state;
      return( 
        <div className="wrapper">
         <Logout/>
		<section>    
		<div className="container">
		<div className="col-lg-9 col-md-9 padding0">
		<div className="col-lg-9 col-md-9">
		<div className="col-lg-12 col-md-12">
		<h3 className="section-header">Track Orders</h3>
		</div>
		<div className="col-lg-12 col-md-12 padding0" >
		<div className="col-lg-4 col-md-4" onClick={this.gotoOrderPlace} >
		<div className="track-order" >
		<h3>Order Placed</h3>
		<p className="order-number"><div>
          {!isLoading ? ordPlaced: (
            <p>...</p>
          )}
        </div></p>
		</div>
		</div>
		{/* <div className="col-lg-4 col-md-4" onClick={this.gotoOrderAcc}>
		<div className="track-order">
		<h3>Order Accepted</h3>
		<p className="order-number"><div>
          {!isLoading ? ordAccept: (
            <p>...</p>
          )}
        </div></p>
		</div>
		</div> */}
		<div className="col-lg-4 col-md-4"  onClick={this.gotoOrderReceived}>
		<div className="track-order">
		<h3>Completed Orders</h3>
		<p className="order-number"><div>
          {!isLoading ? ordRec: (
            <p>...</p>
          )}
        </div></p>
		</div>
		</div>
		</div>
		<div className="row">
		<div className="col-lg-12 col-lg-12">		
			{/* <button type="button" className="btn btn-prim pull-right" id="btn-create-order" onClick={this.createOrder.bind(this)}>Create New Order</button> &nbsp; */}
			<div>
			<div><span className="section-header"> &nbsp;&nbsp;&nbsp;Recommended Orders </span>
			{/* <Link to="/createorder" onClick={this.createOrder.bind(this)}><button type="button" class="btn btn-primary pull-right" id="btn-create-order" disabled>+ Create New Order</button></Link> */}
			<Link to="/createneworder"><button type="button" className="btn btn-primary pull-right" id="btn-create-order" >Create New Order</button></Link></div>
			{/* <Link to="/completedrecords"><button type="button" className="btn btn-prim pull-left" id="btn-create-order">Previous Orders</button></Link> */}
			</div>
		</div>
		</div>
		</div>
		</div>
	
			<div className="col-lg-3 col-mt-3  float-center  recent-activities">
			<div className="col-lg-9 col-mt-9 col-mt-5 " onClick={this.gotoRecAct}>
			<h3 className="section-header">Recent Activities</h3>
			</div>	
			<div className="activity-card  float-center col-lg-9 col-mt-9 col-mt-5 ">
			<p className="act-head">Order Initiated</p>
			<p className="act-content"><div>
          {!isLoading ? recAct : (
            <p>...</p>
          )}
        </div> is Initiated.</p>
			{/* <p className="text-right"><Link to="/trackorder"><div className="view-more">View more</div></Link></p> */}
			</div>
		    </div>
						
			<div className="col-lg-9 col-md-9 padding0">
			<div className="col-lg-4 col-md-4">
			<div className="device-card" data-name="Asus ROG Rapture GT-AC5300" onClick={this.selectProductTile.bind(this)}>
						
			<img src={router} width="100" height="100" alt="s1" className="s1"  />			
			  <h3 className="title">Asus ROG Rapture GT-AC5300</h3>
			  <p className="sub-title">Router</p>		
			 <p className="card-label"><label>End of Warranty:</label> March</p>
			{/* <p className="attribute">MAC Address: D4:05:15:35:4A:11</p> */}
			<p className="card-label"><label>You can include below parameters to make your device 5G- Ready:</label></p>
			<p className="attribute">IPv6 Compatible: yes</p>
			<p className="attribute">Data Transfer Rate: 1200 Mbps</p>
			<p className="attribute">Frequency Band : Dual Band</p> 
			<p className="attribute">Wireless specification:802.11ac </p>
            <p className="attribute">Frequency: 2.4GHz and 5GHz </p>
			</div>
			</div>
			<div className="col-lg-4 col-md-4">
			<div className="device-card" data-name="D-Link AC2600 (DIR-2680)" onClick={this.selectProductTile.bind(this)}>						
			                          
			
			<img src={router2} alt="s1" width="100" height="100" className="s1" />
			 <h3 className="title">D-Link AC2600 (DIR-2680)</h3>
			<p className="sub-title">Router</p>
		 	<p className="card-label"><label>End of Warranty:</label> June</p>
			{/* <p className="attribute">MAC Address: D2:65:75:87:A7:05</p> */}
			<p className="card-label"><label>You can include below parameters to make your device 5G- Ready:</label></p>
			<p className="attribute">IPv6 Compatible: yes</p>
			<p className="attribute">Data Transfer Rate: 3600 Mbps</p>
			<p className="attribute">Frequency Band : TriBand</p> 		 
			<p className="attribute">Wireless specification:802.11ac </p>
            <p className="attribute">Frequency: 2.4GHz and 5GHz </p>
			</div>
			</div>
			<div className="col-lg-4 col-md-4">
			<div className="device-card" data-name="Asus RT-AC66U B1" onClick={this.selectProductTile.bind(this)}>	
			
			<img src={router3} width="100" height="100" alt="s1" className="s1" />
			 <h3 className="title">Asus RT-AC66U B1</h3>
			<p className="sub-title">Router</p>
			<p className="card-label"><label>End of Warranty:</label> June</p>
			{/* <p className="attribute">MAC Address: A4:02:33:93:7A:83</p> */}
			<p className="card-label"><label>You can include below parameters to make your device 5G- Ready:</label></p>
			<p className="attribute">IPv6 Compatible: yes</p>
			<p className="attribute">Data Transfer Rate: 4600 Mbps</p>
			<p className="attribute">Frequency Band : Dual Band</p>		
			<p className="attribute">Wireless specification:802.11ac </p>
            <p className="attribute">Frequency: 2.4GHz and 5GHz </p>
			</div>
			</div>
			</div>
			</div>
			</section>  
			</div>  
	   );
	}
 }

     export default (Landingpage);
