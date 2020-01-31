import React, {useState, Component }  from "react";
import { withRouter,Link ,Route} from "react-router-dom";
import { Redirect } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import logo from "./images/brillio-logo.png";
import usericon from "./images/user-icon.svg";
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import "./dashboard.scss";
import Logout from '../login/Logout';
import $ from "jquery";
var image=localStorage.getItem('profile-picture');
var name=localStorage.getItem('name');

class CreateBatch extends React.Component {
	constructor(props){
	  super(props);
	  this.state = {
		batchquantity:'',
        details: {},
        loading:false,
	  };
	  this._handleSubmit = this._handleSubmit.bind(this);
      this._handleChangeq = this._handleChangeq.bind(this);
	}
	componentDidMount(){
        let date_ob = new Date();
		let date = ("0" + date_ob.getDate()).slice(-2);
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		let year = date_ob.getFullYear();
		
		let day=date+"/"+month+"/"+year;
	   
		
		let hours = date_ob.getHours();
		let minutes = date_ob.getMinutes();
		let seconds = date_ob.getSeconds();
		
		let time=hours+":"+minutes+":"+seconds;
	  
		let dates=day+" "+time;
		console.log(dates);
        // console.log('debug search value',this.props.location.search.split('=')[1])
        // var orderid = this.props.location.search.split('=')[1];        
	}
	// Change state of input field so text is updated while typing
	  _handleChangeq(e) {
		  this.setState({
			batchquantity: e.target.value,
		  });
		}
	_handleSubmit(e) {
		
	  e.preventDefault();
	  this.setState({
		batchquantity:this.state.batchquantity,
		loading:true,
	  });
	  let date_ob = new Date();
	  let date = ("0" + date_ob.getDate()).slice(-2);
	  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
	  let year = date_ob.getFullYear();
	  
	  let day=date+"/"+month+"/"+year;
	 
	  
	  let hours = date_ob.getHours();
	  let minutes = date_ob.getMinutes();
	  let seconds = date_ob.getSeconds();
	  
	  let time=hours+":"+minutes+":"+seconds;
	
	  let dates=day+" "+time;
	  console.log(dates);

	const data = { 	
       OrderID:this.props.location.state,
       BatchQuantity: this.state.batchquantity,      
    //    Distributor: $("#distributor").val(), 
    };
    console.log(data)

    fetch('https://hscx60zx1c.execute-api.us-east-1.amazonaws.com/prod/entries1', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
            },
        body: JSON.stringify(data),  
        })
    .then((response) => response.json())
    .then((data2) => {
        console.log('Success:', data2);
    let details = data2;
    let id = this.props.location.state;
    this.props.history.push({pathname:'/batchdetails',state:details})
        })
    .catch((error) => {
        console.error('Error:', error);
        });
    }
	
	render() { 
        console.log('OrderID', this.props.location.state);
       var orderid = this.props.location.state;
       console.log(orderid)
	  return (
		<div class="container-fluid padding0">
        <Logout/>	
		  <section class="content">
		
			<h3 class="section-header">Create Batch</h3>
			<div class="col-lg-12 col-md-12 place-order">
			<div class="padding-bottom20">
			{/* <div><h2><b>{routers}</b></h2><br/></div> */}
			</div>
				
			<form class="form-horizontal" onSubmit={this._handleSubmit} id="formContact">
			<div class="col-lg-7 col-md-7">
			<div class="form-group col-md-8" >
            <div>
            <label class="form-label"><b>Order ID : </b></label>
            <p style={{backgroundColor:'white'}}>{this.props.location.state}</p>
            </div>
			<div class="padding-bottom20">
            <label class="form-label"><b>Distributor : </b></label>
				<select class="form-control" id="distributor">
					<option>Andrew Robertson</option>
					<option default>Harry Smith</option>
					<option>Joshua Williams </option>
				</select>
			</div>
			
			<div class="form-group col-md-8" >
				<label class="form-label"><b>Batch Quantity : </b></label>
				<input type="number"  class="form-control" value={this.state.batchquantity} onChange={this._handleChangeq} required/>					
			</div>
            </div>		
			
		    <div class="col-lg-12 col-md-12 text-right">
				<Link to="/dashboard"><div class="btn btn-cancel">Cancel</div></Link>&nbsp;&nbsp;&nbsp;
				<input type="submit" value="CreateBatch" className="btn btn-prim" id="btn-submit" disabled={this.state.loading}></input>
			</div>
			</div>
			</form>
		  </div>
		  </section>
		</div>
	  )
	}
  }
  
  export default CreateBatch;
