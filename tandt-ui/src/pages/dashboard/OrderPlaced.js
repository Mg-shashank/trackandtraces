import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import $ from 'jquery'
import Logout from '../login/Logout';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from "react-router-dom";
var o1 = new Array(localStorage.getItem('idss'))
const useStyles = makeStyles({table: {minWidth: 650}});
var e=localStorage.getItem('initiated')
const request = require('request');
var https = require("https");

 class OrderPlaced extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status:'',
      isHidden: true, 
      idOrder:'',
      page:0,
      rowsPerPage:5,
      newPage:'',
      orders:'',
      orderData:[]
    }
    this.handleChange=this.handleChange.bind(this)
    this.toggleHidden=this.toggleHidden.bind(this)
    //  this.acceptOrder=this.acceptOrder.bind(this)
    //  this.rejectOrder=this.rejectOrder.bind(this)
    this.handleChangePage=this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage=this.handleChangeRowsPerPage.bind(this)
  }

  componentDidMount(){
  var request = https.get("https://82aru5m82k.execute-api.us-east-1.amazonaws.com/prod/entries1",
  (response)=>{
  if (response.statusCode !== 200)
  {
      console.log("Error while getting the data");
  } 			
  response.on('data',(data)=> {		
      var jsonData = JSON.parse(data);	
      console.log(jsonData);				
      var datas = jsonData.data.Items;          
      console.log('first data response!!!',datas)
      
      const optimizedData = datas.map(data=>({orderid: data.OrderID.S,orderstatus: data.OrderStatus.S,Product:data.Product.S,Quantity:data.Quantity.S,distributor:data.Distributor.S,createdat:data.CreatedAt.S}));
     this.setState({orderData:optimizedData})
      // this.setState({orderData: datas})
        console.log(this.state.orderData)
  });
});
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

  redirectToOrdDetails(e,orderid) 
  { 
    var url = `/ordersforsp?ordid=${orderid}`;
    this.props.history.push(`${url}`);   
  }
  
   render(){  

    console.log(this.state.orderData)
     return (      
      <form class="form-horizontal" id="confirm">
        <div className="container-fluid padding0">       
       <Logout/> 
        </div>
      <Paper>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell align="center" style={{fontWeight:'bold'}}>Order Id </TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>Product</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>Quantity</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>Created At</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>Order Status</TableCell>              
             </TableRow>
          </TableHead>
          <TableBody>                      
          {this.state.orderData.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
            .map(row =>  ( 
               <TableRow  hover key={row.id}>
                  <TableCell  component="th" scope="row" align="center"> 
                  <a 
                   onClick={(e) => this.redirectToOrdDetails(e, row.orderid)} 
                   target="_blank"
                   onMouseOver={ function(event) { let target = event.target; target.style.color = 'blue';target.style.cursor='pointer'; }}
                   onMouseOut={function(event) {let target = event.target; target.style.color = 'black';}}
                     >                    
                   {row.orderid}
                 </a> </TableCell>
              
                <TableCell align="center">               
                {row.Product}       
                </TableCell>   
                <TableCell align="center">
                {row.Quantity}       
                </TableCell>    
                  <TableCell align="center">{row.createdat}</TableCell>  
                 <TableCell align="center" 
                   id={"status_" + row.batchid} 
                   value={this.state.status} 
                   onChange={this.handleChange}>
                   {row.orderstatus}
                </TableCell> 
                {/* <TableCell  id={"action_" + row.batchid}>                                                
                  <button class="btn"                
                  onClick={(e) => this.acceptOrder(e, row.batchid, row.orderid)}                            
                  id='accept'>                   
                  <button className="btn btn-sm btn-primary" 
                  id='accept'>
                  Accept
                  </button>                 
                  </button> &nbsp;&nbsp;
                  <br/> <br/>  
                  <button 
                    class="btn" 
                    onClick={(e) => this.rejectOrder(e, row.batchid,row.orderid)}                            
                    id='reject'>                    
                    <button className="btn btn-sm btn-danger" 
                    id='reject'>
                    Reject 
                    </button> 
                  </button>
                    </TableCell>                                  */}
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
        onChangeRowsPerPage={this.handleChangeRowsPerPage} />   
         <div class="col-lg-12 col-md-12 text-right">
				<Link to="/dashboard"><div class="btn btn-cancel">Go back to Dashboard</div></Link>
				{/* <input type="submit" value="Create Batch"  className="btn btn-prim" align="center" float="right" id="btn-submit" disabled={this.state.loading}></input> */}
			</div>   
       </Paper>
      </form>    
    );
  }
}

export default withRouter(OrderPlaced)

