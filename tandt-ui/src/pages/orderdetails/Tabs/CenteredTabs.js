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
import PrevOrderTable from '../PrevOrderTable'
import RejectTable from '../RejectTable'
import DisAcc from '../DisAcc'
import { HashRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import trackorder from "../../trackorder/trackorder";
import $ from 'jquery';
import App from '../PagiTable';
var role = localStorage.getItem('role')
var display,display1,display2,display3; 
var ordercount,ordercount1,ordercount2;

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
	  // console.log(data);			
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
    //  console.log('success',ordercount);	 
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
  // console.log({children})
  // console.log({value})
  // console.log({index})
  // console.log({...other})

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
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
  if(role === "distributor"){
     display = <NewTable rowsss={props.rowsss}/>
     display2= <DisAcc dist={props.dis}/>
  }
  else if(role === "manufacturer") {
     display1 = <SimpleTable rowss={props.rows}/>
     display2= <PrevOrderTable rowses={props.row}/>
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
		<h3>Order Received</h3>
		<p className="order-number"><b>{ordercount2}</b></p>
		</div>
		</div>
		<div className="col-lg-4 col-md-4">
		<div className="track-order">
		<h3>Order Accepted</h3>
		<p className="order-number"><b>{ordercount1}</b></p>
		</div>
		</div>
		<div className="col-lg-4 col-md-4">
		<div className="track-order">
		<h3>Order Placed</h3>
		<p className="order-number"><b>{ordercount}</b></p>
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
        <Tab label="Current Orders" {...a11yProps(0)} />
        <Tab label="Completed Orders" {...a11yProps(1)} />
        <Tab label="Rejected Orders" {...a11yProps(2)} />
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
        <RejectTable rowsess={props.rowss}/>
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        <App rowss={props.rows}/>
      </TabPanel> */}
      <div class="col-md-4 text-left">
      <Link to="/trackorder">
      <button type="button" className="btn btn-primary">Track Order</button>
      </Link>  
      </div>    
    </div>
    </React.Fragment>
  );
}

		
