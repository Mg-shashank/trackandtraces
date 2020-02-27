/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { Button, MenuItem, Menu } from "@material-ui/core";
// import { Menu, Dropdown, Icon } from 'antd';
import logo from "./images/brillio-logo.png";
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem , Table} from 'reactstrap';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import usericon from "./images/user-icon.svg";
import router from "./images/router.png";
import router2 from "./images/router2.jpg";
import router3 from "./images/router3.jpg"
import "./dashboard.scss";
import Logout from '../login/Logout';
import LoadingOverlay from 'react-loading-overlay';
var https = require("https");
const request = require('request');
var name = localStorage.getItem('name');
var modelname=""
class Landingpage extends React.Component {
	constructor(props) {

		super(props);
		this.state = {
			ordPlaced: '',
			ordAccept: '',
			ordRec: '',
			RecAct:'',
			filteredQldbData: '',
			selectedProduct: '',
			createOrder: '',
			completedtable: []			
		};
	}

	componentDidMount() {

		fetch('https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/fetchordercount', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				this.setState({
					ordPlaced: data,
					isLoading: false,
				});
			})

			.catch((error) => {
				console.error('Error:', error);
			});


		fetch('https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/fetchcountaccept', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				this.setState({
					ordAccept: data,
					isLoading: false,
				});
			})
			.catch((error) => {
				console.error('Error:', error);
			});


		fetch('https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/fetchcountrec', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				this.setState({
					ordRec: data,
					isLoading: false,
				}); 
			})
			.catch((error) => {
				console.error('Error:', error);
			});

		var request = https.get("https://rvpkp45prc.execute-api.us-east-1.amazonaws.com/prod/completedtable",
			(response) => {
				if (response.statusCode !== 200) {
					// console.log("Error while getting the data");
				}
				response.on('data', (data) => {
					var jsonData = JSON.parse(data);
					var datas = jsonData.Items;
					const optimizedData = datas.map(data => ({ OrderStatus: data.OrderStatus.S, OrderID: data.OrderID.S, BatchID: data.BatchID.S, BatchStatus: data.BatchStatus.S, Distributor: data.Distributor.S, Manufacturer: data.Manufacturer.S, Product: data.Product.S, Category: data.Category.S, Quantity: data.Quantity.S, Upgradeto5G: data.Upgradeto5G.S, TransactionID1: data.TransactionID1.S, CreatedAt: data.CreatedAt.S, Manufacturer1: data.Manufacturer, Product1: data.Product, Category1: data.Category, Quantity1: data.Quantity, Upgradeto5G1: data.Upgradeto5G, TransactionIDD: data.TransactionID1, CreatedAt1: data.CreatedAt, OrderStatuses: data.OrderStatuses }));
					console.log(optimizedData)
					this.setState({ completedtable: optimizedData })
					console.log(this.state.completedtable)
				});
			});

		fetch('https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/recentact', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
			console.log(data);
			const RecAct=data.map((data)=>({
			Product:data.Product,
			CreatedAt:data.CreatedAt
		}))
			
		console.log('recAct',RecAct)

				data.forEach(element => {
				console.log(element)
				});

				this.setState({
					RecAct,
					isLoading: false,
				});
				
			})
			.catch((error) => {
				console.error('Error:', error);
			});


		fetch('https://av7avhrl4e.execute-api.us-east-1.amazonaws.com/prod/iontojsondevicedata', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json()).then((mappeddata) => {
				console.log(mappeddata);
        const filteredQldbData = mappeddata.map((data)=>({

		  Model_Name: data.Model_No,
          Product_Type: data.Product_Type,
          Warranty:data.Warranty,
          IPv6Compatible: data.IPv6_Compatible,
          FrequencyBand: data.Frequency_Band,
          DataTransferRate: data.Data_Transfer_Rate,
          Chipset: data.Chipset,
          EthernetPort: data.Ethernet_Port,
          WirelessSpecification: data.Wireless_Specification 
          
        }))
        console.log('filteredQldbData', filteredQldbData)
		
		this.setState({
			filteredQldbData,
			isLoading: false,
        });
		document.getElementsByClassName('_loading_overlay_wrapper--active')[0].style.display = 'none';
			})
		//  var op = (productData.body)					
		// var a = (data.body)
		// console.log(a);
		// var Result = JSON.parse(productData.body)
		//  	console.log(Result)
		//  Result.forEach(element => {
		// 	console.log(element);											
		//  	});	

	}

	
		// if (el.classList.contains("selected")) {
		// 	el.classList.remove('selected');
		//  }
		//  else {
		// 	var tiles = document.getElementsByClassName("selected")
		// 	for (i = 0; i < tiles.length; i++) {
		// 		tiles[i].classList.remove('selected');
		// 	}
		// 	el.classList.add('selected');
		// 	var selectedProduct = document.getElementsByClassName("selected");
		// 	var details = selectedProduct[0].getAttribute('data-name')

		// 	console.log(el);
		// 	var details = el.getElementsByTagName("p")[0].getAttribute('data-value');
		// 	return false;
		// 	this.props.history.push({ pathname: '/createorder', state: details });
		
		// };
		selectProductTile(e) {
			var i;
			let el = e.target;
			console.log(el)

		var tiles = document.getElementsByClassName("selected")
		for (i = 0; i < tiles.length; i++) {
			tiles[i].classList.remove('selected');
		}
		el.classList.add('selected');
		// var selectedProduct = document.getElementsByClassName("selected");
		var details ="";
		console.log(el);

		if(el.getElementsByTagName("p").length) {
			details = el.getElementsByTagName("p")[0].getAttribute('data-value');
			// console.log(details)
			// return false;
		}


		if(details) {
			this.props.history.push({ pathname: '/createorder', state: details });
		} else {
			console.log("Invalid recommendation. Please contact your administrator.");
			return false;
		}
		
	};

		gotoOrderPlace = () => {
		var Order = this.state.completedtable;		
		this.props.history.push("/orderdetails");
	}


	gotoOrderReceived = () => {
		var Order = this.state.completedtable;		
		this.props.history.push("/OrderRec");
	}
	
		// return (<ul>
		// 	{this.state.filteredQldbData.map(item => Object.entries(item).map(([key, value]) => <li>{key}:{value}</li>))}
		// </ul>)

	// 	{this.state.filteredQldbData.map(item => Object.entries(item).map(([key, value]) => <li>{key}:{value}</li>))}
	// 	return (<>
	// 		{this.state.filteredQldbData.map(item => Object.entries(item).map(([key, value]) => (<div className="col-lg-4 col-md-4">
	// 	<div className="device-card" data-name="Asus ROG Rapture GT-AC5300" onClick={this.selectProductTile.bind(this)}>
	// 		{/* <img src={roter} width="100" height="100" alt="s1" className="s1" />
	// 		<p className="title">Asus ROG Rapture GT-AC5300</p>
	// 		<p className="sub-title">Category:Router</p>
	// 		<p className="card-label"><label>End of Warranty:</label> June</p>
	// 		<p className="card-label"><label>You can include below parameters to make your device 5G- Ready:</label></p>
	// 		<p className="attribute">IPv6 Compatible: yes</p>
	// 		<p className="attribute">Data Transfer Rate: 1200 Mbps</p>
	// 		<p className="attribute">Frequency Band : Dual Band</p>
	// 		<p className="attribute">Wireless specification:802.11ac </p>
	// 		<p className="attribute">Frequency: 2.4GHz and 5GHz </p> */}
	// 	</div>
	// </div>
	// 	)))
	// 	}</>)

		// {this.state.filteredQldbData.map(item => (<div className="col-lg-4 col-md-4">
		// 	<div className="device-card" data-name="Asus ROG Rapture GT-AC5300" onClick={this.selectProductTile.bind(this)}>
		// 	</div>
		// 	</div>))
		// }
		// return( 
		//  <p>qldb data</p>
    // )
    
    filteredQldbData() {
    console.log('to filter')
	return this.state.filteredQldbData.map((item, index)=>{			
	console.log('render card=======>',item)
	
			return (<div className="col-lg-4 col-md-4"  onClick={this.selectProductTile.bind(this)}>
						<div className="device-card" >
							<img src={((index % 3) === 0)? router3: ((index % 2 === 0 ) ? router2 : router)} width="100" height="100" alt="s1" className="s1" />
							{/* <p className="title">{item.Model_No}</p>
							<p className="sub-title"><label>Category :</label> {item.Product_Type}</p>
							<p className="card-label"><label>End of Warranty:</label>{item.Warranty}</p>
							<p className="card-label"><label>You can include below parameters to make your device 5G- Ready</label></p> */}
				{Object.entries(item).map(([key, value])=>{

					return (
							
							<p className={"device_attribite_" + key} data-value={value}><label><b>{key} :</b></label> <span class="value">{value}</span></p>
					)
				})}
        </div>
			</div> )
		})

	}

	RecAct(){		
		return this.state.RecAct.map((item,index) => {		
		console.log( item)
		
		return(		<div className="recent-activities float-right col-lg-3 col-mt-3">
						{/* <div className="col-lg-12 col-mt-12 col-mt-5"> */}
						{/* </div> */}
						
						<h3 className="section-header float-center col-lg-12 col-mt-5s ">Recent Activities</h3>
						<div className="activity-card  float-center col-lg-12 col-mt-12 col-mt-5 ">							
						<p className="act-head"> Order Initiated</p>				
						<p className="act-content"> Order placed for {item.Product} on {item.CreatedAt} </p>
			
				
						</div>
					</div>
		)	
			})
		}

	render() {
		const { isLoading, ordPlaced, ordRec, filteredQldbData, RecAct } = this.state;
		
		return (
			<div className="wrapper">
				<Logout />
				<section>
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
					</LoadingOverlay>
					<div className="container">
						<div className="col-lg-9 col-md-9 padding0">
							<div className="col-lg-12 col-md-12">
								<div className="col-lg-12 col-md-12">
									<h3 className="section-header"> Order Stats</h3>
								</div>
								<div className="col-lg-12 col-md-12 padding0" >
									<div className="col-lg-4 col-md-4" onClick={this.gotoOrderPlace} >
										<div className="track-order" >
											<h3>Order Placed</h3>
											<p className="order-number"><div>
												{!isLoading ? ordPlaced : (

													<p>...</p>
												)}
											</div></p>
										</div>
									</div>
									
									<div className="col-lg-4 col-md-4" onClick={this.gotoOrderReceived}>
										<div className="track-order ">
											<h3 >Completed Orders</h3>
											<p className="order-number"><div>
												{!isLoading ? ordRec : (
													<p>...</p>
												)}
											</div></p>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-lg-12 col-md-12 padding0">

										<div>
											<div><span className="section-header "> Recommended Orders </span>
												<Link to="/createneworder"><button type="button" className="btn btn-primary pull-right" id="btn-create-order" >Create New Order</button></Link>
											</div>
										</div>
									</div>
									{/* <Link to="/completedrecords"><button type="button" className="btn btn-prim pull-left" id="btn-create-order">Previous Orders</button></Link> */}
									{/* <Link to="/createorder" onClick={this.createOrder.bind(this)}><button type="button" class="btn btn-primary pull-right" id="btn-create-order" disabled>+ Create New Order</button></Link> */}


								</div>
							</div>
						</div>


						{/* {recAct.map(row =>{
						<div className="col-lg-3 col-mt-3 recent-activities">
							<div className="col-lg-12 col-mt-12 col-mt-5 pull-right">
								<h3 className="section-header float-center col-lg-12 col-mt-5s ">Recent Activities</h3>
							</div>
							
							<div className="activity-card  float-center col-lg-12 col-mt-12 col-mt-5 ">
							
				<p className="act-head"> Order Initiated</p>
				
<p className="act-content"> Order placed for &nbsp; {row.Product} &nbsp; on &nbsp; {row.CreatedAt} </p>
				
							</div>
							
						</div>
	 })} */}
						
						{/* <div>
      {
        Object.keys(Results.object).map((key, i) => (
          <p key={i}>
            <span>Key Name: {key}</span>
            <span>Value: {response.json.object[key]}</span>
          </p>
        )
		)
		}
    </div> */}

						{this.state.filteredQldbData && this.filteredQldbData()}
						{this.state.RecAct && this.RecAct()}

					</div>
				</section>
			</div>
		);
	}
}

export default (Landingpage);
