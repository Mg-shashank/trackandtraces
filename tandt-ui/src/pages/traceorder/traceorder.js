import React, {} from "react";
import { withRouter,Link } from "react-router-dom";

import {GoogleLogin,GoogleLogout} from 'react-google-login';
import { GoogleApiWrapper, InfoWindow, Map, Marker ,Polyline} from 'google-maps-react';
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
		
class Landingpage extends React.Component {
	
	path = [
	
		{ lat: 35.5175, lng: -86.5804 },
		{ lat: 35.0078, lng: -97.0929 }
	  ];
	
	constructor(props){
		
		super(props);
		this.toggle= this.toggle.bind(this);
		this.state = {
			dropdownOpen:false,
			showingInfoWindow: false,
			showingPolyine: false,
			activeMarker: {},
			activeMarker1: {},
			selectedPlace: {}
		}; 
		this.onMarkerClick1 = this.onMarkerClick1.bind(this);
		this.onMarkerClick= this.onMarkerClick.bind(this);
		
	}
	onMarkerClick = (props, marker, e) => {
		this.setState({
		  selectedPlace: props,
		  activeMarker: marker,
		
		});
	  }
	  onMarkerClick1 = (props, marker, e) => {
		this.setState({
		  selectedPlace: props,
		  activeMarker1: marker,
		  showingInfoWindow: true,
		 
		});
	  }

	toggle=()=>{
		this.setState((prevState)=>{
			return{dropdownOpen:!prevState.dropdownOpen};
		});
	}   
	render(){
		//console.log('=-=-=-=-', this.props.location.state);
		// let Orderid = this.props.location.state.OrderID;
		// let OrderStatus = this.props.location.state.OrderStatus;
		// let Createdat = this.props.location.state.CreatedAt;
		// let Transactionid = this.props.location.state.TransactionID;
		// let Manufacturer = this.props.location.state.Manufacturer;
		// let Product = this.props.location.state.Product;
		// let Category = this.props.location.state.Category;
		// let Quantity = this.props.location.state.Quantity;
		// let Upgrade = this.props.location.state.Upgradeto5G;
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
				zoom = {4}
				initialCenter = {{ lat: 39.648209, lng: -75.711185 }}
      >

		<Marker
          onClick = { this.onMarkerClick1}
          title = { 'Manufacturer' }
          position = {{ lat: 35.5175, lng: -86.5804 }}
		  name = { 'Manufacturer' }
		  
        />
		<Marker
          onClick = { this.onMarkerClick }
          title = { 'Service provider' }
          position = {{ lat: 35.0078, lng: -97.0929 }}
          name = { 'Service Provider Enterprise' }
        />
		{/* <Polyline 
  path={{ lat: 35.5175, lng: -86.5804 },{ lat: 35.0078, lng: -97.0929 }} 
  options={{ 
  strokeColor: '#00ffff',
  strokeOpacity: 1,
  strokeWeight: 2,
  icons: [{ 
    icon: "hello",
    offset: '0',
    repeat: '10px'
  }],
}}

/> */}

<Polyline path={this.path} options={{ strokeColor: "#000000 " },  {strokeOpacity: 1},
 { strokeWeight: 2}} />
<InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
          
              Order Initiated <br />
              Oklahoma, USA
        </InfoWindow>

        <InfoWindow
          marker = { this.state.activeMarker1 }
          visible = { this.state.showingInfoWindow }
        >
          
              Order Released <br />
              Tennesse, USA
        </InfoWindow>
		
      </Map></div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
				<div class="place-order">
					<div class="col-lg-8 col-md-8">
					{/* <div class="padding-bottom20">
					<h3><b>Order ID</b> : {Orderid}</h3>
					<h3><b>Order Status:</b> {OrderStatus}</h3>
					<h3><b>Order placed on: </b>{Createdat}</h3>
				    </div>

					<h3><b>Transaction ID :</b> {Transactionid}</h3>
					<h3><b>Manufacturer : </b>{Manufacturer}</h3>
					<h3><b>Product : </b>{Product}</h3>
					<h3><b>Product Category : </b>{Category}</h3>
					<h3><b>Quantity : </b>{Quantity}</h3>
					<h3><b>Upgrade Product to 5G : </b>{Upgrade}</h3> */} 
						
						{/* {/* <ul>
					{Object.entries(Orders).map(([key, value])=>{
					return <li key={key}>{key}: {value}</li>
					})}
				</ul>  */}
					</div>
				</div>
			</div>		
	    <Link to="/dashboard"><div className="btn btn-prim pull-right">Go to Dashboard</div></Link>
			<div class="col-lg-3 col-md-3 activity-log">
				<h2 class="section-header">Track Details</h2>
				<div class="timeline-wrapper">
					<div class="node finished">
					<h6>Order Initiated</h6>
				{/* <p class="sub-title">{Createdat}</p> */}
				  </div>
				  <div class="node progressing">
					<h6>Order Accepted</h6>
					
				  </div>
				  <div class="node">
					<h6>Order Shipped</h6>
					
				  </div>
				  <div class="node">
					<h6>Order Delivered</h6>
					
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
