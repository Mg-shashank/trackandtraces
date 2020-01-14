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
import ProductName from './prodDetails/ProductName';
import Category from './prodDetails/Category';
import Distributor from './prodDetails/Distributor';
import Quantity from './prodDetails/Quantity';
import Upgrade from './prodDetails/Upgrade';
import DataTable, { createTheme } from 'react-data-table-component';
const request = require('request')
var https = require("https");
class Landingpage extends React.Component {
		constructor(props){
			super(props);
				this.state = {
				dropdownOpen:false,
				disabled : false,
				orderid:[],
				error: null,
      				isLoaded: false,
				allitems: [],
				singleitem: [],
				allitemss:[],
				ditems:[],
				orderData:[]
			}; 
		}		
		 render()
		{		console.log(this.state.orderData)
			return(
				<React.Fragment>
				<div className="product" width="300" height="200">
				<p style={{fontWeight:'bold'}}>Product:{<ProductName/>}</p>
				</div>
				<div id="product" width="200" height="100">
				</div>
				<div className="category" width="300" height="200">
				<p style={{fontWeight:'bold'}}>Category:<Category/></p>
				</div>
				<div id="category" width="200" height="100"></div>
				<div className="distributor" width="300" height="200">
				<p style={{fontWeight:'bold'}}>Distributor:<Distributor/></p>
				</div>
				<div id="distributor" width="200" height="100"></div>
				<div className="quantity" width="300" height="200">
				<p style={{fontWeight:'bold'}}>Quantity:<Quantity/></p>
				</div>
				<div id="quantity" width="200" height="100"></div>
				<div className="upgrade" width="300" height="200">
				<p style={{fontWeight:'bold'}}>Upgrade:<Upgrade/></p>
				</div>
				<div id="upgrade" width="200" height="100"></div>	
				</React.Fragment>						
			);
		}
}

export default withRouter(Landingpage);
