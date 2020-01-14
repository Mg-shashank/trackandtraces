import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React, { useState } from 'react';
var o1 = new Array(localStorage.getItem('idss'))
const useStyles = makeStyles({table: {minWidth: 650}});

 export default function SimpleTable(props) {
   const[disabled,setdisabled]=useState(false)
   const classes = useStyles();
   console.log(props);    
   const {rowss} = props;
   console.log({rowss})
   const a = rowss.map((data)=>data.orderstatus)
   console.log(a)
  //  console.log(JSON.stringify(a))
  //  var b = JSON.stringify(a)
  //  if( rowss.map((data)=>data.orderstatus) === "Order Initiated" ){
  //    console.log('ORDER INITIATED DATA')
  //  }
  //  else{
  //    console.log("ORDER ACCEPTED DATA")
  //  }
   for(let j=0 ; j<a.length ; j++){
     console.log(JSON.stringify(a[j]))
    if (a[j].value === "Order Accepted") {
      console.log("TRUE")} else {
      console.log('FALSE')}
   }
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell align="left">Accept/Reject</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {rowss.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">{row.orderid}</TableCell>                
                <TableCell align="left">{row.orderstatus}</TableCell>
                <TableCell align="left"><span> 
                            <button class="btn btn-sm btn-primary" 
                            //onClick={()=>setdisabled(disabled=true)}
                            //disabled={this.state.disabled} 
                            id='accept'>
			                      Accept
                            </button> <br/> <br/>
                            <button class="btn btn-sm btn-danger" 
                            //onClick={()=>setdisabled(disabled=true)} 
                            //disabled={this.state.disabled} 
                            id='reject'>
				                    Reject
                           </button></span>
                </TableCell> 
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
