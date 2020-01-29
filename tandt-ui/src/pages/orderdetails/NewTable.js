import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import React, { useState } from 'react';
import $ from 'jquery'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
var o1 = new Array(localStorage.getItem('idss'))
const useStyles = makeStyles({table: {minWidth: 650}});
var e=localStorage.getItem('initiated')
var transactionid=localStorage.getItem("transactionid")
var createdat=localStorage.getItem("createdat")
var id;
 export default  class NewTable extends React.Component {
  constructor(props){
	  super(props);
    this.state = {
      status:'',
      isHidden: true, 
      idOrder:'',
      page:0,
      rowsPerPage:5,
      newPage:''
    }
    this.handleChange=this.handleChange.bind(this)
    this.acceptOrder=this.acceptOrder.bind(this)
    this.rejectOrder=this.rejectOrder.bind(this)
    this.toggleHidden=this.toggleHidden.bind(this)
    this.handleChangePage=this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage=this.handleChangeRowsPerPage.bind(this)
  }
  
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
  handleChangePage = (event, newPage) => {
    // setPage(newPage);
    this.setState({page:newPage})
  };

   handleChangeRowsPerPage = event => {
     this.setState({
      rowsPerPage:+event.target.value,
      page:0
     })    
  };
  redirectToOrdDetails(e,orderid) { 
    var url = "http://localhost:3000/#/orderdetails?ordid=" + orderid;
    window.location = url;    
  }
  // setCursorByID(id,cursorStyle){
  //  // console.log(id)
  //   var elem;
  //   if (document.getElementById &&
  //      (elem=document.getElementById(id)) ) {
  //    if (elem.style) elem.style.cursor=pointer;
  //   }
  //  }
  ///////////////////////////////////////////////////////////
  //  mouseover(elem) {
  //    console.log("MOUSE OVER")
  //    console.log(elem)
  //   elem.style.color = "white";
  // }

  acceptOrder(e,orderid) {       
    const data={"TransactionID":"1234abcd", "CreatedAt":"", "OrderStatus":"Order Accepted By Distributor" }
    e.preventDefault();
    // console.log('Accept Order Id :', orderid);        
        
        fetch('http://trackandt-Blockcha-OKH6MW7VYGQP-166143064.us-east-1.elb.amazonaws.com/batch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
              // console.log('Success:', data.transactionId);
              id=JSON.stringify(data.transactionId);
              var name=localStorage.getItem('name');
              //var day=dateFormat(new Date(), "yyyy-mm-dd");
            })
            .catch((error) => {
              console.error('Error:', error);
        });      

     
        $.ajax({
          url:"https://hscx60zx1c.execute-api.us-east-1.amazonaws.com/prod/entries1",
          type: 'POST',
          mode :'no-cors',
          data: JSON.stringify({OrderStatus: "Order Accepted By Distributor", OrderID: orderid,TransactionId:id }),
          cache: false,
          success: function(data) {
            // console.log(data)
            // Success..
          //  console.log('success', data);
          //  console.log('ID',id)
           var e = document.getElementById('status_' + orderid).innerHTML = "Order Accepted By Distributor" 
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
    // console.log('REJECT Order Id :', orderid);
    $.ajax({
      url:"https://hscx60zx1c.execute-api.us-east-1.amazonaws.com/prod/entries1",
      mode :'no-cors',
      type: 'POST',
      data:JSON.stringify({OrderStatus: "Order Rejected By Distributor", OrderID: orderid}),
      cache: false,
      success: function(data){
      // console.log(data)
      document.getElementById('status_'+ orderid).innerHTML="Order RejecteD";      
      }
    })
  }

  render(){  
     return (      
      <form class="form-horizontal" id="confirm">
      <Paper>
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
          {this.props.rowsss.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row =>  (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" > 
                <a 
                   onClick={(e) => this.redirectToOrdDetails(e, row.orderid)} 
                   target="_blank" 
                   onMouseOver={ function(event) { let target = event.target; target.style.color = 'blue'; target.style.cursor='pointer'; }}
                   onMouseOut={function(event) {let target = event.target; target.style.color = 'black';}}
                >
                {row.orderid}
                </a></TableCell>                
                <TableCell align="left" 
                           id={"status_" + row.orderid} 
                           value={this.state.status} 
                           onChange={this.handleChange}>
                           {row.orderstatus}
                </TableCell>                
                <TableCell align="left" id={"action_" + row.orderid}>                                                
                  <button class="btn"                
                  onClick={(e) => this.acceptOrder(e, row.orderid)}                            
                  id='accept'>                   
                  <button className="btn btn-sm btn-primary" 
                  id='accept'>
                  Accept
                  </button>                 
                  </button> &nbsp;&nbsp;
                  <br/> <br/>  
                  <button 
                    class="btn" 
                    onClick={(e) => this.rejectOrder(e, row.orderid)}                            
                    id='reject'>                    
                    <button className="btn btn-sm btn-danger" 
                    id='reject'>
                    Reject 
                    </button> 
                  </button>
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
      </form>    
    );
  }
}


