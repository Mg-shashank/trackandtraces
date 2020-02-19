import React, {} from "react";
import { withRouter,Link } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import { GoogleApiWrapper, InfoWindow, Map, Marker ,Polyline} from 'google-maps-react';
import logo from "./images/brillio-logo.png";
import usericon from "./images/user-icon.svg";
import back from "./images/arrow-right.svg"
import map from "./images/map.svg"
import router from "./images/router.png"
import "./dashboard.scss";
import ttConfig from '../../config.js'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Logout from '../login/Logout';
import Table from 'react-bootstrap/Table';
import TrackDetails from './TrackDetails'
var orderid;
var quantity;
var role = localStorage.getItem('role')
		
class Trackorder extends React.Component {	
	constructor(props){		
		super(props);
		this.toggle= this.toggle.bind(this);
		this.state = {
			dropdownOpen:false,
			showingInfoWindow: false,
			showingPolyine: false,
			activeMarker: {},
			activeMarker1: {},
			selectedPlace: {},
			isActive:true,
			posts: {},
      isLoading: true,
			orderdetails:[],
			Orderid:{},
			Quantity:{}
		}; 
		this.onMarkerClick1 = this.onMarkerClick1.bind(this);
		this.onMarkerClick= this.onMarkerClick.bind(this);		
}

	componentDidMount(){
		
		console.log('debug search value',this.props.location.search.split('=')[1])
		orderid = this.props.location.search.split('=')[1];  
		console.log(orderid) 	
			
        fetch('https://t6kpja3x80.execute-api.us-east-1.amazonaws.com/prod/singleorderdetails',{
            method:'POST',
            body: JSON.stringify({OrderID:orderid }),
            headers:{
                'Content-Type': 'application/json'
            }
            }).then((response)=>{
                return response.json();
            }).then((jsonRes)=>{
                this.setState({
                    isLoading: false,
                    posts: {...jsonRes}
				})
				document.getElementsByClassName('_loading_overlay_wrapper--active')[0].style.display = 'none';
            }).catch((error)=>{
                console.log('order error',error);
            })      
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

	  componentWillUnmount(){
		if (this.timerHandle) {
		  clearTimeout(this.timerHandle);
		  this.timerHandle = 0;
		}
	  }

	toggle=()=>{
		this.setState((prevState)=>{
			return{dropdownOpen:!prevState.dropdownOpen};
		});
	}   

	render(){
		const { isLoading, posts } = this.state;
		var latt,lngg,latt1,lngg1,path,display;
		var Name, Name1;
		if(localStorage.getItem('role') === ttConfig.roleassign.dist.role){
			latt = ttConfig.roleassign.dcoordinates.lat;
			lngg = ttConfig.roleassign.dcoordinates.lng;
			latt1 = ttConfig.roleassign.dcoordinates.lat1;	
			lngg1 = ttConfig.roleassign.dcoordinates.lng1;
			Name = "ServiceProvider";
			Name1 = "Distributor";
			path = [{ lat: ttConfig.roleassign.dcoordinates.lat, lng: ttConfig.roleassign.dcoordinates.lng },
							{ lat: ttConfig.roleassign.dcoordinates.lat1, lng: ttConfig.roleassign.dcoordinates.lng1 }];
			display =<TrackDetails create={posts.CreatedAt}/>
		}
		if(localStorage.getItem('role') === ttConfig.roleassign.manu.role){
			latt = ttConfig.roleassign.mcoordinates.lat;
			lngg = ttConfig.roleassign.mcoordinates.lng;
			latt1 = ttConfig.roleassign.mcoordinates.lat1;	
			lngg1 = ttConfig.roleassign.mcoordinates.lng1;
			Name = "Manufacturer";
			Name1 = "Service Provider";
			path =  [{ lat: ttConfig.roleassign.mcoordinates.lat, lng: ttConfig.roleassign.mcoordinates.lng },
							 { lat: ttConfig.roleassign.mcoordinates.lat1, lng: ttConfig.roleassign.mcoordinates.lng1 }];
			display =<TrackDetails create={posts.CreatedAt}/>
		}
		if(localStorage.getItem('role') === ttConfig.roleassign.serv.role){
			latt = ttConfig.roleassign.scoordinates.lat;
			lngg = ttConfig.roleassign.scoordinates.lng;
			latt1 = ttConfig.roleassign.scoordinates.lat1;	
			lngg1 = ttConfig.roleassign.scoordinates.lng1;
			Name = "Manufacturer";
			Name1 = "Service Provider";
			path =  [{ lat: ttConfig.roleassign.scoordinates.lat, lng: ttConfig.roleassign.scoordinates.lng },
							 { lat: ttConfig.roleassign.scoordinates.lat1, lng: ttConfig.roleassign.scoordinates.lng1 }];
			display =<TrackDetails create={posts.CreatedAt}/>

		}
	const style = {
		width: '60vw',
		height: '50vh',
		'marginLeft': 'auto',
		'marginRight': 'auto'
	  }
      return( 
    	 <div class="container-fluid padding0">
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
				<p>Loading...</p>
	 		</LoadingOverlay>

        <Logout/>
		  <section class="content">
			<div class="col-lg-8 col-md-8 content">
				<h3 class="section-header"><Link to="/dashboard"><div className="btn btn-prim pull-right">Go to Dashboard</div></Link><br/><br/></h3>
				
				<p>Track Current Order</p><div class="col-lg-3 col-md-3">
				
				<Map
				item
				xs = { 12 }
				style={style}
				google = { this.props.google }
				onClick = { this.onMapClick }
				zoom = {4}
				initialCenter = {{ lat: ttConfig.roleassign.initialCenter.lat, lng: ttConfig.roleassign.initialCenter.lng }}
      >

		<Marker
          onClick = { this.onMarkerClick1}
          title =  {Name} 
          position = {{ lat: latt, lng: lngg }}
		  name = {Name}  
        />

		<Marker
          onClick = { this.onMarkerClick }
          title = { Name1 }
          position = {{ lat: latt1, lng: lngg1 }}
          name = { Name1 }
        />
	<Polyline path={path} options={{ strokeColor: "#000000 " }}/>
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
					<div class="padding-bottom20">
						<Table striped bordered hover>
						<tbody>
						<tr>
						<th><b>Order ID</b></th>
						<td>{posts.OrderID}</td>
						</tr>
						<tr>
						<th><b>Order Status</b></th>
						<td>{posts.OrderStatus}</td>
						</tr>
						<tr>
						<th><b>Order placed on</b></th>
						<td>{posts.CreatedAt}</td>
						</tr>
						<tr>
						<th><b>Transaction ID</b></th>
						<td>{posts.TransactionID1}</td>
						</tr>
						<tr>
						<th><b>Service Provider</b></th>
						<td>{posts.ServiceProvider}</td>
						</tr>
						<tr>
						<th><b>Product</b></th>
						<td>{posts.Product}</td>
						</tr>
						<tr>
						<th><b>Product Category</b></th>
						<td>{posts.Category}</td>
						</tr>
						<tr>
						<th><b>Quantity</b></th>
						<td>{posts.Quantity}</td>
						</tr>
						<tr>
						<th><b>Upgrade Product to 5G</b></th>
						<td>{posts.Upgradeto5G}</td>
						</tr>
						</tbody>
						</Table>
						</div>
					</div>
				</div>
			</div>		
					{display}
			
		</section>
        </div>          
);}
}
export default GoogleApiWrapper({
	apiKey: 'AIzaSyCBBI-PWfzZgdt_ssWRdibMuju_RH2BD8M'
  })(Trackorder);
