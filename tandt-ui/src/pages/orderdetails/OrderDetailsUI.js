import React,{} from "react";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import logo from "./images/brillio-logo.png";
import rect from "./images/rect.svg"
import router from "./images/router.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './Table'
import trackorder from "../trackorder/trackorder";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Logout from '../login/Logout';
import ttConfig from '../../config.js'
var roles = localStorage.getItem('role')

class OrderID extends React.Component{  	
   render(){
			var display;			
			if(localStorage.getItem('role') === ttConfig.roleassign.serv.role ){
				display=<Table />				
				}
			else if(localStorage.getItem('role') === ttConfig.roleassign.dist.role)
				{	
				display=<Table />																				
				}
			else if(localStorage.getItem('role') === ttConfig.roleassign.manu.role ){	
				display=<Table />	
				}
			return(			
				<React.Fragment>	
				<div className="container-fluid padding0">			
     		<Logout/>		
		 		<div className="col-lg-12 col-md-12">
	 			{display}
				</div>	
			 	<br/>
				</div>			
				</React.Fragment>		
			)
		}
	} 

export default withRouter(OrderID);
