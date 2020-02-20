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
        posts: {},
	  };
	  this._handleSubmit = this._handleSubmit.bind(this);
      this._handleChangeq = this._handleChangeq.bind(this);
	}

	// Change state of input field so text is updated while typing
	  _handleChangeq(e) {
		  this.setState({
			batchquantity: e.target.value,
		  });
    }
    componentDidMount(){
      var orderid = this.props.location.search.split('=')[1];  
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
	_handleSubmit(e) {
    
    var OrderID=this.state.posts.OrderID;
	  e.preventDefault();
	  this.setState({
		batchquantity:this.state.batchquantity,
		loading:true,
    });
    var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"});
    usaTime = new Date(usaTime);
    var time=usaTime.toLocaleString()
    var batchid="batch_"+Math.random().toString().slice(2,11); 
	const data = { 	
       OrderID:OrderID,
       BatchID:batchid,
       BatchCreatedOn:time,
       OrderStatus:'Batch created and Routed to Distributor',
       BatchQuantity: this.state.batchquantity,      
       Distributor: $("#distributor").val(), 
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
                    BatchID:batchid,
                    BatchCreatedOn:time,   
                    OrderStatus:'Batch created and Routed to Distributor',
                    BatchQuantity: this.state.batchquantity,      
                    Distributor: $("#distributor").val(), 
                    TransactionID2: id
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
                    // let id = this.props.location.state;
                    // this.props.history.push({pathname:'/batchdetails',state:details})
                    var url = `/batchdetails?ordid=${OrderID}`;
                    this.props.history.push(`${url}`);  
                  
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
         const {posts} = this.state;
           
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
            <p style={{backgroundColor:'white'}}>{posts.OrderID}</p>
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
        <p style={{backgroundColor:'white'}}>{posts.Quantity}</p>

				</div>
			
			<div class="form-group col-md-8" >
				<label class="form-label"><b>Batch Quantity : </b></label>
				<input type="number"  min="1" max="99999" maxLength="5"  class="form-control" value={this.state.batchquantity} onChange={this._handleChangeq} required/>					
			</div>
            </div>		
			
		    <div class="col-lg-12 col-md-12 text-right">
				<Link to="/orderdetails"><div class="btn btn-cancel">Cancel</div></Link>&nbsp;&nbsp;&nbsp;
				<input type="submit" value="Create Batch" className="btn btn-prim" id="btn-submit"></input>
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
