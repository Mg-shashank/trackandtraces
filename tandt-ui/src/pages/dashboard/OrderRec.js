import React, { useState, useEffect } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import PropTypes from "prop-types";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
import trackorder from "../trackorder/trackorder";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import ttConfig from '../../config.js'
import Logout from '../login/Logout';
import LoadingOverlay from 'react-loading-overlay';
const request = require('request');
var https = require("https");

var id,url,ORderid;
var Batchid;
let isSelected;
var cbResults="";

function EnhancedTableHead(props) {

  const {
    onSelectAllClick,
    numSelected,
    rowCount,    
  } = props;
   return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}        
            /> */}
        </TableCell>
        <TableCell align="center" style={{fontWeight:'bold'}}>Order ID </TableCell>
        <TableCell align="center" style={{fontWeight:'bold'}}>Order Status</TableCell>
        <TableCell align="center" style={{fontWeight:'bold'}}>Product Name</TableCell>
        <TableCell align="center" style={{fontWeight:'bold'}}>Order Placed On</TableCell>
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
  // const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [toggling,setToggling] = React.useState(true);
  const [oRderid,setoRderid]=React.useState('');
  const [statuss,setstatuss]=React.useState('');
  const [checked,setChecked]=React.useState(false)
  const [completedtable,setCompletedtable]=React.useState([])
//   let Orders= this.props.location.state;
 console.log(props)

  useEffect(()=> {      
    var request = https.get("https://rvpkp45prc.execute-api.us-east-1.amazonaws.com/prod/completedtable",                
(response) => {
    if(response.statusCode !==200)
    {
        // console.log("Error while getting the data");
    }
response.on('data',(data) => {
     var jsonData = JSON.parse(data);
    var datas = jsonData.Items;
      const optimizedData = datas.map(data =>({OrderStatus:data.OrderStatus.S,OrderID:data.OrderID.S,BatchID:data.BatchID.S,BatchStatus:data.BatchStatus.S,Distributor:data.Distributor.S,Manufacturer:data.Manufacturer.S,Product:data.Product.S,Category:data.Category.S,Quantity:data.Quantity.S,Upgradeto5G:data.Upgradeto5G.S,TransactionID1:data.TransactionID1.S,CreatedAt:data.CreatedAt.S,Manufacturer1:data.Manufacturer,Product1:data.Product,Category1:data.Category,Quantity1:data.Quantity,Upgradeto5G1:data.Upgradeto5G,TransactionIDD:data.TransactionID1,CreatedAt1:data.CreatedAt,OrderStatuses:data.OrderStatuses}));
   console.log(optimizedData)
    // this.setState({completedtable: optimizedData})
    setCompletedtable(optimizedData)
    // completedtable(optimizedData)
    console.log(completedtable)
    console.log(setCompletedtable)
    document.getElementsByClassName('_loading_overlay_wrapper--active')[0].style.display = 'none';
  });
});
},[])
console.log(completedtable)
    console.log(setCompletedtable)
  const toggle=(event,batchid,orderid)=>{
    setToggling(!toggling)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = completedtable.map(n =>n.OrderID);
      console.log("NEW SELECTEDS",newSelecteds)
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
    // setSelecteds([]);
  };
  
  console.log(checked)
  // console.log(props.rowsss.length)

  const handleClick = (event, orderid) => {
    console.log(orderid)
    const selectedIndex = selected.indexOf(orderid);
    let newSelected = [];
    let newsSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, orderid);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex),selected.slice(selectedIndex + 1));
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

 const isSelected = name => selected.indexOf(name) !== -1;
 
