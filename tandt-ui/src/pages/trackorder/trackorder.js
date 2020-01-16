import React, {} from "react";
import { withRouter,Link } from "react-router-dom";
// import { Menu, Dropdown, Icon } from 'antd';
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import logo from "./images/brillio-logo.png";
import usericon from "./images/user-icon.svg";
import back from "./images/arrow-right.svg"
import map from "./images/map.svg"
import router from "./images/router.png"
import "./dashboard.scss";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import { ReceiptTwoTone } from "@material-ui/icons";

// import { useUserDispatch, loginUser } from "../../context/UserContext";

var image=localStorage.getItem('profile-picture');
var name=localStorage.getItem('name');

var orderid=localStorage.getItem('orderid');
var createdat=localStorage.getItem('createdat');
var orderstatus=localStorage.getItem('orderstatus');
var transactionid=localStorage.getItem('transactionid');
var distributorr=localStorage.getItem('distributor');
var distributoraddress=localStorage.getItem('distributoraddress');
var product=localStorage.getItem('product');
var category=localStorage.getItem('category');
var quantity=localStorage.getItem('quantity');
var deliveryaddress=localStorage.getItem('deliveryaddress');
var upgrade=localStorage.getItem('upgrade');

		
		
class Landingpage extends React.Component {
	constructor(props){
		super(props);
		this.toggle= this.toggle.bind(this);
		this.state = {
			dropdownOpen:false,
			showingInfoWindow: false,
			activeMarker: {},
			selectedPlace: {}
		}; 
		this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
	
	}

	onMarkerClick = (props, marker, e) => {
		this.setState({
		  selectedPlace: props,
		  activeMarker: marker,
		  showingInfoWindow: true
		});
	  }
	  onMapClick = (props) => {
		if (this.state.showingInfoWindow) {
		  this.setState({
			showingInfoWindow: false,
			activeMarker: null
		  });
		}
	  }
	toggle=()=>{
		this.setState((prevState)=>{
			return{dropdownOpen:!prevState.dropdownOpen};
		});
	}   
	render(){
	const style = {
		width: '60vw',
		height: '50vh',
		'marginLeft': 'auto',
		'marginRight': 'auto'
	  }
      return( 
        <div class="container-fluid padding0">
        <header>
              <span className="logo"><img className="logoImage" src={logo} alt="Brillio logo" width="125px"/></span>
            
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
        {/*<DropdownItem divider />*/}
        <DropdownItem><GoogleLogout render={renderProps => (
				<Link to="/login"><button type="style" className="btn btn-block btn-primary" onClick={renderProps.onClick}>Logout</button></Link>)}
        /></DropdownItem>
        </DropdownMenu>
    </Dropdown>
          		</div>  
             
          </header>
		  <section class="">
			<div class="col-lg-8 col-md-8 content">
				<h3 class="section-header"><Link to="/orderdetails"><img src={back} alt="back" class="back" /></Link><br/><br/></h3>
				<p>Track Current Order</p><div class="col-lg-3 col-md-3">
				
				<Map
        item
        xs = { 12 }
        style={style}
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 14 }
        initialCenter = {{ lat: 39.648209, lng: -75.711185 }}
      >
        <Marker
          onClick = { this.onMarkerClick }
          title = { 'Changing Colors Garage' }
          position = {{ lat: 39.648209, lng: -75.711185 }}
          name = { 'Changing Colors Garage' }
        />
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
          
              98G Albe Dr Newark, DE 19702 <br />
              302-293-8627
        </InfoWindow>
		
      </Map></div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
				<div class="place-order">
					<div class="col-lg-6 col-md-6">
						<img src={router} alt="device" class="rect" width="100" height="100"/>
						<div class="network-device">
							
							Order ID: {orderid} <br/>
							Transaction ID: {transactionid} <br/>
							Order Placed on: {createdat}<br/><br/>
							Distributor: {distributorr}<br/>{distributoraddress}<br/><br/>
							Product Name: {product}<br/>
							Product Category: {category}<br/>
							Quantity :{quantity}<br/>
							Upgrade device to 5G :{upgrade}<br/>
							Delivery Address: {deliveryaddress}<br/>
						</div>
						
					</div>
				</div>
			</div>		
	    <Link to="/dashboard"><div className="btn btn-prim pull-right">Go to Dashboard</div></Link>
			<div class="col-lg-3 col-md-3 activity-log">
				<h2 class="section-header">Track Details</h2>
				<div class="timeline-wrapper">
					<div class="node finished">
					<h6>Order Initiated</h6>
		<p class="sub-title">{createdat}</p>
				  </div>
				  <div class="node progressing">
					<h6>Order Accepted</h6>
					<p class="sub-title">Status / Time</p>
				  </div>
				  <div class="node">
					<h6>Order Shipped</h6>
					<p class="sub-title">Status / Time</p>
				  </div>
				  <div class="node">
					<h6>Order Delivered</h6>
					<p class="sub-title">Status / Time</p>
				  </div>
				</div>
			</div>
		</section>
        </div>  
       
         
);}
}


export default GoogleApiWrapper({
	apiKey: 'AIzaSyCBBI-PWfzZgdt_ssWRdibMuju_RH2BD8M'
  })(Landingpage);
