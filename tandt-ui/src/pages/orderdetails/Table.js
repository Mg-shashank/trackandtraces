import React, { useState } from 'react';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import PropTypes from "prop-types";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { ButtonDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import FormControl from "@material-ui/core/FormControl";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import LoadingOverlay from 'react-loading-overlay';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Toolbar from '@material-ui/core/Toolbar';
import InputAdornment from "@material-ui/core/InputAdornment";
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import ttConfig from '../../config.js'
import trackorder from "../trackorder/trackorder";
var id,url,ORderid;
var Batchid;
let isSelected;
var cbResults="";
var button1,button2,button3,button4;

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
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}        
            />
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
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [oRderid,setoRderid]=React.useState('');
  const [statuss,setstatuss]=React.useState('');
  const [checked,setChecked]=React.useState(false)
  const [value,setValue]=React.useState('Order Routed');
  const [dropdownOpen,setDropdownopen]=React.useState(false)  
  const [toggling,setToggling] = React.useState(false);
  const [anchorEl,setanchorEl]=React.useState(null)
  const [values,setValues]=React.useState("All Orders")
  const [filterOpen,setFilterOpen]=React.useState(false)
  const [placeholder,setPlaceholder]=React.useState("All Orders")
  const [togglings,setTogglings] = React.useState(false);
  const [isPlacingOrder,setIsPlacingOrder]=React.useState(false);
  const [orderDatas,setOrderDatas]=React.useState([]);
  const { numSelected, rows } = props;
  
 
  const toggle=(event,batchid,orderid)=>{
    setTogglings(!togglings)
  }
  
   const handleChanges = event => {
      setValues( event.target.value );
  };
  const handleFilterClicks= event => {
    setanchorEl( event.currentTarget );
  };

  const handleClose = option => {
    if (typeof option === "string") {
      setanchorEl( null);
      setPlaceholder( option );
    } else {
      setanchorEl( null );
    }
  };
 
  const filterOptions=[ "All Orders","Order Initiated","Order Accepted by Manufacturer",
                        "Order Rejected by Manufacturer", "Batch created and Routed to Distributor",
                        "Order Delivered" ]

  document.addEventListener("DOMContentLoaded", function (){
      console.log("ALL ORDERS")
      fetch('https://82aru5m82k.execute-api.us-east-1.amazonaws.com/prod/entries1')
      .then((resp) => resp.json()) // Transform the data into json
       .then((data)=> {
        var jsonData = JSON.parse(JSON.stringify(data));					
        var datas = jsonData.data.Items;	
        const optimizedData = datas.map(data =>({orderid:data.OrderID.S,orderstatus:data.OrderStatus.S,product:data.Product.S,createdat:data.CreatedAt.S}));
        setOrderDatas(optimizedData)
        document.getElementsByClassName('_loading_overlay_wrapper--active')[0].style.display = 'none';
      })
    })                   

  const OrderDelivered=(event)=>{
    setValues( event.target.value );
    console.log(event.target.value)
    console.log('control1')
    console.log(values)
   	  const data2={
			OrderStatus:event.target.value
		  };
		  if(data2.OrderStatus==="All Orders"){
        console.log("ALL ORDERS")
        fetch('https://82aru5m82k.execute-api.us-east-1.amazonaws.com/prod/entries1')
        .then((resp) => resp.json()) // Transform the data into json
         .then((data)=> {
          var jsonData = JSON.parse(JSON.stringify(data));					
          var datas = jsonData.data.Items;	
          const optimizedData = datas.map(data =>({orderid:data.OrderID.S,orderstatus:data.OrderStatus.S,product:data.Product.S,createdat:data.CreatedAt.S}));
          setOrderDatas(optimizedData)
          // document.getElementsByClassName('_loading_overlay_wrapper--active')[0].style.display = 'none';
        })
      }		
      else{
        // document.addEventListener("click", function(){
        fetch('https://9fsnk4xvv6.execute-api.us-east-1.amazonaws.com/prod/fetchinit', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
            },
          body: JSON.stringify(data2),
          })
      .then((resp) => resp.json()) 
      .then((data)=> {
        var jsonData = JSON.parse(JSON.stringify(data));					
        var datas = jsonData.Items;	
        const initData = datas.map(data =>({orderid:data.OrderID.S,orderstatus:data.OrderStatus.S,product:data.Product.S,createdat:data.CreatedAt.S}));
        setOrderDatas(initData)
        console.log(orderDatas)
        // document.getElementsByClassName('_loading_overlay_wrapper--active')[0].style.display = 'none';
       })
      // })
      }    
    }	

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orderDatas.map(n =>n.orderid);
      const batcSelecteds = orderDatas.map(n=>n.batchid);
      console.log("NEW SELECTEDS",newSelecteds)
      console.log("NEW SELECTEDS",batcSelecteds)
      setSelected(newSelecteds);
      setSelecteds(batcSelecteds);
      return;
    }
    setSelected([]);
    setSelecteds([]);
  };
  // console.log(checked)
  // console.log(props.rowsss.length)

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

 const isSelected = name =>selected.indexOf(name) !== -1;

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
     alert("Please select an order to Track");
    }
  }

   const handleChange=(e)=>{
      setstatuss(e.target.value)
      console.log("SETSTATUS",setstatuss)
    }
 
    const traceOrder=(e,orderid)=>{     
      var c=orderid.length;     
     if(c>1){
       alert("Please select only one order to Trace!!");
     }
     else if(c===1){
      var myarray= orderid.toString().split(',');
      for(var i = 0;  i < myarray.length; i++)
      { 
        if(document.getElementById(myarray[i]).innerHTML==='Order Delivered'){
        
        var url = `/traceorder?ordid=${orderid[0]}`;
        props.history.push(`${url}`);  
      }
      else{
        alert("Invalid selection. Only Delivered Orders can be traced!");
       }
      }
         }
     else{
      alert("Please select an order to Trace");
     }
  }
 

    const acceptOrders = (e,batchid,orderid) => {    
      var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"});
      usaTime = new Date(usaTime);
      var time=usaTime.toLocaleString()
      if(orderid==""){
        alert("Select an Orderid")
      }   
      else{
        console.log("control entered1")
      var myarray= orderid.split(',');
      console.log(myarray)    
      for(var i = 0;  i < myarray.length; i++)
      {              
        console.log(document.getElementById(myarray[i]).innerHTML)
        if(document.getElementById(myarray[i]).innerHTML==="Batch created and Routed to Distributor"){
        document.getElementById("accept").disabled = true;
        document.getElementById("accept").innerHTML="processing..."
   
      setTimeout(function(){document.getElementById("accept").innerHTML="To Deliver"},5000);
      setTimeout(function(){document.getElementById("accept").disabled = false},5000);
      
      console.log(batchid)
      console.log(orderid)
      const data={"OrderShipped":time,"OrderStatus":"Order Routed to Service Provider" }
      e.preventDefault();
      console.log('Accept Batch Id :', batchid);         
          fetch('http://trackandt-Blockcha-AN9BPL0Z2ZRW-49401935.us-east-1.elb.amazonaws.com/batch', {
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
            body:JSON.stringify({ OrderID:orderid, OrderShipped:time,OrderStatus:"Order Routed to Service Provider"}),
            
          }).then((response)=>response.json())
          
          .then((data)=>{         
            var myarray= orderid.split(',');
            console.log(myarray)
            for(var i = 0;  i < myarray.length; i++)
            {              
              document.getElementById(myarray[i]).innerHTML="Order Routed to Service Provider";
              // window.location.reload(false)
            }         
          } 
        ).catch((error)=>{
            console.log('Error:',error)
          });     
    }    
    else if(document.getElementById(myarray[i]).innerHTML==="Order Routed to Service Provider"){
      alert("Order already routed to service provider")
      // document.write("")
    }
    else{
      alert("Invalid Selection. Only New Orders can be accepted!")
      // document.write("Please select proper orderid")
    }
  }
  }
  }
  const Delivered = (e,batchid,orderid) => { 
    var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"});
    usaTime = new Date(usaTime);
    var time=usaTime.toLocaleString()    
    if(orderid==""){
      alert("Select an Orderid")
    }   
    else{
      console.log("control entered1")
      var myarray= orderid.split(',');
      console.log(myarray)
      for(var i = 0;  i < myarray.length; i++)
      {              
        console.log(document.getElementById(myarray[i]).innerHTML)     
      if(document.getElementById(myarray[i]).innerHTML==="Order Routed to Service Provider"){
      // debugger
        console.log("control entered2")
      document.getElementById("delivered").disabled = true;
     document.getElementById("delivered").innerHTML="processing..."
 
    setTimeout(function(){document.getElementById("delivered").innerHTML="Delivered"},5000);
    setTimeout(function(){document.getElementById("delivered").disabled = false},5000);
    
    console.log(batchid)
    console.log(orderid)
    const data={"OrderCompleted":time, "OrderStatus":"Order Delivered" }
    e.preventDefault();
    console.log('Accept Batch Id :', batchid);         
    fetch('http://trackandt-Blockcha-AN9BPL0Z2ZRW-49401935.us-east-1.elb.amazonaws.com/batch', {
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
          body:JSON.stringify({ OrderID:orderid,OrderStatus:"Order Delivered"}),
          
        }).then((response)=>response.json())
        
        .then((data)=>{         
          var myarray= orderid.split(',');
          console.log(myarray)
          for(var i = 0;  i < myarray.length; i++)
          {              
            document.getElementById(myarray[i]).innerHTML="Order Delivered";
            // window.location.reload(false)
          }         
        } 
      ).catch((error)=>{
        console.log('Error:',error)
    });     
  }
  else if(document.getElementById(myarray[i]).innerHTML==="Batch created and Routed to Distributor"){
    alert("Order not yet routed to service provider")
  }
  else{
    alert("Please select proper orderid")
  }
  }
}
}
const acceptOrder = (e,orderid) => {
  if(orderid==="")  {
    alert("Please select an order to Accept");
  }     else{
    var myarray= orderid.split(',');
    console.log(myarray)
    for(var i = 0;  i < myarray.length; i++)
    {      
    if(document.getElementById(myarray[i]).innerHTML==="Order Initiated"){
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
        body:JSON.stringify({OrderID:orderid, OrderStatus:"Order Accepted by Manufacturer"}),
      }).then((response)=>response.json())
      .then((data)=>{         
        var myarray= orderid.split(',');
        for(var i = 0;  i < myarray.length; i++)
        {              
          document.getElementById(myarray[i]).innerHTML="Order Accepted by Manufacturer";
        }         
      })
      .catch((error)=>{
        console.log('Error:',error)
      });
    }  
    else{
      alert('Invalid Selection. Only New Orders can be accepted!')
    }
  }
     }  
}   
const rejectOrder = (e,orderid) => {       
  if(orderid==="")  {
    alert("Please select an order to Reject");
  }     else{
    var myarray= orderid.split(',');
    console.log(myarray)
    for(var i = 0;  i < myarray.length; i++)
    {      
    if(document.getElementById(myarray[i]).innerHTML==="Order Initiated"){
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
        body:JSON.stringify({OrderID:orderid, OrderStatus:"Order Rejected by Manufacturer"}),
      }).then((response)=>response.json())
      .then((data)=>{    
        var myarray= orderid.split(',');
        for(var i = 0;  i < myarray.length; i++)
        {              
          document.getElementById(myarray[i]).innerHTML="Order Rejected by Manufacturer";
        }
      })
      .catch((error)=>{
        console.log('Error:',error)
      });   
    }  
    else{
      alert("Invalid Selection. Only New Orders can be rejected!")
    }
  }
}
} 
  // For Distributor  
  if(localStorage.getItem('role') === ttConfig.roleassign.dist.role){
     button1= <button 
        className="btn btn-sm btn-primary"       
        id='accept'       
        onClick={(e) => {acceptOrders(e, selecteds.toString(), selected.toString())}}    
        >
        To Deliver
       </button>  
       
      button2= <button 
        className="btn btn-sm btn-primary"       
        id='delivered'       
        onClick={(e) => {Delivered(e, selecteds.toString(), selected.toString())}}    
        >
        Delivered
       </button>  
      
      button3= <button
         className="btn btn-sm btn-primary "      
         id ='track'
         onClick={(e) => {trackOrder(e, selected)}}  
         >
         Track Order
       </button>
        
       button4=<button 
         className="btn btn-sm btn-primary " 
        id = 'trace'     
         onClick={(e) => {traceOrder(e, selected)}}  
         >
         Trace Order        
       </button> 
      
    }
    // For Manufacturer
    if(localStorage.getItem('role') === ttConfig.roleassign.manu.role){
      button3=<button
         className="btn btn-sm btn-primary " 
        id = 'track'      
         onClick={(e) => {trackOrder(e, selected)}}  
         >
         Track Order
       </button>
     
      button2= <button 
        className="btn btn-sm btn-primary " 
        id="reject"     
        onClick={(e) => {rejectOrder(e, selected.toString())}
      }  
        >
        Reject Order
       </button>     
       button1=<button 
        className="btn btn-sm btn-primary" 
        id="accept"      
        onClick={(e) => {acceptOrder(e, selected.toString())}}   
        >
        Accept Order
       </button> 
       button4=<button 
       className="btn btn-sm btn-primary " 
      id = 'trace'      
       onClick={(e) => {traceOrder(e, selected)}}  
       >
       Trace Order        
     </button> 
    }
    if(localStorage.getItem('role') === ttConfig.roleassign.serv.role){
      button1=<button
         className="btn btn-sm btn-primary " 
        id = 'track'      
         onClick={(e) => {trackOrder(e, selected)}}  
         >
         Track Order
       </button>  
       button2=<button 
       className="btn btn-sm btn-primary " 
      id = 'trace'      
       onClick={(e) => {traceOrder(e, selected)}}  
       >
       Trace Order        
     </button> 
     button3=<Link to="/dashboard"><button
     className="btn btn-sm btn-primary " 
      id = 'dashboard'       
     >
     Go back To Dashboard
   </button></Link>
    }
   
  return (	
    <div className={classes.root}> 
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
	 		</LoadingOverlay> 
    <div align="right">
    &nbsp;&nbsp;
    <br/>
    {button1}
    &nbsp;&nbsp;
    {button2}
    &nbsp;&nbsp;
    {button3}
    &nbsp;&nbsp;
    {button4}
    &nbsp;&nbsp;
    </div>
    <section class="content">
    <Paper className={classes.paper}>      
        <TableContainer>
        <div>
    <FormControl>
          <Input
            id='orderstatus'
            type="text"
            value={`${placeholder}`}
            onMouseDown={OrderDelivered}
            // onKeyPressCapture={OrderDelivered}
            placeholder={`${placeholder}`}         
            endAdornment={
              <InputAdornment position="center">
                <IconButton
                  aria-label="Select Filter"
                  onClick={handleFilterClicks}>
                  <FilterListIcon isOpen={togglings} toggle={toggle} />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          {filterOptions.map(option => (
            <MenuItem onClick={() => handleClose(option)}>
            <table>
             <tr style={{ align:'center' }}>
                <td style={{ width: "66px", align:'center' }} />      
                  <td>    
                    {option}
                  </td>     
              </tr>
            </table>
            </MenuItem>
          ))}
        </Menu>        
      </div>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}          
              onSelectAllClick={handleSelectAllClick}              
              rowCount={orderDatas.length}           
            />
            <TableBody>          
              {orderDatas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.orderid);     
                  const labelId = `enhanced-table-checkbox-${index}`;             
                  return ( 
                    <TableRow
                      hover
                      className = "orderclass"
                      onClick={event => handleClick(event, row.orderid, row.batchid)}  
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      style={{backgroundColor:'white'}}
                      >
                      <TableCell padding="checkbox" >
                        <Checkbox     
                          color="primary" 
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
                     onMouseOver={function(event) { let target = event.target; target.style.color = 'blue';target.style.cursor='pointer'; }}
                     onMouseOut= {function(event) { let target = event.target; target.style.color = 'black';}}
                      >                    
                      {row.orderid}
                      </a>
                      </TableCell>   
                      <TableCell align="center"
                         id={row.orderid} 
                         value={statuss} 
                         onChange={handleChange}>
                         {row.orderstatus} 
                       </TableCell>
                      <TableCell align="center">{row.product}  </TableCell> 
                      <TableCell align="center">{row.createdat}</TableCell>
                    </TableRow>
                  );
                })}              
            </TableBody>
          </Table>
        </TableContainer> 
        <TablePagination
          rowsPerPageOptions={[5, 25, 50]}
          component="div"
          count={[50]}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>   
      </section>
      </div>
  );
}

export default withRouter(EnhancedTable)