//  const handleChangeDense = event => {
//   setDense(event.target.checked);
// };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, 10 - page * rowsPerPage);

   const redirectToOrdDetails=(e,orderid)=>{ 
      var url = `/orders?ordid=${orderid}`;
      props.history.push(`${url}`);    
    }


   const trackOrder=(e,orderid)=>{ 
    var c=orderid.length;
    var a="error";
    console.log(c);
    var url = `/trackorder?ordid=${orderid[0]}`;
    console.log(url)
    if(c>1){
      alert("Please select only one order to Track!!");
    }
    else if(c==1){
      props.history.push(`${url}`);  

    }
    else{
     alert("Invalid selection. Please select an order to Track");
    }
  }


   const handleChange=(e)=>{
      // this.setState({
      //   status: e.target.value,
      // });
      setstatuss(e.target.value)
      console.log("SETSTATUS",setstatuss)
    }
    

    
    const acceptOrder = (e,orderid) => {
      if(orderid=="")  {
        alert("Please select an order to Accept");
      }     else{
        			var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"});
			usaTime = new Date(usaTime);
			var time=usaTime.toLocaleString()
        document.getElementById("accept").disabled = true;
       document.getElementById("accept").innerHTML="Accepting..."
   
      setTimeout(function(){document.getElementById("accept").innerHTML="Accept Order"},5000);
      setTimeout(function(){document.getElementById("accept").disabled = false},5000);
      console.log(orderid)
      e.preventDefault();                      
            fetch("https://onwm832w2h.execute-api.us-east-1.amazonaws.com/dev/updates",{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify({OrderID:orderid, OrderStatus:"Order Completed"}),
          }).then((response)=>response.json())
          .then((data)=>{         
            var myarray= orderid.split(',');
            for(var i = 0;  i < myarray.length; i++)
            {              
              document.getElementById(myarray[i]).innerHTML="Order Completed";
            }         
          })
          .catch((error)=>{
            console.log('Error:',error)
          });  
         }  
    }   
    const rejectOrder = (e,orderid) => {       
      if(orderid=="")  {
        alert("Please select an order to Reject");
      }     else{
        document.getElementById("reject").disabled = true;
       document.getElementById("reject").innerHTML="Rejecting..."
   
      setTimeout(function(){document.getElementById("reject").innerHTML="Reject Order"},5000);
      setTimeout(function(){document.getElementById("reject").disabled = false},5000);
      console.log(orderid)
      
      e.preventDefault();                      
            fetch("https://onwm832w2h.execute-api.us-east-1.amazonaws.com/dev/updates",{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify({OrderID:orderid, OrderStatus:"Order Rejected By Service Provider "}),
          }).then((response)=>response.json())
          .then((data)=>{    
            var myarray= orderid.split(',');
            for(var i = 0;  i < myarray.length; i++)
            {              
              document.getElementById(myarray[i]).innerHTML="Order Rejected By Service Provider";
            }
          })
          .catch((error)=>{
            console.log('Error:',error)
          });   
        }  
    } 
  console.log("orderid",selected.toString()) 

  return (
    <div className={classes.root}>      
    <div className="container-fluid padding0">  
       <Logout/> 
       <section class="content">
       <h3 className="section-header"> Completed Orders</h3>
        
    <LoadingOverlay
        active={true}
        spinner
        text='Loading the content...' 
        styles={{
          spinner: (base) => ({
            ...base,
            width: '50px',
            '& svg circle': {
            stroke: 'rgba(255, 0, 0, 0.5)'
            }
          })
          }}
        >       
        <p>Loading...</p>
      </LoadingOverlay> 
      <Paper className={classes.paper}>      
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            // size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}          
              onSelectAllClick={handleSelectAllClick}              
              rowCount={completedtable.length}           
            />
            <TableBody>
              {completedtable.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // const isItemSelected = isSelected(row.OrderID);     
                  // const labelId = `enhanced-table-checkbox-${index}`;
             
                  return (
                    <TableRow
                      hover
                      className= "orderclass"
                      onClick={event => handleClick(event, row.OrderID)}  
                      // role="checkbox"
                      // aria-checked={isItemSelected}
                      // tabIndex={-1}
                      // key={row.id}
                      // selected={isItemSelected}
                    >
                      <TableCell padding="checkbox" >
                        {/* <Checkbox     
                          color="primary" 
                          checked={isItemSelected}      
                          inputProps={{ "aria-labelledby": labelId }} */}
                          {/* /> */}
                      </TableCell>
                      <TableCell
                        component="th" 
                        // id={labelId}
                        // scope="row"
                        padding="none"
                        align="center">
                      <a 
                     onClick={(e) => {redirectToOrdDetails(e, row.OrderID)}} 
                     target="_blank"
                     onMouseOver={ function(event) { let target = event.target; target.style.color = 'blue';target.style.cursor='pointer'; }}
                     onMouseOut={function(event) { let target = event.target; target.style.color = 'black';}}
                      >                    
                      {row.OrderID}
                      </a>
                      </TableCell>   
                      <TableCell align="center"
                         id={row.OrderID} 
                         value={statuss} 
                         onChange={handleChange}>
                          {row.OrderStatus}
                       </TableCell>
                      <TableCell align="center">{row.Product}</TableCell>                   
                      <TableCell align="center">{row.CreatedAt}</TableCell>
                    </TableRow>
                  );
                })}
                
            </TableBody>
            
          </Table>
        </TableContainer>
         <div class="col-lg-12 col-md-12 text-right">
				{/* <Link to="/dashboard"><div class="btn btn-cancel">Go back to Dashboard</div></Link> */}
        <Link to="/dashboard"><input type="submit" value="Go back to Dashboard" id="btn-submit" className="btn btn-prim" ></input></Link>
				{/* <input type="submit" value="Create Batch"  className="btn btn-prim" align="center" float="right" id="btn-submit" disabled={this.state.loading}></input> */}
			</div> 
        <br/>&nbsp;&nbsp; 
        {/* <button 
        className="btn btn-sm btn-primary " 
        id="accept"      
        onClick={(e) => {acceptOrder(e, selected.toString())}}   
       
        >
        Accept Order
       </button>  &nbsp;&nbsp;    
       <button 
        className="btn btn-sm btn-primary " 
        id="reject"     
        onClick={(e) => {rejectOrder(e, selected.toString())}
      }          
        >
        Reject Order
       </button>  &nbsp;&nbsp;
       <button
         className="btn btn-sm btn-primary " 
        id = 'track'      
         onClick={(e) => {trackOrder(e, selected)}}  
         >
         Track Order
       </button> */}
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
      {/* <FormControlLabel
        control={<Switch checked={dense} color="primary" onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </section>
      </div>
      </div>
  );
}

export default withRouter(EnhancedTable)
