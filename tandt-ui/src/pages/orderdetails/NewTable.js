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
import trackorder from "../trackorder/trackorder";
var e=localStorage.getItem('initiated')
var transactionid=localStorage.getItem("transactionid")
var createdat=localStorage.getItem("createdat")
var id,url,ORderid;
var Batchid;
let isSelected;
var cbResults="";

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
   return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}        
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
  onSelectAllClick: PropTypes.func.isRequired, 
  rowCount: PropTypes.number.isRequired,
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
    <Toolbar>
     <Typography className={classes.title} variant="h6" id="tableTitle">
        Order Details
    </Typography>
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

function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [selecteds, setSelecteds] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [toggling,setToggling] = React.useState(true);
  const [oRderid,setoRderid]=React.useState('');
  const [statuss,setstatuss]=React.useState('');
  const [checked,setChecked]=React.useState(false)

 
  const toggle=(event,batchid,orderid)=>{
    setToggling(!toggling)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.rowsss.map(n =>n.orderid);
      const batcSelecteds = props.rowsss.map(n=>n.batchid);
      console.log("NEW SELECTEDS",newSelecteds)
      console.log("NEW SELECTEDS",batcSelecteds)
      setSelected(newSelecteds);
      setSelecteds(batcSelecteds);
      return;
    }
    setSelected([]);
    setSelecteds([]);
  };
  console.log(checked)
  console.log(props.rowsss.length)

  const handleClick = (event, orderid, batchid) => {
    console.log(orderid)
    console.log(batchid)
    const selectedIndex = selected.indexOf(orderid);
    const selectedIndexs = selecteds.indexOf(batchid);
    let newSelected = [];
    let newsSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, orderid);
      newsSelected = newsSelected.concat(selecteds, batchid);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newsSelected = newsSelected.concat(selecteds.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newsSelected = newsSelected.concat(selecteds.slice(0,-1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex),selected.slice(selectedIndex + 1));
      newsSelected  = newsSelected.concat(selecteds.slice(0,selectedIndexs),selecteds.slice(selectedIndexs + 1));
    }
    setSelected(newSelected);
    setSelecteds(newsSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

 const isSelected = name => selected.indexOf(name) !== -1;
 
 const handleChangeDense = event => {
  setDense(event.target.checked);
};
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, 10 - page * rowsPerPage);

   const redirectToOrdDetails=(e,orderid)=>{ 
      var url = `/orders?ordid=${orderid}`;
      props.history.push(`${url}`);    
    }
   const trackOrder=(e,orderid)=>{ 
    console.log(orderid)
    var url = `/trackorder?ordid=${orderid}`;
    this.props.history.push(`${url}`);   
  }
   const handleChange=(e)=>{
      // this.setState({
      //   status: e.target.value,
      // });
      setstatuss(e.target.value)
      console.log("SETSTATUS",setstatuss)
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
                console.log('Success:', data.transactionId);
                id=JSON.stringify(data.transactionId);
                console.log('TRANSID',id)
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
            body:JSON.stringify({BatchID:batchid, OrderID:orderid, OrderStatus:"Order Routed to Service Provider",OrderShipped:Date(),TransactionID2:id,BatchStatus:"Batch Created & Accepted by Distributor"}),
          }).then((response)=>response.json())
          .then((data)=>{         
            console.log(batchid)
            console.log(orderid)   
            var e = document.getElementById('status_' + orderid).innerHTML = "Order Routed to Service Provider"   
            var acceptBtn = document.getElementById('accept_' + batchid).disabled = true  
            // forceUpdate();
          })
          .catch((error)=>{
            console.log('Error:',error)
          });     
    }    
  console.log("orderid",selected.toString()) 
  console.log('batchid',selecteds.toString())

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>      
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
              onSelectAllClick={handleSelectAllClick}              
              rowCount={props.rowsss.length}           
            />
            <TableBody>
              {props.rowsss.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.orderid);     
                  const labelId = `enhanced-table-checkbox-${index}`;
             
                  return (
                    <TableRow
                      hover
                      className= "orderclass"
                      onClick={event => handleClick(event, row.orderid, row.batchid)}  
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox" >
                        <Checkbox      
                          checked={isItemSelected}      
                          inputProps={{ "aria-labelledby": labelId }}
                          />
                      </TableCell>
                      <TableCell
                        component="th" 
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center">
                      <a 
                     onClick={(e) => {redirectToOrdDetails(e, row.orderid)}} 
                     target="_blank"
                     onMouseOver={ function(event) { let target = event.target; target.style.color = 'blue';target.style.cursor='pointer'; }}
                     onMouseOut={function(event) { let target = event.target; target.style.color = 'black';}}
                      >                    
                      {row.orderid}
                      </a>
                      </TableCell>   
                      <TableCell align="center"
                         id={"status_" + row.orderid} 
                         value={statuss} 
                         onChange={handleChange}>
                         {row.orderstatus} {row.OrderStatuses}
                       </TableCell>
                      <TableCell align="center">{row.product}      </TableCell>
                      <TableCell align="center">{row.batchquantity}</TableCell>
                      <TableCell align="center">{row.createdat}    </TableCell>
                    </TableRow>
                  );
                })}
                
            </TableBody>
          </Table>
        </TableContainer>
        <br/>
        <button 
        className="btn btn-sm btn-primary" 
        id={ORderid}       
        onClick={(e) => {acceptOrder(e, selecteds.toString(), selected.toString())}}    
        >
        To Deliver
       </button>  &nbsp;&nbsp;    
       <button
         className="btn btn-sm btn-primary" 
        id = 'track'      
         onClick={(e) => {trackorder(e, selected.toString())}}  
         >
         Track
       </button>
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
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      </div>
  );
}

export default withRouter(EnhancedTable)

