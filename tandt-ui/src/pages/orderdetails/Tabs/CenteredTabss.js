import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import NewTable from '../NewTable'
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

export default function CenteredTabss(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  

  return (
    <React.Fragment>     
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
        <NewTable rowsss={props.rowsss}/>
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

		
