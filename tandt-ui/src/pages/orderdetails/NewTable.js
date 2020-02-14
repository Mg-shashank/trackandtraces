import React, { useState } from 'react';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import PropTypes from "prop-types";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import $ from 'jquery'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import ttConfig from '../../config.js'
var e=localStorage.getItem('initiated')
var transactionid=localStorage.getItem("transactionid")
var createdat=localStorage.getItem("createdat")
var id,url;
var Batchid;
let isSelected;

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  // console.log(ttConfig.name.assign)
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            // inputProps={{ "aria-label": "select all desserts" }}
            />
        </TableCell>
        <TableCell align="center" style={{fontWeight:'bold'}}>Order ID </TableCell>
        <TableCell align="center" style={{fontWeight:'bold'}}>Order Status</TableCell>
        <TableCell align="center" style={{fontWeight:'bold'}}>Product</TableCell>
        <TableCell align="center" style={{fontWeight:'bold'}}>Batch Quantity</TableCell>
        <TableCell align="center" style={{fontWeight:'bold'}}>Created At</TableCell>
        </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc","desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten('#2d06f0',0.1)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: "1 1 100%"
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
        Order Details
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [toggling,setToggling] = React.useState(true);
  const [oRderid,setoRderid]=React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const toggle=(event,orderid,batchid)=>{
    setToggling(!toggling)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = props.rowsss.map(n => n.orderid);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0,selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = event => {
    setDense(event.target.checked);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, 10 - page * rowsPerPage);

  const status=orderid=>{
    // setoRderid(e.target.value)
    console.log(orderid)
    console.log("hello")
  }
    const redirectToOrdDetails=(e,batchid)=>{ 
      var url = `/orders?ordid=${batchid}`;
      this.props.history.push(`${url}`);    
    }
  
   const acceptOrder = (e,batchid,orderid) => {       
      console.log(batchid)
      console.log(orderid)
      const data={"TransactionID":"1234abcd", "CreatedAt":"", "OrderStatus":"Order Accepted By Distributor" }
      e.preventDefault();
      console.log('Accept Batch Id :', batchid);        
                
          fetch('http://trackandt-Blockcha-10MS595TSQEZ6-1475584145.us-east-1.elb.amazonaws.com/batch', {
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
            fetch("https://flshq1ib66.execute-api.us-east-1.amazonaws.com/prod/batchupdate",{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify({BatchID:batchid, OrderID:orderid, OrderStatus:"Order Routed to ServiceProvider",OrderShipped:Date(),TransactionID2:id,BatchStatus:"Batch Created & Accepted by Distributor"}),
          }).then((response)=>response.json())
          .then((data)=>{
            // console.log('ID',id)
            console.log(batchid)
            console.log(orderid)     
            // var Orderid = orderid;  
            // this.props.history.push({pathname:'/createbatch', state:Orderid}) 
            var e = document.getElementById('status_' + batchid).innerHTML = "Order Routed to ServiceProvider"   
            var acceptBtn = document.getElementById('accept_' + batchid).disabled = true   
            // var trackBtn = document.createElement("p");
            // trackBtn.innerHTML = "Accepted"
            // document.getElementById('action_'+ batchid).innerHTML=""
            // document.getElementById('action_'+ batchid).appendChild(trackBtn);
          // window.location.reload(false)
          //   document.getElementById('action_'+ batchid).onclick = function()
          //   {   
          //     window.location.href = "http://localhost:3000/#/trackorder"
          //   }
          })
          .catch((error)=>{
            console.log('Error:',error)
          });     
    }
   
  
    const rejectOrder=(e, batchid,orderid)=> {
      console.log(batchid)
      console.log(orderid)
      e.preventDefault();
      fetch("https://flshq1ib66.execute-api.us-east-1.amazonaws.com/prod/batchupdate",{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify({OrderStatus: "Order Rejected By Distributor", OrderID: orderid, BatchID:batchid,BatchStatus:"Batch Rejected"}),
          }).then((response)=>response.json())
            .then((data)=>{
            console.log(data)
            var e = document.getElementById('status_' + batchid).innerHTML = "Order Rejected By Distributor" 
            // var trackBtn = document.createElement("p");
            // trackBtn.innerHTML = "Rejected"
            // document.getElementById('action_'+ batchid).innerHTML=""
            // document.getElementById('action_'+ batchid).appendChild(trackBtn);
            // window.location.reload(false)
            // document.getElementById('action_'+ batchid).onclick = function()
            // {   
            //   window.location.href = "http://localhost:3000/#/traceorder"
            // }
          })
          .catch((error)=>{
            console.log('Error:',error)
          }); 
    }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={[10]}
            />
            <TableBody>
              {props.rowsss.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.orderid);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.orderid)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      // value={row.orderid}
                      // onChange={status(row.orderid)}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox"  id={"status_" + row.orderid} >
                        <Checkbox
                          id={"status_" + row.orderid} 
                          checked={isItemSelected}
                          value={row.orderid}
                          onChange={status("status_" + row.orderid)}
                          inputProps={{ "aria-labelledby": labelId }}/>
                      </TableCell>
                      <TableCell
                        component="th"     
                        id={"status_" + row.orderid}  
                        // value={row.orderid}
                        // onSelect={status("action_" + row.orderid)}
                        scope="row"
                        padding="none"
                        align="center">
                        {row.orderid}
                      </TableCell>   
                      <TableCell align="center">{row.orderstatus}  </TableCell>
                      <TableCell align="center">{row.product}      </TableCell>
                      <TableCell align="center">{row.batchquantity}</TableCell>
                      <TableCell align="center">{row.createdat}    </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <br/>
        <button 
        className="btn btn-sm btn-primary" 
        id='accept'
        value={true}
        // onClick={(e) => {acceptOrder(e, row.batchid, row.orderid); toggle(e,row.batchid,row.orderid)}}
        disabled={!toggling}
        >
        To Deliver
       </button>  &nbsp;&nbsp;
       <button 
        className="btn btn-sm btn-danger" 
        id='reject'
        // onClick={(e) => {acceptOrder(e, row.batchid, row.orderid); toggle(e,row.batchid,row.orderid)}}
        disabled={toggling}
        >
        Delivered
       </button>  &nbsp;&nbsp;
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={[10]}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      </div>
  );
}


 // id={labelId}
 // id={"action_" + row.orderid}
