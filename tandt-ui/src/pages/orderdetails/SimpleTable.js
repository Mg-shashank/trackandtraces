import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Landingpage from '../trackorder/trackorder'
import Paper from '@material-ui/core/Paper';
import ReactDataTablePagination from 'react-datatable-pagination'
import React, { useState } from 'react';
import $ from 'jquery'
import trackorder from "../trackorder/trackorder";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
var o1 = new Array(localStorage.getItem('idss'))
const useStyles = makeStyles({table: {minWidth: 650}});
var e=localStorage.getItem('initiated')
var transactionid=localStorage.getItem("transactionid")
var createdat=localStorage.getItem("createdat")
var l,i,j,k;
var id;

 export default  class SimpleTable extends React.Component {
  constructor(props){
	  super(props);
    this.state = {
      status:'',
      isHidden: true,
      idOrder:'',
      page:0,
      rowsPerPage:5,
      newPage:'',
      details:{}
    }
    this.handleChange=this.handleChange.bind(this)
    this.acceptOrder=this.acceptOrder.bind(this)
    this.rejectOrder=this.rejectOrder.bind(this)
    this.toggleHidden=this.toggleHidden.bind(this)
    this.handleChangePage=this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage=this.handleChangeRowsPerPage.bind(this)
    // this.Details=this.Details.bind(this)
  }
   handleChangePage = (event, newPage) => {
    // setPage(newPage);
    this.setState({page:newPage})
  };

   handleChangeRowsPerPage = event => {
     this.setState({ rowsPerPage:+event.target.value,  page:0
     })    
  };

  handleChange=(e)=>{
    this.setState({
		  status: e.target.value,
    });
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  } 
  
  redirectToOrdDetails(e,orderid) 
  { 
    var url = "http://localhost:3000/#/orders?ordid=" + orderid;
    window.location = url;      
  }

  acceptOrder(e,orderid) {      
    const data={"TransactionID":localStorage.getItem('id'), "CreatedAt":"" ,"OrderStatus":"Order Accepted By Manufacturer"}
    e.preventDefault();
    // console.log('Accept Order Id :', orderid);        
        
        fetch('http://trackandt-Blockcha-OKH6MW7VYGQP-166143064.us-east-1.elb.amazonaws.com/batch', {
          method: 'POST',
          headers: 
          {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),          
        })
        // console.log(data)
        .then((response) => response.json())
        .then((data) => {
              // console.log('Success:', data.transactionId);
              id=JSON.stringify(data.transactionId);
              var name=localStorage.getItem('name');
              //var day=dateFormat(new Date(), "yyyy-mm-dd");
            })
            .catch((error) => {
              // console.error('Error:', error);
        });      

     
        $.ajax({
          url:"https://hscx60zx1c.execute-api.us-east-1.amazonaws.com/prod/entries1",
          type: 'POST',
          mode :'no-cors',
          data: JSON.stringify({OrderStatus: "Order Accepted By Manufacturer", OrderID: orderid,TransactionID:id }),
          cache: false,
          success: function(data) {
            // console.log(data)
            // Success..
          //  console.log('success', data);
            console.log('ID',id)
           var e = document.getElementById('status_' + orderid).innerHTML = "Order Accepted By Manufacturer" 
      var trackBtn = document.createElement("button");
      trackBtn.innerHTML = "Track"
      document.getElementById('action_'+ orderid).innerHTML=""
      document.getElementById('action_'+ orderid).appendChild(trackBtn);
      document.getElementById('action_'+ orderid);
          //  var o = data;
          //  var c = JSON.parse(o.OrderDetails.S);
          //  console.log('success', c.Product);          
          //  localStorage.setItem('orderstatus',data.OrderStatus.S);
          //  localStorage.setItem('Tid',data.TransactionId.S); 
          }.bind(this),
          // Fail..
          error: function(xhr, status, err,data) {
            // console.log(xhr, status);
            // console.log(err);
            // console.log(data);      
          }.bind(this)
        });  
      
      // Fail..
      // error: function(xhr, status, err) {
      //   console.log(xhr, status);
      //   console.log(err);  
      // }.bind(this)      
    //});   
  }

  rejectOrder(e, orderid) {
    e.preventDefault();
    console.log('REJECT Order Id :', orderid);
    $.ajax({
      url:"https://hscx60zx1c.execute-api.us-east-1.amazonaws.com/prod/entries1",
      mode :'no-cors',
      type: 'POST',
      data:JSON.stringify({OrderStatus: "Order Rejected By Manufacturer", OrderID: orderid,}),
      cache: false,
      success: function(data){
      // console.log(data)
      document.getElementById('status_'+ orderid).innerHTML="Order Rejected ";    
      var traceBtn = document.createElement("button");
      traceBtn.innerHTML = "Trace"
      document.getElementById('action_'+ orderid).innerHTML=""
      document.getElementById('action_'+ orderid).appendChild(traceBtn);
      //document.getElementById('action_'+ orderid).href = "http://localhost:3000/#/traceorder";        
      //var id = localStorage.setItem('rejectorderid', orderid)  
      }
    })
  } 

  render(){  
    //  i=this.props.rowss.map(row=>({orderid:row.orderid, orderstatus:row.orderstatus}));
    // console.log(JSON.stringify(i))
    // console.log(i.length)
    // for( j=0;j<=i.length-1;j++){
    //   console.log(i[j])
    //    k=i[j]
    //   console.log(k)
    // }
    // console.log(this.state.newPage)
     return (      
      <form class="form-horizontal" id="confirm">
       <Paper>    
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight:'bold'}}>Order Id </TableCell>
              <TableCell style={{fontWeight:'bold'}}>Order Status</TableCell>
              <TableCell align="left" style={{fontWeight:'bold'}}>Accept/Reject</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>          
          {this.props.rowss.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row =>  (          
              <TableRow key={row.id}>
                <TableCell component="th" scope="row"> 
                  <a 
                   onClick={(e) => this.redirectToOrdDetails(e, row.orderid)} 
                   target="_blank"
                   onMouseOver={ function(event) { let target = event.target; target.style.color = 'blue';target.style.cursor='pointer'; }}
                   onMouseOut={function(event) {let target = event.target; target.style.color = 'black';}}
                   >                    
                   {row.orderid}
                 </a> </TableCell>                
                <TableCell align="left" 
                   id={"status_" + row.orderid} 
                   value={this.state.status} 
                   onChange={this.handleChange}>
                   {row.orderstatus}
                </TableCell>                
                <TableCell align="left">
                  <span id={"action_" + row.orderid}>                                                
                  <button 
                  className="btn btn-sm btn-primary"                
                  onClick={(e) => this.acceptOrder(e, row.orderid)}                            
                  id='accept'>                
                  Accept                                 
                  </button> &nbsp;&nbsp;
                  <br/> <br/>  
                   <button 
                   className="btn btn-sm btn-danger" 
                   onClick={(e) => this.rejectOrder(e, row.orderid)}                            
                   id='reject'>                                      
                  Reject                   
                   </button>                   
                   </span>
                </TableCell>                                
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> 
      <TablePagination
        rowsPerPageOptions={[5,10,15]}
        component="div"
        count={[10]}
        rowsPerPage={this.state.rowsPerPage}
        page={this.state.page}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
      />
       </Paper>  
     {/* <button onClick={this.Details()}> Click </button> */}    
      </form>       
    );
  }
}


