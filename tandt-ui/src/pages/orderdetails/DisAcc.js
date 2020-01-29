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
import TablePagination from '@material-ui/core/TablePagination';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
// var o1 = new Array(localStorage.getItem('idss'))
const useStyles = makeStyles({table: {minWidth: 650}});
// var e=localStorage.getItem('initiated')
// var transactionid=localStorage.getItem("transactionid")
// var createdat=localStorage.getItem("createdat")
 export default  class DisAcc extends React.Component {
  constructor(props){
	  super(props);
    this.state = {
      status:'',
      isHidden: true,
      page:0,
      rowsPerPage:5,
      newPage:''
    }
    this.handleChange=this.handleChange.bind(this)
    // this.acceptOrder=this.acceptOrder.bind(this)
    // this.rejectOrder=this.rejectOrder.bind(this)
    this.toggleHidden=this.toggleHidden.bind(this)
    this.handleChangePage=this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage=this.handleChangeRowsPerPage.bind(this)
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
              </TableRow>
          </TableHead>
          <TableBody>          
          {this.props.dist.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row =>  (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">{row.orderid}</TableCell>                
                <TableCell align="left" 
                           id={"status_" + row.orderid} 
                           value={this.state.status} 
                           onChange={this.handleChange}>
                           {row.orderstatus}
                </TableCell>                                                 
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,7]}
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


