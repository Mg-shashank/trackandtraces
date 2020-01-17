import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React, { useState } from 'react';
import $ from 'jquery'
var o1 = new Array(localStorage.getItem('idss'))
const useStyles = makeStyles({table: {minWidth: 650}});
var e=localStorage.getItem('initiated')
 export default  class SimpleTable extends React.Component {
  constructor(props){
	  super(props);
    this.state = {
      status:''
    }
    this.handleChange=this.handleChange.bind(this)
    this.acceptOrder=this.acceptOrder.bind(this)
    this.rejectOrder=this.rejectOrder.bind(this)
  }
  handleChange=(e)=>{
    this.setState({
		  status: e.target.value,
		});
  }
  acceptOrder(e, orderid) {
    e.preventDefault();
    console.log('Accept Order Id :', orderid);
    $.ajax({
      url:"https://hscx60zx1c.execute-api.us-east-1.amazonaws.com/prod/entries1",
      mode :'no-cors',
      type: 'POST',
      data:JSON.stringify({OrderStatus: "Order Accepted", OrderID: orderid}),
      cache: false,
      success: function(data){
      console.log(data)
      document.getElementById('status_'+orderid).innerHTML="Order Accepted"
      }
    })
  }
  rejectOrder(e, orderid) {
    e.preventDefault();
    console.log('REJECT Order Id :', orderid);
    $.ajax({
      url:"https://hscx60zx1c.execute-api.us-east-1.amazonaws.com/prod/entries1",
      mode :'no-cors',
      type: 'POST',
      data:JSON.stringify({OrderStatus: "Order Rejected", OrderID: orderid}),
      cache: false,
      success: function(data){
      console.log(data)
      document.getElementById('status_'+ orderid).innerHTML="Order Rejected"
      }
    })
  }
  render(){  
     return (
      <form class="form-horizontal" id="confirm">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight:'bold'}}>Order Id </TableCell>
              <TableCell style={{fontWeight:'bold'}}>Order Status</TableCell>
              <TableCell align="left" style={{fontWeight:'bold'}}>Accept/Reject</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {this.props.rowss.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">{row.orderid}</TableCell>                
                <TableCell align="left" 
                  id={"status_" + row.orderid} 
                  value={this.state.status} 
                  onChange={this.handleChange}>
                  {row.orderstatus}
                </TableCell>
                <TableCell align="left"><span>                 
                  <button class="btn btn-sm btn-primary" 
                  onClick={(e) => this.acceptOrder(e, row.orderid)}                            
                  id='accept'> Accept </button> 
                  <br/> <br/>                
                  <button class="btn btn-sm btn-danger" 
                  onClick={(e) => this.rejectOrder(e, row.orderid)}                            
                  id='reject'> Reject </button>  
                  <br/> <br/>                        
                  </span>                           
                </TableCell>                                
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </form>
    );
  }
 }
