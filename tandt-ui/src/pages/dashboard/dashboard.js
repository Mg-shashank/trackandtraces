/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { Button, MenuItem, Menu } from "@material-ui/core";
// import { Menu, Dropdown, Icon } from 'antd';
import logo from "./images/brillio-logo.png";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import usericon from "./images/user-icon.svg";
//import dots from "./images/dots.svg";
import Logout from '../login/Logout';
import router from "./images/router.png";
import router2 from "./images/router2.jpg";
import router3 from "./images/router3.jpg";
import router4 from "./images/router4.jpg";
import router5 from "./images/router5.jpg";
import router6 from "./images/router6.jpg";
import "./dashboard.scss";
//import { Resolver } from "dns";
var https = require("https");
var image = localStorage.getItem('profile-picture');
var name = localStorage.getItem('name');


class Landingpage extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false,
			anchorEl: null,
			isLoading: true,
			ordPlaced: '',
			ordAccept: '',
			ordRec: '',
			recAct: '',
			selectedProduct: '',
			createOrder:'',
			details:'',
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

		fetch('https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/recentact', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				this.setState({
					recAct: data,
					isLoading: false,
				});
			})
			.catch((error) => {
				console.error('Error:', error);
			});


		// https.get("https://ji94s8ez32.execute-api.us-east-1.amazonaws.com/qldb/get-qldb-network-devices-services",
		// 	function (response) {
		// 		if (response.statusCode !== 200) {
		// 			console.log("Error while getting the data");
		// 		}
		// 		response.on('data', function (data) {
					
		// 			//console.log(JSON.parse(data.body[0]));
		// 			// var productData = JSON.parse(data.toString())
		// 			// var Result = JSON.parse(productData.body)
		// 			console.log(data)
		// 			Result.forEach(element => {
		// 				console.log(element);											
		// 			});									
		// 		})	 				
		// 	})
		
			// fetch('https://ji94s8ez32.execute-api.us-east-1.amazonaws.com/qldb/get-qldb-network-devices-services').then((res)=>{
			// 		return res.json()
			// }).then((json)=>{
			// 	console.log(json)
			// })

			
		fetch('https://ji94s8ez32.execute-api.us-east-1.amazonaws.com/qldb/get-qldb-network-devices', {
			method:'GET',
			headers: {
			'Content-Type':'application/json',
					},
			})			
			.then((response) =>response.json()).then((data) => {
				// console.log(data.toString());
				// var Result=data.toString();
				
				// var productData=JSON.parse(Result.body);
				 console.log(data);
				 console.log(data.body[0]);
				//  var productData = JSON.parse(data.toString())
				//  var Result = JSON.parse(productData.body)					
				// var productData = (data.body[2])
				// var Result = JSON.parse(productData.body)
		 		// 	console.log(Result)
	 			// Result.forEach(element => {
				// 	console.log(element);											
		 		// 	});	
			 })
			.catch((error) => {
				console.error('Error:', error);
			 });		
		   
	}

	toggle = () => {
		this.setState((prevState) => {
			return { dropdownOpen: !prevState.dropdownOpen };
		});
	}

	handleClick = e => {
		this.setState({ anchorEl: e.target.value })
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};
	
	selectProductTile (e) {
		var i;
		let el = e.target;
	
		if(el.classList.contains("selected")) {
			el.classList.remove('selected');
			document.getElementById('btn-create-order').disabled = true
		} else {
			var tiles = document.getElementsByClassName("selected")
			for (i = 0; i < tiles.length; i++) {
				tiles[i].classList.remove('selected');
			}
			el.classList.add('selected');
			document.getElementById('btn-create-order').disabled = false
		}
	 };

	 createOrder(element) {
		var selectedProduct = document.getElementsByClassName("selected")
		alert('createOrder:'+ selectedProduct[0].getAttribute('data-name'))
		var t= selectedProduct[0].getAttribute('data-name')		
		let details = t;
		this.props.history.push({pathname:'/createorder',state:details})
	 };

	render() {
		const { isLoading, ordPlaced, ordAccept, ordRec, recAct, createOrder }= this.state;

		return (
			<div className="wrapper">
				<Logout/>
				<section>
					<div className="container">
						<div className="col-lg-9 col-md-9 padding0">
							<div className="col-lg-9 col-md-9">
								<div className="col-lg-12 col-md-12">
									<h3 className="section-header">Track Orders</h3>
								</div>
								<div className="col-lg-12 col-md-12 padding0">
									<div className="col-lg-4 col-md-4">
										<div className="track-order">
											<h3>Order Placed</h3>
											<p className="order-number"><div>
												{!isLoading ? ordPlaced : (
													<p>...</p>
												)}
											</div></p>
										</div>
									</div>
									<div className="col-lg-4 col-md-4">
										<div className="track-order">
											<h3>Order Accepted</h3>
											<p className="order-number"><div>
												{!isLoading ? ordAccept : (
													<p>...</p>
												)}
											</div></p>
										</div>
									</div>
									<div className="col-lg-4 col-md-4">
										<div className="track-order">
											<h3>Completed Orders</h3>
											<p className="order-number"><div>
												{!isLoading ? ordRec : (
													<p>...</p>
												)}
											</div></p>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-lg-12 col-lg-12">
										<span className="section-header">Recommended Orders </span>
										<Link to="/createorder" onClick={this.createOrder.bind(this)}><button type="button" class="btn btn-primary pull-right" id="btn-create-order" disabled>+ Create New Order</button> 
									</Link>
									
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-3 col-mt-3  float-right  recent-activities">
							<div className="col-lg-12 col-mt-12 col-mt-5 padding0">
								<h3 className="section-header">Recent Activities</h3>

								<div className="activity-card">
									<p className="act-head">Order Initiated</p>
									<p className="act-content"><div>
										{!isLoading ? recAct : (
											<p>...</p>
										)}
									</div> is Initiated.</p>
									<p className="text-right"><Link to="/traceorder"><div className="view-more">View more</div></Link></p>
								</div>

								<div className="activity-card">
									<p className="act-head">Order Accepted </p>
									<p className="act-content"><div>
										{!isLoading ? recAct : (
											<p>...</p>
										)}
									</div> is accepted.</p>
									<p className="text-right"><Link to="/traceorder"><div className="view-more">View more</div></Link></p>
								</div>
							</div>
						</div>

						<div className="col-lg-9 col-md-9 padding0">
							<div className="col-lg-4 col-md-4">
								<div className="device-card " data-name = "Asus ROG Rapture GT-AC5300" onClick={this.selectProductTile.bind(this.state.createOrder)} data-pname="demo" >
								
									{/* <div className="dropdown dots"> */}
									{/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
									{/* <b>...</b> */}
									{/* </Button>  */}
									{/* <Menu
										id="simple-menu"
										anchorEl={this.state.anchorEl}
										keepMounted
										open={Boolean(this.state.anchorEl)} 
										// open={this.state.anchorEl}
										onClose={this.handleClose}
									>
										<MenuItem onClick={this.handleClose}>Device Model: AC5300</MenuItem>
										<MenuItem onClick={this.handleClose}>Device Type: Router</MenuItem>
										<MenuItem onClick={this.handleClose}>Device Vendor: Asus</MenuItem>
									</Menu> */}
									<img src={router} width="100" height="100" alt="s1" className="s1" />
									<h3 className="title">Asus ROG Rapture GT-AC5300</h3>
									<p className="sub-title">Router</p>		
			 {/* <p className="card-label"><label>End of Warranty:</label> March</p>
			<p className="attribute">MAC Address: D4:05:15:35:4A:11</p>
			<p className="card-label"><label>You can include below parameters to make your device 5G- Ready:</label></p>
			<p className="attribute">IPv6 Compatible: yes</p>
			<p className="attribute">Data Transfer Rate: 1200 Mbps</p>
			<p className="attribute">Frequency Band : Dual Band</p>  */}
								</div>
							</div>
							<div className="col-lg-4 col-md-4">
								<div className="device-card" data-name = "D-Link AC2600 (DIR-2680)" onClick={this.selectProductTile.bind(this)}>
								<div>
										{!isLoading ? createOrder : (
											<p>...</p>
										)}
									</div> 
									{/* <Menu
										id="simple-menu"
										anchorEl={this.state.anchorEl}
										keepMounted
										//  open={Boolean(anchorEl)}
										onClose={this.handleClose}
									>
										<MenuItem onClick={this.handleClose}>Device Model: AC2600</MenuItem>
										<MenuItem onClick={this.handleClose}>Device Type: Router</MenuItem>
										<MenuItem onClick={this.shandleClose}>Device Vendor: Abbot</MenuItem>
									</Menu> */}

									<img src={router2} alt="s1" width="100" height="100" className="s1" />
									<h3 className="title">D-Link AC2600 (DIR-2680)</h3>
									<p className="sub-title">Router</p>
		 	{/* <p className="card-label"><label>End of Warranty:</label> June</p>
			<p className="attribute">MAC Address: D2:65:75:87:A7:05</p>
			<p className="card-label"><label>You can include below parameters to make your device 5G- Ready:</label></p>
			<p className="attribute">IPv6 Compatible: yes</p>
			<p className="attribute">Data Transfer Rate: 3600 Mbps</p>
			<p className="attribute">Frequency Band : TriBand</p> 		  */}
								</div>
							</div>
							<div className="col-lg-4 col-md-4">
								<div className="device-card" data-name = "Asus RT-AC66U B1" onClick={this.selectProductTile.bind(this)}>
									{/* <Menu
										id="simple-menu"
										anchorEl={this.state.anchorEl}
										keepMounted
										//   open={Boolean(anchorEl)}
										onClose={this.handleClose}
									>
										<MenuItem onClick={this.handleClose}>Device Model: AC66U</MenuItem>
										<MenuItem onClick={this.handleClose}>Device Type: Router</MenuItem>
										<MenuItem onClick={this.handleClose}>Device Vendor: Asus</MenuItem>
									</Menu> */}

									<img src={router3} width="100" height="100" alt="s1" className="s1" />
									<h3 className="title">Asus RT-AC66U B1</h3>
									<p className="sub-title">Router</p>
			{/* <p className="card-label"><label>End of Warranty:</label> June</p>
			<p className="attribute">MAC Address: A4:02:33:93:7A:83</p>
			<p className="card-label"><label>You can include below parameters to make your device 5G- Ready:</label></p>
			<p className="attribute">IPv6 Compatible: yes</p>
			<p className="attribute">Data Transfer Rate: 4600 Mbps</p>
			<p className="attribute">Frequency Band : Dual Band</p>		 */}
								</div>
							</div>

							<div className="col-lg-4 col-md-4">
								<div className="device-card" data-name = "Netgear Nighthawk x10 ad7200" onClick={this.selectProductTile.bind(this)}>
									{/* <Menu
										id="simple-menu"
										anchorEl={this.state.anchorEl}
										keepMounted
										//   open={Boolean(anchorEl)}
										onClose={this.handleClose}
									>
										<MenuItem onClick={this.handleClose}>Device Model: AC66U</MenuItem>
										<MenuItem onClick={this.handleClose}>Device Type: Router</MenuItem>
										<MenuItem onClick={this.handleClose}>Device Vendor: Asus</MenuItem>
									</Menu> */}

									<img src={router4} width="100" height="100" alt="s1" className="s1" />
									<h3 className="title">Netgear Nighthawk x10 ad7200</h3>
									<p className="sub-title">Router</p>
			{/* <p className="card-label"><label>End of Warranty:</label> June</p>
			<p className="attribute">MAC Address: A4:02:33:93:7A:83</p>
			<p className="card-label"><label>You can include below parameters to make your device 5G- Ready:</label></p>
			<p className="attribute">IPv6 Compatible: yes</p>
			<p className="attribute">Data Transfer Rate: 4600 Mbps</p>
			<p className="attribute">Frequency Band : Dual Band</p>		 */}
								</div>
							</div>

							<div className="col-lg-4 col-md-4">
								<div className="device-card" data-name = "D-Link DWR-2010 5G Router" onClick={this.selectProductTile.bind(this)}>
									{/* <Menu
										id="simple-menu"
										anchorEl={this.state.anchorEl}
										keepMounted
										//   open={Boolean(anchorEl)}
										onClose={this.handleClose}
									>
										<MenuItem onClick={this.handleClose}>Device Model: AC66U</MenuItem>
										<MenuItem onClick={this.handleClose}>Device Type: Router</MenuItem>
										<MenuItem onClick={this.handleClose}>Device Vendor: Asus</MenuItem>
									</Menu> */}

									<img src={router5} width="100" height="100" alt="s1" className="s1" />
									<h3 className="title">D-Link DWR-2010 5G Router</h3>
									<p className="sub-title">Router</p>
			{/* <p className="card-label"><label>End of Warranty:</label> June</p>
			<p className="attribute">MAC Address: A4:02:33:93:7A:83</p>
			<p className="card-label"><label>You can include below parameters to make your device 5G- Ready:</label></p>
			<p className="attribute">IPv6 Compatible: yes</p>
			<p className="attribute">Data Transfer Rate: 4600 Mbps</p>
			<p className="attribute">Frequency Band : Dual Band</p>	 */}
								</div>
							</div>
							<div className="col-lg-4 col-md-4">
								<div className="device-card" data-name = "D-Link AC1200" onClick={this.selectProductTile.bind(this)}>
									{/* <Menu
										id="simple-menu"
										anchorEl={this.state.anchorEl}
										keepMounted
										//   open={Boolean(anchorEl)}
										onClose={this.handleClose}>
										<MenuItem onClick={this.handleClose}>Device Model: AC66U</MenuItem>
										<MenuItem onClick={this.handleClose}>Device Type: Router</MenuItem>
										<MenuItem onClick={this.handleClose}>Device Vendor: Asus</MenuItem>
									</Menu> */}

									<img src={router6} width="100" height="100" alt="s1" className="s1" />
									<h3 className="title">D-Link AC1200 </h3>
									<p className="sub-title">Router</p>
			{/* <p className="card-label"><label>End of Warranty:</label> June</p>
			<p className="attribute">MAC Address: A4:02:33:93:7A:83</p>
			<p className="card-label"><label>You can include below parameters to make your device 5G- Ready:</label></p>
			<p className="attribute">IPv6 Compatible: yes</p>
			<p className="attribute">Data Transfer Rate: 4600 Mbps</p>
			<p className="attribute">Frequency Band : Dual Band</p>		 */}
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
