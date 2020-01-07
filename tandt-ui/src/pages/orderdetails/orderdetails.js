import React, {} from "react";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
// import { Menu, Dropdown, Icon } from 'antd';
import logo from "./images/brillio-logo.png";
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import usericon from "./images/user-icon.svg";
import rect from "./images/rect.svg"
import router from "./images/router.png"
import "./dashboard.scss";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

var image=localStorage.getItem('profile-picture');
var name=localStorage.getItem('name');
var orderStatus;
    class Landingpage extends React.Component {
			constructor(props){
				super(props);
				this.toggle= this.toggle.bind(this);
				this.state = {
					dropdownOpen:false,
					disabled : false
				}; 
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
		handleClicks=(e)=>{

		}
						
			 componentDidMount(){
				var APIURL="https://njm54jxya2.execute-api.us-east-1.amazonaws.com/prod/entries";
					var API_URL="https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/createorder";
								$(document).ready(function(){
								$.ajax({
									type:'GET',
									url: API_URL,
									success:function(data){
		 								$('#transactionid').html('');
										$('#createdat').html('');							
										$('#distributor').html('');
										$('#vendorname').html('');
										$('#quantitywithvendor').html('');
										$('#orderid').html('');
										$('#orderdetails').html('');
										$('#status').html('');
										console.log(data);
										console.log("hello")
										data.Items.forEach(function(createorderdisplayitem)
										{
										$('#orderid').append('<p>'+ createorderdisplayitem.OrderID.S + '</p>')
										$('#orderdetails').append('<p>'+ createorderdisplayitem.OrderDetails.S + '</p>')
										$('#transactionid').append('<p>'+ createorderdisplayitem.TransactionID.S +'</p>')
										$('#createdat').append('<p>'+createorderdisplayitem.CreatedAt.S+'</p>')
										$('#orderstatus').append('<p>'+createorderdisplayitem.OrderStatus.S+'</p>')
										$("#distributor").append('<p>'+createorderdisplayitem.Distributor.S+'</p>')
										})										
								}
							});
						});
						$('#reject').on('click',function(){
							$.ajax({
								type:'POST',
								url:APIURL,
								data: JSON.stringify({'rejection':"Order Rejected"}),
								contentType:"application/json",
								/*success: function(data){
									window.location.reload();
								}*/
							})
							return false;
						})	
						$('#accept').on('click',function(){
							$.ajax({
								type:'POST',
								url:APIURL,
								data: JSON.stringify({'acceptance':"Order Accepted"}),
								contentType:"application/json",
							
							})
							return false;
						})
				}
					
					disabling(){
						document.getElementById('reject').disabled=true;
						document.getElementById('accept').disabled=true;
					}
			render(){
      return(
        <div className="container-fluid padding0">
        <header>
          <span className="logo"><img className="logoImage" src={logo} alt="Brillio logo" width="125px"/>
          </span>				
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
					<section class="content">
					<div class="col-lg-3 col-md-3" id="images">
					<img src={router} alt="device" class="rect" width="100" height="100"/>
					</div>
					<div className="transactionid" width="300" height="200"><p style={{fontWeight:'bold'}}>Transaction ID:</p></div>
					<div id="transactionid" width="200" height="100"></div>
					<div className="orderid" width="300" height="200"><p style={{fontWeight:'bold'}}>Order ID:</p></div>
					<div id="orderid" width="200" height="100"></div>
					<div className="orderdetails" width="300" height="200"><p style={{fontWeight:'bold'}}>Order Details:</p></div>
					<div id="orderdetails" width="200" height="100"></div>
					<div className="createdat" width="300" height="200"><p style={{fontWeight:'bold'}}>Created At:</p></div>
					<div id="createdat" width="200" height="100"></div>
					<div className="orderstatus" width="300" height="200"><p style={{fontWeight:'bold'}}>OrderStatus:</p></div>
					<div id="orderstatus" width="200" height="100"></div>
					<div className="orderstatuess" width="300" height="200"><p style={{fontWeight:'bold'}}>OrderStatus:</p></div>
					<div id="orderstatuses" width="200" height="100"></div>
					<div className="distributor" width="300" height="200"><p style={{fontWeight:'bold'}}>Distributor:</p></div>
					<div id="distributor" width="200" height="100"></div>
					<div class="col-sm-12 text-right">
					<button class="btn btn-danger" onClick={this.handleClick} disabled={this.state.disabled} id='reject'>
					Reject</button>&nbsp;&nbsp;					
    		  <button class="btn btn-primary" onClick={this.handleClicks} disabled={this.state.disabled} id='accept'>
					Accept</button>
        </div>
				<div class="col-md-4 text-left">
				  <Link to="/createorder"><button class="btn btn-small btn-cancel">Cancel</button></Link>&nbsp;&nbsp;
					<Link to="/trackorder"><button class="btn btn-primary">Track Order</button></Link>
				</div>
					</section>
  </div>
  );
}
}
export default withRouter(Landingpage);
