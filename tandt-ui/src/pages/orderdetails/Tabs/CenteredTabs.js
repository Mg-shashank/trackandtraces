import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SimpleTable from '../SimpleTable'
import NewTable from '../NewTable'
import Newtable1 from '../Newtable1'
import PrevOrderTable from '../PrevOrderTable'
import RejectTable from '../RejectTable'
import Completed from '../Completed'
import InProgress from '../InProgress'
import DisAcc from '../DisAcc'
import { HashRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import trackorder from "../../trackorder/trackorder";
import $ from 'jquery';
import App from '../PagiTable';
import { doWhileStatement } from "@babel/types";
import ttConfig from '../../../config.js'
var role = localStorage.getItem('role')
var name = localStorage.getItem('name')
var display,display1,display2,display3,display4,display5,display6,display7,display8;
var ordercount,ordercount1,ordercount2,refreshs;

$.ajax({
  url:"https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/fetchordercount",
	type: 'GET',
	mode :'no-cors',
	cache: false,
	success: function(data) {
  // Success..			 
    ordercount=JSON.parse(data)
	//  console.log('success',ordercount);	 
	}.bind(this),
	// Fail..
	error: function(xhr, status, err,data) {
	  // console.log(xhr, status);
	  // console.log(err);
	  console.log(data);			
	}.bind(this)
  });
  $.ajax({
    url:"https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/fetchcountaccept",
    type: 'GET',
    mode :'no-cors',
    cache: false,
    success: function(data) {
    // Success..			 
      ordercount1=JSON.parse(data)
      //console.log('success',ordercount);	 
    }.bind(this),
    // Fail..
    error: function(xhr, status, err,data) {
      // console.log(xhr, status);
      // console.log(err);
      // console.log(data);			
    }.bind(this)
    });
    $.ajax({
      url:"https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/fetchcountrec",
      type: 'GET',
      mode :'no-cors',
      cache: false,
      success: function(data) {
      // Success..			 
        ordercount2=JSON.parse(data)
       // console.log('success',ordercount);	 
      }.bind(this),
      // Fail..
      error: function(xhr, status, err,data) {
        // console.log(xhr, status);
        // console.log(err);
        // console.log(data);			
      }.bind(this)
      });
      
       
function TabPanel(props) {
  const { children, value, index, ...other } = props;
   return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={5}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,"aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function CenteredTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if(role === "distributor" && name==="Steve"){
     display = <NewTable rowsss={props.rowsss}/>
    //  display = <Newtable1 rowsss={props.rowsss}/>
    //  display8 = <Tab label="Order Details Table" {...a11yProps(0)} />
    }
  else if(role === "manufacturer" && name==="Joe") {
     display1 = <SimpleTable rowss={props.rows} />
    //  display2= <PrevOrderTable rowses={props.row}/>
    //  display3= <RejectTable rowsess={props.rowss}/>
    //  display4= <InProgress rowsesss={props.inpr}/>
    //  display5= <Completed comps={props.comp} />
    //  display6= <Tab label="InProgress" {...a11yProps(3)} />
    //  display7= <Tab label="Completed" {...a11yProps(4)} />  
  }
  return (
    <React.Fragment>
    <div className="container">
		<div className="col-lg-9 col-md-9 padding0">
		<div className="col-lg-9 col-md-9">
		<div className="col-lg-12 col-md-12">
		<h3 className="section-header">Track Orders</h3>
		</div>
		<div className="col-lg-12 col-md-12 padding0">
		<div className="col-lg-4 col-md-4">
		<div className="track-order">
		<h3>Order Placed</h3>
		<p className="order-number"><b>{props.ordPlace}</b></p>
		</div>
		</div>
		<div className="col-lg-4 col-md-4">
		<div className="track-order">
		<h3>Order Accepted</h3>
		<p className="order-number"><b>{props.ordAccepted}</b></p>
		</div>
		</div>
		<div className="col-lg-4 col-md-4">
		<div className="track-order">
		<h3>Order Completed</h3>
		<p className="order-number"><b>{props.ordRecieve}</b></p>
		</div>
		</div>
		</div>		
		</div>
		</div>
    </div>
    <br/><br/>
       
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        {display8}
        {/* <Tab label="Current Orders" {...a11yProps(0)} /> */}
        {/* <Tab label="Accepted Orders" {...a11yProps(1)} />
        <Tab label="Rejected Orders" {...a11yProps(2)} />
        {display6}
        {display7}  */}
        
        {/* <Tab label="PagiTable" {...a11yProps(3)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {/* <SimpleTable rowss={props.rows}/> */}
        {display}
        {display1}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <PrevOrderTable rowses={props.row}/> */}
        {display2}
      </TabPanel>
      <TabPanel value={value} index={2}>     
        {display3}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {display4}
        {display6}
      </TabPanel>
      <TabPanel value={value} index={4}>
        {display5}
        {display7}
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        <App rowss={props.rows}/>
      </TabPanel> */}
      {/* <div class="col-md-4 text-left">
      <Link to="/trackorder">
      <button type="button" className="btn btn-primary">Track Order</button>
      </Link>  
      </div>    */}
    </div>
    </React.Fragment>
  );
}

		
