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
var id;

class CreateBatch extends React.Component {
	constructor(props){
	  super(props);
	  this.state = {
		batchquantity:'',
        details: {},
        loading:false,
	  };
    this._handleSubmit = this._handleSubmit.bind(this)    
    this._handleChangeq = this._handleChangeq.bind(this);
	}

	// Change state of input field so text is updated while typing
	  _handleChangeq(e) {
		  this.setState({
			batchquantity: e.target.value,
		  });
		}
	_handleSubmit(e) {
    var OrderID=this.props.location.state;
    var Quantity= this.props.location.state;

	  e.preventDefault();
	  this.setState({
    batchquantity:this.state.batchquantity,    
		loading:true,
    });
    
    var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"});
    usaTime = new Date(usaTime);
    var time=usaTime.toLocaleString()	

	const data = { 	
      
    BatchQuantity: this.state.batchquantity,      
    Distributor: $("#distributor").val(), 
    BatchCreatedOn: time,
    };
    console.log(data)
        fetch('http://trackandt-Blockcha-10MS595TSQEZ6-1475584145.us-east-1.elb.amazonaws.com/batch', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then((response) => response.json())
          .then((data) => {
              console.log(data)
                console.log('Success:', data.transactionId);
                id=JSON.stringify(data.transactionId);
                var name=localStorage.getItem('name');
                    const data2 = { 	
                    OrderID:OrderID,
                    Quantity: Quantity,
                    OrderStatus:'Order Accepted By Manufacturer',
                    BatchQuantity: this.state.batchquantity,      
                    Distributor: $("#distributor").val(), 
                    TransactionID2: id,
                    BatchStatus:"Batch Created but Not Accepted by Distributor",
                    BatchCreatedOn: time
                 };
                 console.log(id)
                 console.log(data2.TransactionID)
                fetch('https://hscx60zx1c.execute-api.us-east-1.amazonaws.com/prod/entries1', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                            },
                        body: JSON.stringify(data2),
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
    
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }
	
	render() { 
    console.log('Quantity',this.props.location.state)
    var orderid = this.props.location.state.OrderID;
    var quantity= this.props.location.state.Quantity;
    console.log(quantity);
    
        console.log('data', this.props.location.state);

       console.log(orderid)
	  return (
		<div class="container-fluid padding0">
        <Logout/>	
		  <section class="content">
		
			<h3 class="section-header">Create Batch</h3>
			<div class="col-lg-12 col-md-12 place-order">
			<div class="padding-bottom20">

			</div>
				
			<form class="form-horizontal" onSubmit={this._handleSubmit} id="formContact">
			<div class="col-lg-7 col-md-7">
			<div class="form-group col-md-8" >

            <div>
            <label class="form-label"><b>Order ID : </b></label>
            <p style={{backgroundColor:'white'}}>{orderid}</p>
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
				<label class="form-label"><b>Product Quantity : </b></label>
        <p style={{backgroundColor:'white'}}>{quantity}</p>        
        </div>

			<div class="form-group col-md-8" >
				<label class="form-label"><b>Batch Quantity : </b></label>
				<input type="number" name="num" pattern="[1-9]" title="Numbers only" class="form-control" value={this.state.Quantity}  required/>				
        
			</div>
            </div>		
			
		    <div class="col-lg-12 col-md-12 text-right">
				<Link to="/orderdetails"><div class="btn btn-cancel">Cancel</div></Link>&nbsp;&nbsp;&nbsp;
				<input type="submit" value="Create Batch"  className="btn btn-prim" align="center" float="right" id="btn-submit" disabled={this.state.loading}></input>
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
