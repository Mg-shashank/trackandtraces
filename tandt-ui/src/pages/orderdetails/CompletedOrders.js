import React from 'react';
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
import $ from 'jquery'
import Logout from '../login/Logout';
import trackorder from "../trackorder/trackorder";
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from "react-router-dom";
const request = require('request');
var https = require("https");

const classes = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    }
  }));


export default class CompletedOrders extends React.Component{    
    constructor(props){
        super(props)
        this.state={
        orderData:[],
        status:'',
        isHidden: true,
        idOrder:'',
        page:0,
        rowsPerPage:5,
        newPage:'',
        details:{},
        visibility: false
      }
        this.toggleVisibility=this.toggleVisibility.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.toggleHidden=this.toggleHidden.bind(this)
        this.handleChangePage=this.handleChangePage.bind(this)
        this.handleChangeRowsPerPage=this.handleChangeRowsPerPage.bind(this)
    }
    componentDidMount(){
        fetch('https://rvpkp45prc.execute-api.us-east-1.amazonaws.com/prod/OrderFinishedData', {
            method:'GET',
            headers: {
            'Content-Type':'application/json',},
                })   
                  .then((response) =>response.json())
                         .then((data) => {
                            console.log(data);
                            const optimizedData = data.map(data=>({OrderID: data.OrderID.S,BatchID: data.BatchID.S,OrderStatus: data.OrderStatus.S,Product:data.Product.S,BatchQuantity:data.BatchQuantity.S,CreatedAt:data.CreatedAt.S}));
                            console.log('optiminzed data',optimizedData);
                            this.setState({orderData: optimizedData})
                              console.log(this.state.orderData)
                         })
                  .catch((error) => {
                  console.error('Error:', error);
                  });
      }
        toggleVisibility=()=>{  
      this.setState((prevState) =>{
        return { visibility:!prevState.visibility }
      });
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

        render(){  
           console.log(this.state.orderData)
              return (      
                <React.Fragment>
                <div className={classes.root}>
                <div className="container-fluid padding0">		
                <section class="content">
                Completed Order Details
                <br/>
                <br/>
              <form class="form-horizontal" id="confirm">
               <Paper>    
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                    <TableCell style={{fontWeight:'bold'}}>Order Id </TableCell>
                      <TableCell style={{fontWeight:'bold'}}>Batch Id </TableCell>
                      <TableCell style={{fontWeight:'bold'}}>Order Status</TableCell>
                      <TableCell style={{fontWeight:'bold'}}>Product</TableCell>
                      <TableCell style={{fontWeight:'bold'}}>Batch Quantity</TableCell>
                      <TableCell style={{fontWeight:'bold'}}>Created At</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>          
                  {this.state.orderData.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row =>  (          
                      <TableRow key={row.id}>
                      <TableCell component="th" scope="row">                          
                           {row.OrderID}
                         </TableCell> 
                        {/* <TableCell component="th" scope="row">                        
                           {row.BatchID}
                      </TableCell>                 */}
                        <TableCell align="left" 
                           id={"status_" + row.OrderID} 
                           value={this.state.status} 
                           onChange={this.handleChange}
                          >
                           {row.OrderStatus}
                           </TableCell>
                           <TableCell>{row.Product}</TableCell>
                           <TableCell>{row.BatchQuantity}</TableCell>
                           <TableCell>{row.CreatedAt}</TableCell>

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
              <br/><br/>
              {/* <Link to="/dashboard">
                    <button className="btn btn-primary pull-right">Go To Dashboard</button>
              </Link>    */}
              </section>      
              </div>  
              </div>  
              </React.Fragment>
            );
      }
}

